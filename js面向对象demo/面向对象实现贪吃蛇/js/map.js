//贪吃蛇(对象),分三部分走
/*
	1.地图
	2.食物
	3.蛇
*/

//封装一个地图函数
(function(window) {
	function Map($map) {
		return new Map.prototype.init(590, 240, 'absolute', 463, 232, $map);
	}
	Map.prototype = {
		constructor: Map,
		init: function(w, h, position, x, y, $map) {
			this.width = w;
			this.height = h;
			this.position = position;
			this.left = x;
			this.top = y;
			this.$map = $map;
		},
		show: function() {
			this.$map.css({
				'width':this.width,
				'height':this.height,
				'position': this.position,
				'left': this.left,
				'top': this.top
			})
		}
	}
	Map.prototype.init.prototype = Map.prototype;
	window.Map = Map;
}(window))