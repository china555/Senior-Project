import app from '../../src/app';

describe('\'payment\' service', () => {
  it('registered the service', () => {
    const service = app.service('payment');
    expect(service).toBeTruthy();
  });
});
