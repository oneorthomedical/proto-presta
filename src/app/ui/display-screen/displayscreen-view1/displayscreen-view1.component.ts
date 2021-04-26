import {AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import {DisplayscreenView1Service} from "@app/ui/display-screen/displayscreen-view1/displayscreen-view1.service";

@Component({
  selector: 'app-displayscreen-view1',
  templateUrl: './displayscreen-view1.component.html',
  styleUrls: ['./displayscreen-view1.component.scss']
})
export class DisplayscreenView1Component implements AfterViewInit, OnChanges {
  @Input() randomChange: number;
  @ViewChild('rendererDisplayScreenView1', {static: true})
  public rendererDisplayScreenView1: ElementRef<HTMLCanvasElement>;


  constructor(private displayScreenView1: DisplayscreenView1Service) {
  }

  ngAfterViewInit(): void {
    this.displayScreenView1.createScene(this.rendererDisplayScreenView1);
    this.displayScreenView1.animate();
    this.displayScreenView1.loadObject();
  }

  ngOnChanges() {
    this.displayScreenView1.resize();
  }
}
