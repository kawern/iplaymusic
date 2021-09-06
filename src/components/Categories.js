import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link } from '@reach/router'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@reach/accordion";
import { IoEllipsisHorizontalSharp } from 'react-icons/all'
import "animate.css"
import './Categories.scss'
import Drawer from "./Drawer";


const Categories = () => {

  const { token } = useContext(TokenContext)    
    const [categories, setCategories] = useState();
    const [playlists, setPlaylists] = useState();

useEffect(() => {
    if(token) {
    axios.get('https://api.spotify.com/v1/browse/categories?country=DK', {
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

const handleClick = value => async() => {
  axios.get(`https://api.spotify.com/v1/browse/categories/${value}/playlists`, {
    headers: {
        "Authorization": token
    }
})
.then(response => setPlaylists(response.data.playlists.items))
}

playlists && console.log(playlists)
  return ( 
    
    <div>
      <h1>Categories</h1>
       <Accordion
       style={{marginBottom: "5em"}}
       collapsible>
        {categories?.map((category, color) =>
      <AccordionItem>
      
          <AccordionButton
          style={{backgroundColor:colors[color%9],
          }}
          onClick={handleClick(category.id)}>

            <p>{category.name}</p>
            <p><IoEllipsisHorizontalSharp size={25} style={{paddingTop:"1em"}}/></p>

          </AccordionButton>
          
         { playlists?.map(playlist => (
        <AccordionPanel>
        <Link to={`/playlist/${playlist.id}`}>
                {playlist.name}
                </Link>
        </AccordionPanel>
        ))}
      </AccordionItem>
      )}
    </Accordion>
    <Drawer/>
  </div>
   );
        }
 
export default Categories;