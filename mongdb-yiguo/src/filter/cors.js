const allow_origin = ['http://localhost:8080', 'http://localhost:8081', "http://120.24.62.247:2004", "http://120.24.62.247:2005"]

function cors(req, res, next) {

    // 获取请求者的域名
    const origin = req.get('Origin')
    if (allow_origin.includes(origin)) {
        res.set({
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
            "Access-Control-Allow-Methods": "PUT,POST,GET,PATCH,DELETE,OPTIONS",
            "Access-Control-Allow-Credentials": true
        })
        // 跨域请求CORS中的预请求
        if (req.method == "OPTIONS") {
            res.sendStatus(200); /*让options请求快速返回*/
        } else {
            next();
        }
    } else {
        next()
    }
}

module.exports = cors;