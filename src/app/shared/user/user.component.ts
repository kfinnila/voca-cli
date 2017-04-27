import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username: string;
  isSetting: boolean = false;

  constructor() { }

  ngOnInit() {
    this.username = localStorage.username;
    console.log("username: ", this.username);
    if (this.username == null) {
      this.username = 'Anónimo';
      localStorage.setItem('username', this.username);
    }
  }

  showUsername() {
    this.isSetting = true;
  }

  setUsername() {
    localStorage.setItem('username', this.username);
    this.isSetting = false;
  }
}
