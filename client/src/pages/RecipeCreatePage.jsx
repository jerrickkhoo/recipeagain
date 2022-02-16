import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    const [ingreArr, setIngreArr] = useState([{ name: '', units: '', quantity: 1, type: '' }])
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
        setIngreArr([...ingreArr, { name: '', units: '', quantity: 1, type: '' }])
    }

    const handleRemoveIngre = (i) => {
        const list = [...ingreArr]
        list.splice(i, 1)
        setIngreArr(list)
    }

    const ingreFormArray = ingreArr.map((ingre, i) => {
        return (
          <div key={i}>
            <label>Ingredient #{i + 1}</label>
            <input
              type="text"
              name="name"
              placeholder="*Enter Ingredient Name"
              value={ingre.name}
              onChange={(e) => handleChangeIngre(e, i)}
              style={{ margin: "10px 0 10px 0" }}
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
              <button onClick={() => handleAddIngre(i)}>Add</button>
            ) : null}
            {ingreArr.length > 1 ? (
              <button onClick={handleRemoveIngre}>Remove</button>
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
                <input type="text" name="step" placeholder="Enter a cooking step" value={step} onChange={(e) => handleChangeStep(e, i)} />
                {(i === stepArr.length - 1) ? <button onClick={() => handleAddStep(i)}>Add</button> : null}
                {(stepArr.length > 1) ? <button onClick={handleRemoveStep}>Remove</button> : null}
                <br /><br />
            </div>
        )
    })
    console.log("ingreArr", ingreArr)
    console.log("newRecipe", newRecipe)
    console.log('currentUserin recipe new form',currentUser)

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            //TODO: update user database posts key with recipeID 
            const updateUser = await axios.put(`/api/users/${currentUser._id}/addPost`,{recipeID:createdRecipe.data.data._id})
            alert("Recipe created!");
            console.log("createdRecipe", createdRecipe.data.data._id)
            console.log("updateUser", updateUser)
                // .then((response) => {
                //     console.log("createdRecipe", response.data.data._id)
                //     alert("Recipe created!");
                //     navigate(`/recipes/${response.data.data._id}`)
                    
                // })
            navigate(`/recipes/${createdRecipe.data.data._id}`)

        } catch (error) {
            alert("Fail to create recipe, please retry")
            console.log(error)
        }
    };


    return (
        <div>
            <div className="createRecipe" style={{ padding: "100px" }}>
                <div style={{ paddingBottom: "100px" }}>
                <h2 style={{textAlign:'center'}}>New Recipe</h2>
                </div>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field" >

                        <label htmlFor='name' >Name*:</label>
                        <input type="text" name="name" id='name' placeholder="Name"
                            value={newRecipe.name}
                            onChange={handleChange}
                        /><br /><br />

                        <label htmlFor='description'>Description*:</label>
                        <textarea name="description" id='description' placeholder="Describe your recipe" value={newRecipe.description}
                            onChange={handleChange}
                        /><br /><br />

                        <label>Ingredients List*:</label>
                        {ingreFormArray}

                        <label>Steps:</label>
                        {stepFormArray}

                        <label>Image URL:</label>
                        <input name="image" placeholder='jpg/png'
                            value={newRecipe.image}
                            onChange={handleChange} /><br /><br />

                        <label>Servings (persons):</label>
                        <input type="number" name="servings" placeholder="eg. 4"
                            value={newRecipe.servings}
                            onChange={handleChange}
                        /><br /><br />

                        <label>Duration (minutes):</label>
                        <input type="number" name="duration" placeholder="eg. 30"
                            value={newRecipe.duration}
                            onChange={handleChange}
                        /><br /><br />

                        <label>Tags (separated by comma):</label>
                        <input type="text" name="tags" placeholder="eg. starter, dessert, main"
                            value={newRecipe.tags}
                            onChange={handleChange} />
                    </div>

                    <button class="ui button" type="submit" style={{ marginBottom: "20px" }}> Submit </button>
                </form>
                Fields with * are required.
            </div>
        </div>
    );
};

export default RecipeCreatePage;
