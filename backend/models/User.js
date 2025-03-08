import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    username:{type:String,require:true, unique: true },
    email:{type:String,require:true},
    password:{type:String,require:true},
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipes" }],
});

export const User= mongoose.model("User", UserSchema);
