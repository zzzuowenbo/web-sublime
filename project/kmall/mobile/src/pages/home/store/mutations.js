import {GET_ADS,GET_FLOORS} from './types.js';
export default {
    [GET_ADS](state,payload){
        state.ads = payload.homeAds      
    },
    [GET_FLOORS](state,payload){
        state.floors = payload.homeFloors      
    }                       
}