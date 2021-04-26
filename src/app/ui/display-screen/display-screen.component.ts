import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {DataDisplayScreenService} from '@app/ui/display-screen/data-display-screen.service';

@Component({
  selector: 'app-display-screen',
  templateUrl: './display-screen.component.html',
  styleUrls: ['./display-screen.component.scss']
})
export class DisplayScreenComponent implements OnInit, OnDestroy {
  randomNumber = Math.random();

  constructor(public dataDisplay: DataDisplayScreenService) {
  }

  ngOnInit(): void {
    console.log('here')
  }
  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('Items destroyed');
  }
}
