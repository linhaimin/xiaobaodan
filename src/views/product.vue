<template>
	<!-- 产品列表 -->
	<div>
		<div class="weui-tab__panel">
			<div id="tab_home" class="tab_panel_content on">
        <head></head>
				<productList></productList>
			</div>
		</div>
	</div>
	<!-- 产品列表 end -->
</template>

<script>
import productList from '../components/productList.vue'
export default {
  data: () => ({
  	
  }),
  components: {
    'productList': productList
  },
  mounted () {
  	
  },
  methods: {

  }
}
</script>

<style scoped>
    .weui-tab__panel{
        padding-bottom: 0 !important;
    }
</style>