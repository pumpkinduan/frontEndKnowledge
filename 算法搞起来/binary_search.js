/**
 * 二分法查找:仅当列表是有序的时候才奏效
 * 假设有一个包含128个名字的有序列表使用二分法查找其中的一个名字，最多需要几次能够找到
 * n = log2(128) = 6
 */
var arr = [1,2,3,4,5,6,7,8];
// 找出9
function binary_search(arr, target) {
	var len = arr.length;//数组长度
	if ( len <= 1) {return arr[0] || null};
	var firstIndex = 0;//成员的起初索引
	var lastIndex = len - 1;//成员的最后索引
	while( firstIndex <= lastIndex ) {
		var midIndex = Math.floor((firstIndex + lastIndex) / 2)//中间值索引
		var guess = arr[midIndex];//从中间开始猜测
		if ( guess === target ) {
			return guess;//找到就返回
		}else if ( guess > target) {
			lastIndex = midIndex - 1;
		} else {
			firstIndex = midIndex + 1;
		}
	}
	return null;
}
console.log(binary_search(arr, 8))