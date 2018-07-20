<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>确认支付</title>
    <script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="http://malsup.github.com/jquery.form.js" type="text/javascript"></script>
    <meta http-equiv="Access-Control-Allow-Origin" content="*" />
</head>
<body>
<input type="text" name="appId" value="${appId}">
<input type="text" name="nonceStr" value="${nonceStr}">
<input type="text" name="prepayId" value="${prepayId}">
<input type="text" name="paySign" value="${paySign}">
<input type="text" name="timeStamp" value="${timeStamp}">

</body>
<script>

    function onBridgeReady(){
        var appId = $("input[name='appId']").val();
        var nonceStr = $("input[name='nonceStr']").val();
        var prepayId = $("input[name='prepayId']").val();
        var paySign = $("input[name='paySign']").val();
        var timeStamp = $("input[name='timeStamp']").val();
        WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId":appId,
                    "timeStamp":timeStamp,
                    "nonceStr":nonceStr,
                    "package":prepayId,
                    "signType":"MD5",
                    "paySign":paySign
                },
                function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                        location.href="http://www.yehaikeji.com/qingmai/app/success.html";
                    }else {//这里支付失败和支付取消统一处理
                        alert("支付取消");
                        location.href="http://www.yehaikeji.com/qingmai/app/shibai.html";
                    }
                }
        );
    }

    $(document).ready(function () {
        if (typeof WeixinJSBridge == "undefined"){
            if (document.addEventListener){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }else {
            onBridgeReady();
        }
    });
</script>
</html>