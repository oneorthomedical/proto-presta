import {Component, OnInit} from '@angular/core';
import {StemService} from '@app/services/implant/stem.service';
import {FemurMouvementService} from "@app/ui/femur-planification-screen/femur-pad/femur-mouvement.service";
import {DataDisplayScreenService} from "@app/ui/display-screen/data-display-screen.service";
import {MathUtils} from "three";

@Component({
  selector: 'app-femur-pad',
  templateUrl: './femur-pad.component.html',
  styleUrls: ['./femur-pad.component.scss']
})
export class FemurPadComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name'];

  constructor(public stemService: StemService, private mouvementService: FemurMouvementService, public dataService: DataDisplayScreenService) {
  }

  ngOnInit(): void {

  }

  getStemAnteversion() {
    return Math.abs(MathUtils.radToDeg(this.dataService.data.stemAnteversion));
  }

  getSize() {
    return this.stemService.size.planification;
  }

  minusSize() {
    this.mouvementService.minusSize();
  }

  plusSize() {
    this.mouvementService.plusSize();
  }

  setVara() {
    this.mouvementService.setVara();
  }

  setStd() {
    this.mouvementService.setStd();
  }
}
