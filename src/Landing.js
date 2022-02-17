//import style elements
import background from "./assets/landingBackground.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Landing = () => {
    return (
        <div id="home" className="landing">
            <div className="landingImg">
                <img src={background} alt="Sample result from Nutritional Info Tool" />
            </div>
            <div className="landingText">
                <h1>Let's track those macros</h1>
                <p>Help find balance in your daily diet</p>
                <p>Scroll down to find out how our journal works!</p>
                <FontAwesomeIcon icon="angle-down" className="landingArrow"/>
            </div>
            
        </div>
    )   
}

export default Landing;