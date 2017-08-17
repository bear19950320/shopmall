var testurl = "http://www.tblmall.com:85";
var loginurl = "http://120.76.247.147:85";
var dataCount=0;
//var htmlStr=document.getElementsByTagName("style")[0].innerHTML;
//var newStr=htmlStr.replace(/(\d+)px/g,function(a,b){
//  return   ((b/41.4)+"").substr(0,6)+"rem";
//})
//document.getElementsByTagName("style")[0].innerHTML=newStr;
// 加载

$(document).ready(function() {

	$('body').css({
		"width": $(window).width(),
		"height": $(window).height()
	});
	console.log($(window).width() + "---" + $(window).height())
	//----- 判断--微信端
	isWeiXin();
	//----- 屏幕大于ipad的竖屏最大宽度 
	isMax();
});

function getcookie(name) {
	var strcookie = document.cookie;
	var arrcookie = strcookie.split("; ");
	for(var i = 0; i < arrcookie.length; i++) {
		var arr = arrcookie[i].split("=");
		if(arr[0] == name) return decodeURIComponent(arr[1]); //增加对特殊字符的解析  
	}
	return "";
}

function delCookie(name) { //删除cookie  
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getcookie(name);
	if(cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}

function log(val) {
	console.log(val)
}
$("#package").height($(this).height())
// 拉伸
function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"
	];
	var flag = true;
	for(var v = 0; v < Agents.length; v++) {
		if(userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	if(flag) {

	} else {
		$('body').css({
			"width": $(window).width(),
			"height": $(window).height()
		})

	}
	return flag;
}

/* 判断--微信端 */
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger') {
		$(".H-head").hide();
		$(".cart").css("padding-top", "1rem")
		$('body').css({
			"width": $(window).width(),
			"height": $(window).height()
		});
		return true; //  微信
	} else {
		$(".H-head").show();
		return false; //  不是微信
	}
}
/* 判断屏幕大小   过于大让其居中   */
function isMax() {
	if($(window).width() > 1024) {
		$('body').css({
			"width": 1024 + "px",
			"margin": 'auto',
			"border": "1px solid #333"
		});
		$(".H-head").css({
			"width": $("body").width(),
			"padding": "1rem 0"
		})
		$(".specificationsBox").css({
			"width": $("body").width(),
			"padding": 0,
			"padding-top": "25px"
		});
		$("#Pay,.orderUp").css({
			"width": $("body").width(),
			"padding": "0"
		})

	}
}

function loadImg() {
	$("body").append('<img id="loadImg" src="../img/ajax-loader.gif" width="48" height="48" alt="" style="position: fixed;top:50%;margin-top: -24px;left:50%;margin-left: -24px;"/>')
}

function homeLoadImg() {
	$("body").append('<img id="loadImg" src="img/ajax-loader.gif" width="48" height="48" alt="" style="position: fixed;top:50%;margin-top: -24px;left:50%;margin-left: -24px;"/>')
}

function removerLoad() {
	$("body").remove('<img id="loadImg" src="img/ajax-loader.gif" width="48" height="48" alt="" style="position: fixed;top:50%;margin-top: -24px;left:50%;margin-left: -24px;"/>')
}
/* 登录注册  */
function showLogin() {
	/* 弹出登录注册按钮 */
	
}

