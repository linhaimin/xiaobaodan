<template>
	<!-- 产品详情 -->
	<div>
		<div class="weui-tab__panel">
			<div id="tab_home" class="tab_panel_content on">
				<detailsList></detailsList>
			</div>
		</div>
	</div>
	<!-- 产品详情 end -->
</template>

<script>
import detailsList from '../components/detailsList.vue'
export default {
  data: () => ({
  	
  }),
  components: {
    'detailsList': detailsList
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
  .tab_panel_content{
      background-color: #eee;
  }
</style>