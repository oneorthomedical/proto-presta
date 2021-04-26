import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-femur-planification-screen',
  templateUrl: './femur-planification-screen.component.html',
  styleUrls: ['./femur-planification-screen.component.scss']
})
export class FemurPlanificationScreenComponent implements OnInit {
  randomNumber = Math.random();

  constructor() {
  }

  ngOnInit(): void {
  }

}
