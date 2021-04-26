import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {DisplayscreenView2Service} from '@app/ui/display-screen/displayscreen-view2/displayscreen-view2.service';
import {Utils} from "@app/services/class/Utils";
import {AlwaysDepth, NeverDepth} from "three";

@Component({
  selector: 'app-displayscreen-view2',
  templateUrl: './displayscreen-view2.component.html',
  styleUrls: ['./displayscreen-view2.component.scss']
})
export class DisplayscreenView2Component implements OnInit, OnChanges, AfterViewInit {

  @Input() randomChange: number;
  @ViewChild('rendererDisplayScreenView2', {static: true})
  public rendererDisplayScreenView2: ElementRef<HTMLCanvasElement>;
  femurRight = 'visible'
  pelvis = 'visible'
  femurLeft = 'visible'
  plan: 'transparency';
  countPelvis = 0;
  countFemurRight = 0;
  countFemurLeft = 0;
  countPlan = 1;

  constructor(private displayScreenView2: DisplayscreenView2Service) {
  }

  ngOnInit() {
    this.displayScreenView2.createScene(this.rendererDisplayScreenView2);
    this.displayScreenView2.animate();
  }

  ngAfterViewInit(): void {
    this.displayScreenView2.createScene(this.rendererDisplayScreenView2);
    this.displayScreenView2.animate();
    this.displayScreenView2.loadObject();
  }

  ngOnChanges() {
    this.displayScreenView2.resize();
  }

  home() {
    this.displayScreenView2.home()
  }

  displayPelvis() {
    this.countPelvis++;
    this.pelvis = Utils.display(this.countPelvis, this.pelvis, 'pelvis', this.displayScreenView2.scene);
     Utils.display(this.countPelvis, this.pelvis, 'coccyx', this.displayScreenView2.scene);
    if (this.countPelvis === 3) this.countPelvis = 0;
  }

  displayFemurRight() {
    this.countFemurRight++;
    this.femurRight = Utils.display(this.countFemurRight, this.femurRight, 'femur-right', this.displayScreenView2.scene);
    if (this.countFemurRight === 3) this.countFemurRight = 0;
  }

  displayFemurLeft() {
    this.countFemurLeft++;
    this.femurLeft = Utils.display(this.countFemurLeft, this.femurLeft, 'femur-left', this.displayScreenView2.scene);
    if (this.countFemurLeft === 3) this.countFemurLeft = 0;
  }

  displayPlan() {
    this.countPlan++;
    this.plan = Utils.display(this.countPlan, this.plan, 'plan', this.displayScreenView2.scene);
    if (this.countPlan === 3) this.countPlan = 0;
  }
}
