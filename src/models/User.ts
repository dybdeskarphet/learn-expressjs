import mg, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  username: string;
  password: string;
}

const userSchema = new mg.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// TODO: Define types here
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mg.model("User", userSchema);
export { User, IUser };
