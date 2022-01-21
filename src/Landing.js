import exampleImage2 from './exampleImage2.png';

const Landing = () => {
    return (
        <div id="home" className='wrapper landingFlex'>
            <div className="landingText">
                <h2>Let's track those macros</h2>
                <h3>Help find balance in your daily diet</h3>
            </div>
            <div className="landingImg">
                <img src={exampleImage2} alt="Sample result from Nutritional Info Tool"/>
            </div>
        </div>
    )   
}

export default Landing;