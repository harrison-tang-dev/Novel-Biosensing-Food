import mongoose from "mongoose";


const secrets = new mongoose.Schema({
  adminemail: {
    type: String,
  },
  appicon: {type: String},
  applogo: {type: String},
  adminphonenumber: {type: String},
  GeminiClientKeys: {type: String},
  GeminiClientSecret: {type: String},
  FBClientkeys: {type: String},
  FBClientSecret: {type: String},
  AppleClientKeys: {type: String},
  AppleClientSecret: {type: String},
  GoogleClientSecretKeys: {type: String},
  GoogleClientKeys: {type: String},
  PushNotificationclientkeys: {type: String},
  PushNotificationclientsecret: {type: String},
});



export const AppSecrets = new mongoose.model("AppSecrets", secrets);
