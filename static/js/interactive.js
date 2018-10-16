$(function(){
    // main tabbar
    $('.weui-tabbar__item').on('click', function () {
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');       
        $('.weui-tab .weui-tab__panel .tab_panel_content').eq($(this).index()).addClass('on').siblings().removeClass('on');
    });
    //列表页tabbar
    $('.page__bd .weui-tab .list .weui-navbar .weui-navbar__item').on('click', function () {
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');       
        $('.weui-tab .weui-tab__panel .tab__panel_content').eq($(this).index()).addClass('on').siblings().removeClass('on');
    });

    //搜索框
    var $searchBar = $('#searchBar'),
        $searchResult = $('#searchResult'),
        $searchText = $('#searchText'),
        $searchInput = $('#searchInput'),
        $searchClear = $('#searchClear'),
        $searchCancel = $('#searchCancel');
    function hideSearchResult(){
        $searchResult.hide();
        $searchInput.val('');
    }
    function cancelSearch(){
        hideSearchResult();
        $searchBar.removeClass('weui-search-bar_focusing');
        $searchText.show();
    }

    $searchText.on('click', function(){
        $searchBar.addClass('weui-search-bar_focusing');
        $searchInput.focus();
    });
    $searchInput
        .on('blur', function () {
            if(!this.value.length) cancelSearch();
        })
        .on('input', function(){
            if(this.value.length) {
                $searchResult.show();
            } else {
                $searchResult.hide();
            }
        })
    ;
    $searchClear.on('click', function(){
        hideSearchResult();
        $searchInput.focus();
    });
    $searchCancel.on('click', function(){
        cancelSearch();
        $searchInput.blur();
    });

    //详情页tab切换
    $('.page__bd .weui-tab .details_list .weui-cell__ft .desDetail__ft .a_box a').on('click',function(){       
        if($(this).hasClass('open')){
            $(this).removeClass('open');
            if($(this).index() == 0){
                $('#content_open').hide();
            } 
        }
        else{
            $(this).addClass('open').siblings().removeClass('open');
            if($(this).index() == 0){
                $('#content_open').show();
            }
            else{
                $('#content_open').hide();
            } 
        }
    });

    //详情页保障内容收起展开
    $('.page__bd .weui-tab .product_list .weui-cell__ft .desDetail__bd .desDetail__bd__item').on('click',function(){
        if($(this).hasClass('open')){
            $(this).removeClass('open');                        
        }
        else{
            $(this).addClass('open').siblings().removeClass('open');            
        }
    });

    //信息页投保声明显示隐藏
    $('.page__bd .weui-tab .form_user .protocol_box .weui-agree__text a').on('click',function(){
        if($('.page__bd .weui-tab .form_user .protocol_box .protocol').css('display') == 'block'){
            $('.page__bd .weui-tab .form_user .protocol_box .protocol').hide();            
        }
        else{
            $('.page__bd .weui-tab .form_user .protocol_box .protocol').show();            
        }
    });

    //信息页折叠展开
    $('.page__bd .weui-tab .form_user .section .section__hd').on('click',function(){
        if($(this).hasClass('fold')){
            $(this).removeClass('fold');
            $(this).parent().find('.section__bd').show();
        }
        else{
            $(this).addClass('fold');
            $(this).parent().find('.section__bd').hide();
        }
    });

    //列表页内容展开收起
    $('.page__bd .weui-tab .list .weui-tab__content__item .weui-tab__content__item__hd__right').on('click',function(){
        if($(this).parents('.weui-tab__content__item').hasClass('open')){
           $(this).parents('.weui-tab__content__item').removeClass('open').addClass('close'); 
        }
        else if($(this).parents('.weui-tab__content__item').hasClass('close')){
            $(this).parents('.weui-tab__content__item').removeClass('close').addClass('open');
        }
    });
});

// var example_1 = new Vue({
//     el: '#product_list',
//     data: {
//         productList: [
//             {
//                 product_name: '“随心游”境外旅行计划（经济款·成人版）',
//                 product_feature: '便宜',
//                 buyNum: '1',
//                 age: '1-80',
//                 time: '1',
//                 occ: '1-2'
//             },
//             {
//                 product_name: '“随心游”境外旅行计划（经济款·少儿版）',
//                 product_feature: '便宜',
//                 buyNum: '2',
//                 age: '1-80',
//                 time: '1',
//                 occ: '1-2'
//             }
//         ]
//     }
// })
// var example_2 = new Vue({
//     el: '#product_details',
//     data: {
//         detailstList: [
//             {
//                 product_name: '“随心游”境外旅行计划（经济款·成人版）',
//                 product_feature: '便宜',
//                 buyNum: '1',
//                 age: '1-80',
//                 time: '1',
//                 occ: '1-2'
//             }            
//         ]
//     }
// })