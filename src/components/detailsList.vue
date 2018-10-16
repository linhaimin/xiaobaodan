<template>
	<div>
		<!-- header -->
		<div class="header">
	        <img :src="'static/images/top_p' + insuranceType + '.png'"></img>
	        <div class="weui-cell__bd">{{insuranceTypeName}}</div>
	    </div>
	    <!-- header end-->
	    <div id="detailsBodyBox" :style="{height: bodyHeight + 'px', overflow: 'auto'}">	
			<!-- 产品详情 -->
		    <ul class="weui-cells product_list details_list" id="product_details">
		        <li class="weui-cell weui-cell_access" v-for="item in detailslist">
		            <div class="weui-cell__hd" id="">
		                <div class="weui-cell__hd__text">{{item.product_name}}</div>
		                <div class="weui-cell__hd__logo">
		                    <img src="static/images/logo.png" alt=""></img>
		                </div>
		            </div>
		            <div class="product_feature_box">
		                <div class="desDetail__hd">
		                    <div class="desDetail__hd__left">
		                        <img src="static/images/icon_idea.png" alt=""></img>
		                        <span>亮点</span>
		                    </div>
		                    <div class="desDetail__hd__right">
		                        <span>{{item.product_feature}}</span>
		                    </div>                      
		                </div>                        
		            </div>  
		            <div class="weui-cell__bd">
		                <div class="wrapper">
		                    <div class="weui-cell__bd__box">
		                        <div class="des maxNum">
			                        限购份数：<span>{{item.limit_share}}</span>份
			                    </div>                  
			                    <div class="des age" v-if="item.product_code == '327' || item.product_code == '421' || item.type == '1' || item.type == '3'">
			                        承保年龄：<span>{{item.insurance_age}}</span>周岁
			                    </div>
			                    <div class="des time" v-if="item.product_code == '327' || item.product_code == '421' || item.type == '1' || item.type == '5'">
			                        保障时间：<span>{{item.insurance_term}}</span>年
			                    </div>
			                    <div class="des job" v-if="item.type == '1'">
			                        承保职业：<span>{{item.occ_class}}</span>类
			                    </div>
		                    </div>
		                </div>                                
		            </div>  
		            <div class="weui-cell__ft" >
		                <div class="desDetail__hd">
		                    <div class="desDetail__hd__left">
		                        <img src="static/images/des_icon.png" alt="">
		                        <span class="desDetail__hd__text">保障内容</span>
		                    </div>                                                                                
		                </div> 
		                <div class="desDetail__bd">
		                    <div class="desDetail__bd__item" v-for="explainItem in item.explain" :class="{open: explainItem.id == curIndex}" :id="explainItem.id" @click="showExplain">
		                        <div class="explain__hd">
		                            <span class="item__txt">{{explainItem.explain}}</span>
		                            <span class="item__fee">{{explainItem.policy_price}}</span>
		                            <img class="icon_down" src="static/images/down_button.png" alt="">
		                            <img class="icon_up" src="static/images/up_button.png" alt="">
		                        </div>
		                        <div class="explain__ft">
		                            <p>{{explainItem.explain_text}}</p>
		                        </div>                 
		                    </div>           
		                </div>
		                <div class="desDetail__ft">
		                    <div class="a_box"> 
		                        <a href="javascript: void(0);" id="notice" :class="{open: isNotice}" @click.stop="showContent">投保须知</a>
		                        <a :href="item.insurance_clause" id="clause" :class="{open: isClause}" @click.stop="showContent">保险条款</a>
		                        <a href="https://xbd.dev.dareninfo.com/api/web/job.pdf" id="occ" :class="{open: isOcc}" @click.stop="showContent">职业分类表</a>
		                    </div>
		                    <div class="content_open" id="content_open" :class="{open: isNotice}">
		                        <p>{{item.notice}}</p>
		                    </div>
		                </div>        
		            </div>    
		        </li>
		    </ul>
		    <!-- 产品详情 end -->
		    <!-- 时间选择 -->
	        <div class="datePicker">
	        	<div class="datePicker_box flex_b" id="dateInsured" @click="selectInsuredDate" v-if="showInsuredDate">
	                <p>保障时间</p>
	                <div class="dateResult">{{dateInsured}}</div>
	            </div>
	            <div class="datePicker_box flex_b" id="dateEff" @click="chooseDate">
	                <p>生效时间</p>
	                <div class="dateResult">{{dateEff}}</div>
	            </div>
	            <div class="datePicker_box flex_b" id="dateExp" @click="chooseDate">
	                <p>终止时间</p>
	                <div class="dateResult">{{dateExp}}</div>
	            </div>
	        </div>
	        <!-- 时间选择 end -->
	        <!-- 保费显示 -->
	        <div class="purchase_entry">
	            <div class="cost">
	                <div class="cost_box">
	                    保费：<i v-show="showPremium">￥{{totalPremium}}</i>
	                </div>
	            </div>
	            <div class="btn_box">
	                <button class="weui-btn" @click="purchase">立即购买</button>
	            </div>
	        </div>
	        <!-- 保费显示 end -->
	        <!-- 提示信息 -->
	        <div id="msgToast" class="msg" :class="{showMsg: showmsg}">
		        <div class="weui-mask_transparent"></div>
		        <div class="weui-toast">
		            <i class="weui-msg weui-icon_toast"></i>
		            <p class="weui-toast__content">{{msg}}</p>
		        </div>
		    </div>
		    <!-- 提示信息 end -->
	    </div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import Router from 'vue-router'
	export default{
		data: () => ({
			detailslist: [],
			insuranceType: '',
    		insuranceTypeName: '',
    		bodyHeight: 0,
    		curIndex: -1,
    		isNotice: false,
    		isClause: false,
    		isOcc: false,
    		insuredDateArr: [],
    		dateEff: '',
    		dateExp: '',
    		dateInsured: '',
    		flagEff: false,
    		flagExp: false,
    		firstDateStrArr_2: [],
    		tempValue: 0,
    		showInsuredDate: false,
    		totalPremium: '',
    		showPremium: false,
    		msg: '',
    		showmsg: false,
    		id: '',
    		startDate: '',
    		productcode: ''
		}),
		mounted() {	
			this.getDetailsList(this.$route.query.id);
    		this.bodyHeight = document.documentElement.clientHeight - 80;
    		var firstDate = new Date();
			firstDate.setTime(Date.parse(new Date()) + 24 * 60 * 60 * 1000);
			var firstDateStr =firstDate.toISOString().slice(0,10);
			this.startDate = firstDateStr;		   			        
		},
		methods: {
			getDetailsList: function(id){
				this.$http.get('http://www.xiaobaodan.cn/api/web/index.php?r=policy-type/product&id=', {params: {id: id}}).then(response => {
					console.log(response.body)
					this.detailslist = response.body.newData;
					this.id = this.detailslist[0].id;
					this.insuranceType = this.detailslist[0].type;
					this.insuranceTypeName = this.detailslist[0].type_name;
					if(this.insuranceType == 3 && this.detailslist[0].insured_date){
						this.showInsuredDate = true;
					}
					else{
						this.showInsuredDate = false;
					}
					if(this.detailslist[0].axtx_code == '1'){
						this.showPremium = true;
						this.totalPremium = this.detailslist[0].total_premium;
					}
					var tempList = 	this.detailslist[0].insured_date;			
					for(var i = 0; i < tempList.length; i++){					
						tempList[i].value = i;
					}
					this.insuredDateArr = tempList;
				}, response => {
					console.log(response.body);
				})
			},
			getPremium: function (product_code, cover_year, guarantee_type, eff_date, exp_date){
				this.$http.post('http://www.xiaobaodan.cn/api/web/index.php?r=policy-post',{product_code:product_code,cover_year:cover_year,guarantee_type:guarantee_type,transaction_eff_date:eff_date,transaction_exp_date:exp_date},{emulateJSON: true}).then(response => {
					console.log(response.body);
					if (response.body.Segment.PolicyOut){
						this.showPremium = true;
						this.totalPremium = response.body.Segment.PolicyOut.TotalPremium;
						this.productcode = response.body.Segment.PolicyIn.ProductCode;
					}
					else{
						this.showPremium = false;
					}

				}, response => {
					console.log(response.body);
				})		
			},
			formatDateStr: function(str){
				var arr = str.split('-');
				return arr[0] + '-' + (arr[1] < 10 ? '0' + arr[1] : arr[1]) + '-' + (arr[2] < 10 ? '0' + arr[2] : arr[2]);
			},
			addmulMonth: function(dtstr, n) {   // n个月后 
				var s = dtstr.split("-");
				var yy = parseInt(s[0]); var mm = parseInt(s[1] - 1); var dd = parseInt(s[2]);
				var dt = new Date(yy,mm,dd);
				dt.setMonth(dt.getMonth() + n);
				if ((dt.getFullYear() * 12 + dt.getMonth()) > (yy * 12 + mm + n)) {
					dt = new Date(dt.getFullYear(), dt.getMonth(), 0);
				}
				var str = dt.getFullYear() + "-" + (dt.getMonth() >= 9 ? dt.getMonth() + 1 : "0" + (dt.getMonth() + 1)) + "-" + (dt.getDate() > 9 ? dt.getDate() : "0" + dt.getDate());
				var dd = new Date(str);
				var timestamp = 0;
				if (((dt.getMonth() + 1) == 2 && dt.getDate() == 28) || ((dt.getMonth() + 1) == 2 && dt.getDate() == 29)){
					timestamp = Date.parse(dd) / 1000;
				}
				else {
					timestamp = Date.parse(dd) / 1000 - 24 * 60 * 60;
				} 
				var date = new Date();
				date.setTime(timestamp*1000);
				return date;
			},
			showExplain: function(e){
				if(this.curIndex == e.currentTarget.id){
					this.curIndex = -1;
				}
				else{
					this.curIndex = e.currentTarget.id;
				}
			},
			showContent: function(e){
				if(e.currentTarget.id == 'notice'){
					this.isNotice = !this.isNotice;
					this.isClause = false;
					this.isOcc = false;
				}
				else if(e.currentTarget.id == 'clause'){
					this.isClause = !this.isClause;
					this.isNotice = false;
					this.isOcc = false;
				}
				else{
					this.isOcc = !this.isOcc;
					this.isNotice = false;
					this.isClause = false;
				}
			},
			selectInsuredDate: function(e){
				var _this = this;
		        weui.picker(_this.insuredDateArr, {
		        	defaultValue: [0],
		        	onConfirm: function (result) {
		                _this.tempValue = result[0].value;
		                _this.dateInsured = result[0].label;
		                _this.$store.dispatch('getDateInsured', _this.dateInsured);
		                console.log(_this.insuredDateArr[_this.tempValue]);
		                //若更改保障时间且已选择生效时间，则刷新终止时间显示
		                if(_this.flagEff){
		                	//产品是否有最低起购时间,若有则根据生效时间限制终止时间选择
		                    if(_this.detailslist[0].from_buy_date != 0){
				            	let newEffDate = new Date(_this.dateEff);
						        let timestamp = Date.parse(newEffDate) + (parseInt(_this.detailslist[0].from_buy_date) - 1) * 24 * 60 * 60 * 1000;
						        let newAfterCur_date = new Date();
						        newAfterCur_date.setTime(timestamp);
						        let tempStr = newAfterCur_date.toISOString().slice(0,10);
						        _this.startDate = tempStr;
						        let tempArr = tempStr.split('-');
						        _this.firstDateStrArr_2 = [];
						        for(var j = 0; j < tempArr.length; j++){
						        	_this.firstDateStrArr_2.push(parseInt(tempArr[j]));
						        }
						        _this.$store.dispatch('getfirstDateStrArr', _this.firstDateStrArr_2);
				            }
				            //若旅游险产品且所选保障时间为1年或者其他类型产品，则根据生效时间自动显示1年间隔的终止时间
				            if((_this.insuranceType == 3 && _this.insuredDateArr.length > 0 && _this.insuredDateArr[_this.tempValue].guarantee_type == 1) || (_this.insuranceType != 3)){
				            	let date = new Date(_this.dateEff);
						        let tiemstamp = Date.parse(date) + 31449600000;
						        let lastDate = new Date();
						        lastDate.setTime(tiemstamp);
						        _this.dateExp = lastDate.toISOString().slice(0,10);
						        _this.$store.dispatch('getDateExp', _this.dateExp);
						        _this.flagExp = true;
						        if (_this.flagEff && _this.flagExp && _this.detailslist[0].axtx_code == 0) {
						          	_this.getPremium(_this.detailslist[0].product_code, _this.detailslist[0].cover_year, _this.insuredDateArr[_this.tempValue].guarantee_type, _this.dateEff, _this.dateExp);
						        }
				            }
				            //若旅游险产品所选保障时间为短期，且费率固定，则根据生效时间自动显示相应间隔的终止时间
				            else if(_this.insuranceType == 3 && _this.insuredDateArr.length > 0 && _this.insuredDateArr[_this.tempValue].guarantee_type == 0 && _this.insuredDateArr[_this.tempValue].insured_date){
				            	//按天数算
				            	if (_this.insuredDateArr[_this.tempValue].insured_date.indexOf('月') != -1){
						          	let month = parseInt(_this.insuredDateArr[_this.tempValue].insured_date);
						          	let lastDate = _this.addmulMonth(_this.dateEff, month);
						          	_this.dateExp = lastDate.toISOString().slice(0,10);
						        	_this.$store.dispatch('getDateExp', _this.dateExp);	
						        	_this.flagExp = true;
						        	if (_this.flagEff && _this.flagExp && _this.detailslist[0].axtx_code == 0) {
							          	_this.getPremium(_this.detailslist[0].product_code, _this.detailslist[0].cover_year, _this.insuredDateArr[_this.tempValue].guarantee_type, _this.dateEff, _this.dateExp);
							        }					          
						        }
						        //按自然月算
						        else{
						        	let date = new Date(_this.dateEff);
									let days = parseInt(_this.insuredDateArr[_this.tempValue].insured_date);
									let timestampAdd = (days - 1) * 24 * 60 * 60;
									let tiemstamp = Date.parse(date) / 1000 + timestampAdd;
									let lastDate = new Date();
									lastDate.setTime(tiemstamp * 1000);
									_this.dateExp = lastDate.toISOString().slice(0,10);
						        	_this.$store.dispatch('getDateExp', _this.dateExp);
						        	_this.flagExp = true;
						        	if (_this.flagEff && _this.flagExp && _this.detailslist[0].axtx_code == 0) {
							          	_this.getPremium(_this.detailslist[0].product_code, _this.detailslist[0].cover_year, _this.insuredDateArr[_this.tempValue].guarantee_type, _this.dateEff, _this.dateExp);
							        }
						        }
				            }
				            else if(!_this.insuredDateArr[_this.tempValue].insured_date){
				            	_this.dateExp = '';
				            	_this.showPremium = false;
				            	_this.$store.dispatch('getDateExp', _this.dateExp);
						        _this.flagExp = false;
				            }				            
		                }
		                //若所选保障时间内费率不固定，则不生成终止时间
			            else if(!_this.insuredDateArr[_this.tempValue].insured_date){
			            	_this.dateExp = '';
			            	_this.showPremium = false;
			            	_this.$store.dispatch('getDateExp', _this.dateExp);
					        _this.flagExp = false;
			            }
		            },
		            id: 'dateInsured'
		        });
			},
			chooseDate: function(e){
				var _this = this;
				//时间默认当前时间的下一天
				var firstDate = new Date();
				firstDate.setTime(Date.parse(new Date()) + 24 * 60 * 60 * 1000);
				var firstDateStr =firstDate.toISOString().slice(0,10);
				var firstDateArr = firstDateStr.split('-');
				var firstDateStrArr_1 = [];
				for (var i = 0; i < firstDateArr.length; i++){
					firstDateStrArr_1.push(parseInt(firstDateArr[i]));
				}
				if(e.currentTarget.id == 'dateEff'){					
		            weui.datePicker({
		                start: firstDateStr,
		                end: new Date().getFullYear() + 2,
		                defaultValue: firstDateStrArr_1,         
		                onConfirm: function (result) {
		                    _this.dateEff = result[0] + '-' + (result[1] < 10 ? '0' + result[1] : result[1]) + '-' + (result[2] < 10 ? '0' + result[2] : result[2]);
		                    _this.flagEff = true;
		                    _this.$store.dispatch('getDateEff', _this.dateEff);
		                    //产品是否有最低起购时间,若有则根据生效时间限制终止时间选择
		                    if(_this.detailslist[0].from_buy_date != 0){
				            	let newEffDate = new Date(_this.dateEff);
						        let timestamp = Date.parse(newEffDate) + (parseInt(_this.detailslist[0].from_buy_date) - 1) * 24 * 60 * 60 * 1000;
						        let newAfterCur_date = new Date();
						        newAfterCur_date.setTime(timestamp);
						        let tempStr = newAfterCur_date.toISOString().slice(0,10);
						        _this.startDate = tempStr;
						        let tempArr = tempStr.split('-');
						        _this.firstDateStrArr_2 = [];
						        for(var j = 0; j < tempArr.length; j++){
						        	_this.firstDateStrArr_2.push(parseInt(tempArr[j]));
						        }
						        _this.$store.dispatch('getfirstDateStrArr', _this.firstDateStrArr_2);
				            }
				            //若旅游险产品且所选保障时间为1年或者其他类型产品，则根据生效时间自动显示1年间隔的终止时间
				            if((_this.insuranceType == 3 && _this.insuredDateArr.length > 0 && _this.insuredDateArr[_this.tempValue].guarantee_type == 1) || (_this.insuranceType != 3)){
				            	console.log(_this.insuredDateArr[_this.tempValue]);
				            	let date = new Date(_this.dateEff);
						        let tiemstamp = Date.parse(date) + 31449600000;
						        let lastDate = new Date();
						        lastDate.setTime(tiemstamp);
						        _this.dateExp = lastDate.toISOString().slice(0,10);
						        _this.$store.dispatch('getDateExp', _this.dateExp);
						        _this.flagExp = true;
						        if (_this.flagEff && _this.flagExp && _this.detailslist[0].axtx_code == 0) {
						          	_this.getPremium(_this.detailslist[0].product_code, _this.detailslist[0].cover_year, _this.insuredDateArr[_this.tempValue].guarantee_type, _this.dateEff, _this.dateExp);
						        }
				            }
				            //若旅游险产品所选保障时间为短期，且费率固定，则根据生效时间自动显示相应间隔的终止时间
				            else if(_this.insuranceType == 3 && _this.insuredDateArr.length > 0 && _this.insuredDateArr[_this.tempValue].guarantee_type == 0 && _this.insuredDateArr[_this.tempValue].insured_date){
				            	//按天数算
				            	if (_this.insuredDateArr[_this.tempValue].insured_date.indexOf('月') != -1){
						          	let month = parseInt(_this.insuredDateArr[_this.tempValue].insured_date);
						          	let lastDate = _this.addmulMonth(_this.dateEff, month);
						          	_this.dateExp = lastDate.toISOString().slice(0,10);
						        	_this.$store.dispatch('getDateExp', _this.dateExp);	
						        	_this.flagExp = true;					          
						        }
						        //按自然月算
						        else{
						        	let date = new Date(_this.dateEff);
									let days = parseInt(_this.insuredDateArr[_this.tempValue].insured_date);
									let timestampAdd = (days - 1) * 24 * 60 * 60;
									let tiemstamp = Date.parse(date) / 1000 + timestampAdd;
									let lastDate = new Date();
									lastDate.setTime(tiemstamp * 1000);
									_this.dateExp = lastDate.toISOString().slice(0,10);
						        	_this.$store.dispatch('getDateExp', _this.dateExp);
						        	_this.flagExp = true;
						        }						        
						        if (_this.flagEff && _this.flagExp && _this.detailslist[0].axtx_code == 0) {
						          	_this.getPremium(_this.detailslist[0].product_code, _this.detailslist[0].cover_year, _this.insuredDateArr[_this.tempValue].guarantee_type, _this.dateEff, _this.dateExp);
						        }
				            }
				            else if(_this.insuranceType == 3 && _this.insuredDateArr.length > 0 && _this.detailslist[0].from_buy_date == 0 && _this.insuredDateArr[_this.tempValue].guarantee_type == 0 && !_this.insuredDateArr[_this.tempValue].insured_date){
				            	let arr = _this.insuredDateArr[_this.tempValue].label.split('-');
				            	let newEffDate_1 = new Date(_this.dateEff);
						        let timestamp_1 = Date.parse(newEffDate_1) + (parseInt(arr[0]) - 1) * 24 * 60 * 60 * 1000;
						        let newAfterCur_date_1 = new Date();
						        newAfterCur_date_1.setTime(timestamp_1);
						        let tempStr_1 = newAfterCur_date_1.toISOString().slice(0,10);
						        _this.startDate = tempStr_1;
						        let tempArr_1 = tempStr_1.split('-');
						        _this.firstDateStrArr_2 = [];
						        for(var j = 0; j < tempArr_1.length; j++){
						        	_this.firstDateStrArr_2.push(parseInt(tempArr_1[j]));
						        }
						        _this.$store.dispatch('getfirstDateStrArr', _this.firstDateStrArr_2);
				            }
		                },
		                id: 'dateEff'
		            });
		            
				}
				else {
					if(_this.insuranceType == 3 && !_this.detailslist[0].insured_date){
						weui.datePicker({
			                start: firstDateStr,
			                end: new Date().getFullYear() + 2,
			                defaultValue: firstDateStrArr_1,           
			                onConfirm: function (result) {
			                    _this.dateExp = result[0] + '-' + (result[1] < 10 ? '0' + result[1] : result[1]) + '-' + (result[2] < 10 ? '0' + result[2] : result[2]);
			                    _this.$store.dispatch('getDateExp', _this.dateExp);
			                    _this.flagExp = true;
			                    if (_this.flagEff && _this.flagExp && _this.detailslist[0].axtx_code == 0) {
						          	_this.getPremium(_this.detailslist[0].product_code, _this.detailslist[0].cover_year, '', _this.dateEff, _this.dateExp);
						        }
			                },
			                id: 'dateExp'
			            });			            
					}
					else if(_this.insuranceType == 3 && _this.detailslist[0].from_buy_date != 0 && _this.insuredDateArr[_this.tempValue].insured_date == 0){						
			            weui.datePicker({
			                start: _this.startDate,
			                end: new Date().getFullYear() + 2,
			                defaultValue: _this.firstDateStrArr_2,           
			                onConfirm: function (result) {
			                    _this.dateExp = result[0] + '-' + (result[1] < 10 ? '0' + result[1] : result[1]) + '-' + (result[2] < 10 ? '0' + result[2] : result[2]);
			                    _this.$store.dispatch('getDateExp', _this.dateExp);
			                    _this.flagExp = true;
			                    if (_this.flagEff && _this.flagExp && _this.detailslist[0].axtx_code == 0) {
						          	_this.getPremium(_this.detailslist[0].product_code, _this.detailslist[0].cover_year, _this.insuredDateArr[_this.tempValue].guarantee_type, _this.dateEff, _this.dateExp);
						        }
			                },
			                id: 'dateExp'
			            });
			        }
			        else{
			        	weui.datePicker({
			                start: _this.startDate,
			                end: new Date().getFullYear() + 2,
			                defaultValue: _this.firstDateStrArr_2,           
			                onConfirm: function (result) {
			                    _this.dateExp = result[0] + '-' + (result[1] < 10 ? '0' + result[1] : result[1]) + '-' + (result[2] < 10 ? '0' + result[2] : result[2]);
			                    _this.$store.dispatch('getDateExp', _this.dateExp);
			                    _this.flagExp = true;
			                    if (_this.flagEff && _this.flagExp && _this.detailslist[0].axtx_code == 0) {
						          	_this.getPremium(_this.detailslist[0].product_code, _this.detailslist[0].cover_year, _this.insuredDateArr[_this.tempValue].guarantee_type, _this.dateEff, _this.dateExp);
						        }
			                },
			                id: 'dateExp'
			            });
			        }
				}
			},
			purchase: function(){
				var _this = this;
				var router = new Router();
				if (this.insuranceType == 3 && this.showInsuredDate && !this.dateInsured){
			      	_this.showmsg = true;
			      	_this.$store.dispatch('getShowMsg',true);
			      	_this.msg = '请确定保障时间';
		            setTimeout(function () {
		                _this.showmsg = false;
		                _this.$store.dispatch('getShowMsg',false);
		            }, 3000);
			      	return false;
			    }
			    else if (!this.dateEff){
			      	_this.showmsg = true;
			      	_this.$store.dispatch('getShowMsg',true);
			      	_this.msg = '请确定生效时间';
		            setTimeout(function () {
		                _this.showmsg = false;
		                _this.$store.dispatch('getShowMsg',false);
		            }, 3000);
			      	return false;
			    }
			    else if (!this.dateExp){
			      	_this.showmsg = true;
			      	_this.msg = '请确定终止时间';
			      	_this.$store.dispatch('getShowMsg',true);
		            setTimeout(function () {
		                _this.showmsg = false;
		                _this.$store.dispatch('getShowMsg',false);
		            }, 3000);
			      	return false;
			    }
			    router.push({path: '/info', query: {id: this.$route.query.id, dateEff: this.dateEff, dateExp: this.dateExp, totalPremium: this.totalPremium, productcode: this.productcode}})
			}
		},
		computed: mapState({
			dateEff: state => state.dateEff,
			dateExp: state => state.dateExp,
			firstDateStrArr_2: state => state.firstDateStrArr_2,
			startDate: state => state.startDate,
			showmsg: state => state.showmsg
		})
	}
</script>

<style>
	.msg{
		display: none;
	}
	.weui-icon_toast{
		margin: 15px auto 10px !important;
	}
	.msg.showMsg{
		display: block;
	}
	.weui-msg{
		padding-top: 0 !important;
	    width: 40px;
	    height: 40px;
	    vertical-align: baseline;
		background: url(data:image/png;base64,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) no-repeat;
		background-size: 100% 100%;
	}
</style>