import axios from 'axios'
import {BACKEND_URL} from './hostSetting'


export const performRequest = (method, url,headers, params, auth) => {
 const body = method === 'get' ? 'params' : 'data'

 const config = {
   method,
   url,
   headers:headers,
   baseURL: BACKEND_URL,
   [body]: params || {}
 }

 return  axios.request(config);
}