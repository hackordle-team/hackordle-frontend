import React from "react";
import { GameState } from "../const/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RemoveColumn = (gameState: GameState) => {
    // if ( wordOfDay.length < gameState.cellNumber) {
    //     gameState.cellNumber -= 1;
    //     console.log("123");
    // } else {
    //     console.log("234");
    // }
    console.log("ASD");
    toast(' Wow so easy!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    
}

export default RemoveColumn