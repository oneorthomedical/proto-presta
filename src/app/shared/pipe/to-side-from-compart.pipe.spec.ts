import {ToSideFromCompartPipe} from './to-side-from-compart.pipe';

describe('ToSideFromCompartPipe', () => {
  it('create an instance', () => {
    const pipe = new ToSideFromCompartPipe();
    expect(pipe).toBeTruthy();
  });
  it('Right side external compartment return left', () => {
    const pipe = new ToSideFromCompartPipe();
    expect(pipe.transform('right', 'external')).toBe('left');
  });
  it('Right side internal compartment return right', () => {
    const pipe = new ToSideFromCompartPipe();
    expect(pipe.transform('right', 'internal')).toBe('right');
  });
  it('left side external compartment return right', () => {
    const pipe = new ToSideFromCompartPipe();
    expect(pipe.transform('left', 'external')).toBe('right');
  });
  it('left side internal compartment return left', () => {
    const pipe = new ToSideFromCompartPipe();
    expect(pipe.transform('left', 'internal')).toBe('left');
  });
});
