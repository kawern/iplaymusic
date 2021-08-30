/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link } from '@reach/router'
import { BsThreeDots } from 'react-icons/bs'

    const Test = () => {

    const style = css `
    li {
        display: flex;
        justify-content: space-between;
        color: white;
        font-weight: bold;
        width: 325px;
        height: 54px;
        line-height: 54px;
        margin-bottom: 1em;
        /* background-color: #E54028; */
        border-radius: 8px;

        & p {
            padding: 0 24px;
        }
}
.PlaylistSlider__container {
        max-width: 325px;
    }
.PlaylistSlider_Slides {
  overflow: auto;
  white-space: nowrap;
}

.PlaylistSlider_Slides a {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}

    `
        
    const { token } = useContext(TokenContext)    
    const [categories, setCategories] = useState();

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

categories && console.log(categories);

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



    return (
    <div css={style}>
    <h1>Categories</h1>
<ul>
        {categories?.map((category, i) =>
        <Link to={`/category/${category.id}`}>
        <li style={{backgroundColor:colors[i%9]}} key={i}>
        <p>{category.name}</p>
        <p><BsThreeDots size={25} style={{paddingTop:"0.8em"}}/></p>
    </li>
    </Link>
    )}
    </ul>
    
    </div>
    );
}
 
export default Test;