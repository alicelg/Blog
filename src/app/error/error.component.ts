import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  vez: number;

  constructor() {
    this.vez = Math.floor(Math.random() * 2) + 1
  }

  ngOnInit(): void {
  }

}
