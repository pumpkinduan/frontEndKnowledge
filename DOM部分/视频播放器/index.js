//1.获取需要操作的元素
let oPlay = document.getElementById('play');
let oCurrentTime = document.getElementsByClassName('currentTime')[0];
let oEndTime = document.getElementsByClassName('endTime')[0];
let fullScreen = document.getElementById('fullScreen');
let progress = document.getElementsByClassName('progress')[0];
let line = document.getElementsByClassName('line')[0];
let video = document.querySelector('video');

window.onload = function () {
    bindEvent();
    let timeObj = formatTime(video.duration);
    oEndTime.innerText = `${timeObj.minute}:${timeObj.second}`;
}
//2.绑定事件


function bindEvent() {
    let flag = true;//代表点击播放的状态
    video.ontimeupdate = function () {
        var timeObj = formatTime(video.currentTime);
        oCurrentTime.innerText = `${timeObj.minute}:${timeObj.second}`;
        var perWidth = this.currentTime / this.duration * 100;
        line.style.transform = `translateX(${perWidth - 100}%)`;
    }
    oPlay.onclick = playOrPause;
    video.onclick = playOrPause;
    progress.onclick = function (e) {
        e = e || window.event;
        var x = e.offsetX / this.offsetWidth * 100;
        video.currentTime = e.offsetX / this.offsetWidth * video.duration;
        line.style.transform = `translateX(${x - 100}%)`;
    }
    video.onended = function () {
        oPlay.className = 'pause';
        video.currentTime = 0;
        flag = true;
    }
    fullScreen.onclick = function () {
        //full screen display
        toFullVideo(video);
    }
}
function playOrPause() {
    if (flag) {
        oPlay.className = 'play';
        video.play();
        flag = false;
    } else {
        oPlay.className = 'pause';
        video.pause();
        flag = true
    }
}
function formatTime(time) {
    var minute = Math.floor((time / 60) % 60);
    minute = minute < 10 ? '0' + minute : minute;
    var second = Math.floor(time % 60);
    second = second < 10 ? '0' + second : second;
    return {
        minute: minute,
        second: second
    }
}
function toFullVideo(videoDom) {

    if (videoDom.requestFullscreen) {

        return videoDom.requestFullscreen();

    } else if (videoDom.webkitRequestFullScreen) {

        return videoDom.webkitRequestFullScreen();

    } else if (videoDom.mozRequestFullScreen) {

        return videoDom.mozRequestFullScreen();

    } else {

        return videoDom.msRequestFullscreen();

    }

}