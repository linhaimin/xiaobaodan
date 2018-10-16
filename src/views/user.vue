<template>
	<!-- 主页 -->
	<div>
		<div class="weui-tab__panel">
			<div id="tab_home" class="tab_panel_content on" :style="{height: contentHeight + 'px', overflow: 'auto'}">
			    <div class="head">
                    <div class="img_box flex_a">
                        <img :src="avatar" class="userImg"></img>
                        <div class="nickName">{{nickname}}</div>
                    </div>
                </div>
                <div class="midBox" v-if="!showAgency">
                    <div class="midBox__hd flex_a">
                        <img src="../../static/images/hand_shake.png"></img>
                        <span>合作机构</span>
                    </div>
                    <div class="midBox__bd">
                        <div>
                            <input class="codeText" name="code" v-model="code" :value="code" placeholder="请输入机构代码" />
                            <button class="btn_send" size="default" @click="send">发送</button>
                        </div>       
                    </div>
                </div>
                <div class="bottomBox flex_a" v-if="!showAgency">
                    <div class="bottomBox_img">
                        <img src="../../static/images/icon_checking.png" alt="">
                    </div>
                    <div class="bottomBox_text">
                        <p>{{msg}}</p>
                    </div>
                </div>
                <div class="userBox flex_b" v-if="showAgency">
                    <div class="userBox__hd">
                        <img src="../../static/images/Hand_icon_sel.png" alt="">
                        <span>合作机构</span>
                    </div>
                    <div class="userBox__bd">{{agency_name}}</div>
                </div>
			</div>
            <!-- 提示信息 -->
            <div id="msgToast" class="msg" :class="{showMsg: showmsg}">
                <div class="weui-mask_transparent"></div>
                <div class="weui-toast">
                    <i class="weui-icon-success-no-circle weui-icon_toast"></i>
                    <p class="weui-toast__content">{{content}}</p>
                </div>
            </div>
            <!-- 提示信息 end -->
		</div>
		<tabbarBottom></tabbarBottom>
	</div>
	<!-- 主页 end -->
</template>

<script>
import tabbarBottom from '../components/tabbarBottom.vue'
export default {
    data: () => ({
        code: '',
        avatar: '',
        nickname: '',
        msg: '',
        content: '',
        showmsg: false,
        showAgency: false,
        contentHeight: 0
    }),
    components: {
       'tabbarBottom': tabbarBottom
    },
    created () {
        if(this.$store.state.wx_id){
            this.getUserInfo(this.$store.state.wx_id);
            this.checkUserInfo(this.$store.state.wx_id);
            console.log(this.$store.state.wx_id);
        }
        this.contentHeight = document.documentElement.clientHeight - 53;
    },
    methods: {
        getUserInfo: function(data){
            this.$http.get('http://www.xiaobaodan.cn/api/web/index.php?r=wx-callback/info',{params: {wx_id: data}}).then(response => {
                console.log(response.body)
                this.avatar = response.body.avatar;
                this.nickname = response.body.nickname;
            },response => {
                console.log(response.body)
            })
        },
        checkUserInfo: function(data){
            this.$http.get('http://www.xiaobaodan.cn/api/web/index.php?r=wx-user/',{params: {wx_id: data}}).then(response => {
                console.log(response.body)
                if(response.body.msg){
                    this.msg = response.body.msg;
                    this.showAgency = false;
                }       
                else if(response.body.agency_state == 1){
                    this.agency_name = response.body.agency_name;
                    this.showAgency = true;
                }
            },response => {
                console.log(response.body)
            })
        },
        send: function(){
            var _this = this;
            console.log(this.nickname)
            console.log(this.code)
            if(this.code){
                this.$http.post('http://www.xiaobaodan.cn/api/web/index.php?r=wx-user/bdjg',{wx_id: this.$store.state.wx_id, wx_nickname: this.nickname, agency_number: this.code},{emulateJSON: true}).then(response => {
                    _this.showmsg = true;
                    _this.$store.dispatch('getShowMsg',true);
                    _this.content = '已发送';
                    setTimeout(function () {
                        _this.showmsg = false;
                        _this.$store.dispatch('getShowMsg',false);
                    }, 3000);
                },response => {
                    console.log(response.body)
                }) 
            }
            else{
                _this.showmsg = true;
                _this.$store.dispatch('getShowMsg',true);
                _this.content = '请输入机构代码';
                setTimeout(function () {
                    _this.showmsg = false;
                    _this.$store.dispatch('getShowMsg',false);
                }, 3000);
            } 
        }
    }
}
</script>

<style scoped>
    .tab_panel_content{
        background-color: #fff;
    }
</style>