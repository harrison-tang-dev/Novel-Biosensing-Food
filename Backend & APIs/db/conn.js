import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { initModels } from "../models/index.js";
import { createAdminFixtures } from "../utils/fixtures/Admindata.js";

export let bucket;
export let db;
let connected = false;
const isDev = process.env.NODE_ENV === "development";
let seconds = 1;


export const connect = (URL) => {
  if (connected && isDev) return;
  mongoose.set("strictQuery", false);
  mongoose.connect(URL,{ minPoolSize:2 }).catch((e) => {
    console.log(e);
    connected = false;
    setTimeout(() => {
      connect(URL);
      seconds = seconds + 1;
    }, seconds * 1000);
  });

  if (!db) {
    db = mongoose.connection;
  }

  db.once("open", () => {
    connected = true;
    console.info("Connected to db");
    // bucket = new GridFSBucket(db, { bucketName: 'images' });
    initModels();

    console.info({ isDev }, "development mode", process.env.NODE_ENV);
    if (!isDev) {
    //   //TODO Call this function to create admin roles
      createAdminFixtures();
    }
  });
};
