<template>
	<!-- tabbar -->
    <div class="weui-tabbar">
        <router-link href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on': isHome}" to="/">
            <span style="display: inline-block;position: relative;">
                <img src="../../static/images/home_icon.png" alt="" class="weui-tabbar__icon off">
                <img src="../../static/images/home_icon_sel.png" alt="" class="weui-tabbar__icon on">
            </span>
            <p class="weui-tabbar__label">主页</p>
        </router-link>
        <router-link href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on': isList}" to="/list">
            <span style="display: inline-block;position: relative;">
                <img src="../../static/images/list_icon.png" alt="" class="weui-tabbar__icon off">
                <img src="../../static/images/list_icon_sel.png" alt="" class="weui-tabbar__icon on">                       
            </span>
            <p class="weui-tabbar__label">保单</p>
        </router-link>
        <router-link href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on': isUser}" to="/user">
            <span style="display: inline-block;position: relative;">
                <img src="../../static/images/my_icon.png" alt="" class="weui-tabbar__icon off">
                <img src="../../static/images/my_icon_sel.png" alt="" class="weui-tabbar__icon on">   
            </span>
            <p class="weui-tabbar__label">我的</p>
        </router-link>
    </div>
    <!-- tabbar end -->
</template>

<script>
export default{
  data: () => ({
    isHome: true,
    isList: false,
    isUser: false
  }),
  mounted() {
    this.$nextTick(function(){
      const url = this.$route.path;
      if(url === '/'){
        this.isHome = true;
        this.isList = false;
        this.isUser = false;
      }
      if(url === '/list'){
        this.isHome = false;
        this.isList = true;
        this.isUser = false;
      }
      if(url === '/user'){
        this.isHome = false;
        this.isList = false;
        this.isUser = true;
      }
    })
  }
}
</script>

<style>

</style>