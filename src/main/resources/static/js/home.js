var pageNum1 = 1;
var pageSize = 4;
var totalPage1 = 0;
var totalCount1 = 0;
var deleteRow = null;
var updateRow = -1;

//页面加载就会调用操作
$(function () {
    findUserName(); //右上角显示用户名
    findAllProgressByPage(pageNum1, pageSize);

// 添加信息的事件处理
    $("#saveBtn1").on("click", function () {
        if (updateRow == -1) {
            $.ajax({
                type: "POST",
                /* 一个用来包含发送请求的URL字符串。默认为当前页地址。*/
                url: "/progress",
                data: {
                    "villageName": $("#villageName").val(),
                    "startWork": $("#startWork").val(),
                    "plannedTime": $("#plannedTime").val(),
                    "cutPavement": $("#cutPavement").val(),
                    "brokenPavement": $("#brokenPavement").val(),
                    "developPavement": $("#developPavement").val(),
                    "buriedPipe": $("#buriedPipe").val(),
                    "backfillTheEarth": $("#backfillTheEarth").val(),
                    "pavementRestoration": $("#pavementRestoration").val(),
                    "mainInspectionWell": $("#mainInspectionWell").val(),
                    "branchCheckWell": $("#branchCheckWell").val(),
                    "terminalConstruction": $("#terminalConstruction").val(),

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
                url: "/progress",
                dataType:"json",
                contentType:"application/json;charset=utf-8",
                data: JSON.stringify({
                    id: updateRow,
                    villageName: $("#villageName").val(),
                    startWork: $("#startWork").val(),
                    plannedTime: $("#plannedTime").val(),
                    cutPavement: $("#cutPavement").val(),
                    brokenPavement: $("#brokenPavement").val(),
                    developPavement: $("#developPavement").val(),
                    buriedPipe: $("#buriedPipe").val(),
                    backfillTheEarth: $("#backfillTheEarth").val(),
                    pavementRestoration: $("#pavementRestoration").val(),
                    mainInspectionWell: $("#mainInspectionWell").val(),
                    branchCheckWell: $("#branchCheckWell").val(),
                    terminalConstruction: $("#terminalConstruction").val(),

                }),
                statusCode: {
                    204: function () {
                        alert("修改成功");
                        $('#progressModal').modal('hide');
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
function findAllProgressByPage(pn, ps) {
    $.ajax({
        type: "GET",
        url: "/progress",
        data: {
            "pageNum1": pn,
            "pageSize": ps
        },
        statusCode: {
            200: function (pageInfo) {
                $("#pbody").empty();
                for (var i = 0; i < pageInfo.list.length; i++) {
                    /* 定义一个p集合*/
                    var p = pageInfo.list[i];
                    var $tr = $("<tr></tr>").append("<td>" + p.id + "</td>")
                        .append("<td>" + p.villageName + "</td>")
                        .append("<td>" + p.startWork + "</td>")
                        .append("<td>" + p.plannedTime + "</td>")
                        .append("<td>" + p.cutPavement + "</td>")
                        .append("<td>" + p.brokenPavement + "</td>")
                        .append("<td>" + p.developPavement + "</td>")
                        .append("<td>" + p.buriedPipe + "</td>")
                        .append("<td>" + p.backfillTheEarth + "</td>")
                        .append("<td>" + p.pavementRestoration + "</td>")
                        .append("<td>" + p.mainInspectionWell + "</td>")
                        .append("<td>" + p.branchCheckWell + "</td>")
                        .append("<td>" + p.terminalConstruction + "</td>")

                        .append("<td><a href='#'>修改</a> | <a href='#'>删除</a></td>");
                    $("#pbody").append($tr);

                    $("#pbody").append($tr);
                    $tr.find("a:first").on("click", function () {
                        //调用下面的修改方法
                        updateProgress($(this));
                    })
                    $tr.find("a:last").on("click", function () {
                        deleteById($(this));
                    })
                }

                // 将计算当前页号,每页记录数,总页数,总记录数的结果赋值给js文件的属性.
                pageNum1 = pageInfo.pageNum1;
                pageSize = pageInfo.pageSize;
                totalPage1 = pageInfo.pages;
                totalCount1 = pageInfo.total;

                // 将属性值显示到页面上.
                $("#totalCount1").html(totalCount1);
                $("#totalPage1").html(totalPage1);
                $("#pageNum1").html(pageNum1);


                $("#pagination").empty();
                var $back = $("<a class='icon item'><i class='left chevron icon'></i></a>");
                $("#pagination").append($back);

                for (var i = 0; i < pageInfo.navigatepageNums.length; i++) {
                    var $pageIndex = $("<a class='item'>" + pageInfo.navigatepageNums[i] + "</a>");
                    if (pageInfo.navigatepageNums[i] == pageNum1) {
                        $pageIndex.addClass("active");
                    }
                    $("#pagination").append($pageIndex);
                    //  页号对应的事件处理
                    $pageIndex.on("click", function () {
                        findAllProgressByPage($(this).html(), pageSize);
                    });
                }


                var $next = $("<a class='icon item'><i class='right chevron icon'></i></a>");
                $("#pagination").append($next);

                //  上一页事件处理
                $back.on("click", function () {
                    if (pageNum1 > 1) {
                        findAllProgressByPage(pageNum1 - 1, pageSize);
                    }
                });

                //  下一页事件处理
                $next.on("click", function () {
                    if (pageNum1 < totalPage1) {
                        findAllProgressByPage(pageNum1 + 1, pageSize);
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
function updateProgress(row) {
    var $tr = row.parent().parent();

    var villageName = $tr.children(":eq(1)").html();
    var startWork = $tr.children(":eq(2)").html();
    var plannedTime = $tr.children(":eq(3)").html();
    var cutPavement = $tr.children(":eq(4)").html();
    var brokenPavement = $tr.children(":eq(5)").html();
    var developPavement = $tr.children(":eq(6)").html();
    var buriedPipe = $tr.children(":eq(7)").html();
    var backfillTheEarth = $tr.children(":eq(8)").html();
    var pavementRestoration = $tr.children(":eq(9)").html();
    var mainInspectionWell = $tr.children(":eq(10)").html();
    var branchCheckWell = $tr.children(":eq(11)").html();
    var terminalConstruction = $tr.children(":eq(12)").html();



    updateRow = $tr.children(":eq(0)").html();
    $("#villageName").val(villageName);
    $("#startWork").val(startWork);
    $("#plannedTime").val(plannedTime);
    $("#cutPavement").val(cutPavement);
    $("#brokenPavement").val(brokenPavement);
    $("#developPavement").val(developPavement);
    $("#buriedPipe").val(buriedPipe);
    $("#backfillTheEarth").val(backfillTheEarth);
    $("#pavementRestoration").val(pavementRestoration);
    $("#mainInspectionWell").val(mainInspectionWell);
    $("#branchCheckWell").val(branchCheckWell);
    $("#terminalConstruction").val(terminalConstruction);


    $('#progressModal').modal('show');
}


function addAndUpdateProgress(id) {
    // 显示弹窗
    $("#villageName").val("");
    $("#startWork").val("");
    $("#plannedTime").val("");
    $("#cutPavement").val("");
    $("#brokenPavement").val("");
    $("#developPavement").val("");
    $("#buriedPipe").val("");
    $("#backfillTheEarth").val("");
    $("#pavementRestoration").val("");
    $("#mainInspectionWell").val("");
    $("#branchCheckWell").val("");
    $("#terminalConstruction").val("");

    $('#progressModal').modal('show');
}

// 根据id删除产品
function deleteById(row) {
    var flag = window.confirm("确认删除吗?");
    if(flag) {
        var $tr = row.parent().parent();
        var id = $tr.children(":eq(0)").html();
        $.ajax({
            type: "DELETE",
            url: "/progress/"+id,
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
