$(function() {
	/*用来对轮播图的细节处理,支持响应式,也可以用@media开速实现*/
	//0.获取item
	let items = $('.carousel-inner .item')
	let len = items.length;
	//1.给window绑定resize事件
	$(window).on('resize', function() {
		//0.获取窗口宽度
		let clientW = $(window).width();
		//1.设置发生响应的临界条件
		let isChange = clientW > 768;
		//遍历item
		items.each(function(i, ele) {
			let url = ''
			if ( isChange ) {//获取大图片的url
				url = $(this).empty().data('lg-img');
				$(this).css({
					background: 'url('+ url +') center center no-repeat'
				})
			}else {//获取小图片的url
				url = $(this).data('sm-img');
				let $sm_img = $('<img src='+ url +'></img>');
				$(this).empty().append($sm_img);
			}
			
			
		}) 
	});
	$(window).trigger('resize');
});

/**
 * 提问:为什么企业美工一般会给出两套图片来实现轮播图
 * 答: 因为在做响应式开发时,轮播图大小会随着屏幕宽度的变化而变化,我们要使得图片主体部分一直在中部
 *     在大的显示器上显示较大的那套图片(一帮用背景图片),
 *     在小的显示器上显示较小的图片(img标签实现)
 */