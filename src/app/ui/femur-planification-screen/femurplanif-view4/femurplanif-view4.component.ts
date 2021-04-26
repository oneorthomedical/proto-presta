import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FemurplanifView4Service} from '@app/ui/femur-planification-screen/femurplanif-view4/femurplanif-view4.service';
import {Utils} from '@app/services/class/Utils';

@Component({
  selector: 'app-femurplanif-view4',
  templateUrl: './femurplanif-view4.component.html',
  styleUrls: ['./femurplanif-view4.component.scss']
})
export class FemurplanifView4Component implements OnInit, AfterViewInit, OnChanges {
  @Input() randomChange: number;
  @ViewChild('rendererFemurPlanification', {static: true})
  public rendererFemurPlanification: ElementRef<HTMLCanvasElement>;

  femur: 'transparency';
  countFemur = 1;
  stem: 'visible';
  countStem = 0;

  constructor(public femurplanifView4Service: FemurplanifView4Service) {
  }

  ngAfterViewInit(): void {
    this.femurplanifView4Service.createScene(this.rendererFemurPlanification);
    this.femurplanifView4Service.animate();
    this.femurplanifView4Service.loadObject();

  }

  ngOnInit() {
    this.femurplanifView4Service.createScene(this.rendererFemurPlanification);
    this.femurplanifView4Service.animate();

  }

  ngOnChanges() {
    this.femurplanifView4Service.resize();
  }

  home() {
    this.femurplanifView4Service.home();
  }

  displayFemur() {
    this.countFemur++;
    this.femur = Utils.displayShader(this.countFemur, this.femur, `femur_cut-${this.femurplanifView4Service.side}`, this.femurplanifView4Service.scene);
    if (this.countFemur === 3) this.countFemur = 0;
  }

  displayStem() {
    this.countStem++;
    this.stem = Utils.display(this.countStem, this.stem, 'Stem', this.femurplanifView4Service.scene);
    if (this.countStem === 3) this.countStem = 0;
  }
}
