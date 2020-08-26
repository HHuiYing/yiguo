import axios from 'axios';

const request = axios.create({
    baseURL: 'http://10.3.138.12:2003/api'
});


// export const nsg = axios.create({
//     baseURL:'http://www.nsg.com'
// });

// axios.get(url,config)
// axios.post(url,data,config)

export default request;