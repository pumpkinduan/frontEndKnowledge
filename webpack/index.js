import {sum} from './src/sum.js';
import './index.css';//将css代码导入到bundle.js中去,必须在配置文件中进行loader配置或插件配置用于解析css
console.log(sum(2,2))
console.log(222)
console.log(222222)
if ( module.hot ) {
    module.hot.accept();//让当前的js文件支持热更新
}
