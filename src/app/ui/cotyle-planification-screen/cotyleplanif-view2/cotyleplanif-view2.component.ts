import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CotyleplanifView1Service} from '@app/ui/cotyle-planification-screen/cotyleplanif-view1/cotyleplanif-view1.service';
import {CotyleplanifView2Service} from '@app/ui/cotyle-planification-screen/cotyleplanif-view2/cotyleplanif-view2.service';
import {Utils} from '@app/services/class/Utils';
import html2canvas from "html2canvas";

@Component({
  selector: 'app-cotyleplanif-view2',
  templateUrl: './cotyleplanif-view2.component.html',
  styleUrls: ['./cotyleplanif-view2.component.scss']
})
export class CotyleplanifView2Component implements OnInit, AfterViewInit, OnChanges {

  @Input() randomChange: number;
  @ViewChild('rendererCotylePlanification', {static: true})
  public rendererCotylePlanification: ElementRef<HTMLCanvasElement>;
  private countPelvis = 1;
  public pelvis = 'transparency';
  private countCup = 0;
  public cup = 'visible';

  constructor(private cotyleplanifView2Service: CotyleplanifView2Service) {
  }

  ngAfterViewInit(): void {
    this.cotyleplanifView2Service.createScene(this.rendererCotylePlanification);
    this.cotyleplanifView2Service.animate();
    this.cotyleplanifView2Service.loadObject();
  }

  ngOnInit() {
    this.cotyleplanifView2Service.createScene(this.rendererCotylePlanification);
    this.cotyleplanifView2Service.animate();

  }

  ngOnChanges() {
    this.cotyleplanifView2Service.resize();
  }

  displayPelvis() {
    this.countPelvis++;
    this.pelvis = Utils.displayShader(this.countPelvis, this.pelvis, 'pelvis', this.cotyleplanifView2Service.scene);
    if (this.countPelvis === 3) this.countPelvis = 0;
  }

  displayCup() {
    this.countCup++;
    this.cup = Utils.display(this.countCup, this.cup, 'Cup', this.cotyleplanifView2Service.scene);
    if (this.countCup === 3) this.countCup = 0;
  }

  home() {
    this.cotyleplanifView2Service.home();
  }

  screen() {
    html2canvas(document.getElementById('rendererCotylePlanification')).then((canvas) => {
      document.body.appendChild(canvas);
      var dataURL = canvas.toDataURL();
      console.log('image1', dataURL);
    });
  }
}
