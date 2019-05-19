function ajax(option) {
	if (!option) { return; }
	//由于url不能是中文的，所以在传输数据有时需要传输中文的，而这数据会拼接到url去，这样就会报错，所以需要进行转码
	// encodeURIComponent(string),对字符串进行uri组件编码，不会对ASCII码字母数字 - _ . ! ~ * ' ( ) 进行编码,但会对中文进行编码
	//如:张山---》 %E5%BC%A0%E4%B8%89%E4%B8%B0,转为这种格式的，然后浏览器会把它渲染成中文格式的
	function toString(data) {
		var res = [];
		for (var key in data) {
			res.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		}
		return res.join('&');
	}
	if (option.data) {
		//0.将传入的数据转为字符串格式
		option.data.t = new Date().getTime();//兼容ie
		option.data = toString(option.data);
	} else {
		option.data = '';
	}
	//    option:   为一个对象，把type, url, data, success, error ,time封装在这个对象里，可实现不按顺序便可实现Ajax功能;
	//a.  data:    传递给后台的参数  格式:{name:"pumpkin",age:18};
	//b.  url:     请求的服务器地址   格式: http://127.0.0.1:8888/;
	//c.  type:    请求的类型  如get或post;
	//d.  success: 服务器成功返回数据时执行的回调, 接收一个参数: 返回的数据;
	//e.  error:   请求数据失败时执行的回调,  接收一个参数: 错误对象;
	//f.  time:    限定请求的时间,超时将终止请求;
	//g.  jsonp:   jsonp跨域请求时,服务器给出的接口参数,默认为 cb; 如:jsonp: callback,则拼接在url后面为 http://127.0.0.1:8888/getData?callback=...
	//h.  jsonpCallBack:      为jsonp请求指定一个回调函数名; default: 随机组成的函数名; jsonpCallBack: doJson --> http://127.0.0.1:8888/getData?cb=doJson
	//i.  dataType:可供选择值:jsonp,表示进行jsonp请求,服务器返回jsonp(实质是包装了json数据的函数执行表达式)    

	//注意点: jsonp的值根据服务器那边给出的接口参数来定,有些是callback,有些是cb...
	//在进行jsonp请求时jsonpCallBack需要指定值,不然浏览器端运行返回的js代码时会报错

	//jsonp跨域请求
	option.jsonp ? option.jsonp : option.jsonp = 'cb';
	//模拟jq的随机函数
	option.jsonpCallBack ? option.jsonpCallBack : option.jsonpCallBack = 'pum' + Date.now();
	if (option.dataType && option.dataType === 'jsonp') {//jsonp请求
		var oScript = document.createElement('script');
		oScript.setAttribute('type', 'text/javascript');
		oScript.src = option.url + '?' + option.jsonp + '=' + option.jsonpCallBack + '&' + option.data;
		document.body.appendChild(oScript);
		oScript.onload = function() {
			//达到目的后删除,也就是拿到数据做了相应的功能实现,避免多次发生jsonp请求
			document.body.removeChild(oScript);
		}
	} else {
		//ajax请求,不可跨域
		//1.创建一个异步对象
		var xmlhttp = null,
			timer = null;
		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		// 2.设置请求的方式和地址
		/*
			method：请求类型：GET,POST...
			url：文件在服务器上的位置,该文件可以是任何类型的文件,
			比如.txt和.xml,或者服务器脚本文件,
			比如.asp和 .php在传回响应之前，能够在服务器上执行任务
			async:true(异步)，false(同步)--》基本无用
		*/
		/*
			注意点:
			在ie浏览器中，如果通过Ajax发送GET请求，那么ie认为同一个url只有一个结果，即不能实时的获取结果
			因此要保证每次请求的url地址不一样,可在url地址栏后拼接随机数
		*/
		//3.初始化请求
		if (option.type.toUpperCase() === 'GET') {
			xmlhttp.open("GET", option.url + "?" + dataStr, true);
			//4.发送请求
			xmlhttp.send();
		} else if (option.type.toUpperCase() === 'POST') {
			xmlhttp.open("POST", option.url, true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(dataStr);
		}
		//5.监听状态的变化
		xmlhttp.onreadystatechange = function () {
			//6.处理返回的结果		
			if (xmlhttp.readyState === 4) {
				//表示服务器会发送响应给客户端，可能是错误信息也可能是成功的，需关闭定时器
				clearInterval(timer);
				// 服务器接受到请求时会发送一个响应HTTP状态码
				if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
					//请求且响应成功后执行的代码
					/*	readyState:
					0: 请求未初始化
					1: 服务器连接已建立
					2: 请求已发送到服务器端，但还没有接受到一个响应
					3: 正在接受状态，已经接受到HTTP响应头部信息，但是消息体部分还没有完全接收到
					4: 请求已完成，且响应已就绪，即以已经完成HTTP响应的接受(服务器已经发送了响应报文给客户端,可能是错误的信息，需进一步判断)
						*/
					if (option.success) {
						option.success(xmlhttp);
					}
				} else {
					if (option.error) {
						//失败执行
						option.error(xmlhttp);
					}
				}
			}
		}
		//设置一个定时器，若是服务器3s之内未响应，则终止数据交互
		if (option.time) {
			timer = setInterval(function () {
				xmlhttp.abort();
				clearInterval(timer);
			}, option.time);
		}
	}
}