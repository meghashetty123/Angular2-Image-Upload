import {ActionReducer} from "@ngrx/store";
import { LOAD, ADD, INIT, Actions } from "../action/imageaction";



export const initialstate:string[]=[];


export const imageReducer: ActionReducer<string[]> = ( imagesstate:string[]=initialstate, action: Actions) => {
   
    switch(action.type){
      
        case LOAD:
        const images = action.payload;         
            return images;
        case ADD:
             const image =action.payload;
               imagesstate.push(image);
            return imagesstate;
        case INIT:
             imagesstate=initialstate;
             return imagesstate;
        
    }
};