import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
