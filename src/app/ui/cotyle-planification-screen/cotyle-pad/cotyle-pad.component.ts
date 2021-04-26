import {Component, OnInit} from '@angular/core';
import {CupService} from '@app/services/implant/cup.service';
import {MathUtils} from 'three';
import {Utils} from '@app/services/class/Utils';
import {CotyleplanifView2Service} from '@app/ui/cotyle-planification-screen/cotyleplanif-view2/cotyleplanif-view2.service';
import {DataDisplayScreenService} from '@app/ui/display-screen/data-display-screen.service';


@Component({
  selector: 'app-cotyle-pad',
  templateUrl: './cotyle-pad.component.html',
  styleUrls: ['./cotyle-pad.component.scss']
})
export class CotylePadComponent implements OnInit {

  constructor(public cupService: CupService, private cotylePlanifView2Service: CotyleplanifView2Service,
              public dataDisplay: DataDisplayScreenService) {
  }

  cupInclinaison: any
  cupAnterversion: any

  ngOnInit(): void {
  }

  updateView2() {
    Utils.getMeshByName(this.cotylePlanifView2Service.scene, 'Cup')
      .position.copy(this.cupService.mesh.position);
    console.log('cup position',this.cupService.mesh.position)
    Utils.getMeshByName(this.cotylePlanifView2Service.scene, 'Cup')
      .rotation.copy(this.cupService.mesh.rotation);
  }



  updateCupSizeView2() {
    Utils.getMeshByName(this.cotylePlanifView2Service.scene, 'Cup').geometry = this.cupService.mesh.geometry;
  }


  upCup() {
    this.cupService.mesh.position.z += 1;
    console.log('cup position', this.cupService.mesh )
    this.updateView2();

    this.cupService.save();
  }

  downCup() {
    this.cupService.mesh.position.z -= 1;
    this.updateView2();

    this.cupService.save();
  }

  upCupSize() {
    this.cupService.setSize(this.cupService.size.planification + 2);
    this.cupService.setGeometry().subscribe(() => {
      this.updateCupSizeView2();

    });
    this.cupService.save();
  }

  downCupSize() {
    this.cupService.setSize(this.cupService.size.planification - 2);
    this.cupService.setGeometry().subscribe(() => {
      this.updateCupSizeView2();

    });
    this.cupService.save();
  }

  backCup() {
    this.cupService.mesh.position.x += 1;
    this.updateView2();
    this.cupService.save();
  }

  forwardCup() {
    this.cupService.mesh.position.x -= 1;
    this.updateView2();
    this.cupService.save();
  }

  inclinaisonRightCup() {
    this.cupService.mesh.rotation.y -= MathUtils.degToRad(1);
    this.updateView2();
    this.cupService.save();
  }

  inclinaisonLeftCup() {
    this.cupService.mesh.rotation.y += MathUtils.degToRad(1);
    this.updateView2();
    this.cupService.save();
  }

  anteversionRightCup() {
    this.cupService.mesh.rotation.z += MathUtils.degToRad(1);
    this.updateView2();
    this.cupService.save();
  }
  anteversionLeftCup() {
    this.cupService.mesh.rotation.z -= MathUtils.degToRad(1);
    this.updateView2();
    this.cupService.save();
  }

  cupY() {
    if (this.cupService.mesh === undefined) {
      return this.cupInclinaison = this.dataDisplay.data.cotyleInclinaison;
    } else {
      return this.cupInclinaison = MathUtils.radToDeg(this.cupService.mesh.rotation.y).toFixed(0)
    }
  }

  cupZ() {
    if (this.cupService.mesh === undefined) {
      return this.cupAnterversion = 90 - this.dataDisplay.data.cotyleAnteversion;
    } else {
      // tslint:disable-next-line:radix
      return this.cupAnterversion = 90 + parseInt(MathUtils.radToDeg(this.cupService.mesh.rotation.z).toFixed(0));
    }
  }
}
