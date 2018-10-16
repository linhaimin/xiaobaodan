<template>
    <div class="wrapper">
        <div class="QRcode flex_c" v-if="!showMsg">
            <img :src="url" alt="" />
            <p>支付链接已推送至您的微信</p>
            <p>或长按识别二维码进入支付界面</p>
        </div>
        <div class="message" v-if="showMsg">
            <p>{{msg}}</p>
            <p>生成订单失败，请重新下单</p>
        </div>
        <div class="returnHome">
            <button class="weui-btn" @click="returnHome">返回主页</button>
        </div>
    </div>
</template>

<script>
    import Router from 'vue-router'
    import bus from '../assets/js/bus'
    import {mapState} from 'vuex'
    export default{
        data: () => ({
            showMsg: false,
            msg: '',
            url: '',
            TransactionId: ''
        }),
        mounted(){
            if(this.$store.state.TransactionId){
                this.TransactionId = this.$store.state.TransactionId;
                this.getQRcode(this.TransactionId);
                this.showMsg = false;
                console.log(this.TransactionId)
            }
            else if(this.$store.state.msg){
                this.msg = this.$store.state.msg;
                this.showMsg = true; 
                console.log(this.msg)
            }
        },
        methods: {
            getQRcode: function(data){
                var _this = this;
                _this.$http.get('http://www.xiaobaodan.cn/api/web/index.php?r=policy-ewm',{params: {TransactionId: data}}).then(response => {
                    if(response.body.error == '0'){
                        _this.$http.get('http://www.xiaobaodan.cn/api/web/index.php?r=policy-ewm/push&TransactionId=',{params: {TransactionId: data}}).then(response => {
                            _this.url = response.body.img_url;
                        },response => {
                            console.log(response.body)
                        })
                    }                   
                },response => {
                    console.log(response.body)
                })
            },
            returnHome: function(){
                var router = new Router();
                router.push({path: '/'});
            }
        }
    }
</script>

<style scoped>
.wrapper .QRcode{
    flex-direction: column;
    padding-top: 125px;
}
.wrapper .QRcode img{
    margin-bottom: 30px;
    width: 170px;
    height: 170px;
}
.wrapper .QRcode p{
    font-size: 1rem;
}
.wrapper .message{
    padding: 125px 15px 0 15px;
    text-align: center;
}
.wrapper .returnHome{
    margin-top: 50px;
    text-align: center;
}
.wrapper .returnHome button{
    width: 50%;
    font-size: 1rem;
    line-height: 2.2;
    background-color: #3db0f1;
    color: #fff;
}
</style>