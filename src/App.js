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

import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import NutritionDatabase from './firebase.js';


 
library.add(faCoffee, faLaptopMedical);


function App() {
  const apiKey = "5306a0f7f32242acaec3f5e05a575696";
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("Pasta");
  const [searchResults, setSearchResults] = useState([]);
  const [nutritionLabel, setNutritionLabel] = useState("");
  const [nutritionInfo, setNutritionInfo] = useState("");

  const [productNutrition, setProductNutrition] = useState({});
  
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

  const exampleObject = {
    "id": 22347,
    "title": "SNICKERS Minis Size Chocolate Candy Bars Variety Mix 10.5-oz. Bag",
    "breadcrumbs": [
      "bars"
    ],
    "imageType": "jpg",
    "badges": [
      "msg_free",
      "no_artificial_colors",
      "no_artificial_flavors",
      "no_artificial_ingredients",
      "gluten_free"
    ],
    "importantBadges": [
      "no_artificial_flavors",
      "no_artificial_colors",
      "no_artificial_ingredients",
      "gluten_free",
      "msg_free"
    ],
    "ingredientCount": 32,
    "generatedText": null,
    "ingredientList": "Snickers Brand Almond Bar: Milk Chocolate (Sugar, Cocoa Butter, Chocolate, Skim Milk, Lactose, Milkfat, Soy Lecithin, Artificial Flavor), Corn Syrup, Almonds, Sugar, Milkfat, Skim Milk, Less than 2% - Lactose, Salt, Hydrogenated Palm Kernel Oil and/or Palm Oil, Egg Whites, Chocolate, Artificial Flavor. Snickers Brand: Milk Chocolate (Sugar, Cocoa Butter, Chocolate, Skim Milk, Lactose, Milkfat, Soy Lecithin, Artificial Flavor), Peanuts, Corn Syrup, Sugar, Milkfat, Skim Milk, Partially Hydrogenated Soybean Oil, Lactose, Salt, Egg Whites, Chocolate, Artificial Flavor. Snickers Brand Peanut Butter Squared Bars: Milk Chocolate (Sugar, Cocoa Butter, Chocolate, Skim Milk, Lactose, Milkfat, Soy Lecithin, Artificial Flavor), Peanut Butter (Peanuts, Partially Hydrogenated Soybean Oil), Peanuts, Sugar, Corn Syrup, Vegetable Oil (Hydrogenated Palm Kernel Oil, Palm Oil, Rapeseed Oil and Cottonseed Oil and/or Partially Hydrogenated Palm Kernel Oil), Lactose, Corn Syrup Solids, Invert Sugar, Less than 2% - Glycerin, Dextrose, Skim Milk, Salt, Calcium Carbonate, Partially Hydrogenated Soybean Oil, Egg Whites, Artificial Flavor, TBHQ to Maintain Freshness",
    "ingredients": [
      {
        "description": null,
        "name": "emulsifier",
        "safety_level": null
      },
      {
        "description": null,
        "name": "added sugar",
        "safety_level": null
      },
      {
        "description": null,
        "name": "sweetener",
        "safety_level": null
      },
      {
        "description": null,
        "name": "cooking fat",
        "safety_level": null
      },
      {
        "description": null,
        "name": "cooking oil",
        "safety_level": null
      },
      {
        "description": null,
        "name": "lecithin",
        "safety_level": null
      },
      {
        "description": null,
        "name": "yeast",
        "safety_level": null
      },
      {
        "description": null,
        "name": "menu item type",
        "safety_level": null
      },
      {
        "description": null,
        "name": "nuts",
        "safety_level": null
      },
      {
        "description": null,
        "name": "partially hydrogenated vegetable oil",
        "safety_level": "low"
      },
      {
        "description": "Unlike partially hydrogenated oils, fully hydrogenated oils do not contain trans fat and thus are currently considered safer.",
        "name": "hydrogenated vegetable oil",
        "safety_level": "high"
      },
      {
        "description": null,
        "name": "calcium",
        "safety_level": null
      },
      {
        "description": null,
        "name": "nut butter",
        "safety_level": null
      },
      {
        "description": null,
        "name": "legumes",
        "safety_level": null
      },
      {
        "description": null,
        "name": "refined sweetener",
        "safety_level": null
      },
      {
        "description": null,
        "name": "non food item",
        "safety_level": null
      },
      {
        "description": null,
        "name": "tree nuts",
        "safety_level": null
      },
      {
        "description": null,
        "name": "chocolate",
        "safety_level": null
      },
      {
        "description": null,
        "name": "sugar",
        "safety_level": null
      },
      {
        "description": null,
        "name": "snack",
        "safety_level": null
      },
      {
        "description": null,
        "name": "corn syrup",
        "safety_level": null
      },
      {
        "description": null,
        "name": "drink",
        "safety_level": null
      },
      {
        "description": null,
        "name": "milk",
        "safety_level": null
      },
      {
        "description": null,
        "name": "spread",
        "safety_level": null
      },
      {
        "description": null,
        "name": "vegetable oil",
        "safety_level": null
      },
      {
        "description": null,
        "name": "yeast nutrient",
        "safety_level": null
      },
      {
        "description": null,
        "name": "palm kernel oil",
        "safety_level": null
      },
      {
        "description": null,
        "name": "artificial ingredient",
        "safety_level": null
      },
      {
        "description": null,
        "name": "stabilizer",
        "safety_level": null
      },
      {
        "description": null,
        "name": "additive",
        "safety_level": null
      },
      {
        "description": null,
        "name": "nutrient",
        "safety_level": null
      },
      {
        "description": null,
        "name": "soybean oil",
        "safety_level": null
      },
      {
        "description": null,
        "name": "supplement",
        "safety_level": null
      },
      {
        "description": null,
        "name": "mineral",
        "safety_level": null
      },
      {
        "description": null,
        "name": "artificial flavor",
        "safety_level": "medium"
      },
      {
        "description": null,
        "name": "skim milk",
        "safety_level": null
      },
      {
        "description": null,
        "name": "peanuts",
        "safety_level": null
      },
      {
        "description": null,
        "name": "corn syrup solids",
        "safety_level": "medium"
      },
      {
        "description": "Unlike partially hydrogenated oils, fully hydrogenated oils do not contain trans fat and thus are currently considered safer.",
        "name": "hydrogenated palm kernel oil",
        "safety_level": "high"
      },
      {
        "description": null,
        "name": "cottonseed oil",
        "safety_level": null
      },
      {
        "description": null,
        "name": "milkfat",
        "safety_level": "high"
      },
      {
        "description": null,
        "name": "lactose",
        "safety_level": null
      },
      {
        "description": null,
        "name": "corn syrup",
        "safety_level": null
      },
      {
        "description": null,
        "name": "cocoa butter",
        "safety_level": "high"
      },
      {
        "description": null,
        "name": "tbhq to maintain freshness",
        "safety_level": null
      },
      {
        "description": null,
        "name": "peanut butter",
        "safety_level": null
      },
      {
        "description": null,
        "name": "egg whites",
        "safety_level": null
      },
      {
        "description": null,
        "name": "sugar",
        "safety_level": null
      },
      {
        "description": null,
        "name": "milk chocolate",
        "safety_level": null
      },
      {
        "description": null,
        "name": "palm oil",
        "safety_level": null
      },
      {
        "description": null,
        "name": "artificial flavor",
        "safety_level": null
      },
      {
        "description": null,
        "name": "salt",
        "safety_level": null
      },
      {
        "description": null,
        "name": "almonds",
        "safety_level": null
      },
      {
        "description": null,
        "name": "skim milk less than 2% - lactose",
        "safety_level": null
      },
      {
        "description": null,
        "name": "vegetable oil",
        "safety_level": null
      },
      {
        "description": null,
        "name": "less than 2% - glycerin",
        "safety_level": null
      },
      {
        "description": null,
        "name": "dextrose",
        "safety_level": "high"
      },
      {
        "description": "Soy lecithin is not a concern for most people allergic to soy.",
        "name": "soy lecithin",
        "safety_level": "high"
      },
      {
        "description": null,
        "name": "invert sugar",
        "safety_level": "high"
      },
      {
        "description": null,
        "name": "chocolate",
        "safety_level": null
      },
      {
        "description": null,
        "name": "rapeseed oil",
        "safety_level": null
      },
      {
        "description": null,
        "name": "partially hydrogenated soybean oil",
        "safety_level": "low"
      },
      {
        "description": null,
        "name": "calcium carbonate",
        "safety_level": "high"
      },
      {
        "description": null,
        "name": "partially hydrogenated palm kernel oil",
        "safety_level": "low"
      },
      {
        "description": null,
        "name": "artificial flavor.snickers brand",
        "safety_level": null
      },
      {
        "description": null,
        "name": "snickers brand almond bar",
        "safety_level": null
      }
    ],
    "likes": 0,
    "aisle": "Sweet Snacks",
    "nutrition": {
      "nutrients": [
        {
          "name": "Fat",
          "amount": 4,
          "unit": "g",
          "percentOfDailyNeeds": 6.15
        },
        {
          "name": "Protein",
          "amount": 10,
          "unit": "g",
          "percentOfDailyNeeds": 20
        },
        {
          "name": "Calories",
          "amount": 200,
          "unit": "cal",
          "percentOfDailyNeeds": 10
        },
        {
          "name": "Carbohydrates",
          "amount": 26,
          "unit": "g",
          "percentOfDailyNeeds": 9.45
        }
      ],
      "caloricBreakdown": {
        "percentProtein": 22.22,
        "percentFat": 20,
        "percentCarbs": 57.78
      }
    },
    "price": 324.0,
    "servings": {
      "number": 8,
      "size": 4,
      "unit": "pieces"
    },
    "spoonacularScore": 0.0
  }

  // in useEffect make a copy of the object so the api object is untouched
  // useEffect(()=>{
  //   const database = getDatabase(NutritionDatabase);
  //   const dbRootAddress = ref(database);

  //   push(dbRootAddress, productNutrition);
    
  // },[])

  
  // const database = getDatabase(firebaseProject);
  // const dbRef = ref(database);

  // onValue(dbRef, (response) => {
  //   // here we're creating a variable to store the new state we want to introduce to our app
  //   const newState = [];

  //   // here we store the response from our query to Firebase inside of a variable called data.
  //   // .val() is a Firebase method that gets us the information we want
  //   const data = response.val();
  //   // data is an object, so we iterate through it using a for in loop to access each book name 

  //   for (let key in data) {
  //     // inside the loop, we push each book name to an array we already created inside the onValue() function called newState
  //     newState.push(data[key]);
  //   }

  //   // then, we call setBooks in order to update our component's state using the local array newState
  //   setBooks(newState);
  // });

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
        </div>
        <div className="searchResultsDiv">

          <div className="recipes">
            <h3>Recipes: </h3>
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
            <h3>Products: </h3> 
          {searchResults[1] === undefined
            ? null
            :searchResults[1].results.slice(0, 7).map((product)=>{
              return (
                <div id="product" key={product.id}>
                  <p>{product.name}</p>
                  <img className="productImg" src={product.image} alt={product.name}/>
                  <button onClick={ () => {handleClick(product.id)}}>View Nutritional Information</button>
                </div>
              )
            })  
          }
          </div>
            
          {nutritionInfo.nutrition === undefined
            ? null
            : <NutritionInfoBox
              id={nutritionInfo.id}
              title={nutritionInfo.title}
              fat={nutritionInfo.nutrition.fat}
              carbs={nutritionInfo.nutrition.carbs}
              calories={nutritionInfo.nutrition.calories}
              protein={nutritionInfo.nutrition.protein}
              image={nutritionInfo.images[0]}
              // sugar={nutritionInfo.nutrition.nutrients[16].percentOfDailyNeeds}
              // transFats={nutritionInfo.nutrition.nutrients[6].amount}
              // saturatedFats={nutritionInfo.nutrition.nutrients[5].amount}
              // sodium={nutritionInfo.nutrition.nutrients[14].percentOfDailyNeeds}
              // fibre={nutritionInfo.nutrition.nutrients[7].amount}
              label={nutritionLabel}
               />
          }
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