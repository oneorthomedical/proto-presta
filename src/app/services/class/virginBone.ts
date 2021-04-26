import {ManagerService} from '../three/manager.service';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {Injectable} from '@angular/core';
import {ParentVirginObject} from '@app/services/class/parentVirginObject';
@Injectable({
  providedIn: 'root'
})
export class VirginBone extends ParentVirginObject {

  dir: string;
  state: string;
  addSimplifiee: string;

  /**
   * @param manager
   * @param dataSymfonyService
   */
  constructor(public manager: ManagerService, public dataSymfonyService: DataSymfonyService) {
    super(manager);
    this.dir = this.dataSymfonyService.getDirectory();
    this.addSimplifiee = this.dataSymfonyService.addSimplifiee();
  }
}
