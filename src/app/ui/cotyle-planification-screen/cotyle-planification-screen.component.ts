import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cotyle-planification-screen',
  templateUrl: './cotyle-planification-screen.component.html',
  styleUrls: ['./cotyle-planification-screen.component.scss']
})
export class CotylePlanificationScreenComponent implements OnInit {
  randomNumber = Math.random();
  constructor() { }

  ngOnInit(): void {
  }
}
