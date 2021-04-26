import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {ToIdCasePipe} from '../shared/pipe/to-id-case.pipe';

@Injectable({
  providedIn: 'root'
})
export class DataSymfonyService {
  data = {
    intervention: {
      // @Input
      side: 'right',
      // @Input
      ds: 'DS001',
      /**
       *  state : 'created' 'opened' 'wip' 'closed'
       */
      state: 'opened',
      // @input initialisation false
      assembly : false
    },
    patient: {
      // @Input
      name: 'Houssam Karrach',
      // @Input
      birthDate: '10-07-1990',
    },
    // @Input
    path: {
      toWorkflow: 'url',
      toValidate: '/planning/validate',
      toPrelanning: 'url',
      toObjectDirectory: 'assets/hip/scene/DSH009',
      toInterventionSummary: 'url'
    },
    // @Input preplanification
    nii: {
      path: 'pathToNiiFile',
      rotations: {
        horizontalisation: 2.77,
        frontalisation: -0.466
      },
      translations: {
        x: 11.90,
        y: 10.928,
        z: 140.55
      }
    },
    preplanning: {
      // @Input initialisation à 0
      general: {
        pelvisHeight: 0,
        femurHeight: 0,
        ankleHeight: 0,
        offset: 0,
        length: 0,
      },
      femur: {
        // @Input preplanification
        headRadius: 19.8,
        // @Input initialisation à 0
        offset: 0,
        boneCCD: 0,
        boneAnteversion: 0,
        m3: 0,
        m2: 0,
        m1: 0,
      },
      acetabulum: {
        // @Input preplanification
        headRadius: 22.67,
        // @Input initialisation à 0
        cotyleInclinaison: 0,
        cotyleAnteversion: 0,
      },
      head: {
        // @Input initialisation à 0mm
        size: '0mm',
        // @Input initialisation à Cocr - D28mm' à puis ça sera une préference
        range: 'Cocr - D28mm',
        // @Input initialisation 0
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0}
      },
      cup: {
        // @Input initialisation à headRadius: 22.67 (fixed to 0,) * 2  + 2 fixed to 0,
        size: 46,
        // @Input initialisation à Delta puis ça sera une préference
        range: 'delta',
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0}
      },
      stem: {
        // @Input initialisation à 4
        size: 4,
        // @Input initialisation à STD puis ça sera une préference
        range: 'std',
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0}
      },
    },
    planning: {
      // @Input initialisation à 0
      general: {
        pelvisHeight: 0,
        femurHeight: 0,
        ankleHeight: 0,
        offset: 0,
        length: 0,
      },
      femur: {
        // @Input preplanification
        headRadius: 19.8,
        // @Input initialisation à 0
        offset: 0,
        boneCCD: 0,
        boneAnteversion: 0,
        m3: 0,
        m2: 0,
        m1: 0,
      },
      acetabulum: {
        // @Input preplanification
        headRadius: 22.67,
        // @Input initialisation à 0
        cotyleInclinaison: 0,
        cotyleAnteversion: 0,
      },
      head: {
        // @Input initialisation à 0mm
        size: '0mm',
        // @Input initialisation à Cocr - D28mm'
        range: 'Cocr - D28mm',
        // @Input initialisation 0
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0}
      },
      cup: {
        // @Input initialisation à headRadius: 22.67 (fixed to 0,) * 2  + 2 fixed to 0,
        size: 46,
        // @Input initialisation à Delta puis ça sera une préference
        range: 'delta',
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0}
      },
      stem: {
        // @Input initialisation à 4
        size: 4,
        // @Input initialisation à STD puis ça sera une préference
        range: 'std',
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0}
      },
    },
  };
  dataUser = {
    user: {
      firstName: 'Toto',
      lastName: 'coucou',
      role: 'surgeon',
      lang: 'en'
    },
  };

  constructor() {
    if (this.getEnvironment()) {
      this.data = this.getData();
      this.dataUser = this.getDataUser();
    }
  }

  getEnvironment() {
    return environment.production && this.getData() !== null && this.getDataUser() !== null;
  }

  addSimplifiee() {
    return this.getEnvironment() ? '_simplifiee' : '';
  }

  getPatientData() {
    return this.data.patient;
  }

  getData() {
    return JSON.parse((sessionStorage.getItem('JSonResponse')));
  }

  getDataUser() {
    return JSON.parse((sessionStorage.getItem('JSonUser')));
  }

  getIntervetion() {
    return this.data.intervention;
  }

  getDS() {
    return new ToIdCasePipe().transform(this.data.intervention.ds);
  }

  getDirectory() {
    return this.data.path.toObjectDirectory;
  }

  getPlanification() {
    return this.data.planning;
  }

  getPreplanification() {
    return this.data.preplanning;
  }

  getState() {
    return this.data.intervention.state;
  }

  getRole() {
    return this.dataUser.user.role;
  }

  isSurgeon() {
    return this.getRole() === 'surgeon';
  }

  isCreated() {
    return this.getState() === 'created';
  }

  isClosed() {
    return this.getState() === 'closed';
  }

  getSide() {
    return this.data.intervention.side;
  }

  getRealSide() {
    return this.data.intervention.side;
  }

  getCup(state: string) {
    return (state === 'opened' || state === 'created') ? this.data.preplanning.cup : this.data.planning.cup;
  }

  getHead(state: string) {
    return (state === 'opened' || state === 'created') ? this.data.preplanning.head : this.data.planning.head;
  }

  getStem(state: string) {
    return (state === 'opened' || state === 'created') ? this.data.preplanning.stem : this.data.planning.stem;
  }

  isAssembly() {
    return this.data.intervention.assembly;
  }

  setAssembly(state: boolean) {
    this.data.intervention.assembly = state;
  }

  getHorizontalisation(): number {
    return this.data.nii.rotations.horizontalisation;
  }

  getFrontalisation(): number {
    return this.data.nii.rotations.frontalisation;
  }

  getTranslation(): { x, y, z } {
    return this.data.nii.translations;
  }
}
