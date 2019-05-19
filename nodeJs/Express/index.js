let express = require('express');
let globalConf = require('./config.js');
let app = new express();
let loader = require('./loader.js');
let cookieParser = require('cookie-parser');//解析cookie;
let multer = require('multer');// for handling multipart/form-data
let upload = multer({dest: 'uploads/'});
//http://localhost:8090/
app.use(express.static(globalConf['page_path']));
// app.use('/a/b/c', function(req, res, next) {
//     //http://localhost:8090/a/b/c/d
//     console.log(req.url) // /d
//     console.log(req.baseUrl)// /a/b/c
//     console.log(req.path) // /d
//     res.send('over')
// })
/**
 * use方法就与我们之间写的一个url对应一个接口方法(中间件函数)大致一样,具体参考node_demo2
 *使用app.use(expreqs.static(root));
  express.static(root): 返回一个serverStatic类的中间件函数,该函数的执行如下:
  使用use方法,我们指定的路径(这里是'/a/b/c')是 客户端请求的路径的子集时就会执行serverStatic类的中间件函数

  如: 客户端请求路径为 /,其基路径为 /, use方法中指定的路径为 /,可以匹配,就会执行对应的中间件函数,
      serverStatic类的中间件函数会读取root + req.url结合路径下的文件,而我们的静态文件放在 page下,
      就会读取 /page下的所有文件,然后返回 客户端请求的文件,若没有则返回404

 */
//middleware注意点:
//middleware:(the middleware function is executed when the base of the requested path matches path.)
//Middleware functions are executed sequentially, therefore the order of middleware inclusion is important.
//app.use(path, middleware)
//path: 默认为 '/' 
// app.get('/', function(req, res) {
//      res.send('你好');
// })
app.use(cookieParser())//对所有请求发过来的cookie进行解析并存储到req.cookies中
app.get('/api/*', function(req, res, next) {
    if ( !req.cookies.id ) {
        res.redirect(302, '/login.html');  
    } else {
        next();
    }
})
app.get('api/getData', loader.get('api/getData'));
app.get('api/addStudent', loader.get('api/addStudent'));
app.get('/login', loader.get('/login'));
app.get('/getPic', loader.get('/getPic'))
//upload.single('file_msg')中的file_msg 为 form表单中name指定的参数
// The single file will be stored in req.file.
app.post('/upload', upload.single('file_msg'), loader.get('/upload'));
app.listen(globalConf['port'], () => {
    console.log(`Example app listening on port ${globalConf['port']}!`);
})