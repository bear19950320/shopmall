
function share(wareid,img,title){
	var laye='<div class="laye">';
	    laye+='<div class="layeTitle">分享到</div>'
	    laye+='<div class="layeContent"><a href="javascript:;" class="ToQzone" ><img src="../img/share_qqspace.png"/></a><a href="javascript:void(0)" class="Sina"><img src="../img/share_weibo.png"/></a></div>'
	    laye+='<div class="layeFont"><a href="javascript:;" class="closeLaye">取消</a></div>'
	    laye+='</div>'
	    $("body").append(laye);
	    var share_url = encodeURIComponent('http://www.tblmall.com:81/web/web/detailsdemo.html?wareId='+wareid+"&route=share");
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
