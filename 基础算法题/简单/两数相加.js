/**
 * 
 * @param {array} nums 
 * @param {number} target 
 * @return {array}
 */

// 第一种：暴力法（时间消耗久）
// var twoSum = function (nums, target) {
//     var len = nums && nums.length;
//     for (var i = 0; i < len; i++) {
//         for (var j = i + 1; j < len; j++) {
//             if (nums[i] + nums[j] == target && nums[i] !== nums[j]) {
//                 return [i, j];
//             }
//         }
//     }
// };

//第二种：hash法（内存消耗多，时间短，时间换空间）
var twoSum = function (nums, target) {
    var map = new Map();
    var len = nums.length;
    nums.forEach((num, index) => {
        map.set(num, index);
    })
    for (var i = 0; i < len; i++) {
        var j = map.get(target - nums[i]);
        if (j && j !== i) {
            return [i, j]
        }
    }
}
console.log(twoSum([1, 2, 2, 3, 4, 5], 4)) 