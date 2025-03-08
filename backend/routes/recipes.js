import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { User } from "../models/User.js"; 
import { verifyToken } from "./authRoutes.js"; 

const router = express.Router();

// Route: Create a New Recipe
router.post("/", verifyToken, async (req, res) => {
    try {
        const recipe = new RecipesModel({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            imageUrl: req.body.imageUrl,
            cookingTime: req.body.cookingTime,
            userOwner: req.user.id  // ✅ Assign user from token, not frontend
        });

        const savedRecipe = await recipe.save();
        res.status(201).json(savedRecipe);
    } catch (err) {
        res.status(500).json({ message: "Failed to save recipe", error: err.message });
    }
});

// Route: Fetch All Recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await RecipesModel.find({});
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching recipes", error: err.message });
    }
});

// Route: Save a Recipe for a User
router.put("/", verifyToken, async (req, res) => {
    try {
        const { recipeId } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.savedRecipes.includes(recipeId)) {
            user.savedRecipes.push(recipeId);
            await user.save();
        }

        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.status(500).json({ message: "Error saving recipe", error: err.message });
    }
});

// Route: Get Saved Recipe IDs for a User
router.get("/savedRecipes/ids", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ savedRecipes: user.savedRecipes || [] });
    } catch (err) {
        res.status(500).json({ message: "Error fetching saved recipes", error: err.message });
    }
});

// Route: Get Full Saved Recipes
router.get("/savedRecipes", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const savedRecipes = await RecipesModel.find({
            _id: { $in: user.savedRecipes },
        });
        res.json(savedRecipes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching saved recipes", error: err.message });
    }
});

router.put("/unsave", verifyToken, async (req, res) => {
  try {
      const { recipeId } = req.body;
      const userId = req.user.id; // 

      console.log(` User ${userId} is unsaving recipe ${recipeId}`); 

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Remove recipe from saved list
      user.savedRecipes = user.savedRecipes.filter(id => id.toString() !== recipeId);
      await user.save();

      res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
      console.error(" Error unsaving recipe:", err);
      res.status(500).json({ message: "Error unsaving recipe", error: err.message });
  }
});


export { router as recipesRouter };
