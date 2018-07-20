/**
 * Created by wanzw on 2017/9/14.
 */
/****
 project_name:对联
 project_date: 2018年1月29日
 developer:wanzhongwen
 contanct_message: 401034680@qq.com
 =========================================================================
 *******/
(function() {
    var newRem = function() {
        var html = document.documentElement;
        html.style.fontSize = html.getBoundingClientRect().width / 10 + 'px';
    };
    window.addEventListener('resize', newRem, false);
    newRem();
})();