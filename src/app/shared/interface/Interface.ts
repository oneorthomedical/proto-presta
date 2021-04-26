import {FemurHeadService} from '@app/services/bone/femur-head.service';
import {FemurCutService} from '@app/services/bone/femur-cut.service';


export interface Cut {
  preplanification: any;
  planification: any;
}

export interface IClickBox {
  position: [number, number, number];
  size: [number, number, number];
  cameraAngle: [number, number];
}

export interface ImplantParams {
  size: number | string;
  range: string;
  position: { x: number, y: number, z: number };
  rotation?: { x: number, y: number, z: number };
}

export interface Params {
  cut: {
    tibial_cut: number,
    sagittal_cut: number,
    tibial_slope: number,
    varus: number,
    sagittal_angle: number,
    femoral_cut: number,
    bind_cut: boolean,
    insert_thickness: number,
    tibia_resection: number,
    femur_resection: number
  };
  cup: {
    size: number,
    range: string,
    position: { x: number, y: number, z: number },
  };
  stem: {
    size: number,
    range: string,
    position: { x: number, y: number, z: number }
  };
  head: {
    size: number,
    range: string,
    position: { x: number, y: number, z: number }
  };
}

export interface Hka {
  distalDistance: number;
  notRealigned: number;
  realigned: number;
  planned: number;
}

export interface IRendererOptions {
  antialias: boolean;
  clearColor: number;
  sortObjects: boolean;
}

export interface StateVisibility {
  currentValue: string;
  previousValue: string;
}

export interface FemurService {
  cut: FemurCutService;
  head?: FemurHeadService;
}
