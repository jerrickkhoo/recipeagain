import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NewRecipeValidationSchema } from "../components/validation";

const RecipeCreatePage = ({currentUser}) => {
    const navigate = useNavigate();
    if (!currentUser) {
        navigate("/login")
    }
    const [newRecipe, setNewRecipe] = useState({
        name: '',
        description: '',
        image: '',
        servings: '',
        duration: '',
        tags: '',
    })

    const [ingreArr, setIngreArr] = useState([{ name: '', units: '', quantity: "", type: '' }])
    const [stepArr, setStepArr] = useState([''])

    const handleChange = (e) => {
        setNewRecipe({
            ...newRecipe,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeIngre = (e, i) => {
        const { name, value } = e.target
        const list = [...ingreArr] //make copy because we cant mutate state directly
        list[i][name] = value
        //console.log(list)
        setIngreArr(list)
    }

    const handleAddIngre = () => {
        setIngreArr([...ingreArr, { name: '', units: '', quantity: '', type: '' }])
    }

    const handleRemoveIngre = (i) => {
        console.log("ingreArr",ingreArr)
        const list = [...ingreArr]
        console.log('test before',list)
        list.splice(i, 1)
        console.log('testafter',list)
        setIngreArr(list)
    }

    const ingreFormArray = ingreArr.map((ingre, i) => {
        return (
          <div key={i}>
            <label style={{ fontSize: "15px" }}>Ingredient #{i + 1}</label>
            <input
              type="text"
              name="name"
              placeholder="*Enter Ingredient Name"
              value={ingre.name}
              onChange={(e) => handleChangeIngre(e, i)}
              style={{
                margin: "10px 0 10px 0",
              }}
            />
            <input
              type="text"
              name="units"
              placeholder="Enter units of measurement. litres/grams"
              value={ingre.units}
              onChange={(e) => handleChangeIngre(e, i)}
              style={{ marginBottom: "10px" }}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Enter ingredient quantity in units"
              value={ingre.quantity}
              onChange={(e) => handleChangeIngre(e, i)}
              style={{ marginBottom: "10px" }}
            />
            <input
              type="text"
              name="type"
              placeholder="Enter ingredient type eg. fruit/meat"
              value={ingre.type}
              onChange={(e) => handleChangeIngre(e, i)}
              style={{ marginBottom: "10px" }}
            />
            {i === ingreArr.length - 1 ? (
              <button
                class="ui button"
                type="submit"
                onClick={() => handleAddIngre(i)}
                style={{ backgroundColor: "green", color: "white" }}
              >
                Add
              </button>
            ) : null}
            {ingreArr.length > 1 ? (

              <button
                class="ui button"
                type="submit"
                onClick={() => handleRemoveIngre(i)}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Remove
              </button>

            ) : null}
            <br />
            <br />
          </div>
        );
    })

    const handleChangeStep = (e, i) => {
        const list = [...stepArr]
        list[i] = e.target.value
        setStepArr(list)
    }

    const handleAddStep = () => {
        setStepArr([...stepArr, ''])
    }

    const handleRemoveStep = (i) => {
        const list = [...stepArr]
        list.splice(i, 1)
        setStepArr(list)
    }

    const stepFormArray = stepArr.map((step, i) => {
        return (

          <div key={i}>
            <label >Step {i + 1}</label>
            <input
              type="text"
              name="step"
              placeholder="Enter a cooking step"
              value={step}
              onChange={(e) => handleChangeStep(e, i)}
              style={{ margin: "20px 0" }}
            />
            {i === stepArr.length - 1 ? (
              <button
                class="ui button"
                type="submit"
                onClick={() => handleAddStep(i)}
                style={{ backgroundColor: "green", color: "white" }}
              >
                Add
              </button>
            ) : null}
            {stepArr.length > 1 ? (
              <button
                class="ui button"
                type="submit"
                onClick={() => handleRemoveStep(i)}
                style={{ backgroundColor: "red", color: "white", marginBottom:'10px' }}
              >
                Remove
              </button>
            ) : null}
          </div>
        );

    })
    // console.log("ingreArr", ingreArr)
    // console.log("newRecipe", newRecipe)
    // console.log('currentUserin recipe new form',currentUser)

    const handleSubmit = async (e) => {
        e.preventDefault();

        //validate FE input
        const {error} = NewRecipeValidationSchema.validate({
            name: newRecipe.name,
            description: newRecipe.description,
            servings: newRecipe.servings,
            duration: newRecipe.duration,
            tags: newRecipe.tags
        })
        if(error){
            alert(error)
            return
        }
        //after passing FE val, send post request to BE
        try {
            
            const createdRecipe = await axios.post("/api/recipes/new", {
                name: newRecipe.name,
                author: currentUser._id, 
                description: newRecipe.description,
                ingredients: ingreArr,
                steps: stepArr,
                image: newRecipe.image,
                servings: parseInt(newRecipe.servings),
                duration: parseInt(newRecipe.duration),
                tags: newRecipe.tags.split(",").map(tag => tag.trim()),
            })
            const updateUser = await axios.put(`/api/users/${currentUser._id}/addPost`,{recipeID:createdRecipe.data.data._id})
            // console.log("createdRecipe", createdRecipe.data.data._id)
            // console.log("updateUser", updateUser)
            alert("Recipe created!");
            navigate(`/recipes/${createdRecipe.data.data._id}`)

        } catch (error) {
            alert("Fail to create recipe, please retry")
            console.log("BError",error.response)
        }
    };


    return (
      <div style={{ backgroundColor: "lightyellow", paddingBottom: "100%" }}>
        <div id="homebanner">
          <h1 className="titles">New Recipe</h1>
        </div>
        <div className="home" id="newrecipe" style={{ paddingBottom: "50px" }}>
          <div style={{ paddingBottom: "100px" }}></div>
          <form className="ui form" onSubmit={handleSubmit}>
            <div className="field">
              <label style={{ fontSize: "20px" }} htmlFor="name">
                Recipe Name*:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={newRecipe.name}
                onChange={handleChange}
              />
              <br />
              <br />

              <label style={{ fontSize: "20px" }} htmlFor="description">
                Description*:
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Describe your recipe"
                value={newRecipe.description}
                onChange={handleChange}
              />
              <br />
              <br />

              <label style={{ fontSize: "20px", paddingBottom: "20px" }}>
                Ingredients List*:
              </label>
              {ingreFormArray}

              <label style={{ fontSize: "20px" }}>Steps:</label>
              {stepFormArray}

              <label style={{ fontSize: "20px", padding: "20px 0" }}>
                Image URL:
              </label>
              <input
                name="image"
                placeholder="jpg/png"
                value={newRecipe.image}
                onChange={handleChange}
              />
              <br />
              <br />

              <label style={{ fontSize: "20px" }}>Servings (persons):</label>
              <input
                type="number"
                name="servings"
                placeholder="eg. 4"
                value={newRecipe.servings}
                onChange={handleChange}
              />
              <br />
              <br />

              <label style={{ fontSize: "20px" }}>Duration (minutes):</label>
              <input
                type="number"
                name="duration"
                placeholder="eg. 30"
                value={newRecipe.duration}
                onChange={handleChange}
              />
              <br />
              <br />

              <label style={{ fontSize: "20px" }}>
                Tags (separated by comma):
              </label>
              <input
                type="text"
                name="tags"
                placeholder="eg. starter, dessert, main"
                value={newRecipe.tags}
                onChange={handleChange}
              />
            </div>

            <button
              class="ui button"
              type="submit"
              style={{
                marginBottom: "20px",
                backgroundColor: "gold",
                color: "black",
              }}
            >
              {" "}
              Submit{" "}
            </button>
          </form>
          Fields with * are required.
        </div>
      </div>
    );
};

export default RecipeCreatePage;
