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
//email:wanzhongwen1985@sina.com
//2018-03-23
