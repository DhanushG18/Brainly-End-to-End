import mongoose, { model, Schema } from "mongoose";
mongoose.connect("mongodb+srv://viktor2142315:bStjVGrijZD64c7h@cluster0.jqiky.mongodb.net/");
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});
export const UserModel = model("User", UserSchema);
//# sourceMappingURL=db.js.map