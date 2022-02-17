import tutorial1Image from "./exampleImage2.png";

const Homepage = () => {
    return (
        <div>
            <section className="tutorial tutorial1">
                <div className="tutorial1div wrapper">
                    <div className="tutorial1Text">
                        <h2>NutriCo Food Journal is completely free</h2>
                        <p>We believe <strong>nutrition</strong> should be accessible to everyone, everywhere, regardless of income or access to a nutritionist. With hundreds of grocery products, healthy recipes and simple foods, as well as a super easy to use application, you’ll have everything you need to track and reach your personal nutrition goals – <strong>for free!</strong> </p>
                    </div>
                    <div className="tutorial1Image">
                        <img src={tutorial1Image} alt="demo of journal"/>
                    </div>
                </div>     
            </section>
            <section className="tutorial tutorial2">
                <div className="tutorial2div wrapper">
                    <div className="tutorial2Image">
                        <img src={tutorial1Image} alt="demo of journal" />
                    </div>
                    <div className="tutorial2Text">
                        <h2><span>Step 1</span> Search for your daily diet items</h2>
                        <p>We believe <strong>nutrition</strong> should be accessible to everyone, everywhere, regardless of income or access to a nutritionist. With hundreds of grocery products, healthy recipes and simple foods, as well as a super easy to use application, you’ll have everything you need to track and reach your personal nutrition goals – <strong>for free!</strong> </p>
                    </div>

                </div>   
            </section>
            <section className="tutorial tutorial3">
                <div className="tutorial3div wrapper">
                    <div className="tutorial3Text">
                        <h2>Add items to your daily journal<span>Step 2</span></h2>
                        <p>We believe <strong>nutrition</strong> should be accessible to everyone, everywhere, regardless of income or access to a nutritionist. With hundreds of grocery products, healthy recipes and simple foods, as well as a super easy to use application, you’ll have everything you need to track and reach your personal nutrition goals – <strong>for free!</strong> </p>
                    </div>
                    <div className="tutorial3Image">
                        <img src={tutorial1Image} alt="demo of journal" />
                    </div>
                   

                </div>
            </section>
            <section className="tutorial tutorial4">
                <div className="tutorial4div wrapper">
                    <div className="tutorial4Text">
                        <span>Step 3</span>
                        <h2>Take a look at your daily macronutrient report!</h2>
                        <p>We believe <strong>nutrition</strong> should be accessible to everyone, everywhere, regardless of income or access to a nutritionist. With hundreds of grocery products, healthy recipes and simple foods, as well as a super easy to use application, you’ll have everything you need to track and reach your personal nutrition goals – <strong>for free!</strong> </p>
                    </div>
                    <div className="tutorial4Image">
                        <img src={tutorial1Image} alt="demo of journal" />
                    </div>


                </div>
            </section>
        </div>
    )
}
export default Homepage;