import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faLaptopMedical } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Header from './Header.js';
import Landing from './Landing.js';
import NutritionInfoBox from './NutritionInfoBox.js';
// import Journal from './Journal.js';
import axios from 'axios';

 
library.add(faCoffee, faLaptopMedical);


function App() {
  const apiKey = "5306a0f7f32242acaec3f5e05a575696";
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("Pasta");
  const [searchResults, setSearchResults] = useState([]);
  const [nutritionLabel, setNutritionLabel] = useState("");
  const [nutritionInfo, setNutritionInfo] = useState("");
  
  useEffect( () => {
    axios({
      url: 'https://api.spoonacular.com/food/search',
      method: 'GET',
      dataResponse: 'json',
      params: {
        apiKey: apiKey,
        query: searchTerm
      }
    }).then((response) => {
      setSearchResults(response.data.searchResults);
    })
  }, [searchTerm])

  

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput);
    setUserInput("");
    
  }

  const handleInput = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
    
  }

  const handleClick = (id) => {
    setNutritionLabel(`https://api.spoonacular.com/food/products/${id}/nutritionLabel.png?apiKey=${apiKey}`)
    getNutritionInfo(id);
  }

  const getNutritionInfo = (id) => {
    axios({
      url: `https://api.spoonacular.com/food/products/${id}`,
      method: 'GET',
      dataREsponse: 'json',
      params: {
        apiKey: apiKey,

      }
    }).then((response) => {
      setNutritionInfo(response.data);
      console.log(response.data);
    })
  }
  return (
    <div className="App">
      <Header />
      <Landing />
      <button className="apiButton" onClick={ () => {setLoggedIn( !loggedIn)}}>
      {
        loggedIn
        ? "Logged in, click to log out"
        : "log in"
      }</button>
      <FontAwesomeIcon icon={faCoffee} />
      <p className="fire"> Hey hello </p>
      <section className="wrapper journalFlex">
        <div className="formDiv">
          <form onSubmit={ handleSubmit }>
            <label htmlFor="search" className="sr-only">Product &amp; Recipe Search</label>
            <input type="text" id="search" onChange={ handleInput } value={userInput} ></input>
          </form>
          <div className="searchResultsDiv">
            <div className="recipes">
            { 
              searchResults[0] === undefined
              ? <p> please start search</p>
              : searchResults[0].results.slice(0, 3).map((recipe)=>{
                return(
                  <div key={recipe.id}>
                    <p>{recipe.name}</p>
                    <p><a href={recipe.link}>Recipe Link</a></p>
                    <img className="recipeImg" src={recipe.image} alt={recipe.name}/>
                  </div>
                )
              })
            
            }
            </div>
            <div className="products">
            {searchResults[1] === undefined
              ? null
              :searchResults[1].results.slice(0, 7).map((product)=>{
                return (
                  <div key={product.id}>
                    <p>{product.name}</p>
                    <img className="productImg" src={product.image} alt={product.name}/>
                    <button onClick={ () => {handleClick(product.id)}}>Add to Journal</button>
                  </div>
                )
              })  
            }
            </div>
            {nutritionInfo.nutrition === undefined
              ? null
              : <NutritionInfoBox
                title={nutritionInfo.title}
                fat={nutritionInfo.nutrition.fat}
                carbs={nutritionInfo.nutrition.carbs}
                calories={nutritionInfo.nutrition.calories}
                protein={nutritionInfo.nutrition.protein}
                image={nutritionInfo.images[0]}
                label={nutritionLabel} />
            }
          </div>

        </div>
        <div className="toolDiv">
         
        </div>
        

      </section>
    </div>
  );
}

export default App;

// Description of project 
// An app that users can search up their daily recipes or products consumed and view their calorie, fat, protein etc. information

// MVP goals
// 1. Landing page that welcomes users
// 2. Search bar that allows for search of grocery products by name
// 3. Display nutritional info for products

// Stretch Goals
// 1. Allow users to select items to add to a daily food journal
// 2. Track calorie, fat, protein etc. intake on a daily intake log via their journal
// 3. Include recipes when users search for nutritional information


// A landing page with a heading, a explanation of the tool and a sample image of the information
// displayed by the app

// A section following the landing that has the tool with the preset information categories displayed with empty values and a space for an image of the product/recipe

// A search bar that takes submits on enter, with an the image of product to the right of the bar, listen to the search input on submit for the api call to begin

//Error Handling: If the user enters a query that matches nothing in the API database i.e null, user will receive a message back mentioning that there are no products that match their search

// store the user search in a variable and insert into API call, and display results of products listed with a button beside each individual result

//On click of button beside each item, app takes the id from the item and inserts into additional API call to grab the necessary data and display on page nutritional information (protein, calories, g of sugar, etc.)

//extras:
// allow user to add to their daily journal

//create a userName saveState to add to a firebase, allow user to log in and change log in to logged in and display username

// store the user input using onChange, and then record the .value on submit using onSubmit on the form, handle in two different functions from use-effect app from week06day04 