// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from "sequelize";
import { Application } from "../declarations";
import { HookReturn } from "sequelize/types/lib/hooks";

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const payment = sequelizeClient.define(
    "payment",
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCount(options: any): HookReturn {
          options.raw = true;
        },
      },
    }
  );

  (payment as any).associate = function (models: any): void {
    console.log("models", models);
    models.patient.belongsTo(models.payment, { as: "patient" });
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return payment;
}
