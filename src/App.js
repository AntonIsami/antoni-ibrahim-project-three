import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faLaptopMedical} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Header from './Header.js';
import Landing from './Landing.js';
import NutritionInfoBox from './NutritionInfoBox.js';
import SimpleNutritionInfoBox from './SimpleNutritionInfoBox.js';
import Diary from './Diary.js';
import axios from 'axios';
import { getDatabase, ref, remove } from 'firebase/database';
import NutritionDatabase from './firebase.js';



 
library.add(faCoffee, faLaptopMedical)


function App() {
  const apiKey = "5306a0f7f32242acaec3f5e05a575696";
  //bench API
  // const apiKey = "72e6c8349f5542e981ba7aaa8eb67e16";
  const [userInput, setUserInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nutritionLabel, setNutritionLabel] = useState("");
  const [nutritionInfo, setNutritionInfo] = useState("");
  const [simpleNutritionInfo, setSimpleNutritionInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const database = getDatabase(NutritionDatabase);
  
  
  useEffect(()=>{
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
  },[searchTerm]);
  
    

  

  const handleSubmit = (event) => {
    event.preventDefault();
    setNutritionInfo("");
    setSimpleNutritionInfo({});
    setSearchTerm(userInput);
    setUserInput("");
    handleSearchError();
  }

  const handleSearchError = () => {
    if (searchResults[5].totalResults === 0){
      setUserInput("")
    } else{
      setErrorMessage("Try changing your search")
    }
    console.log(searchResults[5])
  }

  const handleInput = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
    
  }

  const handleClick = (id) => {
    setNutritionLabel(`https://api.spoonacular.com/food/products/${id}/nutritionLabel.png?apiKey=${apiKey}`)
    getNutritionInfo(id);
  }

  const handleClickSimple = (id) => {
    axios({
      url: `https://api.spoonacular.com/food/ingredients/${id}/information`,
      method: 'GET',
      dataResponse: 'json',
      params: {
        apiKey: apiKey,
        amount: 1,
      }
    }).then((response) => {
      setSimpleNutritionInfo(response.data);
      console.log(response.data);
    })
  }

  const getNutritionInfo = (id) => {
    axios({
      url: `https://api.spoonacular.com/food/products/${id}`,
      method: 'GET',
      dataResponse: 'json',
      params: {
        apiKey: apiKey
      }
    }).then((response) => {
      setNutritionInfo(response.data);
      console.log(response.data);
    })
  }
  
  const resetDiary = () => {
    const dbRef1 = ref(database, `Products`);
    remove(dbRef1);
    const dbRef2 = ref(database, `simpleFoods`)
    remove(dbRef2);
  }

  return (
    <div className="App">
      <Header />
      <Landing />
      
     
      <section className="diarySection" id="journal">
        <div className="wrapper diaryFlex">
          <Diary />
            <button className="resetBtn" onClick={resetDiary}>Reset</button>
        </div>
      </section>

      <section className="wrapper formFlex" id="search">
        <div className="formDiv">
          <form onSubmit={ handleSubmit }>
            <label htmlFor="search">Product &amp; Recipe Search</label>
            <input type="text" id="search" onChange={ handleInput } value={userInput} ></input>
            <p className="errorHandleForm">
              {
                searchTerm === ""
                ? "please start search"
                : null
              }
            </p>
            <p>
              {errorMessage}
            </p>
          </form>
        </div>

        <div className="searchResultsDiv">
          <div className="simpleFoods">
            <h3>Simple foods: </h3>
            
              {
              searchResults[0] === undefined
              ? <p className="errorHandle">No results</p>
              : null
              }
          { 
            searchResults[5] === undefined
            ? <p> please start search</p>
            : 
            (<>
            
              {searchResults[5].results.slice(0, 6).map((simpleFood)=>{
              return(
                <div className="foodResult" onClick={ () => {handleClickSimple(simpleFood.id)}} key={simpleFood.id}>
                  
                  <p className='foodName'>{simpleFood.name}</p>
                  <img className="simpleFoodImg" src={simpleFood.image} alt={simpleFood.name}/>
                  <button className="nutritionBtn" >View Nutritional Information</button>
                </div>
              )
            })
          }
          </>)
          }
          </div>

          <div className="products">
            <h3>Products: </h3> 

              {
                searchResults[1] === undefined
                  ? <p className="errorHandleProduct">No results</p>
                  : null
              }

              {searchResults[1] === undefined
              ? null
              :searchResults[1].results.slice(0, 5).map((product)=>{
                return (
                  <div className="foodResult" id="product" key={product.id}>
                    <p className='foodName'>{product.name}</p>
                    <img className="productImg" src={product.image} alt={product.name}/>
                    <button className="nutritionBtn" onClick={ () => {handleClick(product.id)}}>View Nutritional Information</button>
                  </div>
                  )
                })  
              }
          </div>
            
          {nutritionInfo.nutrition === undefined
            ? null
            : <NutritionInfoBox
              id={nutritionInfo.id}
              object={nutritionInfo}
              title={nutritionInfo.title}
              fat={nutritionInfo.nutrition.fat}
              carbs={nutritionInfo.nutrition.carbs}
              calories={nutritionInfo.nutrition.calories}
              protein={nutritionInfo.nutrition.protein}
              image={nutritionInfo.images[0]}
              label={nutritionLabel}
               />
          }

          {simpleNutritionInfo.nutrition === undefined
            ? null
            : <SimpleNutritionInfoBox 
            id={simpleNutritionInfo.id}
            object={simpleNutritionInfo}
            name={simpleNutritionInfo.name}
            image={simpleNutritionInfo.image}
              />
          }
        </div>
        
      

      <div className="toolDiv">
          <h3>Healthy Recipes With Similar Ingredients: </h3>
          <div className="recipes">
           
            <p className='errorHandleRecipes'></p>
            {
              searchResults[0] === undefined
                ? <p> please start search</p>
                : searchResults[0].results.slice(0, 5).map((recipe) => {
                  return (
                    <div className='recipe' key={recipe.id}>
                      <p>{recipe.name}</p>
                      <p><a href={recipe.link}>Recipe Link</a></p>
                      <img className="recipeImg" src={recipe.image} alt={recipe.name} />
                    </div>
                  )
                })

            }
          </div>
        </div>
      </section>
      <footer><p>Created at Juno College of Technology &copy; 2022</p></footer>
    </div>
    
    
  );
}

export default App;


