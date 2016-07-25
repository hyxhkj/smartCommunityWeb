  var signature="";
  var noncestr="";
  var timestamp="";
  var url=location.href;
	  url=encodeURI(url);
  $.ajax({
		type: "post",
		async:false,
	    url: "/weixin/getSignature",
	    data:{url:url},
	    dataType: "text",
	    success: function(data){
	    	var dataObj=eval("("+data+")");
	    	signature=dataObj.signature;
	    	noncestr=dataObj.noncestr;
	    	timestamp=dataObj.timestamp;
	    	initWX();
	    }
  });  
  
  function initWX(){
  	 wx.config({
      debug: false,
      appId: 'wx258e83a05f328fb1',
      timestamp: timestamp,
      nonceStr: noncestr,
      signature: signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ]
     });
     
     wx.ready(function (){
		wx.getLocation({
	    	success: function (res) {
		        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		        var speed = res.speed; // 速度，以米/每秒计
		        var accuracy = res.accuracy; // 位置精度
			    BMap.Convertor.translate(new BMap.Point(longitude,latitude),0,function(point){
					latitude=point.lat;
			        longitude=point.lng; 
				}); 
			    $.ajax({
					 type:"post",
					 url:"/property/selectClientByCoordinate",
					 data:{latitude:latitude,longitude:longitude},
					 dataType: "text",
					 success:function(data){
					 	var flag=data.split('#');
					 	if(flag[0]!='-1'){
					 		var clientList=eval("("+flag[1]+")");
			        		if(flag[0]==0&&clientList.length>0){
				        		var id=clientList[0].id;
				        		var currAgent=$("#agentId").val();
				        		if(currAgent!=id){
				        			var name=clientList[0].supplier_short_name;
				        			$("#tabClientName").text(name);
				        			showTab();
	 								$("#tabOk").click(function(){
	 									tabClient(id);
							 		});
				        		}
			        		}
					 	}
				 	},
				 	error:function(XMLHttpRequest, textStatus, errorThrown){
				 		return false;
				 	}
				 });
			    
	        	
		    }
	   });
     }) 
	      
     wx.error(function(res){
    	 alert(res);
     })
  }
  
  function tabClient(agentid){
 		closeTab();
 		location.href='/property/switchClient?agentid='+agentid;
  }
 	
  function closeTab(){
	$(".bgColorStyle").hide();
	$(".addressTipStyle").hide();	
  }
  function showTab(){
		$(".bgColorStyle").show();
		$(".addressTipStyle").show();	
  }	
 
  
  
  
  
