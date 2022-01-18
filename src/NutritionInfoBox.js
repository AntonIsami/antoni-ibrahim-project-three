import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import NutritionDatabase from './firebase.js';

const NutritionInfoBox = (props) => {

    const addItemToDiary = (productObject) => {
        const database = getDatabase(NutritionDatabase);
        const dbRootAddress = ref(database);


        push(dbRootAddress, productObject);
    }
    const sugarPos = props.object.nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sugar');

    const transPos = props.object.nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Trans Fat');

    const satPos = props.object.nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Saturated Fat');

    const sodPos = props.object.nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sodium');
    
    return (
        <div className="productDisplay">
            <div className="productDescription" key={props.id}>
                <h3>Nutritional Info:</h3>
                <h4>{props.title}</h4>
                <h5>Nutritional info is per serving</h5>
                <h6>(percentage = daily value)</h6>
                <img className="productDescriptionImg" src={props.image} alt={props.title}/>
            </div>

            <div className="calories nutritionCategory">
                <p>Calories:</p><p>{props.calories}</p>
            </div>

            <div className="carbs nutritionCategory">
                <p>Carbs:</p> <p>{props.carbs}</p>
            </div>

            {
                props.object.nutrition.nutrients[sugarPos] === undefined
                ? null
                :<div className="sugar nutritionCategory">
                    <p>Sugar:</p> <p>{props.object.nutrition.nutrients[sugarPos].amount} g</p>
                </div>
            }

            <div className="fat nutritionCategory">
                <p>Fat:</p> <p>{props.fat}</p>
            </div>

            {
                props.object.nutrition.nutrients[transPos] === undefined
                ? null
                :<div className="transFats nutritionCategory">
                        <p>Transfats:</p> <p>{props.object.nutrition.nutrients[transPos].amount} g</p>
                </div>
            }

            {
                props.object.nutrition.nutrients[satPos] === undefined
                ? null
                :<div className="saturatedFats nutritionCategory">
                        <p>Saturated fats:</p> <p>{props.object.nutrition.nutrients[satPos].amount} g</p>
                </div>
            }
            {/* <div className="sodium nutritionCategory">
                <p>Sodium:</p> <p>{props.sodium} g</p>
            </div> */}

            <div className="protein nutritionCategory">
                <p>Protein:</p> <p>{props.protein}</p>
            </div>

            {/* <div className="fibre nutritionCategory">
                <p>Fibre:</p> <p>{props.fibre} g</p>
            </div> */}

            {
            
            }
            <button onClick={()=>{addItemToDiary(props)}}>Add 1 Serving to Diary</button>
            <img src={props.label} alt="nutrition label" className="nutritionLabel" />
        </div>
    )
}

export default NutritionInfoBox