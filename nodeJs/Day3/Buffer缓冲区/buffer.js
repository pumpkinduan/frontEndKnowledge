//字节: 一个字节表示8个二进制位，一个 bit位 就是 一个0或1
// 一个字节 也可以表示2个16进制位(可理解为用于放16进制数的格子)，即为(0-9A-F)(0-9A-f)
//因为一个16进制数占4个bit F --> 1111
//同理可以推出 一个10进制数占4个bit  9 --> 1001


//一. 三种创建方式
//1. Buffer.alloc(size,fill,encoding); 默认是 用16进制表示法来存储的
// size为number，表示分配一个大小为 size 字节的新 Buffer
// fill是用于预填充新Buffer的值，默认值为0.可以是字符串，整数，Buffer。
// let buf1 = Buffer.alloc(4, 40);
// console.log(buf1)//<Buffer 28 28 28 28>


//2.1 Buffer.from(String, encoding) 
//encoding默认值位 'utf-8'; String为要编码的字符串
// const buf2 = Buffer.from('A');
// console.log(buf2);

// 2.2 Buffer.from(Array) 
// const buf3 = Buffer.from([10,20,255]);
// console.log(buf3);//<Buffer 0a 14 ff>
// const buf31 = Buffer.from(['a',20,255]);
// console.log(buf31);//<Buffer 00 14 ff> 只能转换数组中的数字类型为对应的16进制


//Buffer的常见api
//3.1 buf.fill(val, offset, end, encoding) 用于初始化数据
// const buf4 = Buffer.alloc(4, 12);
// console.log(buf4);//<Buffer 0c 0c 0c 0c>
// buf4.fill(0, 0);
// console.log(buf4);//<Buffer 00 00 00 00>


//3.2 buf.write(string, offset, length, encoding);
// length: 要写入的字符串所占的字节数
//若是字符串的实际所占字节数小于length设置的值则按实际字节数来算
//否则会截断某一部分编码后的字符串
const buf5 = Buffer.alloc(9);
buf5.write('a', 0, 1);
buf5.write('南瓜', 1, 6);//6表示 '南瓜' 占6个字节，buffer内存必须有6个字节才可以放下，不然会截断放不下的编码后的字符串
// console.log(buf5.toString());//a南瓜
buf5.write('帅了', 7, 6);
console.log(buf5.toString());//a南瓜,可以看出 '帅了'编码后的16进制数没有写入buffer中,因为没有内存了嘛