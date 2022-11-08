import mongoose from "mongoose";
import { Datasource } from "./IDataSource";

export class MongoDbDatasource implements Datasource {
  constructor() {
    mongoose.set("debug", true);
  }

  connect(): void {
    const dbUrl = process.env.DATASOURCE_URL;

    if (dbUrl) {
      mongoose.connect(dbUrl, {
        user: process.env.DATASOURCE_USER,
        pass: process.env.DATASOURCE_PASSWORD,
        dbName: process.env.DATASOURCE_DB_NAME,
      });

      /*   mongoose.connection.on("error",); */
    } else {
      throw new Error("Datasource url not specified");
    }
  }
}
