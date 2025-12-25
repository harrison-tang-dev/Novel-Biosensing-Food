import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { sendMailfunction } from "../../utils/helpers/mailsender.js";

const MemberSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email");
      }
    },
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  phonenumber: {
  type: String,
  },
  countryCode:{type: String},
  roles: {
    type: String,
    default: 'familymember',
  },
  relationship:{type: String},
  profileurl:{type: String},
  refreshtoken:[{type:String}]
},{
  timestamps:true
});

MemberSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    // this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// Post-save error handler for duplicate email or phonenumber
MemberSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.keyPattern.email) {
      next(new Error("Email is already in use"));
    } else if (error.keyPattern.phonenumber) {
      next(new Error("Phone number is already in use"));
    } else {
      next(error);
    }
  } else {
    next(error);
  }
});

export const Members = new mongoose.model("UserMembers", MemberSchema);

