import exampleImage from './exampleImage.png';

const Landing = () => {
    return (
        <div id="home" className='wrapper landingFlex'>
            <div className="landingText">
                <h1>Let's track those macros</h1>
                <h2>Help find balance in your daily diet</h2>
            </div>
            <div className="landingImg">
                <img src={exampleImage} alt="Sample result from Nutritional Info Tool"/>
            </div>
        </div>
    )   
}

export default Landing;