import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, Series } from '../user-data';
import { Location } from '@angular/common';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})


export class SeriesDetailComponent implements OnInit {

  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0-9'];
  seriesAvailable: Series[] = [];
  listOfSeriesToShow: Series[] = [];
  showDetails: boolean[] = [];
  user : User | undefined;
  selectedLetter : string | undefined;
  previousLetter : string = "";
  @Input() series?: Series;
  searchSeries: Series | undefined;

  constructor(private userService: UserService, private location: Location) {  }

  ngOnInit(): void {
      this.getUserFilteredSeries();
  }

  getUserFilteredSeries(): void {
    this.userService.getSeries().subscribe(series => 
      {this.seriesAvailable = series.sort((a, b) => a.name.localeCompare(b.name));
        this.listOfSeriesToShow = this.seriesAvailable;
    });
    this.userService.getUser().subscribe(user => {this.user = user});
  }

  isLetterSelected(letter: string): boolean {
    return this.selectedLetter === letter;
  }

  toggleDetails(index: number) {
    this.showDetails[index] = !this.showDetails[index];
  }

  formatSet(items: Set<string>): string {
    let formattedItems = Array.from(items).join(", ");
    return formattedItems;
    
  }

  goBack(): void {
    this.location.back();
  }

  addSeriesToPendingSeries(index: number) {
    if(this.user) {
      this.userService.save(this.user.userId, this.seriesAvailable[index].seriesId).subscribe(() => this.goBack());
      console.log(this.user.userId);
      console.log(this.seriesAvailable[index]);
      console.log(this.seriesAvailable[index].seriesId);
    }
  }

  onSeriesSelected(series: Series): void {
    this.searchSeries = series;
    this.listSeriesStartWith(series.name.charAt(0));
  }

  listSeriesStartWith(letter: string) {
    if(letter) {
      if(letter != this.previousLetter) {
        this.selectedLetter = letter;
        let filteredList: Series[] = [];
        if (letter === '0-9') {
          filteredList  = this.seriesAvailable.filter(series =>
            /^\d/.test(series.name)
          );
        } else {
          const uppercaseLetter = letter.toUpperCase();
          const lowercaseLetter = letter.toLowerCase();
          filteredList  = this.seriesAvailable.filter(series =>
            series.name.startsWith(uppercaseLetter) || series.name.startsWith(lowercaseLetter)
          );
        }
        this.listOfSeriesToShow = filteredList;
        this.previousLetter = letter;
      }
      else {
        this.selectedLetter = undefined;
        this.listOfSeriesToShow = this.seriesAvailable;
        this.previousLetter = "";
      }
    }
    else {
      this.listOfSeriesToShow = this.seriesAvailable;
    }
  }
}
