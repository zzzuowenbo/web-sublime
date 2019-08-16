import axios from 'axios';
import { removeUsername } from 'util';
import { SERVER,API_CONFIG } from './config.js';

const getApiObj = (apiConfig)=>{
    const apiObj = {}
    for(let key in apiConfig){
        apiObj[key] = (data)=>{
            let url = apiConfig[key][0] || '';
            url = SERVER + url;
            let method = apiConfig[key][1] || 'get';
            return request(url,method,data);
        }
    }
    return apiObj
}

const request = (url,method,data)=>{
    return new Promise((resolve,reject)=>{
        axios({
            method: method,
            url:url,
            withCredentials:true,
            data:data
        })
        .then(result=>{
            const data  = result.data;
            if(data.code == 10){
                removeUsername();
                window.location.href = '/login';
                reject('用户没有权限');
            }
            resolve(data)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

export default getApiObj(API_CONFIG);
