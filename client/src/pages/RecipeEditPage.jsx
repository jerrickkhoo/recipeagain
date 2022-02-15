import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const RecipeEditPage = () => {
  const navigate = useNavigate();
  const {recipeID} = useParams()

  const [newRecipe, setNewRecipe] = useState({
    name: '',
    description: '',
    img: '',
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
        <input type="text" name="name" placeholder="Enter Ingredient Name" value={ingre.name} onChange={(e) => handleChangeIngre(e, i)} />
        <input type="text" name="units" placeholder="Enter units of measurement. litres/grams" value={ingre.units} onChange={(e) => handleChangeIngre(e, i)} />
        <input type="number" name="quantity" placeholder="Enter ingredient quantity in units" value={ingre.quantity} onChange={(e) => handleChangeIngre(e, i)} />
        <input type="text" name="type" placeholder="Enter ingredient type eg. fruit/meat" value={ingre.type} onChange={(e) => handleChangeIngre(e, i)} />
        {(i === ingreArr.length - 1) ? <button onClick={() => handleAddIngre(i)}>Add</button> : null}
        {(ingreArr.length > 1) ? <button onClick={handleRemoveIngre}>Remove</button> : null}
        <br /><br />
      </div>
    )
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
  // console.log("newRecipe", newRecipe)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecipe = await axios.put("/api/recipes/new", {
        name: newRecipe.name,
        author:  '',//TODO: get currentUser.id
        description: newRecipe.description,
        ingredients: ingreArr, //FIXME:
        steps: stepArr,
        image: newRecipe.img,
        servings: parseInt(newRecipe.servings),
        duration: parseInt(newRecipe.duration),
        tags: newRecipe.tags.split(",").map(tag=>tag.trim()),
      });
      alert("Recipe updated.");
      console.log("updatedRecipe",updatedRecipe)
      navigate('/'); //TODO: direct to recipe show page put recipe ID in path
    } catch (error) {
      console.log(error)
    }
    
  };


  return (
    <div>
      <div className="login" style={{ padding: "100px" }}>
        <h2>New Recipe</h2>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">

            <label htmlFor='name' >Name*:</label>
            <input type="text" name="name" id='name' placeholder="Name"
              value={newRecipe.name}
              onChange={handleChange}
            /><br /><br />

            <label htmlFor='description'>Description*:</label>
            <textarea name="description" id='description' placeholder="Describe your recipe" value={newRecipe.description}
              onChange={handleChange}
            /><br /><br />

            <label>Ingredients List:</label>
            {ingreFormArray}

            <label>Steps:</label>
            {stepFormArray}

            <label>Image URL:</label>
            <input name="img" placeholder='jpg/png'
              value={newRecipe.img}
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

export default RecipeEditPage;
