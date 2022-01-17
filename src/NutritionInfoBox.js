

const NutritionInfoBox = (props) => {
    return (
        <div className="productDisplay">
            <div className="productDescription">
                <h4>{props.title}</h4>
                <h5>Nutritional info is per serving</h5>
                <img className="productDescriptionImg" src={props.image} alt={props.title}/>
            </div>
            <div className="calories nutritionCategory">
                <p>Calories:</p><p>{props.calories}</p>
            </div>
            <div className="fat nutritionCategory">
                <p>Fat:</p> <p>{props.fat}</p>
            </div>
            <img src={props.label} alt="nutrition label" className="nutritionLabel" />
        </div>
    )
}

export default NutritionInfoBox