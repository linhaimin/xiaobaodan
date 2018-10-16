<template>		
	<!-- 产品列表 -->
    <ul class="weui-cells product_list" id="product_list" :style="{height: listHeight + 'px'}" v-scroll="onScroll">
        <li class="weui-cell weui-cell_access" v-for="item in productlist">
            <router-link class="weui-cell__hd" :to="{path: '/detailslist', query: {id: item.id, insuranceType: item.type, insuranceTypeName: item.type_name }}">
                <div class="weui-cell__hd__text">{{item.product_name}}</div>
                <div class="weui-cell__hd__logo">
                    <img src="static/images/logo.png" alt=""></img>
                </div>
            </router-link>
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
            <div class="weui-cell__ft" >
                <div class="desDetail__hd">
                    <div class="desDetail__hd__left" :class="{open: item.id == curIndex}" @click="showExplain" :id="item.id">
                        <div class="img_box">
                            <img class="icon_right" src="static/images/right_arrow.png"></img>
                            <img class="icon_down" src="static/images/down_arrow.png"></img>
                        </div>
                        <span class="desDetail__hd__text">保障内容</span>
                    </div>
                    <div class="desDetail__hd__right">
                        <span>保费</span>
                        <i>￥{{item.total_premium}}</i>
                    </div>                                         
                </div> 
                <div class="desDetail__bd" :class="{open: item.id == curIndex}">
                    <div class="desDetail__bd__item" v-for="explainItem in item.explain">
                        <div class="explain__hd">
                            <span class="item__txt">{{explainItem.explain}}</span>
                            <span class="item__fee">{{explainItem.policy_price}}</span>
                        </div>                  
                    </div>            
                </div>         
            </div>    
        </li>
    </ul>
    <!-- 产品列表 end -->
</template>

<script>
    import bus from '../assets/js/bus.js'
	export default {
		data: () => ({
			listHeight: 0,
			curIndex: -1,
			insuranceType: '',
    		insuranceTypeName: '',
            productlist: [],
            keyword: '',
            page: 1,
            totalPage: 1
		}),
        
        created(){

        },
		mounted() {
			var _this = this;	
			this.insuranceType = this.$route.query.type;
    		this.insuranceTypeName = this.$route.query.insuranceTypeName;
			this.listHeight = document.documentElement.clientHeight - 96 - 53;
            bus.$on('searching', function(data){
                _this.keyword = data;
                _this.productlist = [];
                _this.getSearchResult(_this.keyword,1);
            });                                
		},
		methods: {
            //获取搜索结果
            getSearchResult: function(keyword, page){
                var _this = this;
                _this.$http.get('http://www.xiaobaodan.cn/api/web/index.php?r=policy-type/search-product&product_name=&page=', {params: {product_name: keyword, page: page}},{emulateJSON: true}).then(response => {
                    _this.productlist = _this.productlist.concat(response.body.newData);
                    _this.page = response.body.pages.page;
                    _this.totalPage = response.body.pages.all;            
                    bus.$emit('showResult',true);
                }, response => {
                    
                })
            },
			showExplain: function(e){
				if(this.curIndex == e.currentTarget.id){
					this.curIndex = -1;
				}
				else{
					this.curIndex = e.currentTarget.id;
				}
			},            
            onScroll: function(e, position){
                var list = document.getElementById('product_list');
                var scrollTop = this.getScrollTop(list);
                var visibleHeight = this.getVisibleHeight();
                var scrollHeight = this.getScrollHeight(list);
                if((scrollTop + visibleHeight - 96 - 53) >= scrollHeight){
                    if(this.page < this.totalPage){
                        this.page++;
                        this.getSearchResult(this.keyword,this.page);
                    }
                }
            },
            getScrollTop: function(ele){
                if(ele){
                    return ele.scrollTop;
                }
                else{
                    return document.documentElement.scrollTop;
                }
            },
            getVisibleHeight: function(ele){
               if(ele){
                    return ele.offsetHeight;
                }
                else{
                    return document.documentElement.offsetHeight;
                } 
            },
            getScrollHeight: function(ele){
                if(ele){
                    return ele.scrollHeight;
                }
                else{
                    return document.documentElement.scrollHeight;
                }
            }
		}
	}
</script>

<style>

</style>