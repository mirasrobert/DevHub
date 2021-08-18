// Toast Reducer
import { SET_TOAST, REMOVE_TOAST } from '../actions/constant';

const initialState = [];

// action will have a 'type' and 'payload'
export default function(state = initialState, action) {


    switch(action.type) {
        case SET_TOAST:
            return [...state, action.payload];

        case REMOVE_TOAST:
            return state.filter(alert => alert.id !== action.payload);

        default:
            return state;    
    }
}