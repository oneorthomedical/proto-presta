import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CotyleplanifView1Service} from '@app/ui/cotyle-planification-screen/cotyleplanif-view1/cotyleplanif-view1.service';
import {MatSliderChange} from '@angular/material/slider';
import {Utils} from '@app/services/class/Utils';
import {MathUtils} from 'three';
import {DataDisplayScreenService} from '@app/ui/display-screen/data-display-screen.service';
import {CupService} from '@app/services/implant/cup.service';

@Component({
  selector: 'app-cotyleplanif-view1',
  templateUrl: './cotyleplanif-view1.component.html',
  styleUrls: ['./cotyleplanif-view1.component.scss']
})
export class CotyleplanifView1Component implements OnInit, AfterViewInit, OnChanges {

  @Input() randomChange: number;
  @ViewChild('rendererCotylePlanificationFrontal', {static: true})
  public rendererCotylePlanificationFrontal: ElementRef<HTMLCanvasElement>;

  matSliderValue = this.cotyleplanifView1Service.valueClipY;
  pelvis: 'visible';
  cup: 'visible';
  display: any;
  private countPelvis = 0;
  private countCup = 0;
  cupInclinaison: any;
  plan: 'noVisible';
  countPlan = 1;
  maxClipOnY: any;

  constructor(public cotyleplanifView1Service: CotyleplanifView1Service, public dataDisplay: DataDisplayScreenService,
              public cupService: CupService) {
  }

  ngAfterViewInit(): void {
    this.cotyleplanifView1Service.createScene(this.rendererCotylePlanificationFrontal);
    this.cotyleplanifView1Service.animate();
    this.cotyleplanifView1Service.loadObject();
  }

  ngOnInit() {
    this.cotyleplanifView1Service.createScene(this.rendererCotylePlanificationFrontal);
    this.cotyleplanifView1Service.animate();

  }

  ngOnChanges() {
    this.cotyleplanifView1Service.resize();
  }

  clipOnY(s: MatSliderChange) {
  }

  displayPelvis() {
  }

  displayCup() {
  }

  display2D3D() {
  }

  home() {
  }

  cupY() {
  }

  displayPlan() {
  }
}
