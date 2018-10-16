<template>
	<div>
		<div class="weui-tab__panel">
	        <div id="tab_home" class="tab_panel_content on" :style="{height: contentHeight + 'px', overflow: 'auto'}">
	            <div class="weui-cell__hd info_top flex_b">
	                <div class="weui-cell__hd__text">{{productName}}</div>
	                <div class="weui-cell__hd__logo">
	                    <img src="static/images/logo.png" alt=""></img>
	                </div>
	            </div>
	            <!-- 表单信息 -->
	            <form class="form_user" id="form_user">
	                <div class="section">
	                    <div class="section__hd flex_b">
	                        <span class="section_title">基本信息</span>
	                    </div>
	                    <div class="section__bd">
	                        <div class="datePicker">
	                            <div class="datePicker_box flex_b" id="dateEff">
	                                <p>生效时间</p>
	                                <div class="dateResult infoText">{{formData.dateEff}}</div>
	                            </div>
	                            <div class="datePicker_box flex_b" id="dateExp">
	                                <p>终止时间</p>
	                                <div class="dateResult infoText">{{formData.dateExp}}</div>
	                            </div>
	                        </div>
	                        <div class="section__bd__item flex_b" v-if="insuranceType == '3'">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">目的地</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.FurthestCity}}</p>
	                            </div>
	                        </div>
	                        <div class="section__bd__item flex_b" v-if="insuranceType == '4'">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">房屋结构</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.housetype}}</p>
	                            </div>
	                        </div>
	                        <div class="section__bd__item flex_b" v-if="insuranceType == '4'">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">房屋所在地</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.RegionDivisionCode}}</p>
	                            </div>
	                        </div>
	                        <div class="section__bd__item flex_b" v-if="insuranceType == '4'">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">详细地址</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.detailAddress}}</p>
	                            </div>
	                        </div>
	                        <div class="section__bd__item flex_b" v-if="axtxCode == '1'">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">车牌号</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.licenseNo}}</p>
	                            </div>
	                        </div>
	                        <div class="section__bd__item flex_b" v-if="axtxCode == '1'">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">车架号</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.frameNo}}</p>
	                            </div>
	                        </div>
	                        <div class="section__bd__item flex_b" v-if="axtxCode == '0' && insuranceType == '1'">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">职业类别</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.ProfessionType}}</p>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <div class="section">
	                    <div class="section__hd flex_b">
	                        <span class="section_title">投保人信息</span>
	                    </div>
	                    <div class="section__bd">
	                        <div class="section__bd__item flex_b">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">姓名</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.name}}</p>
	                            </div>
	                        </div>
	                        <div class="section__bd__item flex_b">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">身份证</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.insuredIdNo}}</p>
	                            </div>
	                        </div>
	                        <div class="section__bd__item flex_b weui-cells_radio">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">性别</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.gender}}</p>
	                            </div>                                        
	                        </div>
	                        <div class="datePicker">
	                            <div class="datePicker_box flex_b" id="birthday">
	                                <p>出生日期</p>
	                                <div class="dateResult infoText">{{formData.birthday}}</div>
	                            </div>
	                        </div>
	                        <div class="section__bd__item flex_b">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">手机号码</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.phoneNumber}}</p>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <div class="section isSame">
	                    <div class="section__hd flex_b">
	                        <span class="section_title">同一人</span>
	                        <div class="section__bd__item weui-cells_radio" style="text-align: right;">
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{isSameList[formData.isSame]}}</p>
	                            </div>                                        
	                        </div>
	                    </div>
	                </div>
	                <div class="section" v-if="formData.isSame == '0'">
	                    <div class="section__hd flex_b">
	                        <span class="section_title">被保人信息</span>
	                    </div>
	                    <div class="section__bd">
	                        <div class="section__bd__item flex_b">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">姓名</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.b_Name}}</p>
	                            </div>
	                        </div>
	                        <div class="section__bd__item flex_b">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">身份证</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.b_InsuredIdNo}}</p>
	                            </div>
	                        </div>
	                        <div class="section__bd__item flex_b weui-cells_radio">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">性别</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.b_gender}}</p>
	                            </div>                                        
	                        </div>
	                        <div class="datePicker">
	                            <div class="datePicker_box flex_b" id="birthday">
	                                <p>出生日期</p>
	                                <div class="dateResult infoText">{{formData.b_birthday}}</div>
	                            </div>
	                        </div>
	                        <div class="section__bd__item flex_b">
	                            <div class="weui-cell_hd">
	                                <label class="weui-label">手机号码</label>
	                            </div>
	                            <div class="weui-cell_bd">
	                                <p class="infoText">{{formData.b_phoneNumber}}</p>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <div class="section" v-if="insuranceType == '1' || insuranceType == '3'">
	                    <div class="section__hd flex_b">
	                        <span class="section_title">受益人信息</span>
	                        <span style="color: #999;">法定受益人</span>
	                    </div>
	                </div>
	            </form>                       
	            <!-- 表单信息 end -->
	            <!-- 保费显示 -->
	            <div class="purchase_entry">
	                <div class="cost">
	                    <div class="cost_box">
	                        保费：<i>￥{{totalPremium}}</i>
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
                        <i class="weui-loading weui-icon_toast"></i>
                        <p class="weui-toast__content">{{msg}}</p>
                    </div>
                </div>
                <!-- 提示信息 end -->
	        </div>
	    </div>
	</div>
