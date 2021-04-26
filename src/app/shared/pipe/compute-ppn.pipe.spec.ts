import {ComputeIdCasePipe} from './compute-id-case.pipe';

describe('ComputePpnPipe', () => {
  it('create an instance', () => {
    const pipe = new ComputeIdCasePipe();
    expect(pipe).toBeTruthy();
  });
  it('Compute PPN one digit', () => {
    const pipe = new ComputeIdCasePipe();
    expect(pipe.transform('1')).toEqual('0001');
  });
  it('Compute PPN 2 digit', () => {
    const pipe = new ComputeIdCasePipe();
    expect(pipe.transform('22')).toEqual('0022');
  });
  it('Compute PPN 3 digit', () => {
    const pipe = new ComputeIdCasePipe();
    expect(pipe.transform('333')).toEqual('0333');
  });
  it('Compute PPN 4 digit', () => {
    const pipe = new ComputeIdCasePipe();
    expect(pipe.transform('4444')).toEqual('4444');
  });
  it('Compute PPN 5 digit', () => {
    const pipe = new ComputeIdCasePipe();
    expect(pipe.transform('55555')).toEqual('55555');
  });
});
