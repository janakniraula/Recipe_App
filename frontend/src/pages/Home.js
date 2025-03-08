import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./Home.css";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate(); 
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies] = useCookies(["access_token"]);

    useEffect(() => {
        // Fetch all recipes
        axios.get("https://recipe-sharing-react-app.onrender.com/recipes")
            .then((response) => {
                setRecipes(response.data);
            })
            .catch((error) => {
                console.error("Error fetching recipes!", error);
            });

        // Fetch saved recipes if user is logged in
        if (cookies.access_token) {
            axios.get("https://recipe-sharing-react-app.onrender.com/recipes/savedRecipes/ids", {
                headers: { authorization: `Bearer ${cookies.access_token}` },
            })
            .then((response) => {
                setSavedRecipes(response.data.savedRecipes || []);
            })
            .catch((error) => {
                console.error("Error fetching saved recipes!", error);
            });
        }
    }, [cookies.access_token]);

    // Function to save a recipe
    const saveRecipe = async (recipeId) => {
      try {
          console.log("Token being sent:", cookies.access_token); // Debugging log
  
          const response = await axios.put(
              "https://recipe-sharing-react-app.onrender.com/recipes",
              { recipeId },
              { headers: { authorization: `Bearer ${cookies.access_token}` } }
          );
  
          console.log("Recipe saved successfully:", response.data);
          setSavedRecipes([...savedRecipes, recipeId]);
      } catch (error) {
          console.error("Error saving recipe!", error);
      }
  };

  const unsaveRecipe = async (recipeId) => {
    try {
        const response = await axios.put(
            "https://recipe-sharing-react-app.onrender.com/recipes/unsave",
            { recipeId },
            { headers: { authorization: `Bearer ${cookies.access_token}` } }
        );
        setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
        console.error("Error unsaving recipe!", error);
    }
};
  

    return (
        <div className="home-page">
            <h1>Recipes</h1>
            <div className="recipes-list">
                {recipes.map((recipe) => (
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

                        {/* Save Recipe Button */}
                        
                            <button className={`save-btn ${savedRecipes.includes(recipe._id) ? "saved" : ""}`}
                            onClick={() => { if (!cookies.access_token) {
                                alert("You must register first to save recipes!"); 
                                navigate("/register"); 
                            } else {
                                savedRecipes.includes(recipe._id) ? unsaveRecipe(recipe._id) : saveRecipe(recipe._id);
                            }}}
                            >
                                {savedRecipes.includes(recipe._id) ? "Unsave Recipe" : "Save Recipe"}
                            </button>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};
