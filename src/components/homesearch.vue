<template>
	<!-- 顶部搜索框 -->
    <div class="weui-search-bar" :class="{'weui-search-bar_focusing': isFocus}" id="searchBar">
        <div class="weui-search-bar__form">
            <div class="weui-search-bar__box">
                <i class="weui-icon-search"></i>
                <input type="search" v-model="keyword" :value="keyword" class="weui-search-bar__input" id="searchInput" placeholder="搜索" v-on:keypress="search"/>
                <a href="javascript:" class="weui-icon-clear" id="searchClear" @click.stop="clearSearch"></a>
            </div>
            <label class="weui-search-bar__label" id="searchText" @click.stop="focus">
                <div class="weui-search-bar__label__box flex_a">
                    <i class="weui-icon-search"></i>
                    <span>搜索</span>
                </div>                       
            </label>
        </div>
        <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel" @click="cancelSearch">取消</a>
    </div>
    <!-- 顶部搜索框 end --> 
</template>

<script>
	import bus from '../assets/js/bus.js'
	export default {
	  	data: () => ({
		    isFocus: false,
		    keyword: '',
		    focusing: false,
		    isLoad: false
	  	}),
	  	created() {},
	  	mounted() {
	  		
	  	},
	  	methods: {
		    focus: function() {
		      this.isFocus = true;
		      document.getElementById('searchInput').focus();
		    },
		    cancelSearch: function() {
		      this.isFocus = false;
		      bus.$emit('showResult',false);      
		    },
		    clearSearch: function() {     
		      this.keyword = '';
		      document.getElementById('searchInput').focus();
		    },
		    search: function(e){
		    	//输入确定，获取搜索结果
		    	if(e.keyCode == 13){
		    		bus.$emit('searching', this.keyword);		    		
		    	}		    	
		    }
	  	}
	}
</script>