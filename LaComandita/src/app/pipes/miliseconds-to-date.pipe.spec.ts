import { MilisecondsToDatePipe } from './miliseconds-to-date.pipe';

describe('MilisecondsToDatePipe', () => {
  it('create an instance', () => {
    const pipe = new MilisecondsToDatePipe();
    expect(pipe).toBeTruthy();
  });
});
