// Initializes the `patient-pt` service on path `/patient-pt`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { PatientPt } from './patient-pt.class';
import createModel from '../../models/patient-pt.model';
import hooks from './patient-pt.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'patient-pt': PatientPt & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/patient-pt', new PatientPt(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('patient-pt');

  service.hooks(hooks);
}
