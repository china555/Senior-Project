// Initializes the `patient` service on path `/patient`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Patient } from './patient.class';
import createModel from '../../models/patient.model';
import hooks from './patient.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'patient': Patient & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/patient', new Patient(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('patient');

  service.hooks(hooks);
}
