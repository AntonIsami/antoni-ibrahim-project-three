import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import NutritionDatabase from './firebase.js';
import { useState, useEffect } from 'react';

const Diary = () => {
    const [ productObjects, setProductObjects ] = useState([]);
    const [ simpleObjects, setSimpleObjects ] = useState([]);
    const [ productList, setProductList] = useState([]);
    const [ simpleList, setSimpleList ] = useState([]);
    const database = getDatabase(NutritionDatabase);
    const dbRef = ref(database);
    
    
   
    useEffect( ()=>{
        //grab database array for simple foods
        const dbRootAddress = ref(database, 'Products')
        onValue(dbRootAddress, (response)=>{
        
        setProductList(Object.entries(response.val()))
        
        },[])
    },[productObjects])

    
    useEffect(() => {
        //grab database array for simple foods
        const dbRootAddress = ref(database, 'simpleFoods');
        onValue(dbRootAddress, (response) => {
        setSimpleList(Object.entries(response.val()))
        },[])
    }, [simpleObjects])
    
    // const setDiary = () => {
    //     productList.map((product) => {
    //         console.log(product);
    //         const calPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Calories');

    //         const carbPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Carbohydrates');

    //         const fatPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Fat');

    //         const sugarPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sugar');

    //         const transPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Trans Fat');

    //         const satPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Saturated Fat');

    //         const sodPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sodium');

    //         const proPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Protein');

    //         const fibPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Fiber');

    //         return (
    //             <div key={product.id} className="row">
    //                 <p>{product.title}</p>
    //                 <p>{product[1].nutrition.nutrients[calPos].amount}</p>
    //                 <p>Carbs</p>
    //                 <p>Sugar</p>
    //                 <p>Fat</p>
    //                 <p>Trans Fats</p>
    //                 <p>Sat. Fats</p>
    //                 <p>Sodium</p>
    //                 <p>Protein</p>
    //                 <p>Fiber</p>
    //             </div>
    //         )
    //     })
    // }
    
        
    return (
    <div className='diaryTable'>
       <div className="row">
           <p className='nameRow'>Name</p>
           <p className='otherRow nutrientName'>Calories</p>
           <p className='otherRow nutrientName'>Carbs</p>
            <p className='otherRow nutrientName'>Sugar</p>
            <p className='otherRow nutrientName'>Fat</p>
            <p className='otherRow nutrientName'>Trans<br></br> Fats</p>
            <p className='otherRow nutrientName'>Sat.<br></br> Fats</p>
            <p className='otherRow nutrientName'>Sodium</p>
            <p className='otherRow nutrientName'>Protein</p>
          
       </div>
       <div className="row productsRow">
           <p> Products</p>
       </div>
        {
                productList.map((product) => {
                    console.log(product);
                    const calPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Calories');

                    const carbPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Carbohydrates');

                    const fatPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Fat');

                    const sugarPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sugar');

                    const transPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Trans Fat');

                    const satPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Saturated Fat');

                    const sodPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sodium');

                    const proPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Protein');

                  

                    return (
                        <div key={product[1].id} className="row">
                            <p className="nameRow">{product[1].title.substring(0, 30)}</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[calPos].amount}</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.caloricBreakdown.percentCarbs}%</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[sugarPos].amount} g</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[fatPos].amount} g</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[transPos].amount} g</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[satPos].amount} g</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[sodPos].amount} g</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[proPos].amount} g</p>
                            
                        </div>
                    )
                })
        }
        
       {/* 
       
       Make a table for diary
       Organize rows by macro nutrients
       Make one section for products and one section for simple foods 
       Organize rows by macro nutrients
       Have a bottom total row to add up the totals for all the macro nutrients
       */}
       {/* <button onClick={()=>{setDiary()}}>Now</button> */}
    </div>
    )
}

export default Diary