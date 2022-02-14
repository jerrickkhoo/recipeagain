import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRecipe = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      name: e.target.name.value,
      description: e.target.description.value,
      ingredients: [
        {
          quantity: e.target.quantity.value,
          units: e.target.units.value,
          name: e.target.ingName.value,
          type: e.target.type.value,
        },
      ],
      steps: [e.target.steps.value],
      image: e.target.img.value,
      servings: e.target.servings.value,
      duration: e.target.duration.value,
      tags: [e.target.tags.value],
    };
    await axios.post("/api/recipes/new", newRecipe);
    alert("Recipe created.");
    navigate('/');
  };

  return (
    <div>
      <div className="login" style={{ padding: "100px" }}>
        <h2>New Recipe</h2>
        <form class="ui form" onSubmit={handleSubmit}>
          <div class="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" />
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe your recipe"
            ></textarea>
            <label>Ingredients</label>
            <label>Name</label>
            <input type="text" name="ingName" placeholder="Name" />
            <label>Units</label>
            <input
              type="text"
              name="units"
              placeholder="eg. litres/grams"
            />
            <label>Quantity</label>
            <input
              type="text"
              name="quantity"
              placeholder="eg. 3"
            />
            <label>Type</label>
            <input
              type="text"
              name="type"
              placeholder="eg. fruit/meat"
            />
            <label>Steps</label>
            <textarea name="steps" placeholder="Step 1: "></textarea>
            <label>Image URL</label>
            <textarea name="img" placeholder='jpg/png'></textarea>
            <label>Servings</label>
            <input type="text" name="servings" placeholder="eg. 4" />
            <label>Duration (in minutes)</label>
            <input type="text" name="duration" placeholder="eg. 30" />
            <label>Tags</label>
            <input type="text" name="tags" placeholder="eg. Breakfast/Dinner" />
          </div>

          <button
            class="ui button"
            type="submit"
            style={{ marginBottom: "20px" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewRecipe;
