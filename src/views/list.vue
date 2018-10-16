<template>
	<!-- 主页 -->
	<div>
		<div class="weui-tab__panel">
			<div id="tab_list" class="tab_panel_content on">
			    <!-- 顶部搜索框 -->
                <div class="weui-search-bar" :class="{'weui-search-bar_focusing': isFocus}" id="searchBar">
                    <div class="weui-search-bar__form">
                        <div class="weui-search-bar__box">
                            <i class="weui-icon-search"></i>
                            <input type="search" v-model="keyword" :value="keyword" class="weui-search-bar__input" id="searchInput" placeholder="搜索" v-on:keypress="search"/>
                            <a href="javascript:" class="weui-icon-clear" id="searchClear" @click.stop="clearSearch"></a>
                        </div>
                        <label class="weui-search-bar__label" id="searchText" @click.stop="focus">
                            <div class="weui-search-bar__label__box flex_b">                                       
                                <span>投保人/被保人/保单号</span>
                                <i class="weui-icon-search"></i>
                            </div>                       
                        </label>
                    </div>
                    <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel" @click="cancelSearch">取消</a>
                </div>
                <!-- <div class="weui-cells searchbar-result" id="searchResult">
                    <div class="weui-cell weui-cell_access">
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>实时搜索文本</p>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_access">
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>实时搜索文本</p>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_access">
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>实时搜索文本</p>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_access">
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>实时搜索文本</p>
                        </div>
                    </div>
                </div> -->
                <!-- 顶部搜索框 end --> 
                <!-- list -->
                <div class="weui-tab list">
                    <div class="weui-navbar">
                        <div id="tab1" class="weui-navbar__item" :class="{'weui-bar__item_on': activeId == 'tab1'}" @click.stop="switch1">
                            <div class="weui-navbar__item__box">
                                <div class="weui-navbar__item__num">{{allNum}}</div>
                                <div class="weui-navbar__title">全部</div>
                            </div>
                        </div>
                        <div id="tab2" class="weui-navbar__item" :class="{'weui-bar__item_on': activeId == 'tab2'}" @click.stop="switch2">
                            <div class="weui-navbar__item__box">
                                <div class="weui-navbar__item__num">{{notPayNum}}</div>
                                <div class="weui-navbar__title">未付款</div>
                            </div>
                        </div>
                        <div id="tab3" class="weui-navbar__item" :class="{'weui-bar__item_on': activeId == 'tab3'}" @click.stop="switch3">
                            <div class="weui-navbar__item__box">
                                <div class="weui-navbar__item__num">{{willExpNum}}</div>
                                <div class="weui-navbar__title">即将到期</div>
                            </div>
                        </div>
                        <div id="tab4" class="weui-navbar__item" :class="{'weui-bar__item_on': activeId == 'tab4'}" @click.stop="switch4">
                            <div class="weui-navbar__item__box">
                                <div class="weui-navbar__item__num">{{expNum}}</div>
                                <div class="weui-navbar__title">已过期</div>
                            </div>
                        </div>
                    </div>
                    <div class="weui-tab__panel" :style="{height: listHeight + 'px', overflow: 'auto'}">
                        <div id="tab_1" class="tab__panel_content" :class="{on: activeId == 'tab1'}">
                            <div class="weui-tab__content__item" v-for="item in allList" :class="{'open' : selectid == item.id,'close': selectid != item.id}">
                                <div class="weui-tab__content__item__hd flex_b">
                                    <div class="weui-tab__content__item__hd__left flex_b">
                                        <img class="logo" src="../../static/images/list_logo.png" alt="logo">
                                        <div class="wrapper">
                                            <h4 class="policyName">
                                                <router-link :to="{path: '/detailslist', query: {id: item.product_id}}">{{item.insurance_type}}</router-link>
                                            </h4>
                                            <div class="status flex_c" v-if="item.policy_stage == 'Sold'">
                                                <i class="weui-icon-success"></i>
                                                <router-link class="success" :to="{path: '/detailslist', query: {id: item.product_id}}">有效</router-link>
                                            </div>
                                            <div class="status flex_c" v-else-if="item.policy_stage == 'willExp'">
                                                <i class="weui-icon-waiting"></i>
                                                <router-link class="willExp" :to="{path: '/detailslist', query: {id: item.product_id}}">即将到期</router-link>
                                            </div>
                                            <div class="status flex_c" v-else-if="item.policy_stage == 'exp'">
                                                <i class="weui-icon-warn"></i>
                                                <router-link class="exp" :to="{path: '/detailslist', query: {id: item.product_id}}">已过期</router-link>
                                            </div>
                                            <div class="status flex_c" v-else>
                                                <i class="weui-icon-noPay"></i>
                                                <em class="notPay" @click="toPay" :data-transactionid="item.transaction_id">未付款</em>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="weui-tab__content__item__hd__right flex_a" :id="item.id" @click.stop="showDetails">
                                        <span class="up">查看详情</span>
                                        <span class="down">收起详情</span>
                                        <img class="up" src="../../static/images/list_down_arrow.png" alt="">
                                        <img class="down" src="../../static/images/list_up_arrow.png" alt="">
                                    </div>
                                </div>
                                <div class="weui-tab__content__item__bd">
                                    <div class="inner_box">
                                        <a class="desItem flex_b" :href="item.pdf_url" v-if="item.pdf_url">
                                            <span>保单号：</span>
                                            <i>{{item.transaction_id}}</i>
                                        </a>
                                        <a class="desItem noPolicy flex_b" href="javascript:" v-if="!item.pdf_url">
                                            <span>保单号：</span>
                                            <i>{{item.transaction_id}}</i>
                                        </a>
                                        <div class="desItem flex_b">
                                            <span>投保人：</span>
                                            <i>{{item.insured_name}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>被保人：</span>
                                            <i>{{item.cover_name}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>投保时间：</span>
                                            <i>{{item.transaction_appl_date}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>生效时间：</span>
                                            <i>{{item.transaction_eff_date}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>终止时间：</span>
                                            <i>{{item.transaction_exp_date}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>保费：</span>
                                            <i>{{item.total_premium}}</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="tab_2" class="tab__panel_content" :class="{on: activeId == 'tab2'}">
                            <div class="weui-tab__content__item close" v-for="item in notPayList" :class="{'open' : selectid == item.id,'close': selectid != item.id}">
                                <div class="weui-tab__content__item__hd flex_b">
                                    <div class="weui-tab__content__item__hd__left flex_b">
                                        <img class="logo" src="../../static/images/list_logo.png" alt="logo">
                                        <div class="wrapper">
                                            <h4 class="policyName">
                                                <router-link :to="{path: '/detailslist', query: {id: item.product_id}}">{{item.insurance_type}}</router-link>
                                            </h4>
                                            <div class="status flex_c">
                                                <i class="weui-icon-noPay"></i>
                                                <em class="notPay" @click="toPay" :data-transactionid="item.transaction_id">未付款</em>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="weui-tab__content__item__hd__right flex_a" :id="item.id" @click.stop="showDetails">
                                        <span class="up">查看详情</span>
                                        <span class="down">收起详情</span>
                                        <img class="up" src="../../static/images/list_down_arrow.png" alt="">
                                        <img class="down" src="../../static/images/list_up_arrow.png" alt="">
                                    </div>
                                </div>
                                <div class="weui-tab__content__item__bd">
                                    <div class="inner_box">
                                        <div class="desItem noPolicy flex_b">
                                            <span>保单号：</span>
                                            <i>{{item.transaction_id}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>投保人：</span>
                                            <i>{{item.insured_name}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>被保人：</span>
                                            <i>{{item.cover_name}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>投保时间：</span>
                                            <i>{{item.transaction_appl_date}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>生效时间：</span>
                                            <i>{{item.transaction_eff_date}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>终止时间：</span>
                                            <i>{{item.transaction_exp_date}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>保费：</span>
                                            <i>{{item.total_premium}}</i>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <div id="tab_3" class="tab__panel_content" :class="{on: activeId == 'tab3'}">
                            <div class="weui-tab__content__item close" v-for="item in willExpList" :class="{'open' : selectid == item.id,'close': selectid != item.id}">
                                <div class="weui-tab__content__item__hd flex_b">
                                    <div class="weui-tab__content__item__hd__left flex_b">
                                        <img class="logo" src="../../static/images/list_logo.png" alt="logo">
                                        <div class="wrapper">
                                            <h4 class="policyName">
                                                <router-link :to="{path: '/detailslist', query: {id: item.product_id}}">{{item.insurance_type}}</router-link>
                                            </h4>
                                            <div class="status flex_c">
                                                <i class="weui-icon-waiting"></i>
                                                <router-link class="expDate" :to="{path: '/detailslist', query: {id: item.product_id}}">到期时间：<em>{{item.transaction_exp_date}}</em></router-link>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="weui-tab__content__item__hd__right flex_a" :id="item.id" @click.stop="showDetails">
                                        <span class="up">查看详情</span>
                                        <span class="down">收起详情</span>
                                        <img class="up" src="../../static/images/list_down_arrow.png" alt="">
                                        <img class="down" src="../../static/images/list_up_arrow.png" alt="">
                                    </div>
                                </div>
                                <div class="weui-tab__content__item__bd">
                                    <div class="inner_box">
                                        <a class="desItem flex_b" :href="item.pdf_url" v-if="item.pdf_url">
                                            <span>保单号：</span>
                                            <i>{{item.transaction_id}}</i>
                                        </a>
                                        <a class="desItem noPolicy flex_b" href="javascript:" v-if="!item.pdf_url">
                                            <span>保单号：</span>
                                            <i>{{item.transaction_id}}</i>
                                        </a>
                                        <div class="desItem flex_b">
                                            <span>投保人：</span>
                                            <i>{{item.insured_name}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>被保人：</span>
                                            <i>{{item.cover_name}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>投保时间：</span>
                                            <i>{{item.transaction_appl_date}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>生效时间：</span>
                                            <i>{{item.transaction_eff_date}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>终止时间：</span>
                                            <i>{{item.transaction_exp_date}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>保费：</span>
                                            <i>{{item.total_premium}}</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="tab_4" class="tab__panel_content" :class="{on: activeId == 'tab4'}">
                            <div class="weui-tab__content__item close" v-for="item in expList" :class="{'open' : selectid == item.id,'close': selectid != item.id}">
                                <div class="weui-tab__content__item__hd flex_b">
                                    <div class="weui-tab__content__item__hd__left flex_b">
                                        <img class="logo" src="../../static/images/list_logo.png" alt="logo">
                                        <div class="wrapper">
                                            <h4 class="policyName">
                                                <router-link :to="{path: '/detailslist', query: {id: item.product_id}}">{{item.insurance_type}}</router-link>
                                            </h4>
                                            <div class="status flex_c">
                                                <i class="weui-icon-warn"></i>
                                                <router-link class="exp" :to="{path: '/detailslist', query: {id: item.product_id}}">已过期</router-link >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="weui-tab__content__item__hd__right flex_a" :id="item.id" @click.stop="showDetails">
                                        <span class="up">查看详情</span>
                                        <span class="down">收起详情</span>
                                        <img class="up" src="../../static/images/list_down_arrow.png" alt="">
                                        <img class="down" src="../../static/images/list_up_arrow.png" alt="">
                                    </div>
                                </div>
                                <div class="weui-tab__content__item__bd">
                                    <div class="inner_box">
                                        <a class="desItem flex_b" :href="item.pdf_url" v-if="item.pdf_url">
                                            <span>保单号：</span>
                                            <i>{{item.transaction_id}}</i>
                                        </a>
                                        <a class="desItem noPolicy flex_b" href="javascript:" v-if="!item.pdf_url">
                                            <span>保单号：</span>
                                            <i>{{item.transaction_id}}</i>
                                        </a>
                                        <div class="desItem flex_b">
                                            <span>投保人：</span>
                                            <i>{{item.insured_name}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>被保人：</span>
                                            <i>{{item.cover_name}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>投保时间：</span>
                                            <i>{{item.transaction_appl_date}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>生效时间：</span>
                                            <i>{{item.transaction_eff_date}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>终止时间：</span>
                                            <i>{{item.transaction_exp_date}}</i>
                                        </div>
                                        <div class="desItem flex_b">
                                            <span>保费：</span>
                                            <i>{{item.total_premium}}</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- list end -->
			</div>
		</div>
		<tabbarBottom></tabbarBottom>
	</div>
	<!-- 主页 end -->
</template>

<script>
import Router from 'vue-router'
import tabbarBottom from '../components/tabbarBottom.vue'
export default {
  data: () => ({
    listHeight: 0,
    isFocus: false,
    keyword: '',
    allList: [],
    notPayList: [],
    willExpList: [],
    expList: [],
    allNum: '',
    notPayNum: '',
    willExpNum: '',
    expNum: '',
    activeId: 'tab1',
    selectid: '',
    url: 'javascript:'
  }),
  components: {
    'tabbarBottom': tabbarBottom
  },
  created () {
    this.getSearchList(this.$store.state.wx_id,'');
    this.listHeight = document.documentElement.clientHeight - 136 -53;
    $(window).resize(function(){
        this.listHeight = document.documentElement.clientHeight - 136 -53;
    })
  },
  mounted(){
    
  },
  methods: {
    getSearchList: function(wxid, keyword){
      var notPayList = [], willExpList = [], expList = [], _this = this;
      this.$http.get('http://www.xiaobaodan.cn/api/web/index.php?r=info-search/all&openid', {params: {wx_id: wxid, search_name: keyword}}).then(response => {
        console.log(response.body)
        for(var i = 0; i < response.body.length; i++){
          if (response.body[i].policy_stage == 'NeedPay'){
            notPayList.push(response.body[i]);
          }
          else if (response.body[i].policy_stage == 'willExp'){
            willExpList.push(response.body[i]);
          }
          else if (response.body[i].policy_stage == 'exp') {
            expList.push(response.body[i]);
          }
        }
        _this.allNum = response.body.length;
        _this.notPayNum = notPayList.length;
        _this.willExpNum = willExpList.length;
        _this.expNum = expList.length;
        _this.allList = response.body;
        _this.notPayList = notPayList;
        _this.willExpList = willExpList;
        _this.expList = expList;
      }, response => {
        console.log(response.body);
      }) 
    },
    focus: function() {
      this.isFocus = true;
      document.getElementById('searchInput').focus();
    },
    cancelSearch: function() {
      this.isFocus = false;     
    },
    clearSearch: function() {
      this.keyword = '';
      document.getElementById('searchInput').focus();
    },
    search: function(e){
        //输入确定，获取搜索结果
        if(e.keyCode == 13){
            this.getSearchList(this.$store.state.wx_id,this.keyword);                  
        }               
    },
    showDetails: function(e){
        if(this.selectid == e.currentTarget.id){
            this.selectid = '';
        }
        else{
            this.selectid = e.currentTarget.id;
        }        
    },
    switch1: function(e){
        this.activeId = e.currentTarget.id;
    },
    switch2: function(e){
        this.activeId = e.currentTarget.id;
    },
    switch3: function(e){
        this.activeId = e.currentTarget.id;
    },
    switch4: function(e){
        this.activeId = e.currentTarget.id;
    },
    toPay: function(e){
        var router = new Router();
        var TransactionId = e.currentTarget.dataset.transactionid;
        this.$store.dispatch('getTransactionId',TransactionId);
        router.push({path: '/payment'});
    }
  }
}
</script>s

<style scoped>
    .weui-tab.list{
        padding-top: 66px;
    }
    .weui-tab.list .weui-tab__panel{
        padding-top: 0 !important;
    }
</style>