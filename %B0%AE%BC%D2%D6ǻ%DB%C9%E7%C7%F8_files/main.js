jQuery(document).ready(function($){
	var bodyH = document.body.scrollHeight;
	var htmlH = $("html").height();
	
	//打开弹出层
	$('.popTrigger').on('click', function(event){
		event.preventDefault();
		$('.popUpStyle').addClass('is-visible');
		
		/** 超出隐藏 **/
		if(bodyH > htmlH){
			$("body").height(htmlH).addClass("overflowH");
		}

		/** 2015.4.16 物业手机版：报修项目列表弹出层内容点击传值效果 **/
 		$(".btnStyle li").click(function(){
 			$(".popTrigger").val($(this).text());
 			$(".popUpStyle").removeClass('is-visible');
 			
 			/** 移除针对body设置的超出隐藏部分 **/
			$("body").removeClass("overflowH");
 		});
		
		/** 2015.4.21 物业手机版：微信首页弹出层内容判断 **/
		var aTitleName = $(this).find("a").attr("title");
		$(".homeContStyle ul").hide();
		$("#" + aTitleName).show();
	});
	
	//关闭弹出层
	$('.popUpStyle').on('click', function(event){
		if( $(event.target).is('.popUpCloseStyle') || $(event.target).is('.popUpStyle') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
			$("body").removeClass("overflowH");
		}
	});
	
	//在键盘按钮按下时产生的弹出层关闭事件
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.popUpStyle').removeClass('is-visible');
	    }
    });
});