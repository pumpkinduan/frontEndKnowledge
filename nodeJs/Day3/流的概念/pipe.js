 //pipe是一种最简单直接的方法连接两个stream，内部实现了数据传递的整个过程，
 //在开发的时候不需要关注内部数据的流动
let fs = require('fs');
let rs = fs.createReadStream(__dirname + '/source/a.txt');
let ws = fs.createWriteStream(__dirname + '/source/b.txt')
// rs.pipe(ws); //就相当于stream.js读取a.txt与写入到a_copy.txt

 //pipe方法的实现原理
 rs.on('data', (data) => {
    let flag = ws.write(data);
    if ( !flag ) { //OS缓存区无空间
        //防止向内存中写入数据造成内存利用率下降
        rs.pause()//暂停读取数据到OS缓存区
    } 
 })
 ws.on('drain', () => {
    //等到OS缓存区的数据全部写入到目标文件
    //执行该回调函数,继续读取数据到缓存区
    rs.resume();
 })
 rs.on('end', () => {
    ws.end();
 })