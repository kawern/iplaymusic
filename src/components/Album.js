/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link } from '@reach/router'
import { AiFillPlayCircle } from 'react-icons/ai'

    const Album = () => {

    const style = css `
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 325px;
    }
    p:nth-child(1) {
        font-weight: bold;
    }
    p:nth-child(3) {
        font-weight: lighter;
    }
    .song_artist {
        margin-right: 9em;
        line-height: 1.7em;
    }

    `
    return (
    <div css={style}>
    <h1>Album</h1>
    <ul>
        <li>
        <p><AiFillPlayCircle size={36}/></p>
        <div className="song_artist">
        <p>Song name</p>
        <p>Artist</p>
        </div>
        <p>3:33</p>
        </li>
    </ul>
    </div>
    );
}
 
export default Album;