import { Application } from '../declarations';
import patient from './patient/patient.service';
import payment from './payment/payment.service';
import uploads from './uploads/uploads.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(patient);
  app.configure(payment);
  app.configure(uploads);
}
