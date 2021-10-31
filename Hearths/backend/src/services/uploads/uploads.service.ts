// Initializes the `uploads` service on path `/uploads`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { Uploads } from "./uploads.class";
import hooks from "./uploads.hooks";

import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "public/uploads"), // where the files are being stored
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // getting the file name
});

const upload = multer({
  storage,
  limits: {
    fieldSize: 1e8, // Max field value size in bytes, here it's 100MB
    fileSize: 1e7, //  The max file size in bytes, here it's 10MB
    // files: the number of files
    // READ MORE https://www.npmjs.com/package/multer#limits
  },
});

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    uploads: Uploads & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use(
    "/uploads",
    upload.array("files"),
    (req: any, _res: any, next: any) => {
      const { method } = req;
      if (method === "POST" || method === "PATCH") {
        // I believe this middleware should only transfer
        // files to feathers and call next();
        // and the mapping of data to the model shape
        // should be in a hook.
        // this code is only for this demo.
        req.feathers.files = req.files; // transfer the received files to feathers
        // for transforming the request to the model shape
        const body = [];
        for (const file of req.files)
          body.push({
            description: req.body.description,
            orignalName: file.originalname,
            newNameWithPath: file.path,
          });
        req.body = method === "POST" ? body : body[0];
        _res.send(body);
      }
      next();
    }
  );

  // Get our initialized service so that we can register hooks
  // const service = app.service("uploads");

  // service.hooks(hooks);
}
