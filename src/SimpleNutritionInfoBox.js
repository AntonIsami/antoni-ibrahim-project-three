import { getDatabase, ref, push } from 'firebase/database';
import NutritionDatabase from './firebase.js';

const SimpleNutritionInfoBox = (props) => {

    const addItemToDatabase = (productObject) => {
        const database = getDatabase(NutritionDatabase);
        const dbRootAddress = ref(database, 'simpleFoods');
        

        push(dbRootAddress, productObject.object);

    }
    const calPos = props.object.nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Calories');

    const carbPos = props.object.nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Carbohydrates');

    const fatPos = props.object.nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Fat');

    const sugarPos = props.object.nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sugar');

    const transPos = props.object.nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Trans Fat');

    const satPos = props.object.nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Saturated Fat');

    const sodPos = props.object.nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sodium');

    const proPos = props.object.nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Protein');

    const fibPos = props.object.nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Fiber');

    return (
        
            <div className="productDisplay">
                <div className="productDescription" key={props.id}>
                    <h3>Nutritional Info:</h3>
                    <h4>Nutritional info is per serving</h4>
                    <br></br>
                    <h5>{props.name}</h5>
                    <h5>Nutritional info is per serving</h5>
                    <h6>(percentage = daily value)</h6>
                   
                </div>

                {
                    props.object.nutrition.nutrients[calPos] === undefined
                        ? null
                        : <div className="calories nutritionCategory">
                            <p>Calories(kCal):</p> <p>{props.object.nutrition.nutrients[calPos].amount} </p>
                        </div>
                }

                {
                    props.object.nutrition.nutrients[carbPos] === undefined
                        ? null
                        : <div className="carbs nutritionCategory">
                            <p>Carbs:</p> <p>{props.object.nutrition.nutrients[carbPos].amount} g</p>
                        </div>
                }


                {
                    props.object.nutrition.nutrients[sugarPos] === undefined
                        ? null
                        : <div className="sugar nutritionCategory">
                            <p>Sugar:</p> <p>{props.object.nutrition.nutrients[sugarPos].amount} g</p>
                        </div>
                }

                {
                    props.object.nutrition.nutrients[fatPos] === undefined
                        ? null
                        : <div className="fat nutritionCategory">
                            <p>Fat:</p> <p>{props.object.nutrition.nutrients[fatPos].amount} g</p>
                        </div>
                }


                {
                    props.object.nutrition.nutrients[transPos] === undefined
                        ? null
                        : <div className="transFats nutritionCategory">
                            <p>Transfats:</p> <p>{props.object.nutrition.nutrients[transPos].amount} g</p>
                        </div>
                }

                {
                    props.object.nutrition.nutrients[satPos] === undefined
                        ? null
                        : <div className="saturatedFats nutritionCategory">
                            <p>Sat. fats:</p> <p>{props.object.nutrition.nutrients[satPos].amount} g</p>
                        </div>
                }

                {
                    props.object.nutrition.nutrients[sodPos] === undefined
                        ? null
                        : <div className="sodium nutritionCategory">
                            <p>Sodium:</p> <p>{props.object.nutrition.nutrients[sodPos].amount}mg</p>
                        </div>
                }

                {
                    props.object.nutrition.nutrients[proPos] === undefined
                        ? null
                        : <div className="protein nutritionCategory">
                            <p>Protein:</p> <p>{props.object.nutrition.nutrients[proPos].amount} g</p>
                        </div>
                }

                {
                    props.object.nutrition.nutrients[fibPos] === undefined
                        ? null
                        : <div className="fibre nutritionCategory">
                            <p>Fiber:</p> <p>{props.object.nutrition.nutrients[fibPos].amount} g</p>
                        </div>
                }


                <button className="addDiaryBtn" onClick={() => { addItemToDatabase(props) }}>Add 1 Serving to Diary</button>

            </div>
        
    )
}

export default SimpleNutritionInfoBox;