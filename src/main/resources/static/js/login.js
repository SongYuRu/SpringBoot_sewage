//登录页面判断正确就进入home.html界面，错误就提示错误信息
$(function () {
    $("input[type='button']").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            type: "POST",
            url: "/login",
            data: { username,  password},
            statusCode: {
                201: function () {
                    $(location).attr("href","/home.html");
                    return false;
                },
                404 : function(){
                    $("#errorMsg").html("账号或者密码不正确");
                    return false;
                },
                500 : function(){
                    $("#errorMsg").html("服务器内部错误");
                    return false;
                }
            }
        });
    });
});