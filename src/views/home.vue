<template>
	<!-- 主页 -->
	<div>
		<div class="weui-tab__panel">
			<div id="tab_home" class="tab_panel_content on">
				<!-- 顶部搜索框 -->
			    <homeSearch></homeSearch>
			    <!-- 顶部搜索框 end -->           
			    <!-- 类别列表展示 -->
			    <typeList v-show="!ShowSearchResult"></typeList>
			    <!-- 类别列表展示 end -->
			    <productList v-show="ShowSearchResult"></productList>
			</div>
		</div>
		<tabbarBottom></tabbarBottom>
	</div>
	<!-- 主页 end -->
</template>

<script>
import bus from '../assets/js/bus.js'
import homeSearch from '../components/homesearch.vue'
import typeList from '../components/typeList.vue'
import productList from '../components/homeProductList.vue'
import tabbarBottom from '../components/tabbarBottom.vue'
export default {
  data: () => ({
    ShowSearchResult: false
  }),
  components: {
    'homeSearch': homeSearch,
    'typeList': typeList,
    'productList': productList,
    'tabbarBottom': tabbarBottom
  },
  created () {
    console.log(this.$route)
    if(this.$route.query.wx_id){
      this.$store.dispatch('getWxId',this.$route.query.wx_id);
    }    
   	bus.$on('showResult', (data) => {
      this.ShowSearchResult = data;    
    })
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .weui-tabbar{
    position: fixed !important;
  }
  .weui-tab__panel{
    padding-bottom: 50px;
  }
  .page .page__bd .weui-tab .product_list .weui-cell:first-child{
    margin-top: 0;
  }
</style>