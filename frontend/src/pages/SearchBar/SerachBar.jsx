import React,{useContext,useState,useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import FoodItem from '../../components/FoodItem/FoodItem'
import { StoreContext } from '../../context/StoreContext'
import { food_list } from "../../assets/assets";


const SerachBar = () => {
    
    const [SearchingFood, setSearchingFood] = useState('');

    const{food_list} = useContext(StoreContext);

    const handleSearch = async(e) =>{
            e.preventDefault()
            console.log(e.target.querySelector('.search-input').value);
           setSearchingFood( e.target.querySelector('.search-input').value);
        };
    
    
  return (
    <>
    <div className='home'>
        <form onSubmit={handleSearch} className='search-form'>
            <input 
                type="text" 
                placeholder='Search for movies...' 
                className="search-input" 
            />
            <button type='submit' className="search-button">Search</button>
        </form>
    </div>
    <div className='food-display' id='food-display'>

        <div className="food-display-list">
            {food_list.filter(item => 
                item.name.toLowerCase().startsWith(SearchingFood.toLowerCase())
            ).map((item, index) => (
                <FoodItem 
                    key={index} 
                    id={item._id} 
                    name={item.name} 
                    description={item.description} 
                    price={item.price} 
                    image={item.image} 
                />
            ))}
        </div>
    </div>
    </>
  )
}

export default SerachBar
