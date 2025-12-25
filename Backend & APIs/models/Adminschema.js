import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import validator from "validator";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email:{
    type:String,
    required:true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email");
      }
    },
  },
  
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  disabled:{
    type:Boolean,
    default:false
  },
  roles:{
    type:String,
    enum: ["admin", "adminstaff"]
  },
  lastLogin: Date,

});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});


export const Admin = mongoose.model('Admins', UserSchema);
