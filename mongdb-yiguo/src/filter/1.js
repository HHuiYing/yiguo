// const allow_origin = ['localhost:2003', 'http://10.3.138.12:8080']

function cors(req, res, next) {

    // 设置响应头
    console.log('Origin:', req.get('host'));
    if (req.get('host') === "localhost:2003") {
        res.set({
            "Access-Control-Allow-Origin": "localhost:8080",
            "Access-Control-Allow-Headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,withCredentials:true",
            "Access-Control-Allow-Methods": "PUT,POST,GET,PATCH,DELETE,OPTIONS",
            "Access-Control-Allow-Credentials": true
        })
    } else if (req.get('host') === "http://10.3.138.12:8080") {
        console.log(222222)
        res.set({
            "Access-Control-Allow-Origin": "http://10.3.138.12:8080",
            "Access-Control-Allow-Headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,withCredentials:true",
            "Access-Control-Allow-Methods": "PUT,POST,GET,PATCH,DELETE,OPTIONS",
            "Access-Control-Allow-Credentials": true
        })
    }

    
    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") {
        res.sendStatus(200); /*让options请求快速返回*/
    } else {
        next();
    }
    // } else {
    //     res.send(401)
    // }

}
module.exports = cors;