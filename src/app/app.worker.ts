/// <reference lib="webworker" />

import {NiftiSlicer} from '@app/services/nii/nifti-slicer';

/*addEventListener('message', ({data}) => {
  const response = `worker response to ${data}`;
  console.log(response);
  postMessage(response);
});*/
let slicer;
addEventListener('message', (e) => {
  const message = e.data[0];
  const data = e.data[1];

  if (message === 'init') {
    // @ts-ignore
    slicer = new NiftiSlicer(data[0]);
    postMessage(['initialized', [slicer.dims, slicer.header]]);
  } else if (message === 'slice') {
    const array = slicer.slice(data[0], data[1]);
    // @ts-ignore
    postMessage(['sliced', [data[0], data[1], array]], [array.buffer]);
  }
}, false);
