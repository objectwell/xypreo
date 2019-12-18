$(".workbench-style").on("click", function () {
    viewWorking()
    // $previewVav.addClass("layui-hide");
})
$(".personal-center").on("click", function () {
    touserinfo()
})
// nav  left  click
$("#navLeft").on("click", function () {
    toogleMargin($("#navContent"), $(this), $(".nav-operation"));
})
// nav  right  click
$("#navRight").on("click", function () {
    toogleMargin($("#navContent"), $(this), $(".nav-operation"))
})

/**
 * viewWorking 办公模式
 */

function viewWorking() {
    var height = $("#doctorContent").height() - 40;

    $("#officeNav").removeClass("layui-hide");
    $("#doctorInfo").animate({
        width: 0
    });
    $("#previewVav").animate({
        height: 0,
        padding: 0
    })
    $("#workbench").animate({
        height: height,
        padding: "40px 0 0 0"
    })
    $("#workbenchiframe")[0].contentWindow.resetChart()
}
function touserinfo() {
    $("#workbenchiframe").attr("src", "../user/personal.html")
}
function toAdmin() {
    window.location.replace("../admin/home.html")
}
/**
 * viewBrowse 浏览模式
 */
function viewBrowse() {
    var height = $("#doctorContent").height() - 200;
    $("#doctorInfo").animate({
        width: 220
    });
    $("#previewVav").animate({
        height: "200px",
        padding: "40px 10px"
    })
    $("#workbench").animate({
        height: height,
        padding: "0"
    })
    $("#officeNav").addClass("layui-hide");
    // document.getElementById('workbenchiframe').contentWindow.location.reload(true);
    console.log($("#workbenchiframe")[0].contentWindow.resetChart)
    $("#workbenchiframe")[0].contentWindow.resetChart()
}

/*  nav toogle margin
    $element 偏移的元素
    $this  点击的元素 (左侧还是右侧)
    $("#navOperations") nav-operation 左右点击元素
*/
function toogleMargin($element, $this, $navOperations) {
    if ($this.hasClass('default')) return false
    $navOperations.removeClass("default")
    $this.addClass("default");
    var offLeft = $element.position().left;
    if (offLeft && offLeft > 0) {
        $element.animate({
            left: -390
        }, 200);
    } else {
        $element.animate({
            left: 10
        }, 200);
    }
}