import bcrypt from "bcryptjs";
import mongoose, { Document, Schema, Types, CallbackError } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePic:string;
  createdAt: Date;
  updatedAt: Date;
  payment: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    role: { type: String, enum: ["student", "mentor"], required: true },
    profilePic: {type: String, default:""},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    payment: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

userSchema.methods.matchPassword = async function (
  this: IUser,
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
