import { Component, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Series } from '../user-data';
import { UserService } from '../user.service';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-series-search',
  templateUrl: './series-search.component.html',
  styleUrls: ['./series-search.component.css']
})
export class SeriesSearchComponent {

  series$!: Observable<Series[]>;
  @Output() selectedSeries = new EventEmitter<Series>();
  private searchTerms = new Subject<string>();
  showList: boolean = true;

  constructor(private userService: UserService) {}

  
  selectSeries(series: Series): void {
    this.showList = false;
    this.selectedSeries.emit(series);
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.series$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.userService.searchSeries(term.trim() || '')),
    );
  }

}
