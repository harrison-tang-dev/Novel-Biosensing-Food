import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    profileurl: { type: String },
    countryCode: { type: String },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
    blockuser: {
      type: Array,
      default: [],
    },

    notificationsStatus: {
      type: Boolean,
      default: true,
      required: false,
    },
    phonenumber: {
      type: String,
    },
    dob: { type: String },
    postcode: { type: String },
    aboutme: { type: String },
    bmi: { type: Object },
    age: { type: Number },
    allergies: { type: Array },
    gender: { type: String },
    health_conditions: { type: String },
    lastLogin: Date,
    weight: { type: String },
    Unit: { type: String },
    ft: { type: String },
    In: { type: String },
    Unit2: { type: String },
    others: { type: String },
    roles: {
      type: String,
      enum: ["admin", "user"],
    },
    approvedStatus: { type: Boolean, default: true },
    isEmailValidated: { type: Boolean, default: false },
    termsconditions: { type: Boolean, default: false },
    refreshtoken: [{ type: String }],
  },
  { timestamps: true }
);

// hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    // this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// Post-save error handler for duplicate email or phonenumber
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.keyPattern.email) {
      next(new Error("Email is already in use"));
    } else if (error.keyPattern.phonenumber) {
      next();
    }
  } else {
    next();
  }
});

// createing model
export const userdb = new mongoose.model("Users", userSchema);

const GoogluserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    profileurl: { type: String },
    countryCode: { type: String },

    password: {
      type: String,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
    blockuser: {
      type: Array,
      default: [],
    },

    notificationsStatus: {
      type: Boolean,
      default: true,
      required: false,
    },
    phonenumber: {
      type: String,
    },
    dob: { type: String },
    postcode: { type: String },
    aboutme: { type: String },
    bmi: { type: Object },
    age: { type: Number },
    allergies: { type: Array },
    gender: { type: String },
    health_conditions: { type: String },
    lastLogin: Date,
    weight: { type: String },
    Unit: { type: String },
    ft: { type: String },
    In: { type: String },
    Unit2: { type: String },
    others: { type: String },
    roles: {
      type: String,
      enum: ["admin", "user"],
    },
    approvedStatus: { type: Boolean, default: false },
    isEmailValidated: { type: Boolean, default: false },
    termsconditions: { type: Boolean, default: false },
    refreshtoken: [{ type: String }],
  },
  { timestamps: true }
);

// hash password
GoogluserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 12);
  }
  next();
});

// Post-save error handler for duplicate email or phonenumber
GoogluserSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.keyPattern.email) {
      next(new Error("Email is already in use"));
    } else if (error.keyPattern.phonenumber) {
      next();
    }
  } else {
    next();
  }
});

// createing model
export const Gusers = new mongoose.model("GoogleUsers", GoogluserSchema);
