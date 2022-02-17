import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { NewRecipeValidationSchema } from "../components/validation";

const RecipeEditPage = (currentUser) => {
    const navigate = useNavigate();
    const { recipeID } = useParams()

    const [newRecipe, setNewRecipe] = useState({
        name: '',
        description: '',
        image: '',
        servings: '',
        duration: '',
        tags: '',
    })

    const [ingreArr, setIngreArr] = useState([{ name: '', units: '', quantity: 1, type: '' }])
    const [stepArr, setStepArr] = useState([''])

    //Fetch currentRecipe and pre populate form
    const fetchCurrentRecipe = async () => {
        await axios.get(`/api/recipes/${recipeID}`)
            .then((response) => {
                console.log("existingRecipe",response.data.data)
                const existingRecipe = response.data.data
                //TODO: add security check if (existingRecipe.author === currentUser.currentUser._id) else alert and navigate home
                setNewRecipe({
                    name: existingRecipe.name,
                    description: existingRecipe.description,
                    image: existingRecipe.image,
                    servings: existingRecipe.servings,
                    duration: existingRecipe.duration,
                    tags: existingRecipe?.tags.join(", "),
                })
                console.log('foundRecipe.data.data.ingredients', response.data.data.ingredients)
                setIngreArr(response.data.data.ingredients)
                setStepArr(response.data.data.steps)
            })
    }

    useEffect(() => {
        fetchCurrentRecipe()
    }, [])


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
        setIngreArr([...ingreArr, { name: '', units: '', quantity: 1, type: '' }])
    }

    const handleRemoveIngre = (i) => {
        const list = [...ingreArr]
        list.splice(i, 1)
        setIngreArr(list)
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        await axios.delete(`/api/recipes/${recipeID}`)
        alert('Recipe Deleted')
        navigate('/')
    }

    const ingreFormArray = ingreArr.map((ingre, i) => {
        return (
          <div key={i}>
            <label>Ingredient #{i + 1}</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Ingredient Name"
              value={ingre.name}
              onChange={(e) => handleChangeIngre(e, i)}
              style={{ margin: "20px 0" }}
            />
            <input
              type="text"
              name="units"
              placeholder="Enter units of measurement. litres/grams"
              value={ingre.units}
              onChange={(e) => handleChangeIngre(e, i)}
              style={{ margin: "20px 0"}}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Enter ingredient quantity in units"
              value={ingre.quantity}
              onChange={(e) => handleChangeIngre(e, i)}
              style={{ margin: "20px 0"}}
            />
            <input
              type="text"
              name="type"
              placeholder="Enter ingredient type eg. fruit/meat"
              value={ingre.type}
              onChange={(e) => handleChangeIngre(e, i)}
              style={{ margin: "20px 0" }}
            />
            {i === ingreArr.length - 1 ? (
              <button
                class="ui button"
                type="button"
                onClick={() => handleAddIngre(i)}
                style={{
                  backgroundColor: "green",
                  color: "white",
                }}
              >
                Add
              </button>
            ) : null}
            {ingreArr.length > 1 ? (
              <button
                class="ui button"
                type="button"
                onClick={() => handleRemoveIngre(i)}
                style={{
                  margin: "20px 0",
                  backgroundColor: "red",
                  color: "white",
                }}
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
            <label>Step {i + 1}</label>
            <input
              type="text"
              name="step"
              placeholder="Enter a cooking step"
              value={step}
              onChange={(e) => handleChangeStep(e, i)}
              style={{ margin: "20px 0"}}
            />
            {i === stepArr.length - 1 ? (
              <button
                class="ui button"
                type="button"
                onClick={() => handleAddStep(i)}
                style={{
                  backgroundColor: "green",
                  color: "white",
                }}
              >
                Add
              </button>
            ) : null}
            {stepArr.length > 1 ? (
              <button
                class="ui button"
                type="button"
                onClick={() => handleRemoveStep(i)}
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // FE validate before sending request to BE
        const {error} = NewRecipeValidationSchema.validate({
            name: newRecipe.name,
            description: newRecipe.description,
            servings: newRecipe.servings,
            duration: newRecipe.duration,
            tags: newRecipe.tags
        })
        if (error){
            alert(error)
            return
        }
        try {
            const updatedRecipe = await axios.put(`/api/recipes/${recipeID}`, {
                name: newRecipe.name,
                //author:  '',//dont need to update author because it is unchanged, by right only author can edit
                description: newRecipe.description,
                ingredients: ingreArr,
                steps: stepArr,
                image: newRecipe.image,
                servings: parseInt(newRecipe.servings),
                duration: parseInt(newRecipe.duration),
                tags: newRecipe.tags.split(",").map(tag => tag.trim()),
            });
            alert("Recipe updated.");
            console.log("updatedRecipe", updatedRecipe)
            navigate(`/recipes/${recipeID}`)
        } catch (error) {
            alert("Fail to update recipe, please retry")
            console.log(error.response)
        }
    };

    return (
      <div style={{ backgroundColor: "lightyellow", paddingBottom: "100%" }}>
        <div id="homebanner">
          <h1 className="titles">Edit Recipe</h1>
        </div>
        <i
          id="deleterecipe"
          class="trash alternate outline icon"
          onClick={handleDelete}
        ></i>
        <div className="newrecipe" style={{ paddingBottom: "50px" }}>
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
                required
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
                required
              />
              <br />
              <br />

              <label style={{ fontSize: "20px" }}>Ingredients List:</label>
              {ingreFormArray}

              <label style={{ fontSize: "20px" }}>Steps:</label>
              {stepFormArray}

              <label style={{ fontSize: "20px" }}>Image URL:</label>
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
                id="newrecipe"
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
                id="newrecipe"
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
          <p>
          Fields with * are required.
          </p>
          <Link to="/">
          <button
                class="ui button"
                type="button"
                style={{
                    marginBottom: "20px",
                    backgroundColor: "gray",
                    color: "white",
                }}
            >Cancel
            </button>
            </Link>
        </div>
      </div>
    );
};

export default RecipeEditPage;
