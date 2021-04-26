import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatSliderChange} from '@angular/material/slider';
import {FemurplanifView1Service} from '@app/ui/femur-planification-screen/femurplanif-view1/femurplanif-view1.service';
import {FemurMouvementService} from '@app/ui/femur-planification-screen/femur-pad/femur-mouvement.service';

@Component({
  selector: 'app-femurplanif-view1',
  templateUrl: './femurplanif-view1.component.html',
  styleUrls: ['./femurplanif-view1.component.scss']
})
export class FemurplanifView1Component implements OnInit, AfterViewInit, OnChanges {
  @Input() randomChange: number;
  @ViewChild('rendererFemurPlanificationFrontal', {static: true})
  public rendererFemurPlanificationFrontal: ElementRef<HTMLCanvasElement>;

  matSliderValue: any;
  femur: any;

  constructor(public femurplanifView1Service: FemurplanifView1Service, private mouvementService: FemurMouvementService) {
  }

  ngAfterViewInit(): void {
    this.femurplanifView1Service.createScene(this.rendererFemurPlanificationFrontal);
    this.femurplanifView1Service.animate();
    this.femurplanifView1Service.loadObject();

  }

  ngOnInit() {
    this.femurplanifView1Service.createScene(this.rendererFemurPlanificationFrontal);
    this.femurplanifView1Service.animate();

  }

  ngOnChanges() {
    this.femurplanifView1Service.resize();
  }

  clipOnY(s: MatSliderChange) {

    this.femurplanifView1Service.clipOnY(s)
  }

  home() {
    this.femurplanifView1Service.home();
  }

  displayStem() {
    this.femurplanifView1Service.displayStem();
  }

  display2D3D() {
    this.femurplanifView1Service.display2D3D();
  }

  leftFrontal() {
    this.mouvementService.leftFrontal();
  }

  rightFrontal() {
    this.mouvementService.rightFrontal();
  }

  rotateLeftFrontal() {
    this.mouvementService.rotateLeftFrontal();
  }

  rotateRightFrontal() {
    this.mouvementService.rotateRightFrontal();
  }
}
