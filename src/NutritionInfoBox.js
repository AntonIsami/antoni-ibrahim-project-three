const NutritionInfoBox = (props) => {
    return (
        <div className="productDisplay">
            <div className="productDescription">
                <h4>{props.title}</h4>
                <h5>Nutritional info is per serving</h5>
            </div>
            <div className="calories nutritionCategory">
                <p>Calories:</p><p>{props.calories}</p>
            </div>
            <div className="fat nutritionCategory">
                <p>Fat:</p> <p>{props.fat}</p>
            </div>
        </div>
    )
}

export default NutritionInfoBox