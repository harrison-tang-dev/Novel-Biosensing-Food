import mongoose from "mongoose";
import { sendMailfunction } from "../../utils/helpers/mailsender.js";


const otpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 10, // The document will be automatically deleted after 5 minutes of its creation time
  },
});



async function sendVerificationEmail(email, name, otp) {
  try {
    // Render the EJS template with the data
    const data = { name: name, otp: otp };
    await sendMailfunction("forgotpasswordotp", data, email, `Forgot Password OTP`);
    console.log("Email sent successful: ");
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.name, this.otp);
  }
  next();
});

const Otp = new mongoose.model("OTP", otpSchema);
export default Otp;
