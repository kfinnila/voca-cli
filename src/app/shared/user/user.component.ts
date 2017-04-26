import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userName: string;

  constructor() { }

  ngOnInit() {
    this.userName = localStorage.userName;
    console.log("userName: ", this.userName);
    if (this.userName == null) {
      this.userName = 'Anónimo';
      localStorage.setItem('userName', this.userName);
    }
  }

}
