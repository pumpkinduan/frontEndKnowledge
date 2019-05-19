//1.HTML5 webSockets:浏览器定义了一系列API使得 浏览器客户端可以 使用webSokect协议 与远程服务器 进行双向数据通信
//2.webSocket协议,一种客户端与服务器之间通信所遵循的约定,它规定webSocket连接的生命周期是基于HTTP连接来启动的
//3.WebSocket handshake: HTTP协议到webSocket协议的转变称为一次WebSocket handshake(webSocket 握手)
/*4.Note:
 * 4.1: A WebSocket detects the presence of a proxy server and automatically sets up a tunnel to pass through the proxy.
        WebSocket会侦察代理服务器的存在,并且自动的搭建一个可通过该代理服务器的一个渠道
 * 4.2: The tunnel is established by issuing an HTTP CONNECT statement to the proxy server, 
        客户端通过向带代理服务器发送HTTP CONNECT声明的请求来建立该渠道,
 * 4.3: which requests for the proxy server to open a TCP/IP connection to a specific host and port. 
        而HTTP CONNECT指的是 请求代理服务器开启一条TCP/IP连接到指定的主机+端口号
 * 4.4: Once the tunnel is set up, communication can flow unimpeded through the proxy. 
 *      一但该渠道搭建完毕,则通过代理进行流畅的通信了
 *  */ 

//注意: WebSocket连接的建立是客户端与服务器之间进行初始化握手期间HTTP协议升级到WebSocket协议的时候

 //To connect to an end-point, just create a new WebSocket instance,
 //providing the new object with a URL that represents the end-point(the server) to which you wish to connect
let myWebSocket = new WebSocket('ws://www.websockets.org');//表示连接到的服务器


myWebSocket.onopen = function(ev) { 
     myWebSocket.send('hello websocket');//向server发送消息
     console.log('connection open...', ev); 
}
myWebSocket.onmessage = function(ev) { 
    console.log('recevied mesg...', ev); 
}
myWebSocket.onclose = function(ev) { console.log('connection closed...', ev) }

 

//  myWebSocket.close();//关闭连接