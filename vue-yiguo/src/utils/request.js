import axios from 'axios';
// 按需导入 ElementUI 组件
//import { Loading, Message } from 'element-ui'

const request = axios.create({
    baseURL:'http://10.3.138.12:2003/api', //基础路径
    //timeout: 3000, //请求事件超过3s；如果3s后都没有响应，就断开请求
    
});

// const loading = {

// }

// export const nsg = axios.create({
//     baseURL:'http://www.nsg.com'
// });

// axios.get(url,config)
// axios.post(url,data,config)

export default request;