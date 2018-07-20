/**
 * Created by wanzw on 2018/03/8.
 */
var GLOBAL={};
GLOBAL.namespace=function(str){
    var arr=str.split(".");
    var o=GLOBAL;
    for(i=arr[0]=="GLOBAL"?1:0;i<arr.length; i++){
        o[arr[i]]=o[arr[i]] || {};
        o=o[arr[i]];
    }
};
//=====================================================
// 功能 首页菜单
//工程师  万中文
//email:401034680@qq.com
//2018-03-23
//全局的checkbox选中和未选中的样式
/*点击加一*/
$('.add').click(function(){
    $(this).siblings('.txt').val(parseInt($(this).siblings('.txt').val())+1);
    total();
});

/*点击减一*/
$('.reduce').click(function(){
    if($(this).siblings('.txt').val()==0)
        $(this).siblings('.txt').val(0);
    else {
        $(this).siblings('.txt').val(parseInt($(this).siblings('.txt').val()) - 1);
    }
    total();
});

/*计算总钱数*/
	function total() {
		var S=0;
		var N=0;
		$.each($('.pay'), function() {
			var _this=($(this));
			var s=0;
			var n1=0;
			$.each($(this).siblings('.shopCart').find("ul").find(".txt"), function(i) {
				if($(this).parents(".product").children(".product_list").children("input[name='checkbox']").is(':checked')){
					var num =$(this).parents(".product").children(".buy_number").children(".buy_total")
							.find("input").val();
					var price = $(this).parents(".product").children(".buy_number").children(".buy_total")
							.find("input").attr("data-role");
					s=s+(parseInt(num)*price);
					n1=n1+parseInt(num);
				}
				$('.pay').children(".pay_total").find("strong").html(s.toFixed(2));
				$('.pay').children(".pay_total").find("i").html(n1);
			});
		});
	}