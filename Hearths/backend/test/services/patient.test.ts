import app from '../../src/app';

describe('\'patient\' service', () => {
  it('registered the service', () => {
    const service = app.service('patient');
    expect(service).toBeTruthy();
  });
});
