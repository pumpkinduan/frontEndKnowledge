(function(window) {
	function Snake() {
		return new Snake.prototype.init();
	}
	Snake.prototype = {
		constructor: Snake,
		speed: 300,
		scores: 0,
		init: function(x, y) {
			//蛇的身体部分,数组的长度代表蛇的长度
			//x,y为蛇移动坐标
			// this.x = x;
			// this.y = y;
			this.left = false;
			this.right = false;
			this.up = true;
			this.down = true;
			this.direction = 'right';
			this.snake = [
				[3, 0, 'snakeHead'],
				[2, 0, 'snakeBody'],
				[1, 0, 'snakeBody']
			]
			this.width = 22;
			this.height = 22;
			this.positon = 'absolute';

		},
		show: function($map) {
			var len = this.snake.length;
			for (var i = 0; i < len; i++) {
				var s = $('<span></span>');
				// console.log(this.snake[0][0])
				// console.log(this.x)
				s.addClass(this.snake[i][2]);
				s.appendTo($map);
				s.css({
					'position': 'absolute',
					'display': 'inline-block',
					'left': this.snake[i][0] * this.width,
					'top': this.snake[i][1] * this.height,
					'width': this.width,
					'height': this.height,
				})
			}
			var $head = $('.snakeHead');
			switch (this.direction) {
				case 'right':
					$head.css({
						'transform': 'rotate(0deg)'
					})
					break;
				case 'left':
					$head.css({
						'transform': 'rotate(180deg)'
					})
					break;
				case 'up':
					$head.css({
						'transform': 'rotate(270deg)'
					})
					break;
				case 'down':
					$head.css({
						'transform': 'rotate(90deg)'
					})
					break;
			}
		},
		change: function() {
			var len = this.snake.length;
			for (var i = len - 1; i > 0; i--) {
				// 让身体跟着头部走
				// console.log(this.snake)
				this.snake[i][0] = this.snake[i - 1][0];
				this.snake[i][1] = this.snake[i - 1][1];
				// break;
			}
			// 蛇头在规定时间内移动一格
			if (this.direction == 'right') {
				this.snake[0][0] += 1;
			}
			if (this.direction == 'left') {
				this.snake[0][0] -= 1;
			}
			if (this.direction == 'up') {
				this.snake[0][1] -= 1;
			}
			if (this.direction == 'down') {
				this.snake[0][1] += 1;
			}
		},
		setDirection: function(code) {
			switch (code) {
				case 37:
					if (this.left) {
						//向左运动,不能按左右键
						this.left = false;
						this.right = false;
						this.up = true;
						this.down = true;
						this.direction = 'left';
					}
					break;
				case 38:
					if (this.up) {
						this.left = true;
						this.right = true;
						this.up = false;
						this.down = false;
						this.direction = 'up';
					}
					break;
				case 39:
					if (this.right) {
						this.left = false;
						this.right = false;
						this.up = true;
						this.down = true;
						this.direction = 'right';
					}
					break;
				case 40:
					if (this.down) {
						this.left = true;
						this.right = true;
						this.up = false;
						this.down = false;
						this.direction = 'down';
					}
					break;
					// defafault:
			}
		},
		eatFood: function(food, totalW, totalH, $map) {
			//代表蛇尾的x和y坐标,
			// 取到蛇尾的坐标作为需要增加的蛇的坐标
			var endX = this.snake[this.snake.length - 1][0];
			var endY = this.snake[this.snake.length - 1][1];
			if (this.snake[0][0] * 22 == food.x && this.snake[0][1] * 22 == food.y) {
				food.apple.remove();
				food.show(totalW, totalH, $map);
				//吃到一个苹果加一分,蛇+一节
				this.scores++;
				this.speed += 5;
				switch (this.direction) {
					case 'right':
						//蛇右走吃到食物时,增加的蛇x应比原来蛇尾x坐标小1,y不变,以此类推
						this.snake.push([endX - 1, endY, 'snakeBody'])
						break;
					case 'left':
						this.snake.push([endX + 1, endY, 'snakeBody'])
						break;
					case 'up':
						this.snake.push([endX, endY + 1, 'snakeBody'])
						break;
					case 'down':
						this.snake.push([endX, endY - 1, 'snakeBody'])
						break;
						this.show($map);
						// console.log(this.snake)
				}
			}
			return this.scores;
		},
		snakeMove: function($map) {
			this.change();
			//移出之前的蛇
			$('.snakeHead').add('.snakeBody').remove();
			//当蛇数组中的坐标发生改变时重新展示
			this.show($map);
		},
		snakeDead: function(map) {
			if(this.snake[0][0] * 22 >= map.width || this.snake[0][0] * 22 < 0){
				return true;
			}
			if(this.snake[0][1] * 22 >= map.height || this.snake[0][1] * 22 < 0){
				return true;
			}
			//获取蛇头的x,y
			var snakeHX = this.snake[0][0];
			var snakeHY = this.snake[0][1];
			var len = this.snake.length;
			for(var i = 1;i < len;i++){
				if(snakeHX == this.snake[i][0] && snakeHY == this.snake[i][1]){
					return true;
				}
			}
		}
	}
	Snake.prototype.init.prototype = Snake.prototype;
	window.Snake = Snake;
}(window))