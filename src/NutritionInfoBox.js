import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import NutritionDatabase from './firebase.js';

const NutritionInfoBox = (props) => {

    const addItemToDiary = (productObject) => {
        const database = getDatabase(NutritionDatabase);
        const dbRootAddress = ref(database);


        push(dbRootAddress, productObject);
    }
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
            
            {/* { props.sugar === undefined
            ? null
            : <div className="sugar nutritionCategory">
                <p>Sugar:</p> <p>{props.sugar} g</p>
            </div>
            } */}
            

            <div className="fat nutritionCategory">
                <p>Fat:</p> <p>{props.fat}</p>
            </div>

            {/* <div className="transFats nutritionCategory">
                <p>Transfats:</p> <p>{props.transFats} %</p>
            </div>

            <div className="saturatedFats nutritionCategory">
                <p>Saturated fats:</p> <p>{props.saturatedFats}%</p>
            </div>
         */}
            {/* <div className="sodium nutritionCategory">
                <p>Sodium:</p> <p>{props.sodium} g</p>
            </div> */}

            <div className="protein nutritionCategory">
                <p>Protein:</p> <p>{props.protein}</p>
            </div>

            {/* <div className="fibre nutritionCategory">
                <p>Fibre:</p> <p>{props.fibre} g</p>
            </div> */}
            <button onClick={()=>{addItemToDiary(props)}}>Add 1 Serving to Diary</button>
            <img src={props.label} alt="nutrition label" className="nutritionLabel" />
        </div>
    )
}

export default NutritionInfoBox