import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user-data';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
      this.getUser();
  }

  getUser(): void {
    this.userService.getUser().subscribe(user => {this.user = user
      this.user.pendingSeries = this.user.pendingSeries.sort((a,b) => a.name.localeCompare(b.name))
      this.user.finishedSeries = this.user.finishedSeries.sort((a,b) => a.name.localeCompare(b.name))
      this.user.startedSeries = this.user.startedSeries.sort((a,b) => a.name.localeCompare(b.name))
    });
  }

}
