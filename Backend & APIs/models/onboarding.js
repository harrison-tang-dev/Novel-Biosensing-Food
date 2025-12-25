import mongoose from "mongoose";


const onboardingSchema = new mongoose.Schema({
    step: { type: Number, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true }
  });
  
  const appsettingSchema = new mongoose.Schema({
    splashicon: { type: String },
    appicon: { type: String },
    applogo: { type: String },
    onboarding: { type: [onboardingSchema], default: [] } // Array of objects for onboarding
  });



export const onBoarding = new mongoose.model("onBoarding", appsettingSchema);

