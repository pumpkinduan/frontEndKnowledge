(function(window) {
	function Food() {
		return new Food.prototype.init(22, 22, 0, 0, 'absolute','images/apple.png');
	}
	Food.prototype = {
		constructor: Food,
		init: function(w, h, x, y, position, img) {
			this.width = w;
			this.height = h;
			this.x = x;
			this.y = y;
			this.position = position;
			this.img = img;
		},
		show: function(totalW, totalH, $map) {
			var apple = $('<span class="apple"></span>');
			//用地图的总宽度和高度分别除以食物的宽高,获得一个整数来代表每一个小格子
			//即单位坐标格
			this.apple = apple;//把该dom存在food对象上
			this.x = Math.floor(Math.random() * (totalW / this.width)) * 22;
			this.y = Math.floor(Math.random() * (totalH / this.height)) * 22;
			apple.css({
				'position':this.position,
				'display':'inline-block',
				'left':this.x,
				'top':this.y,
				'width':this.width,
				'height':this.height,
				'backgroundImage':'url(' + this.img + ')',
			})
			// console.log(apple)
			apple.appendTo($map);
		}
	}
	Food.prototype.init.prototype = Food.prototype;
	window.Food = Food;
}(window))