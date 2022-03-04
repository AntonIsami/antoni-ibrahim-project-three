import { getDatabase, ref, onValue, remove } from 'firebase/database';
import NutritionDatabase from './firebase.js';
import { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faTimesCircle, faHeart);

const Diary = () => {
    
    const [ productList, setProductList] = useState([]);
    const [ simpleList, setSimpleList ] = useState([]);
    const [ caloriesTotal, setCaloriesTotal ] = useState(0);
    const [ carbsTotal, setCarbsTotal ] = useState(0);
    const [ sugarTotal, setSugarTotal ] = useState(0);
    const [ fatTotal, setFatTotal ] = useState(0);
    const [ saturatedTotal, setSaturatedTotal ] = useState(0);
    const [ sodiumTotal, setSodiumTotal ] = useState(0);
    const [ proteinTotal, setProteinTotal ] = useState(0);
    const database = getDatabase(NutritionDatabase);
    
    useEffect( ()=>{
        const dbRootAddress = ref(database, 'Products');
        onValue(dbRootAddress, (response)=>{
        if(response.val() === null){
            setProductList([])
        } else{
        setProductList(Object.entries(response.val()));
        
        }
        },[])
    },[database])
 
    useEffect(() => {
        const dbRootAddress = ref(database, 'simpleFoods');

        onValue(dbRootAddress, (response) => {
        if (response.val() === null) {
            setSimpleList([])
        } else {
            setSimpleList(Object.entries(response.val()))
        }
        },[])
    }, [database])

    const deleteJournalItemP = (key) => {
        const dbRef = ref(database,`Products/${key[0]}`);
        remove(dbRef);
    }
    const deleteJournalItemS = (key) => {
        const dbRef = ref(database, `simpleFoods/${key[0]}`);
        remove(dbRef);
    }
    
   

    useEffect(()=> {

        let calArray = [];
        let carbsArray = [];
        let sugarArray = [];
        let fatArray = [];
        let satArray = [];
        let sodArray = [];
        let proArray = [];

        productList.forEach((product) => {
            const calPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Calories');
            const fatPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Fat');
            const sugarPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sugar');
            const satPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Saturated Fat');
            const sodPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sodium');
            const proPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Protein');


            calArray.push(product[1].nutrition.nutrients[calPos].amount);

            carbsArray.push(product[1].nutrition.caloricBreakdown.percentCarbs);

            sugarArray.push(product[1].nutrition.nutrients[sugarPos].amount);

            fatArray.push(product[1].nutrition.nutrients[fatPos].amount)

            satArray.push(product[1].nutrition.nutrients[satPos].amount);

            sodArray.push(product[1].nutrition.nutrients[sodPos].amount / 1000);
            console.log(sodArray);
            proArray.push(product[1].nutrition.nutrients[proPos].amount);


        })

        simpleList.forEach((product) => {
            const calPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Calories');
            const fatPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Fat');
            const sugarPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sugar');
            const satPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Saturated Fat');
            const sodPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sodium');
            const proPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Protein');


            calArray.push(product[1].nutrition.nutrients[calPos].amount * 50);

            carbsArray.push(product[1].nutrition.caloricBreakdown.percentCarbs);

            sugarArray.push(product[1].nutrition.nutrients[sugarPos].amount);

            fatArray.push(product[1].nutrition.nutrients[fatPos].amount)

            satArray.push(product[1].nutrition.nutrients[satPos].amount);

            sodArray.push(product[1].nutrition.nutrients[sodPos].amount * 1);
            console.log(sodArray)
            proArray.push(product[1].nutrition.nutrients[proPos].amount);
            
        })


        const totalCal = calArray.reduce((totalValue, currentValue) => {
            return totalValue + currentValue;
        }, 0);
        setCaloriesTotal(totalCal);

        const totalCarbs = carbsArray.reduce((totalValue, currentValue) => {
            return totalValue + currentValue;
        }, 0);
        setCarbsTotal(totalCarbs);

        const totalSug = sugarArray.reduce((totalValue, currentValue) => {
            return totalValue + currentValue;
        }, 0);
        setSugarTotal(totalSug);

        const totalFat = fatArray.reduce((totalValue, currentValue) => {
            return totalValue + currentValue;
        }, 0);
        setFatTotal(totalFat);

        const totalSat = satArray.reduce((totalValue, currentValue) => {
            return totalValue + currentValue;
        }, 0);
        setSaturatedTotal(totalSat);

        const totalSod = sodArray.reduce((totalValue, currentValue) => {
            return totalValue + currentValue;
        }, 0);
        setSodiumTotal(totalSod);

        const totalPro = proArray.reduce((totalValue, currentValue) => {
            return totalValue + currentValue;
        }, 0);
        setProteinTotal(totalPro);
    }, [productList, simpleList])
   

    

    

    return (
    <div className='diaryTable'>
       <div className="row nutrientRow">
           <p className='nameRow'>Name</p>
           <p className='otherRow nutrientName'>Cal.</p>
           <p className='otherRow nutrientName'>Carbs</p>
            <p className='otherRow nutrientName'>Sugar</p>
            <p className='otherRow nutrientName'>Fat</p>
            <p className='otherRow nutrientName'>Sat.<br></br> Fats</p>
            <p className='otherRow nutrientName'>Sodium</p>
            <p className='otherRow nutrientName'>Protein</p>
          
       </div>
       
       {
        productList.length === 0
        ? null   
        :<div className="row productsRow">
           <p> Products</p>
        </div>
        }
        {
                productList.map((product, index, id) => {
                    const calPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Calories');
                    const fatPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Fat');
                    const sugarPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sugar');
                    const satPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Saturated Fat');
                    const sodPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sodium');
                    const proPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Protein');

                    return (
                        <div key={index} className="row">
                            <p className="nameRow">{product[1].title.substring(0, 30)}</p>
                            {product[1].nutrition.nutrients[calPos] === undefined
                            ? <p className='otherRow dataRow'>0</p>
                            :<p className='otherRow dataRow'>{product[1].nutrition.nutrients[calPos].amount}</p>
                            }
                            <p className='otherRow dataRow'>{product[1].nutrition.caloricBreakdown.percentCarbs}%</p>
                           
                            {product[1].nutrition.nutrients[sugarPos] === undefined
                                ? <p className='otherRow dataRow'>0</p>
                                :<p className='otherRow dataRow'>{product[1].nutrition.nutrients[sugarPos].amount} g</p> 
                            }
                            
                            {product[1].nutrition.nutrients[fatPos] === undefined
                                ? <p className='otherRow dataRow'>0</p>
                                : <p className='otherRow dataRow'>{product[1].nutrition.nutrients[fatPos].amount} g</p>
                            }
                            
                            {product[1].nutrition.nutrients[satPos] === undefined
                                ? <p className='otherRow dataRow'>0</p>
                                : <p className='otherRow dataRow'>{product[1].nutrition.nutrients[satPos].amount} g</p>
                            }
                            {product[1].nutrition.nutrients[sodPos] === undefined
                                ? <p className='otherRow dataRow'>0</p>
                                : <p className='otherRow dataRow'>{product[1].nutrition.nutrients[sodPos].amount / 1000} g</p>
                            }
                            {product[1].nutrition.nutrients[proPos] === undefined
                                ? <p className='otherRow dataRow'>0</p>
                                : <p className='otherRow dataRow'>{product[1].nutrition.nutrients[proPos].amount} g</p>
                            } 
                            <FontAwesomeIcon className="deleteIcon" icon={faTimesCircle} onClick={() => { deleteJournalItemP(id[index]) }}/>
                        </div>
                    )
                })
        }
            
            {
            simpleList.length === 0
            ? null
            :<div className="row productsRow">
                <p> Simple<br></br> Foods</p>
            </div>
            }
            {
                simpleList.map((product, index, id) => {
                    
                    const calPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Calories');
                    const fatPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Fat');
                    const sugarPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sugar');
                    const satPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Saturated Fat');
                    const sodPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sodium');
                    const proPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Protein');

                    return (
                        <div key={index} className="row">
                            <p className="nameRow">{product[1].name.substring(0, 30)}</p>
                            {product[1].nutrition.nutrients[calPos] === undefined
                                ? <p className='otherRow dataRow'>0</p>
                                : <p className='otherRow dataRow'>{product[1].nutrition.nutrients[calPos].amount * 50}</p>
                            }
                            <p className='otherRow dataRow'>{product[1].nutrition.caloricBreakdown.percentCarbs}%</p>

                            {product[1].nutrition.nutrients[sugarPos] === undefined
                                ? <p className='otherRow dataRow'>0</p>
                                : <p className='otherRow dataRow'>{product[1].nutrition.nutrients[sugarPos].amount} g</p>
                            }

                            {product[1].nutrition.nutrients[fatPos] === undefined
                                ? <p className='otherRow dataRow'>0</p>
                                : <p className='otherRow dataRow'>{product[1].nutrition.nutrients[fatPos].amount} g</p>
                            }

                            {product[1].nutrition.nutrients[satPos] === undefined
                                ? <p className='otherRow dataRow'>0</p>
                                : <p className='otherRow dataRow'>{product[1].nutrition.nutrients[satPos].amount} g</p>
                            }
                            {product[1].nutrition.nutrients[sodPos] === undefined
                                ? <p className='otherRow dataRow'>0</p>
                                : <p className='otherRow dataRow'>{product[1].nutrition.nutrients[sodPos].amount} g</p>
                            }
                            {product[1].nutrition.nutrients[proPos] === undefined
                                ? <p className='otherRow dataRow'>0</p>
                                : <p className='otherRow dataRow'>{product[1].nutrition.nutrients[proPos].amount} g</p>
                            }
                            <FontAwesomeIcon className="deleteIcon" icon={faTimesCircle} onClick={()=>{deleteJournalItemS(id[index])}}/>
                            
                        </div>
                    )
                })
            }
            <div className="totalRow">
                {
                    productList.length === 0
                        ? null
                        : <div className="row productsRow">
                            <p> Totals</p>
                        </div>
                }
                {
                    productList.length === 0
                        ? null
                        : <div className='row'>
                            <p className="nameRow"></p>
                            <p className='otherRow dataRow'>{caloriesTotal} </p>
                            <p className='otherRow dataRow'>{carbsTotal} %</p>
                            <p className='otherRow dataRow'>{sugarTotal} g</p>
                            <p className='otherRow dataRow'>{fatTotal} g</p>
                            <p className='otherRow dataRow'>{saturatedTotal} g</p>
                            <p className='otherRow dataRow'>{sodiumTotal} g</p>
                            <p className='otherRow dataRow'>{proteinTotal} g</p>
                            <FontAwesomeIcon icon={faHeart} />
                        </div>





                }


            </div>
    </div>
    )
}

export default Diary