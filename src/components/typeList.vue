<template>
	<!-- 类别列表展示 -->
    <div class="weui-cells typeList" id="typeList">
        <router-link class="weui-cell weui-cell_access" href="javascript:;" v-for="item in typeList" :to="{ path: '/productlist', query: { type: item.id, insuranceTypeName: item.type_name}}">
            <img :src="'static/images/home_p' + item.id + '.jpg'" class="listItem_bg">
            <div class="weui-cell__bd">{{item.type_name}}</div>
            <div class="weui-cell__ft"></div>
        </router-link>
    </div>
    <!-- 类别列表展示 end -->
</template>

<script>
export default {
  data: () => ({
    typeList: []
  }),
  mounted () {
    this.loadData()
  },
  methods: {
    loadData: function () {
  	  this.$http.get('http://www.xiaobaodan.cn/api/web/index.php?r=insurance-types').then(response => {
        this.typeList = response.body;                     
      }, response => {
        console.log(response);
      })
  	}
  }
}
</script>

<style>
  
</style>