//选择排序:每次循环数组找到最小的值,依次类推
function select_sort(arr) {
	let len = arr.length;
	let minVal = null;//最小值
	let minIndex = 0;
	let switchVal = null;
	for (let i = 0; i < len; i ++) {
		minVal = arr[i];
		for (let j = i; j < len; j ++) {//该for循环得出最小值的索引
			if ( arr[j] < minVal ) {
				minIndex = j;
			}
		}
		//将最小值放在首位
		if ( minIndex !== i ) {
			switchVal = arr[i];
			arr[i] = arr[minIndex];
			arr[minIndex] = switchVal;
		}
	}
	return arr;
}
console.log(select_sort([1,3,5,6,0]))