// 点击调出分类
function classIfyList(thisId) {
	$.ajax({
		type: "GET",
		url: testurl + "/api/classify/classifylist",
		data: {
			platform:"2",
			type: 1,
			classifyId: thisId
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		async: true,
		success: function(data) {
			var classifyList = data.data.classifyList;
			if(classifyList.length != 0) {
				$("#classifyListTitle").empty();
				$("#classifyListTitle").append('<li id="'+thisId+'"><span class="selected">全部</span></li>');
				$("#"+thisId).click(function(){
					$("#classifyListUl").empty();
					classIfyList($(this).attr("id"))
					classIfy($(this).attr("id"),dataCount);
					$(this).find("span").addClass("selected");
					$(this).siblings().find("span").removeClass("selected");
					$("html,body").animate({
						scrollTop: 0
					}, 800);
				})
				for(var i = 0; i < classifyList.length; i++) {
					$("#classifyListTitle").append('<li id=' + classifyList[i].id + '><span>' + classifyList[i].text + '</span></li>')
					$("#" + classifyList[i].id).click(function() {
						$("#classifyListUl").empty();
						classIfyList($(this).attr("id"))
						classIfy($(this).attr("id"),dataCount);
						$(this).find("span").addClass("selected");
						$(this).siblings().find("span").removeClass("selected");
						$("html,body").animate({
							scrollTop: 0
						}, 800);
					})
				}
			}

		}	
	});
	console.log(thisId)
}

// 点击调出分类下面数据！
function classIfy(thisId,dataCount) {
	$.ajax({
		type: "GET",
		url: testurl + "/api/classify/classifywarelist",
		data: {
			platform:"2",
			type: 1,
			classifyId: thisId,
			pageId: dataCount,
			pageSize: "10"
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		async: true,
		timeout: 1000,
		beforeSend: function(XMLHttpRequest) {
			loadImg();
		},
		success: function(data) {
			var wareList = data.data.wareList;
			if(typeof wareList == 'object') {
				var oProduct, $row, iHeight, iTempHeight;
				for(var i = 0, l = wareList.length; i < l; i++) {
					oProduct = wareList[i];
					// 找出当前高度最小的列, 新内容添加到该列
					iHeight = -1;
					$("#classifyListUl li").each(function() {
						iTempHeight = Number($(this).height());
						if(iHeight == -1 || iHeight > iTempHeight) {
							iHeight = iTempHeight;
							$row = $(this);
						}
					});
					if(wareList.length != 0) {
						for(var i = 0; i < wareList.length; i++) {
							$("#classifyListUl").append('<li id=' + wareList[i].wareId + ' style="padding: 15px 2%;border-bottom: 1px solid #EAEAEA;">' +
								'<img src=' + wareList[i].imagePath + ' width="90" height="90" alt="" />' +
								'<div class="classifyListContent">' +
								'<p class="classifyListText left support'+wareList[i].support+'"><span style="width:25px;color:#B14CAD;border:1px solid #B14CAD;padding: 3px 6px;margin-right: 6px;">直邮</span>' + wareList[i].wareName + '</p>' +
								'<div class="classifyListDetails">' +
								'<span class="Number" style="position: relative;">¥' + wareList[i].warePrice.toFixed(2) + ' <span style="position: absolute;right: -5px;top:-2px;color:#DC210D;right:-40px;">+返' + wareList[i].bonusMoney + '</span></span>' +
								'<div style="display: block;">库存: ' + wareList[i].sales + '</div>' +
								'<div class="imgDiv">' +
								'<img src="../img/share.png" class="share" width="30" height="24" alt="" />' +
								'</div>' +
								'</div>' +
								'</div>' +
								'</li>');
								
							var wid = $("#classifyListUl>li").width() - $("#classifyListUl>li>img").width();
							var wids = $("#classifyListUl>li").width() - $("#classifyListUl>li>img").width() - 15;
							var widc = wid - 15;
							$("#classifyListUl li").eq(i).find(".Number").find("span").css("right", -(Number($("#classifyListUl li").eq(i).find(".Number").find("span").width())+5)+"px")
							$("#classifyListUl>li>div").css({
								"width": widc,
								"height": $("#classifyListUl>li>img").height(),
								"padding-left": "12px"
							})
							$("#" + wareList[i].wareId).click(function(event) {
								event.stopPropagation();
								sessionStorage.setItem("TowareId", '')
								var TowareId = $(this).attr("id");
								sessionStorage.setItem("TowareId", TowareId);
								window.location.href = "./detailsdemo.html";
							})
							$(".share").click(function(event) {									
								event.stopPropagation();
								share($(this).parents("li").attr('id'), $(this).parents("li").find("img").attr("src"), $(this).parents(".classifyListContent").find(".classifyListText").text());
								$(".laye").show()
							})
						}
						dataCount++;
					}
				}
			}
		},
		complete: function(XMLHttpRequest, textStatus) {
			$("#loadImg").remove();
		},
		error: function(data) {
			if(data.status == "404") {
				alert('请求地址出错！');
			} else if(data.status == "302") {
				alert('连接网页出错');
			} else if(data.status == "timeout") {
				alert("请求超时!");
			} else {
				alert('服务器出差了~！');
			}
		}
	})
	return dataCount;
}
// 退出登录
function outlogin() {
	/* 登出 */
	$.ajax({
		type: "POST",
		data:{
			platform:"2",
			cutomerId:localStorage.getItem("cutomerId")
		},
		url: testurl + "/api/login/outlogin",
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data) {
			if(data.code == 10000) {
				localStorage.setItem("cutomerId"," ")
				localStorage.setItem("loginStatus"," ")
                 location.href="./login.html"
			}
		}
	});
}
// 弹框
function mask(te, fun) {
	$("body").append('<div id="mask" style="width:100%;height:100%;position: fixed;top:0;left:0;background: rgba(0,0,0,.2);z-index:999;">' +
		'<div style="width: 50%;height:120px;background: #D2D2D2;position: absolute;top:50%;margin-top:-60px;left:25%;border-radius: 5px;">' +
		'<div style="width:99%;height: 99%;position:absolute;top:0.7%;left:0.5%;background: #fff;border-radius: 5px;text-align: center;">' +
		'<div style="padding: 5%;width:90%;height:90%;">' +
		'<h4>温馨提示</h4>' +
		'<br />' +
		'<hr />' +
		'<br />' +
		'<p>' + te + '</p>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>');
	$("#mask").click(function() {
		$(this).remove()
	})
}

function addresslist() {
	$(document).ready(function(e) {
		// 获取所有行，对每一行设置监听
		var lines = $(".line-normal-wrapper1");
		var len = lines.length;
		var lastX, lastXForMobile;
		// 用于记录被按下的对象
		var pressedObj; // 当前左滑的对象
		var lastLeftObj; // 上一个左滑的对象

		// 用于记录按下的点
		var start;
		// 网页在移动端运行时的监听
		for(var i = 0; i < len; ++i) {
			lines[i].addEventListener('touchstart', function(e) {
				lastXForMobile = e.changedTouches[0].pageX;
				pressedObj = this; // 记录被按下的对象 
				// 记录开始按下时的点
				var touches = event.touches[0];
				start = {
					x: touches.pageX, // 横坐标
					y: touches.pageY // 纵坐标
				};
			});

			lines[i].addEventListener('touchmove', function(e) {
				// 计算划动过程中x和y的变化量
				var touches = event.touches[0];
				delta = {
					x: touches.pageX - start.x,
					y: touches.pageY - start.y
				};

				// 横向位移大于纵向位移，阻止纵向滚动
				if(Math.abs(delta.x) > Math.abs(delta.y)) {
					event.preventDefault();
				}
			});
			lines[i].addEventListener('touchend', function(e) {
				if(lastLeftObj && pressedObj != lastLeftObj) { // 点击除当前左滑对象之外的任意其他位置
					$(lastLeftObj).animate({
						marginLeft: "0"
					}, 500); // 右滑
					lastLeftObj = null; // 清空上一个左滑的对象
				}
				var diffX = e.changedTouches[0].pageX - lastXForMobile;
				if(diffX < -150) {
					$(".delBtn button").height($(".line-scroll-wrapper1").height())
					$(pressedObj).animate({
						marginLeft: "-132px"
					}, 500); // 左滑
					lastLeftObj && lastLeftObj != pressedObj &&
						$(lastLeftObj).animate({
							marginLeft: "0"
						}, 500); // 已经左滑状态的按钮右滑
					lastLeftObj = pressedObj; // 记录上一个左滑的对象
				} else if(diffX > 150) {
					if(pressedObj == lastLeftObj) {
						$(pressedObj).animate({
							marginLeft: "0"
						}, 500); // 右滑
						lastLeftObj = null; // 清空上一个左滑的对象
					}
				}
			});
		}

		// 网页在PC浏览器中运行时的监听
		for(var i = 0; i < len; ++i) {
			$(lines[i]).bind('mousedown', function(e) {
				lastX = e.clientX;
				pressedObj = this; // 记录被按下的对象
			});

			$(lines[i]).bind('mouseup', function(e) {
				if(lastLeftObj && pressedObj != lastLeftObj) { // 点击除当前左滑对象之外的任意其他位置
					$(lastLeftObj).animate({
						marginLeft: "0"
					}, 500); // 右滑
					lastLeftObj = null; // 清空上一个左滑的对象
				}
				var diffX = e.clientX - lastX;
				if(diffX < -150) {
					$(pressedObj).animate({
						marginLeft: "-132px"
					}, 500); // 左滑
					lastLeftObj && lastLeftObj != pressedObj &&
						$(lastLeftObj).animate({
							marginLeft: "0"
						}, 500); // 已经左滑状态的按钮右滑
					lastLeftObj = pressedObj; // 记录上一个左滑的对象
				} else if(diffX > 150) {
					if(pressedObj == lastLeftObj) {
						$(pressedObj).animate({
							marginLeft: "0"
						}, 500); // 右滑
						lastLeftObj = null; // 清空上一个左滑的对象
					}
				}
			});
		}
	});
}

//-------------------------------------------------购物车---------------------------------------------------------------------
// 修改购物车
function updateshopcart() {
	var n = "";
	for(i = 0; i < $(".line-wrapper .line-scroll-wrapper").length; i++) {
		n += $(".line-wrapper .line-scroll-wrapper .delBtn").eq(i).find("button").attr("id") + ","
		n += $(".line-wrapper .line-normal-wrapper").eq(i).find(".number").val() + ";";
	}
	n = n.substr(0, n.length - 1);
	$.ajax({
		type: "POST",
		data: {
			platform:"2",
			cutomerId:localStorage.getItem("cutomerId"),
			shopcartContent: n
		},
		url: testurl + "/api/shopcart/updateshopcart",
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data) {

		},
		error: function() {

		}
	});
}
/*购物的计算 与 侧滑删除 */
function shopNum() {
	function IsPC() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone",
			"SymbianOS", "Windows Phone",
			"iPad", "iPod"
		];
		var flag = true;
		for(var v = 0; v < Agents.length; v++) {
			if(userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		if(flag) {
			$(".line-normal-wrapper").width($(".line-wrapper").width());
			$(".line-scroll-wrapper").width($(".line-wrapper").width() + $(".line-btn-delete").width());
			$(".cart dd").css("padding", "1rem 0");
			$(".delBtn button").height($(".line-wrapper").height());
		} else {
			$('body').css({
				"width": $(window).width(),
				"height": $(window).height()
			})
			// 设定每一行的宽度=屏幕宽度+按钮宽度
			$(".line-scroll-wrapper").width($(".line-wrapper").width() + $(".line-btn-delete").width());
			// 设定常规信息区域宽度=屏幕宽度
			$(".line-normal-wrapper").width($(".line-wrapper").width());
			// 设定文字部分宽度（为了实现文字过长时在末尾显示...）
			$(".line-normal-msg").width($(".line-normal-wrapper").width() - 280);
		}
		return flag;
	}
	$(document).ready(function(e) {
		if($(window).width() > 1024) {
			$('body').css({
				"width": 1024 + "px",
				"margin": 'auto',
				"border": "1px solid #333"
			});
			$(".H-head").css({
				"width": $("body").width(),
				"padding": "1rem 0"
			})
		}
		IsPC();
		// 获取所有行，对每一行设置监听
		var lines = $(".line-normal-wrapper");
		var len = lines.length;
		var lastX, lastXForMobile;
		// 用于记录被按下的对象
		var pressedObj; // 当前左滑的对象
		var lastLeftObj; // 上一个左滑的对象

		// 用于记录按下的点
		var start;
		// 网页在移动端运行时的监听
		for(var i = 0; i < len; ++i) {
			lines[i].addEventListener('touchstart', function(e) {
				lastXForMobile = e.changedTouches[0].pageX;
				pressedObj = this; // 记录被按下的对象 
				// 记录开始按下时的点
				var touches = event.touches[0];
				start = {
					x: touches.pageX, // 横坐标
					y: touches.pageY // 纵坐标
				};
			});

			lines[i].addEventListener('touchmove', function(e) {
				// 计算划动过程中x和y的变化量
				var touches = event.touches[0];
				delta = {
					x: touches.pageX - start.x,
					y: touches.pageY - start.y
				};

				// 横向位移大于纵向位移，阻止纵向滚动
				if(Math.abs(delta.x) > Math.abs(delta.y)) {
					event.preventDefault();
				}
			});
			lines[i].addEventListener('touchend', function(e) {
				if(lastLeftObj && pressedObj != lastLeftObj) { // 点击除当前左滑对象之外的任意其他位置
					$(lastLeftObj).animate({
						marginLeft: "0"
					}, 500); // 右滑
					lastLeftObj = null; // 清空上一个左滑的对象
				}
				var diffX = e.changedTouches[0].pageX - lastXForMobile;
				if(diffX < -150) {
					$(".delBtn button").height($(".line-scroll-wrapper").height())
					$(pressedObj).animate({
						marginLeft: "-132px"
					}, 500); // 左滑
					lastLeftObj && lastLeftObj != pressedObj &&
						$(lastLeftObj).animate({
							marginLeft: "0"
						}, 500); // 已经左滑状态的按钮右滑
					lastLeftObj = pressedObj; // 记录上一个左滑的对象
				} else if(diffX > 150) {
					if(pressedObj == lastLeftObj) {
						$(pressedObj).animate({
							marginLeft: "0"
						}, 500); // 右滑
						lastLeftObj = null; // 清空上一个左滑的对象
					}
				}
			});
		}

		// 网页在PC浏览器中运行时的监听
		for(var i = 0; i < len; ++i) {
			$(lines[i]).bind('mousedown', function(e) {
				lastX = e.clientX;
				pressedObj = this; // 记录被按下的对象
			});

			$(lines[i]).bind('mouseup', function(e) {
				if(lastLeftObj && pressedObj != lastLeftObj) { // 点击除当前左滑对象之外的任意其他位置
					$(lastLeftObj).animate({
						marginLeft: "0"
					}, 500); // 右滑
					lastLeftObj = null; // 清空上一个左滑的对象
				}
				var diffX = e.clientX - lastX;
				if(diffX < -150) {
					$(pressedObj).animate({
						marginLeft: "-132px"
					}, 500); // 左滑
					lastLeftObj && lastLeftObj != pressedObj &&
						$(lastLeftObj).animate({
							marginLeft: "0"
						}, 500); // 已经左滑状态的按钮右滑
					lastLeftObj = pressedObj; // 记录上一个左滑的对象
				} else if(diffX > 150) {
					if(pressedObj == lastLeftObj) {
						$(pressedObj).animate({
							marginLeft: "0"
						}, 500); // 右滑
						lastLeftObj = null; // 清空上一个左滑的对象
					}
				}
			});
		}
		shopCart();
		//切换编辑
		$(".edit").toggle(function() {
			$(this).parent().siblings("dd").find(".delBtn").fadeIn();
			$(this).html("完成");
		}, function() {
			$(this).parent().siblings("dd").find(".delBtn").fadeOut();
			$(this).html("编辑");
		});
		//减 最大
		$(".minus").click(function() {
			var currNum = $(this).siblings("span").find(".number");
			if(currNum.val() <= 1) {
				currNum.val("1");
			} else {
				currNum.val(parseInt(currNum.val()) - 1);
				$(this).parent().find('.num').html(currNum.val());
			}
			var num=0
			for(var i=0;i<$('.cart dd>input[type="checkbox"]:checked').length;i++){
				num+=Number($('.cart dd>input[type="checkbox"]:checked').eq(i).siblings(".goodsInfor").find(".number").val());
			}
			$(".total").text(num)
			shopCart();
		});
		//加
		$(".cloudPlus").click(function() {
            if($(this).siblings("span").find(".number").val() < $(this).siblings("span").find(".number").attr("name")){
            	var currNum = $(this).siblings("span").find(".number");
				currNum.val(parseInt(currNum.val()) + 1);
				$(this).parent().find('.number').html(currNum.val())
            }else if($(this).siblings("span").find(".number").val() >$(this).siblings("span").find(".number").attr("name")){
            	$(this).siblings("span").find(".number").val($(this).siblings("span").find(".number").attr("name"))
            }
			shopCart();
			var num=0
			for(var i=0;i<$('.cart dd>input[type="checkbox"]:checked').length;i++){
				num+=Number($('.cart dd>input[type="checkbox"]:checked').eq(i).siblings(".goodsInfor").find(".number").val());
			}
			$(".total").text(num)
		});
		//加
		$(".plus").click(function() {
			var currNum = $(this).siblings("span").find(".number");
			currNum.val(parseInt(currNum.val()) + 1);
			$(this).parent().find('.num').html(currNum.val());
			shopCart();
			
		});
		//删除
		$(".delBtn").click(function() {
		//	$(this).parent().remove();
			shopCart();
			nullTips();
		});
		//购物车是否为空
		function nullTips() {
			if($(".cart dd").length == 0) {
				var tipsCont = "<mark style='display:block;background:none;text-align:center;color:grey;'>购物车为空！</mark>"
				$(".cart").remove();
				$("body").append(tipsCont);
			}
		}
		//计算总价
		function shopCart() {
			var sum = money = 0;
			$('.cart dd input').each(function() {
				if($(this).prop('checked')) {	
					var par = Number($(this).siblings('.goodsInfor').find('strong').html());
					var pra = Number($(this).siblings('.goodsInfor').find('.number').val());
					money = par * pra;
					sum += money;
				}

			});

			sum = sum.toFixed(2)
			$('.money').html(sum);

		}
		//全选
		$('input[id="all"]').on('change', function() {
			var num=0;
			if($(this).prop('checked')) {
				$(".cart dd").parent(".line-scroll-wrapper").siblings(".supplierTitle").find("input").prop('checked', true);
				$('.cart dd>input').prop('checked', true);
				$('.cart dd>input').css("background", "red");
				for(var i=0;i<$('.cart dd>input').length;i++){
					num+=Number($('.cart dd>input').eq(i).siblings(".goodsInfor").find(".number").val());
				}
			} else {
				$(".cart dd").parent(".line-scroll-wrapper").siblings(".supplierTitle").find("input").prop('checked', false);
				$('.cart dd>input').prop('checked', false);
				$('.cart dd>input').css("background", "none")
			}
			$(".total").text(num)
			shopCart();
		});
	
		//选择商品
		$('.cart dd input[class="checkbox"]').on('change', function() {
			if($(this).parents(".line-wrapper").find('input[class="checkbox"]:checked').length<$(this).parents(".line-wrapper").find(".line-scroll-wrapper").length){
				$(this).parents(".line-wrapper").find(".supplierTitle").find("input").prop('checked', false);
			}else{
				$(this).parents(".line-wrapper").find(".supplierTitle").find("input").prop('checked', true);
			}

			if($('.cart dd input[class="checkbox"]:checked').length < $('.cart dd input[type="checkbox"]').length) {
				$('input[id="all"]').prop('checked', false);
				$('.cart dd>input').css("background", "none");
			} else {
				$('input[id="all"]').prop('checked', true);
				$('.cart dd>input').css("background", "red");
			}
			if($('.cart dd input[type="checkbox"]:checked').length == 0) {
				$(".total").text($('.cart dd input[type="checkbox"]:checked').length)
			} else {
				$(".total").text($('.cart dd input[type="checkbox"]:checked').length)
			}
			var num=0
			for(var i=0;i<$('.cart dd>input[type="checkbox"]:checked').length;i++){
				num+=Number($('.cart dd>input[type="checkbox"]:checked').eq(i).siblings(".goodsInfor").find(".number").val());
			}
			$(".total").text(num)
			shopCart();
		})
		//提交订单
		$('.enter').click(function() {
			if($('dd input[type="checkbox"]').length != 0 && $('.cart dd input[type="checkbox"]:checked').length != 0) {
				window.location = 'confirm_order.html';
			}
		})
	});
}

$("body").on("click",'input[type="checkbox"]',function(){
    $(this).show();
	if($(this).prop("checked")){
		$(this).css({"display":"inline-block","background":"url(../img/icon/My_Selected@2x.png)"})
		console.log($(this).attr("style"))
	}
})

function imgNot(){
	$('img').error(function(){
		$(this).attr("src","../img/imgNoload.png")
		
	})
}
imgNot()