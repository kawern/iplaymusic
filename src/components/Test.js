import Collapsible from 'react-collapsible';
import './test.scss'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link } from '@reach/router'
import { BsThreeDots } from 'react-icons/bs'



const Test = () => {

  const { token } = useContext(TokenContext)    
    const [categories, setCategories] = useState();
    const [playlists, setPlaylists] = useState();

useEffect(() => {
    if(token) {
    axios.get('https://api.spotify.com/v1/browse/categories', {
        headers: {
            "Authorization": token
        }
    })
    .then(response => setCategories(response.data.categories.items))
}
}, [token])

const colors = [
  '#D70060',
  '#E54028',
  '#F18D05',
  '#F2BC06',
  '#5EB11C',
  '#3A7634',
  '#0ABEBE',
  '#00A1CB',
  '#115793',
];

categories && console.log(categories)
playlists && console.log(playlists)
  return ( 
    <div>
      <ul>
        {categories?.map((category, color) =>
        <Collapsible trigger={category.name}
        contentContainerTagName="subcategory"
        containerElementProps={category.id}
        triggerStyle={{backgroundColor:colors[color%9]}}>
      
            <div className="subcategory">
Root er noob
            
          </div></Collapsible>
    )}
    
    </ul>

  </div>
   );
}
 
export default Test;