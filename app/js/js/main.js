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
    totalMoney();
});

/*点击减一*/
$('.reduce').click(function(){
    if($(this).siblings('.txt').val()==0)
        $(this).siblings('.txt').val(0);
    else {
        $(this).siblings('.txt').val(parseInt($(this).siblings('.txt').val()) - 1);
    }
    totalMoney();
});
var $allCheckbox = $('input[type="checkbox"]'),     //全局的全部checkbox
    $wholeChexbox = $('.All_check'),
    $cartBox = $('.shop_detail'),                       //每个商铺
    $shopCheckbox = $('.buy_checked'),               //每个商铺的checkbox
    $sonCheckBox = $('.good_check');                 //每个商铺下的商品的checkbox
$allCheckbox.click(function () {
    if ($(this).is(':checked')) {
        $(this).attr("checked","checked");
        $(this).addClass("checked");
    } else {
        $(this).removeAttr("checked");
        $(this).removeClass("checked");
    }
});

//===============================================全局全选与单个商品的关系================================
$wholeChexbox.click(function () {
    var $checkboxs = $cartBox.find('input[type="checkbox"]');
    if ($(this).is(':checked')) {
        $checkboxs.attr("checked","checked");
        $checkboxs.addClass("checked");
    } else {
        $checkboxs.removeAttr("checked");
        $checkboxs.removeClass("checked");
    }
   totalMoney();
});


$sonCheckBox.each(function () {
    $(this).click(function () {
        if ($(this).is(':checked')) {
            //判断：所有单个商品是否勾选
            var len = $sonCheckBox.length;
            var num = 0;
            $sonCheckBox.each(function () {
                if ($(this).is(':checked')) {
                    num++;
                }
            });
            if (num == len) {
                $wholeChexbox.attr("checked", "checked");
                $wholeChexbox.addClass('checked');
            }
        } else {
            //单个商品取消勾选，全局全选取消勾选
            $wholeChexbox.removeAttr("checked");
            $wholeChexbox.removeClass('checked');
        }
    })
});




function totalMoney() {
    var total_count = 0;
    var total = 0;
    var calBtn = $('.submit_btn');
    $sonCheckBox.each(function () {
        if ($(this).attr("checked")=="checked") {
            var goods = parseInt($(this).parents('.product').find('.txt').attr("data-role"));
            var num =  parseInt($(this).parents('.product').find('.txt').val());
            total= total+parseInt(goods)*parseInt(num);
            total_count += num;
            console.log(total+'---'+total_count)
        }
    });
    $('.pay_total').children("strong").html(total);
    $('.pay_total').find("span").children(".count_number").html(total_count);
    if(total!=0 && total_count!=0){
        if(!calBtn.hasClass('total')){
            calBtn.addClass('total');
        }
    }else{
        if(calBtn.hasClass('total')){
            calBtn.removeClass('total');
        }
    }
}

//=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================

//店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
$shopCheckbox.each(function () {
    $(this).click(function () {
        if ($(this).is(':checked')) {
            //判断：店铺全选中，则全局全选按钮打对勾。
            var len = $shopCheckbox.length;
            var num = 0;
            $shopCheckbox.each(function () {
                if ($(this).is(':checked')) {
                    num++;
                }
            });
            if (num == len) {
                $wholeChexbox.attr("checked", "checked");
                $wholeChexbox.addClass('checked');
            }

            //店铺下的checkbox选中状态
            $(this).parents('.shop_detail').find('.good_check').attr("checked", "checked");
            $(this).parents('.shop_detail').find('.good_check').addClass("checked");
        } else {
            //否则，全局全选按钮取消对勾
            $wholeChexbox.removeAttr("checked");
            $wholeChexbox.removeClass('checked');

            //店铺下的checkbox选中状态
            $(this).parents('.shop_detail').find('.good_check').removeAttr("checked");
            $(this).parents('.shop_detail').find('.good_check').removeClass("checked");
        }
        totalMoney();
    });
});


//========================================每个店铺checkbox与其下商品的checkbox的关系======================================================

//店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
$cartBox.each(function () {
    var $this = $(this);
    var $sonChecks = $this.find('.good_check');
    $sonChecks.each(function () {
        $(this).click(function () {
            if ($(this).attr('checked')=="checked") {
                //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
                var len = $sonChecks.length;
                var num = 0;
                $sonChecks.each(function () {
                    if ($(this).attr('checked')=="checked") {
                        num++;
                    }
                });
                if (num == len) {
                    $(this).parents('.shop_detail').find('.buy_checked').attr("checked", "checked");
                    $(this).parents('.shop_detail').find('.buy_checked').addClass('checked');
                }

            } else {
                //否则，店铺全选取消
                $(this).parents('.shop_detail').find('.buy_checked').removeAttr("checked");
                $(this).parents('.shop_detail').find('.shopChoice').removeClass('checked');
            }
            totalMoney();
        });
    });
});