var pageNum = 1;
var pageSize = 4;
var totalPage = 0;
var totalCount = 0;
var deleteRow = null;
var updateRow = -1;
var enume = "ELGS";
//页面加载就会调用操作
$(function () {
    findUserName(); //右上角显示用户名
    findAllElgsByPage(pageNum, pageSize,enume);

// 添加信息的事件处理
    $("#saveBtn").on("click", function () {
        if (updateRow == -1) {
            $.ajax({
                type: "POST",
                /* 一个用来包含发送请求的URL字符串。默认为当前页地址。*/
                url: "/elgs",
                data: {
                    "pollutantOrProjectName": $("#pollutantOrProjectName").val(),
                    "standard": $("#standard").val(),
                    "criterion": $("#criterion").val(),
                    "norm": $("#norm").val(),
                    "monitoringMosition": $("#monitoringMosition").val(),

                },
                statusCode: {
                    201: function () {
                        alert("添加信息成功");
                        $(location).attr("href", "/home.html");
                        return false;
                    },
                    500: function () {
                        alert("添加信息失败，请重新添加");
                        $(location).attr("href", "/home.html");
                        return false;
                    }
                }
            })
        } else {
            $.ajax({
                type: "PUT",
                url: "/elgs",
                dataType:"json",
                contentType:"application/json;charset=utf-8",
                data: JSON.stringify({
                    id: updateRow,
                    pollutantOrProjectName: $("#pollutantOrProjectName").val(),
                    standard: $("#standard").val(),
                    criterion: $("#criterion").val(),
                    norm: $("#norm").val(),
                    monitoringMosition: $("#monitoringMosition").val(),

                }),
                statusCode: {
                    204: function () {
                        alert("修改成功");
                        $('#elgsModal').modal('hide');
                        location.reload();
                    },
                    500: function () {
                        alert("服务器内部错误");
                        return false;
                    }
                }
            })
        }
    })
})

//显示用户名
function findUserName() {
    $.ajax({
        type: "GET",
        url: "/login",
        statusCode: {
            200: function (user) {
                $("#usernameHint").html(user.username);
                return false;
            },
            404: function () {
                alert("请登录后再访问.");
                $(location).attr("href", "/login.html");
                return false;
            },
            500: function () {
                alert("服务器内部错误");
                $(location).attr("href", "/login.html");
                return false;
            }
        }
    });

}


// 分页查询产品信息
function findAllElgsByPage(pn, ps,enume) {
    $.ajax({
        type: "GET",
        url: "/elgs",
        data: {
            "pageNum": pn,
            "pageSize": ps,
            "enume": enume
        },
        statusCode: {
            200: function (pageInfo) {
                $("#ebody").empty();
                for (var i = 0; i < pageInfo.list.length; i++) {
                    /* 定义一个e集合*/
                    var e = pageInfo.list[i];
                    var $tr = $("<tr></tr>").append("<td>" + e.id + "</td>").append("<td>" + e.pollutantOrProjectName + "</td>")
                        .append("<td>" + e.standard + "</td>").append("<td>" + e.criterion + "</td>").append("<td>" + e.norm + "</td>")
                        .append("<td>" + e.monitoringMosition + "</td>")
                        .append("<td><a href='#'>修改</a> | <a href='#'>删除</a></td>");
                    $("#ebody").append($tr);

                    $("#ebody").append($tr);
                    $tr.find("a:first").on("click", function () {
                        //调用下面的修改方法
                        updateElgs($(this));
                    })
                    $tr.find("a:last").on("click", function () {
                        deleteById($(this));
                    })
                }

                // 将计算当前页号,每页记录数,总页数,总记录数的结果赋值给js文件的属性.
                pageNum = pageInfo.pageNum;
                pageSize = pageInfo.pageSize;
                totalPage = pageInfo.pages;
                totalCount = pageInfo.total;

                // 将属性值显示到页面上.
                $("#totalCount").html(totalCount);
                $("#totalPage").html(totalPage);
                $("#pageNum").html(pageNum);


                $("#pagination").empty();
                var $back = $("<a class='icon item'><i class='left chevron icon'></i></a>");
                $("#pagination").append($back);

                for (var i = 0; i < pageInfo.navigatepageNums.length; i++) {
                    var $pageIndex = $("<a class='item'>" + pageInfo.navigatepageNums[i] + "</a>");
                    if (pageInfo.navigatepageNums[i] == pageNum) {
                        $pageIndex.addClass("active");
                    }
                    $("#pagination").append($pageIndex);
                    //  页号对应的事件处理
                    $pageIndex.on("click", function () {
                        findAllElgsByPage($(this).html(), pageSize);
                    });
                }


                var $next = $("<a class='icon item'><i class='right chevron icon'></i></a>");
                $("#pagination").append($next);

                //  上一页事件处理
                $back.on("click", function () {
                    if (pageNum > 1) {
                        findAllElgsByPage(pageNum - 1, pageSize);
                    }
                });

                //  下一页事件处理
                $next.on("click", function () {
                    if (pageNum < totalPage) {
                        findAllElgsByPage(pageNum + 1, pageSize);
                    }
                });
            },
            404: function () {

            },
            500: function () {
                alert("服务器内部错误");
                return false;
            }
        }
    });
}

// 添加&修改产品
function updateElgs(row) {
    var $tr = row.parent().parent();
    var pollutantOrProjectName = $tr.children(":eq(1)").html();
    var standard = $tr.children(":eq(2)").html();
    var criterion = $tr.children(":eq(3)").html();
    var norm = $tr.children(":eq(4)").html();
    var monitoringMosition = $tr.children(":eq(5)").html();

    updateRow = $tr.children(":eq(0)").html();
    $("#pollutantOrProjectName").val(pollutantOrProjectName);
    $("#standard").val(standard);
    $("#criterion").val(criterion);
    $("#norm").val(norm);
    $("#monitoringMosition").val(monitoringMosition);

    $('#elgsModal').modal('show');
}


function addAndUpdateElgs(id) {
    // 显示弹窗
    $("#pollutantOrProjectName").val("");
    $("#standard").val("");
    $("#criterion").val("");
    $("#norm").val("");
    $("#monitoringMosition").val("");

    $('#elgsModal').modal('show');
}

// 根据id删除产品
function deleteById(row) {
    var flag = window.confirm("确认删除吗?");
    if(flag) {
        var $tr = row.parent().parent();
        var id = $tr.children(":eq(0)").html();
        $.ajax({
            type: "DELETE",
            url: "/elgs/"+id,
            statusCode: {
                204: function () {
                    alert("删除员工信息成功");
                    location.reload();
                },
                500: function () {
                    alert("服务器错误");
                }
            }
        })
    }
}

// 关闭操作
function shutdown() {
    // 将浏览器窗口关闭

    var flag = window.confirm("确认要退出系统吗");
    if (flag) {
        $.ajax({
            type: "DELETE",
            url: "/login",
            statusCode: {
                204: function () {
                    alert("已经退出系统");
                    $(location).attr("href", "/login.html");
                    return false;
                },
                500: function () {
                    alert("服务器内部错误");
                    return false;
                }
            }
        })
    }
};
