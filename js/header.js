/**
 * Created by Administrator on 2017/7/28.
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
$(function () {

    console.log($("footer").children().length);

    if($("footer").children().length == 0) {
        $("footer").load("foot.html")
    }
    if($("header").children().length == 0) {
        $("header").load("header.html",function () {
            var types = ["index","plant","child","home","travel","couple","personal","commission","contect","more"]
            // 导航hover
            var series = getUrlParam("series");
            function overNav() {
                for(var t=0;t<types.length;t++) {
                    if(series == types[t]) {
                        $("#bs-example-navbar-collapse-1>.nav > li").eq(t).addClass("nav-active").siblings('li').removeClass("nav-active")
                    }
                }
                if($(".nav-active").length == 0){
                    $("#bs-example-navbar-collapse-1>.nav > li").eq(0).addClass("nav-active")
                }
            }overNav();
            var nav = {
                parent:$("#bs-example-navbar-collapse-1>.nav"),
                children:$("#bs-example-navbar-collapse-1>.nav > li"),
                navActiveWidth:$(".nav-active").width(),
                navActiveLeft:$(".nav-active").position().left,
                hoverBefore:function (el) {
                    $(".hover-active").css({
                        left:nav.navActiveLeft,
                        width:nav.navActiveWidth
                    })
                },
                hoverEnterAction:function (el) {
                    nav.children.removeClass("nav-active");
                    el.addClass("nav-active");
                    $(".hover-active").css({
                        left:$(".nav-active").position().left,
                        width:$(".nav-active").width()
                    })
                },
                hoverOverAction:function (el) {

                }
            };
            nav.hoverBefore();
            if($(window).width() > 768) {
                $("#bs-example-navbar-collapse-1>.nav>li").stop().hover(function () {
                    $(this).find("span").css('color',"#fff");
                    nav.hoverEnterAction($(this));
                    $(this).siblings("li").find("span").css("color","#000")
                    if($( this).children(".downs").length == 1) {
                        $(this).find(".downs").fadeIn();
                        $(this).siblings('li').find(".downs").fadeOut();
                        $(".mask").css("height", "auto");
                        $(".down").stop().fadeIn(200);
                    }
                },function () {
                    overNav();
                    nav.hoverBefore();
                    $(this).find("span").css("color","#000")
                    setTimeout(function () {
                        $("#bs-example-navbar-collapse-1>.nav>.nav-active span").css('color',"#fff")
                    },100)
                    $(this).find(".downs").hide();
                    $(".down").hide();
                    $(".mask").css("height", "0");

                })
            }else{
                $("#bs-example-navbar-collapse-1>.nav>li").on("touchstart",function () {
                    if($(this).children(".downs").length == 1) {
                        $(".closer").show();
                        $(this).find(".downs").fadeIn();
                        $(this).siblings('li').find(".downs").fadeOut();
                        $(".mask").css("height", "100vh");
                        $(".down").stop().fadeIn(200);
                    }
                    $(".closer").on("touchstart",function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log(0)
                        $(this).hide();
                        $(".downs").hide();
                        $(".down").hide();
                        $(".mask").css("height", "0");
                    })
                })
            }
            $("#bs-example-navbar-collapse-1>.nav>.more").stop().hover(function () {
                $(".mores").stop().slideDown()
            },function () {
                $(".mores").stop().slideUp()
            })
        })
    }
    if($(window).width() <= 768) {
        $(window).resize(init);
        function init(){
            var wid = $(window).width();
            $('html').css({
                'font-size' : 14/375 * wid + 'px'
            })
        }init();
    }
});