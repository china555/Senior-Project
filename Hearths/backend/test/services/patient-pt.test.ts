import app from '../../src/app';

describe('\'patient-pt\' service', () => {
  it('registered the service', () => {
    const service = app.service('patient-pt');
    expect(service).toBeTruthy();
  });
});
