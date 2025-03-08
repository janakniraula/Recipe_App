import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./Home.css";  

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies] = useCookies(["access_token"]);

    useEffect(() => {
        
        axios.get("http://localhost:3000/recipes/savedRecipes", {
            headers: { authorization: `Bearer ${cookies.access_token}` },
        })
        .then(response => setSavedRecipes(response.data))
        .catch(error => console.error("Error fetching saved recipes:", error));
    }, []);

   const unsaveRecipe = async (recipeId) => {
        try {
            const response = await axios.put(
                "http://localhost:3000/recipes/unsave",
                { recipeId },
                { headers: { authorization: `Bearer ${cookies.access_token}` } }
            );

            console.log(" Recipe unsaved:", response.data.savedRecipes);
            setSavedRecipes(response.data.savedRecipes || []); 
        } catch (error) {
            console.error("Error unsaving recipe!", error);
        }
    };

    return (
        <div className="home-page">
            <h1>Saved Recipes</h1>
            <div className="recipes-list">
                {savedRecipes.length === 0 ? (
                    <p>No saved recipes yet.</p>
                ) : (
                    savedRecipes.map((recipe) => (
                        <div className="recipe-card" key={recipe._id}>
                            <h2 className="recipe-name">{recipe.name}</h2>

                            <div className="recipe-content">
                                
                                <div className="image-container">
                                    <img 
                                        src={recipe.imageUrl || "https://via.placeholder.com/300"} 
                                        alt={recipe.name} 
                                        className="recipe-image" 
                                    />
                                </div>

                                
                                <div className="recipe-details">
                                    <p><strong>Description:</strong> {recipe.description}</p>
                                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                                    <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
                                </div>

                                
                                <div className="recipe-ingredients">
                                    <h4>Ingredients</h4>
                                    <ul>
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                          
                            <button 
                                className="save-btn saved" 
                                onClick={() => unsaveRecipe(recipe._id)}
                            >
                                Unsave Recipe
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
