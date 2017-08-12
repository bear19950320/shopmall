   /*组装商品规格*/
    SpecificationGoods:function(container,data,viewType){
        var me = this;
        var showChooseSpect = container.down("#ChooseSpecification").down("#showChooseSpect");
        if(viewType ==1){
            var shopWindow = me.getShopWindow();
        }else {
            var shopWindow = me.getNewshopWindow();
        }
        var specificationArrayAll = data.specificationArrayAll;
        var spectsData = {};
        var prmtrData = Ext.utils.PromotionRule.getPromotionData(data);
        spectsData = data;
        spectsData["goodsImg"] = data.displayImage;
        spectsData["displayName"] = data.displayName;
        spectsData["sellingPrice"] = data.price;
        spectsData["status"] = data.status;
        spectsData["country"] = data.country;
        spectsData["prmtrData"] = prmtrData;//促销活动数据
        if(specificationArrayAll.length != 0 && specificationArrayAll[0].item && specificationArrayAll[0].item != ''){//有规格的商品
            /*设置规格初始化数据*/
            showChooseSpect.setHtml('<p class="chooseSpect-style">请选择规格、数量</p>');
            var spects = me.initSku(specificationArrayAll);
            var keys = spects.keys;
            var keysValue = spects.keysValue;
            var spectsAry = new Array();
            /*规格值过滤*/
            var valueAry = me.filter(keysValue);
            /*组装规格*/
            for(var i = 0; i < keys.length; i++){
                var value = {
                    "name":keys[i],
                    "valueArray":valueAry[i]
                }
                spectsAry.push(value);
            }
            //设置规格默认选中第一个
            spectsAry[0].valueArray[0].seleted = true;
            spectsData["specificationArray"] = spectsAry;
            //设置规格默认添加第一个
            var key = spectsAry[0].name;
            var value = spectsAry[0].valueArray[0].value;
            //shopWindow.setData(spectsData);
            /*查找选择规格sku*/
            var defSpecs = '';
            var goodsSpectStore = Ext.getStore("goodsSpectStore");
            var storeData = goodsSpectStore.getRange()[0].data;
            var skuData = storeData.data;
            var skuKeys = storeData.keys;
            //取得默认显示规格值
            var defSpecsObj = new Object();
            if(localStorage.cacheSeletedSpect){
                var cacheSeletedSpect = JSON.parse(localStorage.cacheSeletedSpect);
                if(cacheSeletedSpect.cacheSeletedProductId == data.productId){
                    defSpecsObj = cacheSeletedSpect.cacheSeletedSpect;
                }else {
                    for(var p in skuData){
                        var defaultPrice = skuData[p].defaultPrice;
                        if(defaultPrice == 1){
                            defSpecs = p;
                            break;
                        }
                    }
                    var defSpecsAry = defSpecs.split('-');
                    for(var i = 0;i<skuKeys.length;i++){
                        defSpecsObj[skuKeys[i]] = defSpecsAry[i];
                    }
                }
            }else {
                for(var p in skuData){
                    var defaultPrice = skuData[p].defaultPrice;
                    if(defaultPrice == 1){
                        defSpecs = p;
                        break;
                    }
                }
                var defSpecsAry = defSpecs.split('-');
                for(var i = 0;i<skuKeys.length;i++){
                    defSpecsObj[skuKeys[i]] = defSpecsAry[i];
                }
            }
            key = skuKeys[skuKeys.length - 1];
            me.onChooseSpect(0,0,key,defSpecsObj,spectsData,'',viewType);

        }else{//无规格的商品,将返回默认的规格数据直接封装到购买数据储存中
            var showState = localStorage.showState;//是否显示规格弹窗，点击关闭按钮时返回上一页
            if(specificationArrayAll.length == 0)localStorage.showState = null;
            /*设置规格初始化数据*/
            showChooseSpect.setHtml('<div class="chooseSpect-style"><sapn style="color:#333;font-size:1rem;margin-right: 1.2rem">已选</sapn>1件</div>');
            if(specificationArrayAll.length == 0) return;
            var buyGoodsSkuAry = new Array();
            buyGoodsSkuAry["goodsImg"] = data.displayImage;
            buyGoodsSkuAry["isBuy"] = true;
            buyGoodsSkuAry["displayImage"] = data.displayImage;
            buyGoodsSkuAry["specPic"] = data.displayImage;
            buyGoodsSkuAry["displayName"] = data.displayName;
            buyGoodsSkuAry["brandName"] = data.brandName;
            buyGoodsSkuAry["shopRemind"] = data.shopRemind;
            buyGoodsSkuAry["title"] = data.title;
            buyGoodsSkuAry["brandCountry"] = data.brandCountry;
            buyGoodsSkuAry["status"] = data.status;
            buyGoodsSkuAry["count"] = data.count;
            buyGoodsSkuAry["activityType"] = data.activityType;
            buyGoodsSkuAry["spectValue"] = '';
            buyGoodsSkuAry["num"] = 1;
            buyGoodsSkuAry["country"] = data.country;
            buyGoodsSkuAry["buyGoodNum"] = 1;
            buyGoodsSkuAry["specificationArrayAll"] = specificationArrayAll;
            buyGoodsSkuAry["sellingPrice"] = specificationArrayAll[0].sellingPrice.toFixed(2);
            buyGoodsSkuAry["marketPrice"] = specificationArrayAll[0].marketPrice;
            buyGoodsSkuAry["skuId"] = specificationArrayAll[0].id;
            buyGoodsSkuAry["productId"] = specificationArrayAll[0].productId;
            buyGoodsSkuAry["amount"] = specificationArrayAll[0].amount;
            buyGoodsSkuAry["proPrice"] = data.price;
            buyGoodsSkuAry["isDuplicated"] = prmtrData.isDuplicated;
            buyGoodsSkuAry["isShared"] = prmtrData.isShared;
            buyGoodsSkuAry["promotionId"] = prmtrData.promotionId;
            buyGoodsSkuAry["limitCount"] = data.limitCount;
            buyGoodsSkuAry["promotionType"] = prmtrData.promotionType;
            buyGoodsSkuAry["condition"] = prmtrData.condition;
            buyGoodsSkuAry["mode"] = prmtrData.mode;
            buyGoodsSkuAry["fullCutRuleArray"] = prmtrData.fullCutRuleArray;
            buyGoodsSkuAry["promotionDis"] = prmtrData.promotionDis;
            buyGoodsSkuAry["isFreeship"] = prmtrData.isFreeship;
            buyGoodsSkuAry["userOrderCount"] = prmtrData.userOrderCount;
            buyGoodsSkuAry["promotionName"] = prmtrData.promotionName;
            buyGoodsSkuAry["costPrice"] = specificationArrayAll[0].sellingPrice;//用于传入确认订单界面
            buyGoodsSkuAry["viewType"] = viewType;  //底部弹框区分页面
            buyGoodsSkuAry["isNewUser"] = data.isNewUser;  //是否新人
            buyGoodsSkuAry["fullGiveArray"] = data.fullGiveArray;  //满赠

            if(isActivitying == 1){  //判断是否在限时购活动进行中
                buyGoodsSkuAry["sellingPrice"] = specificationArrayAll[0].activityPrice.toFixed(2);
                buyGoodsSkuAry["costPrice"] = specificationArrayAll[0].activityPrice;
            }
            if(data.limitCount != 0 && data.limitCount != undefined){//限购
                buyGoodsSkuAry["amount"] = data.limitCount
            }
            if(prmtrData.promotionType != undefined && prmtrData.promotionType != '' && prmtrData.promotionType != 13){
                var rulePrice = Ext.utils.PromotionRule.promotionRule(prmtrData,buyGoodsSkuAry);
                buyGoodsSkuAry["sellingPrice"] = parseFloat(rulePrice).toFixed(2);
            }
            buyGoodsSku = buyGoodsSkuAry;
            shopWindow.setData(buyGoodsSkuAry);
            if(showState == 'true')shopWindow.show();
        }
    }
  /**********************规格组装   start*/
   
    getObjKeys: function(obj) {
        if (obj !== Object(obj)) throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj)
            if (Object.prototype.hasOwnProperty.call(obj, key))
                keys[keys.length] = key;
        return keys;
    },
    combInArray: function(aData) {
        if (!aData || !aData.length) {
            return [];
        }

        var len = aData.length;
        var aResult = [];

        for (var n = 1; n < len; n++) {
            var aaFlags = this.getCombFlags(len, n);
            while (aaFlags.length) {
                var aFlag = aaFlags.shift();
                var aComb = [];
                for (var i = 0; i < len; i++) {
                    aFlag[i] && aComb.push(aData[i]);
                }
                aResult.push(aComb);
            }
        }
        return aResult;
    },
    add2SKUResult: function(combArrItem, sku) {
        var key = combArrItem.join("-");
        if (SKUResult[key]) { //SKU信息key属性·
            SKUResult[key].count += 1;
            SKUResult[key].prices.push(2);
        } else {
            SKUResult[key] = {
                count: 1,
                prices: [2]
            };
        }
    },
    getCombFlags: function(m, n) {
        if (!n || n < 1) {
            return [];
        }

        var aResult = [];
        var aFlag = [];
        var bNext = true;
        var i, j, iCnt1;

        for (i = 0; i < m; i++) {
            aFlag[i] = i < n ? 1 : 0;
        }

        aResult.push(aFlag.concat());

        while (bNext) {
            iCnt1 = 0;
            for (i = 0; i < m - 1; i++) {
                if (aFlag[i] == 1 && aFlag[i + 1] == 0) {
                    for (j = 0; j < i; j++) {
                        aFlag[j] = j < iCnt1 ? 1 : 0;
                    }
                    aFlag[i] = 0;
                    aFlag[i + 1] = 1;
                    var aTmp = aFlag.concat();
                    aResult.push(aTmp);
                    if (aTmp.slice(-n).join("").indexOf('0') == -1) {
                        bNext = false;
                    }
                    break;
                }
                aFlag[i] == 1 && iCnt1++;
            }
        }
        return aResult;
    },
    /**********************规格组装   end*/