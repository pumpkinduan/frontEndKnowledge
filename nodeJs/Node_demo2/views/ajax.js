function toStr(obj) {
	var arr = [];
	obj.t = new Date().getTime();
	for( var key in obj) {
		//注意:url中不能出现中文,故需要对其进行转码
		arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
	}
	return arr.join('&');
}
function ajax(opt) {
	
	//0.兼容ajax在ie下的缓存问题,在ie下,每个url地址都i对应着一个服务器返回的结果,
	// 因此需要在每次发送Ajax请求时,变换url地址,所以可在url后面拼接上一个无用的参数

	//把需要传递给服务器的对象形式的数据转换成‘lessonId = 1052613171 & courseId = 1005220017’，
	// 这种key=value形式,在拼接到url地址栏后面
	// console.log(opt.data)
	var data = toStr(opt.data);
	//1.创建向服务器发送http请求的异步对象
	var xml, timer;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xml = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xml = new ActiveXObject('Microsoft.HTTP')
	}
	//2.给异步对象设置请求方式和请求的地址
	if(opt.method.toUpperCase() === 'GET') {
		xml.open('GET', opt.url + '?' + data, true);
		//3.发送请求
		xml.send();
	}else if(opt.method.toUpperCase() === 'POST'){
		xml.open('POST', opt.url, true);
		xml.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xml.send(data);
	}
	
	//4.监听状态变化
	xml.onreadystatechange = function() {
		if (xml.readyState === 4) {
			//若是服务器已经响应请求,则关闭定时器
			clearInterval(timer);
			if (xml.status >= 200 && xml.status < 300 || xml.status === 304) {
				//5.处理返回的结果
				opt.success(xml);
			} else {
				opt.error(xml);
			}
		}
	}
	//来个请求时间的限定,若是请求的时间超过规定的时间,则终止ajax请求
	if(opt.time) {
		timer = setInterval(function() {
			xml.abort();
			clearInterval(timer);
		},opt.time)
	}
}