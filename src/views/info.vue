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
                        <div class="section__hd flex_b" id="basicInfo" :class="{fold: isBasicInfo}" @click="collapse">
                            <span class="section_title">基本信息</span>
                            <img class="icon_down" src="static/images/down_button.png" alt="">
                            <img class="icon_up" src="static/images/up_button.png" alt="">
                        </div>
                        <div class="section__bd" :class="{fold: isBasicInfo}">
                            <div class="datePicker">
                                <div class="datePicker_box flex_b" id="dateEff">
                                    <p>生效时间</p>
                                    <div class="dateResult">{{formData.dateEff}}</div>
                                </div>
                                <div class="datePicker_box flex_b" id="dateExp">
                                    <p>终止时间</p>
                                    <div class="dateResult">{{formData.dateExp}}</div>
                                </div>
                            </div>
                            <div class="section__bd__item flex_b" v-if="insuranceType == '3' && !oneChoice" @click="selectGlobalArea">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">目的地</label>
                                </div>
                                <div class="weui-cell_bd">
                                    <input class="weui-input" id="FurthestCity" name="FurthestCity" v-model="formData.FurthestCity" :value="formData.FurthestCity" type="text" placeholder="请选择目的地" readOnly="readOnly"/>
                                </div>
                            </div>
                            <div class="section__bd__item flex_b" v-if="insuranceType == '3' && oneChoice">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">目的地</label>
                                </div>
                                <div class="weui-cell_bd">
                                    <input class="weui-input" id="FurthestCity" name="FurthestCity" v-model="formData.FurthestCity" :value="formData.FurthestCity" type="text" placeholder="" readOnly="readOnly"/>
                                </div>
                            </div>
                            <div class="section__bd__item flex_b weui-cells_radio" v-if="insuranceType == '4'">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">房屋结构</label>
                                </div>
                                <div class="weui-cell_bd flex_c">
                                    <label class="weui-cell weui-check__label flex_c" id="house_1" :class="{checked: cur_house_id == 'house_1'}" for="radio_7" @click.stop="selectHouseType">
                                        <div class="weui-cell__bd">
                                            <p>砖混</p>
                                        </div>
                                        <div class="weui-cell__ft">
                                            <input type="radio" class="weui-check" name="ResidenceType" value="砖混" id="radio_7" v-model="formData.housetype"/>
                                        </div>
                                    </label>                                   
                                    <label class="weui-cell weui-check__label flex_c" id="house_2" :class="{checked: cur_house_id == 'house_2'}" for="radio_8" @click.stop="selectHouseType">
                                        <div class="weui-cell__bd">
                                            <p>钢混</p>
                                        </div>
                                        <div class="weui-cell__ft">
                                            <input type="radio" name="ResidenceType" value="钢混" class="weui-check" id="radio_8" v-model="formData.housetype"/>
                                        </div>
                                    </label>
                                </div>                                        
                            </div>
                            <div class="section__bd__item flex_b" v-if="insuranceType == '4'" @click="selectArea">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">房屋所在地</label>
                                </div>
                                <div class="weui-cell_bd">
                                    <input class="weui-input" id="RegionDivisionCode" name="RegionDivisionCode" v-model="formData.RegionDivisionCode" :value="formData.RegionDivisionCode" type="text" placeholder="请选择房屋所在地" readOnly="readOnly"/>
                                </div>
                            </div>
                            <div class="section__bd__item flex_b" v-if="insuranceType == '4'">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">详细地址</label>
                                </div>
                                <div class="weui-cell_bd">
                                    <input class="weui-input" id="detailAddress" name="detailAddress" v-model="formData.detailAddress" :value="formData.detailAddress" type="text" placeholder="请填写详细地址" required/>
                                </div>
                            </div>
                            <div class="section__bd__item flex_b" v-if="axtxCode == '1'">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">车牌号</label>
                                </div>
                                <div class="weui-cell_bd">
                                    <input class="weui-input" id="licenseNo" name="licenseNo" v-model="formData.licenseNo" :value="formData.licenseNo" type="text" placeholder="请输入车牌号" v-on:blur="inputBlur" required/>
                                </div>
                            </div>
                            <div class="section__bd__item flex_b" v-if="axtxCode == '1'">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">车架号</label>
                                </div>
                                <div class="weui-cell_bd">
                                    <input class="weui-input" id="frameNo" name="frameNo" v-model="formData.frameNo" :value="formData.frameNo" type="text" placeholder="请输入车架号后三位" required/>
                                </div>
                            </div>
                            <div class="section__bd__item flex_b" v-if="axtxCode == '0' && insuranceType == '1'" @click="selectOcc">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">职业类别</label>
                                </div>
                                <div class="weui-cell_bd">
                                    <input class="weui-input" id="ProfessionType" name="ProfessionType" v-model="formData.ProfessionType" :value="formData.ProfessionType" type="text" placeholder="请选择职业类别" readOnly="readOnly"/>
                                </div>
                            </div>
                        </div>                        
                    </div>
                    <div class="section">
                        <div class="section__hd flex_b" id="tbrInfo" :class="{fold: isTbrInfo}" @click="collapse">
                            <span class="section_title">投保人信息</span>
                            <img class="icon_down" src="static/images/down_button.png" alt="">
                            <img class="icon_up" src="static/images/up_button.png" alt="">
                        </div>
                        <div class="section__bd" :class="{fold: isTbrInfo}">
                            <div class="section__bd__item flex_b">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">姓名</label>
                                </div>
                                <div class="weui-cell_bd">
                                    <input class="weui-input" id="Name" name="Name" v-model="formData.name" :value="formData.name" type="text" placeholder="请输入投保人姓名" minlength="2" required/>
                                </div>
                            </div>
                            <div class="section__bd__item flex_b">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">身份证</label>
                                </div>
                                <div class="weui-cell_bd">
                                    <input v-on:blur="onBlur" class="weui-input" id="InsuredIdNo" name="InsuredIdNo" :value="formData.insuredIdNo" v-model="formData.insuredIdNo" type="text" 
                                    ttern="/(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/" placeholder="输入投保人身份证号码" required/>
                                </div>
                            </div>
                            <div class="section__bd__item flex_b weui-cells_radio">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">性别</label>
                                </div>
                                <div class="weui-cell_bd flex_c">
                                    <label class="weui-cell weui-check__label flex_c" id="Gender_male" :class="{checked: cur_gender_id == 'Gender_male'}" for="radio_1" @click.stop="selectGender">
                                        <div class="weui-cell__bd">
                                            <p>男</p>
                                        </div>
                                        <div class="weui-cell__ft">
                                            <input type="radio" class="weui-check" name="Gender" value="男" id="radio_1" v-model="formData.gender"/>
                                        </div>
                                    </label>                                   
                                    <label class="weui-cell weui-check__label flex_c" id="Gender_female" :class="{checked: cur_gender_id == 'Gender_female'}" for="radio_2" @click.stop="selectGender">
                                        <div class="weui-cell__bd">
                                            <p>女</p>
                                        </div>
                                        <div class="weui-cell__ft">
                                            <input type="radio" name="Gender" value="女" class="weui-check" id="radio_2" v-model="formData.gender"/>
                                        </div>
                                    </label>
                                </div>                                        
                            </div>
                            <div class="datePicker">
                                <div class="datePicker_box flex_b" id="birthday" @click.stop="selectBirthday">
                                    <p>出生日期</p>
                                    <div class="dateResult">{{formData.birthday}}</div>
                                </div>
                            </div>
                            <div class="section__bd__item flex_b">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">手机号码</label>
                                </div>
                                <div class="weui-cell_bd">
                                    <input id="phoneNumber" class="weui-input" v-model="formData.phoneNumber" :value="formData.phoneNumber" name="phoneNumber" type="tel" minlength="11" maxlength="11" required/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section isSame">
                        <div class="section__hd flex_b">
                            <span class="section_title">同一人</span>
                            <div class="section__bd__item flex_b weui-cells_radio">
                                <div class="weui-cell_bd flex_c">
                                    <label class="weui-cell weui-check__label flex_c" id="same" for="radio_3" :class="{checked: cur_issame_id == 'same'}" @click.stop="selectIsSame">
                                        <div class="weui-cell__bd">
                                            <p>是</p>
                                        </div>
                                        <div class="weui-cell__ft">
                                            <input type="radio" class="weui-check" name="IsInsuredFlag" value="1" id="radio_3" checked="checked" v-model="formData.isSame"/>                                            
                                        </div>
                                    </label>
                                    <label class="weui-cell weui-check__label flex_c" id="diff" for="radio_4" :class="{checked: cur_issame_id == 'diff'}" @click.stop="selectIsSame">
                                        <div class="weui-cell__bd">
                                            <p>否</p>
                                        </div>
                                        <div class="weui-cell__ft">
                                            <input type="radio" name="IsInsuredFlag" value="0" class="weui-check" id="radio_4" v-model="formData.isSame"/>
                                        </div>
                                    </label>
                                </div>                                        
                            </div>
                        </div>
                    </div>
                    <div class="section bbrinfo" :class="{open: formData.isSame == 0}">
                        <div class="section__hd flex_b" id="bbrInfo" :class="{fold: isBbrInfo}" @click="collapse">
                            <span class="section_title">被保人信息</span>
                            <img class="icon_down" src="static/images/down_button.png" alt="">
                            <img class="icon_up" src="static/images/up_button.png" alt="">
                        </div>
                        <div class="section__bd" :class="{fold: isBbrInfo}">
                            <div class="section__bd__item flex_b">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">姓名</label>
                                </div>
                                <div class="weui-cell_bd">
                                    <input class="weui-input" v-model="formData.b_Name" :value="formData.b_Name" id="b_Name" name="b_Name" type="text" placeholder="请输入被保人姓名" minlength="2" required/>
                                </div>
                            </div>
                            <div class="section__bd__item flex_b">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">身份证</label>
                                </div>
                                <div class="weui-cell_bd">
                                    <input v-on:blur="onBlur" class="weui-input" v-model="formData.b_InsuredIdNo" :value="formData.b_InsuredIdNo" id="b_InsuredIdNo" name="b_InsuredIdNo" type="text" placeholder="请输入被保人身份证号" required/>
                                </div>
                            </div>
                            <div class="section__bd__item flex_b weui-cells_radio">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">性别</label>
                                </div>
                                <div class="weui-cell_bd flex_c">
                                    <label class="weui-cell weui-check__label flex_c" id="b_Gender_male" for="radio_5" :class="{checked: cur_bgender_id == 'b_Gender_male'}" @click.stop="selectbGender">
                                        <div class="weui-cell__bd">
                                            <p>男</p>
                                        </div>
                                        <div class="weui-cell__ft">
                                            <input type="radio" class="weui-check" name="b_Gender" value="男" id="radio_5" checked="checked" v-model="formData.b_gender"/>
                                        </div>
                                    </label>
                                    <label class="weui-cell weui-check__label flex_c" id="b_Gender_female" for="radio_6" :class="{checked: cur_bgender_id == 'b_Gender_female'}" @click.stop="selectbGender">
                                        <div class="weui-cell__bd">
                                            <p>女</p>
                                        </div>
                                        <div class="weui-cell__ft">
                                            <input type="radio" name="b_Gender" value="女" class="weui-check" id="radio_6" v-model="formData.b_gender"/>
                                        </div>
                                    </label>
                                </div>                                        
                            </div>
                            <div class="datePicker">
                                <div class="datePicker_box flex_b" id="birthday">
                                    <p>出生日期</p>
                                    <div class="dateResult">{{formData.b_birthday}}</div>
                                </div>
                            </div>
                            <div class="section__bd__item flex_b">
                                <div class="weui-cell_hd">
                                    <label class="weui-label">手机号码</label>
                                </div>
                                <div class="weui-cell_bd">
                                    <input class="weui-input" v-model="formData.b_phoneNumber" :value="formData.b_phoneNumber" id="b_phoneNumber"  name="b_phoneNumber" type="text" placeholder="请输入被保人手机号码" minlength="11" maxlength="11" required/>
                                </div>
                            </div>
                            <div class="datePicker">
                                <div class="datePicker_box flex_b" id="relation" @click.stop="selectRelation">
                                    <p>是投保人的</p>
                                    <div class="dateResult">{{formData.relation}}</div>
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
                    <div class="protocol_box" :class="{open: isOpen}">
                        <label for="weuiAgree" class="weui-agree">
                            <input id="weuiAgree" type="checkbox" class="weui-agree__checkbox" name="isAgree" v-model="checked"/>
                            <span class="weui-agree__text">
                                已阅读并同意<a href="javascript:void(0);" @click="showProtocol">投保声明</a>
                            </span>
                        </label>
                        <div class="protocol">
                            <div class="icon_box"></div>
                            <h5 class="protocol__title">投保声明</h5>
                            <div class="protocol__content">
                            <p>1.投保时，本投保人已就该产品的保障内容以及保险金额向被保险人进行了明确说明，并征得其同意。</p>
                            <p>2.本投保人兹声明上述各项内容填写属实，健康告知（限有健康告知的产品）已与被保险人确认且真实反映，并知道如果投保信息不真实，保险公司将有权拒赔，一切后果由本人承担。</p>
                            <p>3.本投保人已阅读该产品详细条款，了解认同当中的投保人、被保险人义务，清楚并接受所购保险保费金额、支付方式以及条款中有关责任免除的内容。</p>
                            <p>4.本投保人已明确并接受本计划的承保机构，清楚承保、保全变更、退保和理赔办理方式及退保、理赔金支付方式。</p>
                            <p>5.根据《中华人民共和国合同法》第十一条规定，数据电文是合法的合同表现形式。本人接受保险公司提供的电子保单样本或其它保险信息凭证作为本投保书成立生效的合法有效凭证具有完全证据效力。
                            </p>
                          </div>
                        </div>
                    </div>                  
                </form>
                </validator>                       
                <!-- 表单信息 end -->
                <!-- 保费显示 -->
                <div class="purchase_entry">
                    <div class="cost">
                        <div class="cost_box">
                            保费：<i>￥{{formData.totalPremium}}</i>
                        </div>
                    </div>
                    <div class="btn_box">
                        <button class="weui-btn" form="form_user" @click="formSubmit">确定</button>
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
            <distPicker v-if="insuranceType == '4' && isSelectArea" type="mobile"></distPicker>
            <occPicker v-if="insuranceType == '1' && isSelectOcc" type="mobile"></occPicker>
            <globalAreaPicker v-if="insuranceType == '3' && isSelectGlobalArea" type="mobile"></globalAreaPicker>
            <regionPicker v-if="insuranceType == '3' && isSelectRegion" type="mobile"></regionPicker>
        </div>
    </div>
