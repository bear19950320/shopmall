///*
//寮瑰嚭鎻掍欢 AND 鍒嗕韩鎻掍欢
//autho锛歴mohan
//http://www.smohan.net
//*/
//
////杩欐槸寮瑰嚭灞傦紝IE9浠ヤ笅鏃犳硶鍦嗚
//(function($) {
//	$.fn.SmohanPopLayer = function(options) {
//		var Config = {
//			Shade: true,
//			Event: "click",
//			Content: "Content",
//			Title: "cheese_Bear"
//		};
//		var options = $.extend(Config, options);
//		var layer_width = $('#' + options.Content).outerWidth(true);
//		var layer_height = $('#' + options.Content).outerHeight(true)
//		var layer_top = (layer_height + 40) / 2;
//		var layer_left = (layer_width + 40) / 2;
//		var load_left = (layer_width - 36) / 2;
//		var load_top = (layer_height - 100) / 2;
//		var layerhtml = "";
//		if(options.Shade == true) {
//			layerhtml += '<div class="Smohan_Layer_Shade" style="display:none;"></div>';
//		}
//		layerhtml += '<div class="Smohan_Layer_box" style=" text-align:center;position:fixed;bottom:0;left:0;width:' + layer_width + 'px;height:auto;display:none;" id="layer_' + options.Content + '">';
//		layerhtml += '<h3><b class="text">分享到</b><a href="javascript:void(0)" class="close"></a></h3>';
//		layerhtml += '<div class="layer_content">';
//		layerhtml += '<div class="loading" style="left:' + load_left + 'px;top:' + load_top + 'px;"></div>';
//		layerhtml += '<div id="' + options.Content + '" style="display:block;">' + $("#" + options.Content).html() + '</div>';
//		layerhtml += '</div>';
//		layerhtml +='<a href="javascript:;" id="closeShare" style="padding:10px;font-size:14px;line-height:16px;height:16px;">取消</a>'
//		layerhtml += '</div>';
//		$('body').prepend(layerhtml);
//		if(options.Event == "unload") {
//			$('#layer_' + options.Content).animate({
//				opacity: 'show',
//				marginTop: '-' + layer_top + 'px'
//			}, "slow", function() {
//				$('.Smohan_Layer_Shade').show();
//				$('.Smohan_Layer_box .loading').hide();
//			});
//		} else {
//			$(this).live(options.Event, function(e) {
//				$('#layer_' + options.Content).animate({
//					opacity: 'show',
//					marginTop: '-' + layer_top + 'px'
//				}, "slow", function() {
//					$('.Smohan_Layer_Shade').show();
//					$('.Smohan_Layer_box .loading').hide();
//				});
//			});
//		}
//		$('.Smohan_Layer_box .close').click(function(e) {
//			$('.Smohan_Layer_box').animate({
//				opacity: 'hide',
//				marginTop: '-300px'
//			}, "slow", function() {
//				$('.Smohan_Layer_Shade').hide();
//				$('.Smohan_Layer_box .loading').show();
//			});
//		});
//	};
//})(jQuery);
//
////鍒嗕韩	
//$(document).ready(function(e) {
//	var share_html = "";
//	//share_html += '<a href="javascript:void(0)" id="smohan_share" title="鍒嗕韩"></a>';
//	share_html += '<div id="Share"><ul>';
//	share_html += '<li title="QQ空间分享"><a href="javascript:void(0)" class="share1"></a><span></span></li>';
//	share_html += '<li title="微信分享"><a href="javascript:void(0)" class="share3"></a><span></span></li>';
//	share_html += '<li title="新浪微博分享"><a href="javascript:void(0)" class="share2"></a><span></span></li>';
//	share_html += '</ul></div>';
//	$('body').prepend(share_html);
//	(!!$(".qrcode").length || $('body').append($('<div id="qrcode" class="qrcode none"></div>')))
//
//	/*璋冪敤鏂规硶 start*/
//
//	$('.share').SmohanPopLayer({
//		
////		Shade: true,
////		Event: 'click',
////		Content: 'Share'
//		//Title: '分享是一种快乐'
//	});
//
//	/*璋冪敤鏂规硶 end*/
//
//	$('#Share li').each(function() {
//		$(this).hover(function(e) {
//			$(this).find('a').animate({
//				marginTop: 2
//			}, 'easeInOutExpo');
//			$(this).find('span').animate({
//				opacity: 0.2
//			}, 'easeInOutExpo');
//		}, function() {
//			$(this).find('a').animate({
//				marginTop: 12
//			}, 'easeInOutExpo');
//			$(this).find('span').animate({
//				opacity: 1
//			}, 'easeInOutExpo');
//		});
//	});
//	var share_url = encodeURIComponent(location.href+'?id=527881777');
//	var share_title = encodeURIComponent(document.title);
//	var share_pic = "http://tblmall.com/img/LOGO.png"; //榛樿鐨勫垎浜浘鐗�
//	var share_from = encodeURIComponent("jQuery鎻掍欢搴�"); //鍒嗕韩鑷紙浠呯敤浜嶲Q绌洪棿鍜屾湅鍙嬬綉锛屾柊娴殑鍙渶鏇存敼appkey 鍜� ralateUid灏辫锛�
//	//Qzone
//	$('#Share li a.share1').click(function(e) {
//		window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + share_url + "&title=" + share_title + "&pics=" + share_pic + "&site=" + share_from + "", "newwindow");
//	});
//	//Sina Weibo
//	$('#Share li a.share2').click(function(e) {
//		var param = {
//			url: share_url,
//			appkey: '201abfdd50b70',
//			title: share_title,
//			pic: share_pic,
//			ralateUid: '527881777',
//			rnd: new Date().valueOf()
//		}
//		var temp = [];
//		for(var p in param) {
//			temp.push(p + '=' + encodeURIComponent(param[p] || ''))
//		}
//		window.open('http://v.t.sina.com.cn/share/share.php?' + temp.join('&'));
//	});
//
//	$("#closeShare").click(function(){
//		$('.share').SmohanPopLayer({
//			Shade: false
//		})
//		$(".Smohan_Layer_box").remove()
//	})
//});
//
//$(document).delegate(".weixin_close", 'click', function() {
//	$('.qrcode,.Smohan_Layer_Shade').fadeOut(300);
//
//})
function share(wareid,img,title){
	var laye='<div class="laye">';
	    laye+='<div class="layeTitle">分享到</div>'
	    laye+='<div class="layeContent"><a href="javascript:;" class="ToQzone" ><img src="../img/share_qqspace.png"/></a><a href="javascript:void(0)" class="Sina"><img src="../img/share_weibo.png"/></a></div>'
	    laye+='<div class="layeFont"><a href="javascript:;" class="closeLaye">取消</a></div>'
	    laye+='</div>'
	    $("body").append(laye);
	    var share_url = encodeURIComponent('http://www.tblmall.com:81/web/web/detailsdemo.html?wareId='+wareid);
		var share_title = "发现 : "+title;
		var share_summipt="我在呔棒啦商城发现了一个好东西，赶紧看看吧";
		var share_pic = img; //榛樿鐨勫垎浜浘鐗�
		var share_from = encodeURIComponent("jQuery鎻掍欢搴�");
	    //Qzone
		$(".ToQzone").click(function(e) {
			window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + share_url + "&title=" + share_title + "&pics=" + share_pic + "&site=" + share_from + "&summary="+share_summipt+"", "newwindow");
		});
		
		//Sina Weibo
			$('.Sina').click(function(e) {
				var param = {
					url: share_url,
					appkey: '201abfdd50b70',
					title: share_title,
					pic: share_pic,
					ralateUid: '527881777',
					rnd: new Date().valueOf()
				}
				var temp = [];
				for(var p in param) {
					temp.push(p + '=' + encodeURIComponent(param[p] || ''))
				}
				window.open('http://v.t.sina.com.cn/share/share.php?' + temp.join('&'));
			});
	    $(".closeLaye").click(function(){
	    	$(".laye").hide()
	    })
}
