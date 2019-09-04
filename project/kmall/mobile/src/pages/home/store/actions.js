import api from 'api';
import {GET_ADS,GET_FLOORS} from './types.js';
export default {
    async [GET_ADS]({commit}){
        const result = await api.getPositionAds()
        if(result.code == 0){
            commit(GET_ADS,{homeAds:result.data})
        }
    },
    async [GET_FLOORS]({commit}){
        const result = await api.getFloors()
        if(result.code == 0){
            commit(GET_FLOORS,{homeFloors:result.data})
        }
    }                       
}