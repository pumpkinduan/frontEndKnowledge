function ajax(option) {
	if (!option) { return; }
	function toString(data) {
		var res = [];
		for (var key in data) {
			res.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		}
		return res.join('&');
	}
	if (option.data) {
		option.data.t = new Date().getTime();//兼容ie
		option.data = toString(option.data);
	} else {
		option.data = '';
	}
	option.jsonp ? option.jsonp : option.jsonp = 'cb';
	option.jsonpCallBack ? option.jsonpCallBack : option.jsonpCallBack = 'pum' + Date.now();
	if (option.dataType && option.dataType === 'jsonp') {//jsonp请求
		var oScript = document.createElement('script');
		oScript.setAttribute('type', 'text/javascript');
		oScript.src = option.url + '?' + option.jsonp + '=' + option.jsonpCallBack + '&' + option.data;
		document.body.appendChild(oScript);
		oScript.onload = function() {
			document.body.removeChild(oScript);
		}
	} else {
		var xmlhttp = null,
			timer = null;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if (option.type.toUpperCase() === 'GET') {
			xmlhttp.open("GET", option.url + "?" + option.data, true);
			xmlhttp.send();
		} else if (option.type.toUpperCase() === 'POST') {
			xmlhttp.open("POST", option.url, true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(option.data);
		}
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState === 4) {
				clearInterval(timer);
				if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
					if (option.success) {
						option.success(xmlhttp);
					}
				} else {
					if (option.error) {
						option.error(xmlhttp);
					}
				}
			}
		}
		if (option.time) {
			timer = setInterval(function () {
				xmlhttp.abort();
				clearInterval(timer);
			}, option.time);
		}
	}
}