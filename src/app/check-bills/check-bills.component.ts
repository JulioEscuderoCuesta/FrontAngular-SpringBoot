import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Bill, BillLine } from '../user-data';

export interface InformationOfBillLines {
  date: string;
  seriesName: string;
  seasonAndChapter: string;
  priceCharged: string;
}

@Component({
  selector: 'app-check-bills',
  templateUrl: './check-bills.component.html',
  styleUrls: ['./check-bills.component.css']
})


export class CheckBillsComponent implements OnInit {

  displayedColumns: string[] = ['date', 'seriesName', 'seasonAndChapter', 'priceCharged']
  bills : Bill[] = []
  billLines : BillLine[] = []
  informationOfBillLines: InformationOfBillLines[] = [];
  month!: number;
  year!: number;
  isLoading = true;
  
  constructor(private userService: UserService) {  }

  ngOnInit(): void {
    this.getBills();
  }

  getBills(): void {
    this.userService.searchBills().subscribe(bills => {
      this.bills = bills;
      this.billLines = bills[0].lines;
      for(let item of this.billLines) {
        let newInformationLine: InformationOfBillLines = {
          date: this.formatDate(item.visualizationDate),
          seriesName: item.seriesName,
          seasonAndChapter: item.seasonNumber + 'x0' + item.chapterNumber,
          priceCharged: item.charge + '€'
        }
        this.informationOfBillLines.push(newInformationLine);
      }
      this.isLoading = false;
    });
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
