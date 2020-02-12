// stram: 流 是一组有序的，有起点和终点的字节数据的传输手段
let fs = require('fs');
// 1. 创建读写流
let rs = fs.createReadStream(__dirname + '/source/a.txt', {
    highWaterMark: 3//缓存区的大小 (字节)：表示读3个字节大小的数据放入缓存区，然后在发射出去，就是执行data事件的cb
});
let ws = fs.createWriteStream(__dirname + '/source/a_copy.txt', {
    highWaterMark: 3
});

//2.监听可读流的打开
rs.on('open', () => {
    console.log('写入流已经打开了, 开始读取文件');
})

//3.监听可读流的data事件
rs.on('data', (data) => {
    console.log('可写流读取到的数据');
    console.log(data);
    // 可写流的写入
    let flag = ws.write(data);
    console.log(flag);//如果缓存区已满 ，返回false,如果缓存区未满，返回true
})

//4. 监听可读流的end事件
rs.on('end', () => {
    console.log('可写流已经读取数据完成');
})

//监听可写流的 drain事件
//表示：操作系统缓存区中的数据已全部读出，可继续
ws.on('drain', () => {
    console.log('data is drained')
})
/**
 * 当你往可写流里写数据的时候，不是会立刻写入文件的，
 * 而是会很写入缓存区，缓存区的大小就是highWaterMark,默认值是16K。
 * 然后等缓存区满了之后再次真正的写入文件里
 */

/**
 * 在nodejs中，当OS的缓存区中的数据已全部写满时，不代表不能继续写数据
 * 继续写会将数据缓存在内存中，待OS缓存区中的数据全部清空时(写入到指的的文件中)
 * 首先将内存中的数据写入到OS的缓存区中，然后OS的缓存区中的数据全部被读出并写入到目标文件时
 * 会触发drain的回调函数
 */