</template>

<script>
	import Router from 'vue-router'
	import bus from '../assets/js/bus'
	export default{
		data: () => ({
			productName: '',
			isSameList: ['否','是'],
			formData: {},
			contentHeight: 0,
			formData: {},
			totalPremium: '',
			plancode: '',
			msg: '',
			showmsg: false
		}),
		components: {
            
        }, 
		created(){
			this.getDetails(this.$route.query.id);			
			this.contentHeight = document.documentElement.clientHeight;
			this.totalPremium = this.$route.query.totalPremium;
			this.formData = this.$store.state.formData;					
		},
		mounted(){
			
		},
		methods: {
			getDetails: function(id){
                this.$http.get('http://www.xiaobaodan.cn/api/web/index.php?r=policy-type/product&id=', {params: {id: id}}).then(response => {
                    this.details = response.body.newData;
                    this.productName = this.details[0].product_name;
                    this.insuranceType = this.details[0].type;
                    this.axtxCode = this.details[0].axtx_code;
                    this.plancode = this.details[0].plancode;
                }, response => {
                    console.log(response.body);
                })
            },
            purchase: function(){
            	var _this = this, TransactionId = '';
            	var router = new Router();
            	this.showmsg = true;
                this.$store.dispatch('getShowMsg',true);
                this.msg = '加载中...';
            	if(this.axtxCode == 0){
            		if(this.insuranceType == '3'){
            			console.log(this.$route.query.productcode)
            			this.$http.post('http://www.xiaobaodan.cn/api/web/index.php?r=policy-info',{wx_id: _this.$store.state.wx_id, product_id: _this.$route.query.id, insurance_name: _this.details[0].insurance_name, product_name: _this.details[0].product_name, product_code: _this.$route.query.productcode, transaction_eff_date: _this.formData.dateEff, transaction_exp_date: _this.formData.dateExp, Name: _this.formData.name, Gender: _this.formData.gender, BirthDt: _this.formData.birthday, InsuredIdNo: _this.formData.insuredIdNo, HomePhoneNo: _this.formData.phoneNumber, IsInsuredFlag: _this.formData.isSame, b_Name: _this.formData.b_Name, b_Gender: _this.formData.b_gender, b_BirthDt: _this.formData.b_birthday, b_InsuredIdNo: _this.formData.b_InsuredIdNo, b_HomePhoneNo: _this.formData.b_phoneNumber, ResidenceType: _this.formData.housetype, RegionDivisionCode: _this.formData.RegionDivisionCode, detailAddress: _this.formData.detailAddress, FurthestCity: _this.formData.FurthestCity, ProfessionCode: _this.formData.ProfessionCode},{emulateJSON: true}).then(response => {
	            			console.log(response.body)
	            			var error = response.body.msg;
			                if (response.body.Header) {
			                	TransactionId = response.body.Header.TransactionId;
			                	_this.$store.dispatch('getTransactionId',TransactionId);
			                	_this.showmsg = false;
	                    		_this.$store.dispatch('getShowMsg',false);
			                	router.push({path: '/payment'});
			                }
			                else if(response.body.msg){
			                	_this.$store.dispatch('getError',error);
			                	_this.showmsg = false;
	                    		_this.$store.dispatch('getShowMsg',false);
			                	router.push({path: '/payment'});
			                }
	            		}, response => {
	            			console.log(response.body)
	            		})
            		}
            		else {
            			this.$http.post('http://www.xiaobaodan.cn/api/web/index.php?r=policy-info',{wx_id: _this.$store.state.wx_id, product_id: _this.$route.query.id, insurance_name: _this.details[0].insurance_name, product_name: _this.details[0].product_name, product_code: _this.details[0].product_code, transaction_eff_date: _this.formData.dateEff, transaction_exp_date: _this.formData.dateExp, Name: _this.formData.name, Gender: _this.formData.gender, BirthDt: _this.formData.birthday, InsuredIdNo: _this.formData.insuredIdNo, HomePhoneNo: _this.formData.phoneNumber, IsInsuredFlag: _this.formData.isSame, b_Name: _this.formData.b_Name, b_Gender: _this.formData.b_gender, b_BirthDt: _this.formData.b_birthday, b_InsuredIdNo: _this.formData.b_InsuredIdNo, b_HomePhoneNo: _this.formData.b_phoneNumber, ResidenceType: _this.formData.housetype, RegionDivisionCode: _this.formData.RegionDivisionCode, detailAddress: _this.formData.detailAddress, FurthestCity: _this.formData.FurthestCity, ProfessionCode: _this.formData.ProfessionCode},{emulateJSON: true}).then(response => {
	            			console.log(response.body)
	            			var error = response.body.msg;
			                if (response.body.Header) {
			                	TransactionId = response.body.Header.TransactionId;
			                	_this.$store.dispatch('getTransactionId',TransactionId);
			                	_this.showmsg = false;
	                    		_this.$store.dispatch('getShowMsg',false);
			                	router.push({path: '/payment'});
			                }
			                else if(response.body.msg){
			                	_this.$store.dispatch('getError',error);
			                	_this.showmsg = false;
	                    		_this.$store.dispatch('getShowMsg',false);
			                	router.push({path: '/payment'});
			                }
	            		}, response => {
	            			console.log(response.body)
	            		})
            		}
            	}
            	if(this.axtxCode == 1){
            		this.$http.post('http://www.xiaobaodan.cn/api/web/index.php?r=an-xing/rewrite',{wx_id: _this.$store.state.wx_id, product_id: _this.$route.query.id, insurance_name: _this.details[0].insurance_name, product_name: _this.details[0].product_name, product_code: _this.details[0].product_code, transaction_eff_date: _this.formData.dateEff, transaction_exp_date: _this.formData.dateExp, Name: _this.formData.name, Gender: _this.formData.gender, BirthDt: _this.formData.birthday, InsuredIdNo: _this.formData.insuredIdNo, HomePhoneNo: _this.formData.phoneNumber, IsInsuredFlag: _this.formData.isSame, b_Name: _this.formData.b_Name, b_Gender: _this.formData.b_gender, b_BirthDt: _this.formData.b_birthday, b_InsuredIdNo: _this.formData.b_InsuredIdNo, b_HomePhoneNo: _this.formData.b_phoneNumber, plancode: _this.details[0].plancode, total_premium: _this.totalPremium, licenseNo: _this.formData.licenseNo, frameNo: _this.formData.frameNo},{emulateJSON: true}).then(response => {
            			console.log(response.body)
            			var error = response.body.msg;
		                if (response.body.TransactionId) {
		                	TransactionId = response.body.TransactionId;
		                	_this.$store.dispatch('getTransactionId',TransactionId);
		                	_this.showmsg = false;
                    		_this.$store.dispatch('getShowMsg',false);
		                	router.push({path: '/payment'});
		                }
            		}, response => {
            			console.log(response.body)
            		})
            	}
            }
		}
	}
</script>

<style scoped>
	.weui-tab__panel{
        padding-bottom: 0 !important;
    }
    .tab_panel_content{
        background-color: #eee;
    }
</style>