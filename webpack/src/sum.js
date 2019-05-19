// import lodash from 'lodash-es';
//若没有进行deep js tree shaking,则lodash这个包都会被打包输出到指定文件中,造成体积庞大
function sum(n1, n2) {
    return n1 / n2;
}
function isArray() {
    // return lodash.isArray;
}
export {
    sum,
    isArray
}