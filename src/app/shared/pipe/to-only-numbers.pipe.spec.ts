import { ToOnlyNumbersPipe } from './to-only-numbers.pipe';

describe('ToOnlyNumbersPipe', () => {
  it('create an instance', () => {
    const pipe = new ToOnlyNumbersPipe();
    expect(pipe).toBeTruthy();
  });
});
