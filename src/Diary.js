import { getDatabase, ref, onValue, remove } from 'firebase/database';
import NutritionDatabase from './firebase.js';
import { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faTimesCircle);

const Diary = () => {
    
    const [ productList, setProductList] = useState([]);
    const [ simpleList, setSimpleList ] = useState([]);
    const database = getDatabase(NutritionDatabase);
    
    
    
   
    useEffect( ()=>{
        //grab database array for simple foods
        const dbRootAddress = ref(database, 'Products')
        onValue(dbRootAddress, (response)=>{
        
        setProductList(Object.entries(response.val()))
        
        },[])
    },[database])

    
    useEffect(() => {
        //grab database array for simple foods
        const dbRootAddress = ref(database, 'simpleFoods');
        onValue(dbRootAddress, (response) => {

        setSimpleList(Object.entries(response.val()))

        },[])
    }, [database])

    const deleteJournalItem = () => {
        
    }
   
        
    return (
    <div className='diaryTable'>
       <div className="row">
           <p className='nameRow'>Name</p>
           <p className='otherRow nutrientName'>Calories</p>
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
                productList.map((product, index) => {
                    
                    const calPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Calories');

                   

                    const fatPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Fat');

                    const sugarPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sugar');

                    

                    const satPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Saturated Fat');

                    const sodPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sodium');

                    const proPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Protein');

                  

                    return (
                        <div key={index} className="row">
                            <p className="nameRow">{product[1].title.substring(0, 30)}</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[calPos].amount}</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.caloricBreakdown.percentCarbs}%</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[sugarPos].amount} g</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[fatPos].amount} g</p>
                            
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[satPos].amount} g</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[sodPos].amount} g</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[proPos].amount} g</p>
                            <FontAwesomeIcon className="deleteIcon" icon={faTimesCircle} onClick={() => { deleteJournalItem() }}/>
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
                simpleList.map((product, index) => {
                    
                    const calPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Calories');

                    

                    const fatPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Fat');

                    const sugarPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sugar');

                    

                    const satPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Saturated Fat');

                    const sodPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Sodium');

                    const proPos = product[1].nutrition.nutrients.map(function (e) { return e.name; }).indexOf('Protein');



                    return (
                        <div key={index} className="row">
                            <p className="nameRow">{product[1].name.substring(0, 30)}</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[calPos].amount}</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.caloricBreakdown.percentCarbs}%</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[sugarPos].amount} g</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[fatPos].amount} g</p>
                           
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[satPos].amount} g</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[sodPos].amount} g</p>
                            <p className='otherRow dataRow'>{product[1].nutrition.nutrients[proPos].amount} g</p>
                            <FontAwesomeIcon className="deleteIcon" icon={faTimesCircle} onClick={()=>{deleteJournalItem()}}/>

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
   
    </div>
    )
}

export default Diary