</template>

<script>    
    import {mapState} from 'vuex'
    import Router from 'vue-router'
    import bus from '../assets/js/bus.js'
    import distPicker from '../components/distpicker.vue'
    import occPicker from '../components/occType.vue'
    import globalAreaPicker from '../components/globalArea.vue'
    import regionPicker from '../components/regionPicker.vue'
	export default {
		data: () => ({
			isBasicInfo: false,
            isTbrInfo: false,
            isBbrInfo: false,
            contentHeight: 0,
            details: [],
            productName: '',
            cur_gender_id: 'Gender_male',
            cur_issame_id: 'same',
            cur_bgender_id: 'b_Gender_male',
            cur_house_id: 'house_1',
            isShow: false,
            showmsg: false,
            isOpen: false,
            checked: false,
            insuranceType: '',
            axtxCode: '',
            isSelectArea: false,
            isSelectOcc: false,
            isSelectGlobalArea: false,
            isSelectRegion: false,
            currentArea: '',
            currentOcc: '',
            oneChoice: false,
            region: '',
            formData:{
                dateEff: '',
                dateExp: '',
                FurthestCity: '',
                housetype: '砖混',
                RegionDivisionCode: '',
                detailAddress: '',
                licenseNo: '',
                frameNo: '',
                ProfessionType: '',
                ProfessionCode: '',
                name: '',
                insuredIdNo: '',
                gender: '男',
                birthday: '',
                phoneNumber: '',
                isSame: 1,
                b_Name: '',
                b_InsuredIdNo: '',
                b_gender: '男',
                b_birthday: '',
                b_phoneNumber: '',
                relation: '',
                totalPremium: ''                
            }
		}),
        components: {
            'distPicker': distPicker,
            'occPicker': occPicker,
            'globalAreaPicker': globalAreaPicker,
            'regionPicker': regionPicker
        },
        created(){

        },
		mounted() {
            var _this = this;
            this.contentHeight = document.documentElement.clientHeight;
            this.getDetails(this.$route.query.id) 
            this.formData.dateEff = this.$route.query.dateEff;
            this.formData.dateExp = this.$route.query.dateExp;
            this.formData.totalPremium = this.$route.query.totalPremium;
            $('#form_user').validate({
                debug:true
            }); 
            bus.$on('selectedArea',function(){
                _this.isSelectArea = false;
            })
            bus.$on('selectedOcc',function(){
                _this.isSelectOcc = false;
            })
            bus.$on('selectedGlobalArea',function(){
                _this.isSelectGlobalArea = false;
            })
            bus.$on('selectedRegion',function(){
                _this.isSelectRegion = false;
            })
            bus.$on('currentArea',function(data){
                _this.formData.RegionDivisionCode = data;
            })
            bus.$on('currentOcc',function(data){
                _this.formData.ProfessionType = data;
            })
            bus.$on('currentOccCode',function(data){
                _this.formData.ProfessionCode = data;
            })
            bus.$on('currentGlobalArea',function(data){
                _this.formData.FurthestCity = data;
            })
            bus.$on('currentRegion',function(data){
                _this.formData.FurthestCity = data;
            })            
		},
		methods: {
            getDetails: function(id){
                this.$http.get('http://www.xiaobaodan.cn/api/web/index.php?r=policy-type/product&id=', {params: {id: id}}).then(response => {
                    this.details = response.body.newData;
                    this.productName = this.details[0].product_name;
                    this.insuranceType = this.details[0].type;
                    this.axtxCode = this.details[0].axtx_code;
                    this.region = this.details[0].occ_details;
                    if(this.region == '港澳' || !this.region){
                        this.oneChoice = false;
                    }
                    else{
                        this.oneChoice = true;
                        this.formData.FurthestCity = this.details[0].occ_details;
                    }
                }, response => {
                    console.log(response.body);
                })
            },
			collapse: function(e){
                if(e.currentTarget.id == 'basicInfo'){
                    this.isBasicInfo = !this.isBasicInfo;
                }
                else if(e.currentTarget.id == 'tbrInfo'){
                    this.isTbrInfo = !this.isTbrInfo;
                }
                else {
                    this.isBbrInfo = !this.isBbrInfo;
                }
            },
            selectGender: function(e){                
                this.cur_gender_id = e.currentTarget.id;
            },
            selectIsSame: function(e){
                this.cur_issame_id = e.currentTarget.id;
                
            },
            selectbGender: function(e){
                this.cur_bgender_id = e.currentTarget.id;
            },
            selectHouseType: function(e){
                this.cur_house_id = e.currentTarget.id;
            },
            setInfo: function(e){
                var curid = e.currentTarget.id;
                document.getElementById(curid).focus();
            },
            selectBirthday: function(e){
                var _this = this;
                var min_birthday = (new Date().getFullYear() - 18) + '-' + '01' + '-' + '01';
                if(!this.insuredIdNo){
                    weui.datePicker({
                        start: 1800,
                        end: min_birthday,       
                        onConfirm: function (result) {
                            _this.formData.birthday = result[0] + '-' + (result[1] < 10 ? '0' + result[1] : result[1]) + '-' + (result[2] < 10 ? '0' + result[2] : result[2]);
                            _this.$store.dispatch('getBirthday', _this.formData.birthday);
                        },
                        id:'birthday'
                    });
                }                                
            },
            onBlur: function(e){
                var _this = this, date = new Date(), tempStr = '', tempStr_1 = '', newStr = '', newStr_1 = '';
                if(e.currentTarget.id == 'InsuredIdNo'){
                    tempStr = this.formData.insuredIdNo.substring(6,14);
                    newStr = tempStr.substring(0, 4) + "-" + tempStr.substring(4, 6) + "-" + tempStr.substring(6);
                    if (tempStr.substring(4, 6) > 12 || tempStr.substring(6) > 31){
                        _this.showmsg = true;
                        _this.$store.dispatch('getShowMsg',true);
                        _this.msg = '您输入的身份证号码有误';
                        setTimeout(function () {
                            _this.showmsg = false;
                            _this.$store.dispatch('getShowMsg',false);
                        }, 3000);
                        return false;
                    }
                    else if (tempStr.substring(0, 4) > (date.getFullYear() - 18)){
                        _this.showmsg = true;
                        _this.$store.dispatch('getShowMsg',true);
                        _this.msg = '您不符合该产品的保障年龄要求';
                        setTimeout(function () {
                            _this.showmsg = false;
                            _this.$store.dispatch('getShowMsg',false);
                        }, 3000);
                        return false;
                    }
                    if(this.formData.insuredIdNo){
                        this.formData.birthday = newStr;
                    }
                }
                else if(e.currentTarget.id == 'b_InsuredIdNo'){
                    tempStr_1 = this.formData.b_InsuredIdNo.substring(6,14);
                    newStr_1 = tempStr_1.substring(0, 4) + "-" + tempStr_1.substring(4, 6) + "-" + tempStr_1.substring(6);
                    if (tempStr_1.substring(4, 6) > 12 || tempStr_1.substring(6) > 31){
                        _this.showmsg = true;
                        _this.$store.dispatch('getShowMsg',true);
                        _this.msg = '您输入的身份证号码有误';
                        setTimeout(function () {
                            _this.showmsg = false;
                            _this.$store.dispatch('getShowMsg',false);
                        }, 3000);
                        return false;
                    }
                    if(this.formData.b_InsuredIdNo){
                        this.formData.b_birthday = newStr_1;
                    }
                }
            },
            //重复校验
            inputBlur: function(){
                var _this = this;            
                this.$http.post('http://www.xiaobaodan.cn/api/web/index.php?r=an-xing/check-rep',{licenseNo: this.formData.licenseNo, transaction_eff_date: this.formData.dateEff},{emulateJSON: true}).then(response => {
                    if(response.body.state == '1'){
                        _this.showmsg = true;
                        _this.$store.dispatch('getShowMsg',true);
                        _this.msg = response.body.result.resultMessage;
                        setTimeout(function () {
                            _this.showmsg = false;
                            _this.$store.dispatch('getShowMsg',false);
                        }, 4000);
                        return false;
                    }
                }, response => {
                    console.log(response.body)
                })
            },
            showProtocol: function(){
                this.isOpen = !this.isOpen;
            },
            selectRelation: function(){
                var _this = this;
                weui.picker([{
                    label: '配偶',
                    value: 'Spouse'
                }, {
                    label: '父母',
                    value: 'Parents'
                }, {
                    label: '子女',
                    value: 'Child'
                }, {
                    label: '其他',
                    value: 'Other'
                }], {
                    onConfirm: function (result) {
                        _this.formData.relation = result[0].label;
                    }
                });
            },
            selectArea: function(){
                this.isSelectArea = true;
            },
            selectOcc: function(){
                this.isSelectOcc = true;
            },
            selectGlobalArea: function(){
                if(!this.region){
                    this.isSelectGlobalArea = true;
                }
                else{
                    this.isSelectRegion = true;
                }
            },
            formSubmit: function(e){
                var _this = this;
                var router = new Router();
                var isSuccess = $('#form_user').valid();
                if(!_this.checked){
                    _this.showmsg = true;
                    _this.$store.dispatch('getShowMsg',true);
                    _this.msg = '请详细阅读投保声明并同意';
                    setTimeout(function () {
                        _this.showmsg = false;
                        _this.$store.dispatch('getShowMsg',false);
                    }, 3000);
                    return false;
                }
                else if(_this.checked && isSuccess){                   
                    _this.$store.dispatch('getFormData',_this.formData);
                    router.push({path: '/infoText', query: {id: _this.$route.query.id, totalPremium: _this.$route.query.totalPremium,productcode: this.$route.query.productcode}});
                }           
            }
		},
        computed: mapState({
            birthday: state => state.birthday
        })
	}
</script>

<style scoped>
    .weui-tab__panel{
        padding-bottom: 0 !important;
    }
    .tab_panel_content{
        background-color: #eee;
    }
    .section.bbrinfo{
        display: none;
    }
    .section.bbrinfo.open{
        display: block;
    }
    .page .page__bd .weui-tab .form_user .protocol_box.open .protocol{
        display: block;
    }
</style>