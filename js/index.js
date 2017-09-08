
/**
 * Created by Administrator on 2017/7/31.
 */
$(function () {

    /*
    *  导航效果
    * */
    $("header").load("header.html",function () {
        $(".navbar-brand img").attr("src","images/logo.png")
            var scrollTop = 0;
            $(window).scroll(function (e) {
            scrollTop = $(window).scrollTop();
            if (scrollTop > 10) {
                if($(window).width() > 768) {
                    $(".navbar-default").stop().animate({
                        "margin-top" : "-15px"
                    },300)
                    $("header").stop().animate({
                        "height" : "60px"
                    },300);
                    $(".navbar-brand>img").stop().animate({
                        "height":"50px",
                        "margin-top":"5px"
                    },300)
                    $("header").css("background","#fff")
                }else{
                    $(".navbar-header").css("background","#fff");
                }
                $(".navbar-brand .img-responsive").attr("src","images/logo1@1x.png")
            } else {
                if($(window).width()>768) {
                    $(".navbar-default").animate({
                        "margin-top" : "0"
                    },300)
                    $("header").animate({
                        "height" : "90px",
                    },300);
                    $(".navbar-brand>img").stop().animate({
                        "height":"65px"
                    },300)
                }
                $(".navbar-brand .img-responsive").attr("src","images/logo.png");
                $(".navbar-header").css("background","none");
                $("header").css("background","none")
            }
        });
        var times = 0;
        for(var i=0;i < $("#bs-example-navbar-collapse-1> .nav > li").length;i++) {
            times += 0.1
            $("#bs-example-navbar-collapse-1> .nav > li").eq(i).children('a').addClass("fadeInDown animated").css({
                "animation-delay" : times + "s"
            })
        }
        var types = ["index","plant","child","home","travel","couple","personal","commission","contect","more"]
        // 导航hover
        var series = getUrlParam("series");
        function overNav() {
            $("#bs-example-navbar-collapse-1>.nav > li").eq(0).addClass("nav-active").siblings("li").removeClass("nav-active");
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
                nav.hoverEnterAction($(this));
                if(scrollTop>10) {
                    $(".downs").css("top","60px")
                }else{
                    $(".downs").css("top","90px")
                }
                $(this).find("span").css('color',"#fff");
                $(this).siblings("li").find("span").css("color","#000")
                if($( this).children(".downs").length == 1) {
                    $(this).find(".downs").fadeIn();
                    $(this).siblings('li').find(".downs").fadeOut();
                    $(".mask").css("height", "100vh");
                    $(".down").stop().fadeIn(200);
                }
            },function () {
                overNav();
                nav.hoverBefore();
                $(this).find("span").css("color","#000")
                $("#bs-example-navbar-collapse-1>.nav>.nav-active span").css('color',"#fff")
                $(this).find(".downs").hide();
                $(".down").hide();
                $(".mask").css("height", "0");

            });
        } else{
            $(window).resize(init);
            function init(){
                var wid = $(window).width();
                $('html').css({
                    'font-size' : 14/375 * wid + 'px'
                })

            }init();
        }
        $("#bs-example-navbar-collapse-1>.nav>.more").stop().hover(function () {
            $(".mores").slideDown()
        },function () {
            $(".mores").slideUp()
        })
    })
    $("footer").load("foot.html")
    /*
    * 季节轮播
    * */
    var setInter = {
        time:5000,
        index:0,
        interval:null,
        timer:function () {
            setInter.index++;
            if(setInter.index > 3){
                setInter.index = 0;
            }
            $(".proUl li").eq(setInter.index).fadeIn().siblings('li').fadeOut();
            $(".seasonNav li").removeClass("active");

            $(".proUl li").eq(setInter.index).fadeIn().siblings('li').fadeOut();
            $(".seasonNav li").eq(setInter.index).addClass("active");
        },
        timers:function () {
            $(".proUl li").eq(setInter.index).fadeIn().siblings('li').fadeOut();
            $(".seasonNav li").removeClass("active");

            $(".proUl li").eq(setInter.index).fadeIn().siblings('li').fadeOut();
            $(".seasonNav li").eq(setInter.index).addClass("active");
        },
        start:function () {
            setInter.interval = setInterval(setInter.timer,setInter.time)
        },
        end:function () {
            clearInterval(setInter.interval)
        }
    };
    setInter.start();
    $(".proUl,.seasonNav").hover(function () {
        setInter.end();
    },function () {
        setInter.start();
    });
    if($(window).width()>768) {
        $(".seasonNav li").click(function () {
            setInter.index = $(this).index()-1;
            setInter.timer();
        });
    }
    touch.on($('.proUl >li'),'swiperight',function () {
        setInter.end();
        setTimeout(setInter.start(),1000);
        setInter.timer()
    });
    touch.on($('.proUl >li'),'swipeleft',function () {

        setInter.end();
        setTimeout(setInter.start(),1000);
        setInter.index--;
        if(setInter.index < 0){
            setInter.index = 3;
        }
        setInter.timers()
    });

    /*
    * 产品列表
    * */
    $(".proNum").hover(function () {
        $(".borderRight,.borderLeft").stop().css({height:0});
        $(".borderTop,.borderBottom").stop().css({width:0});
        $(this).find(".borderTop").stop().animate({
            width:"100%"//上
        },{
            duration:100,
            complete:function () {
                $(this).next().stop().animate({
                    height:"100%"//右
                },{
                    duration:50,
                    complete:function () {
                        $(this).next().stop().animate({
                            width:"100%"//下
                        },{
                            duration:100,
                            complete:function () {
                                $(this).next().stop().animate({
                                    height:"100%",//左
                                    duration:50
                                })
                            }
                        })
                    }
                })
            }
        })
    },function () {
        $(this).stop().animate({
            opcity:1
        },{
            duration:300,
            complete:function () {
                $(this).find(".borderLeft").stop().animate({
                    height:0//左
                },{
                    duration:50,
                    complete:function () {
                        $(this).prev().stop().animate({
                            width:0//下
                        },{
                            duration:100,
                            complete:function () {
                                $(this).prev().stop().animate({
                                    height:0//右
                                },{
                                    duration:50,
                                    complete:function () {
                                        $(this).prev().stop().animate({
                                            width:0,//上
                                            duration:100
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    });

    /*
    * 护肤小贴士
    * */

    (function () {
        var el = $(".carouselLi");
        var index = 0;
       /* if($(window).width()<768) {
            var liHeight = $(".carouselWrap ul li:first-child").height();
            console.log(liHeight);
            $(".carouselWrap ul").height(liHeight)
        }*/
        var width = el.length * (parseFloat(el.width()) + 71);
        el.parent().css("width",width + "px");
        $(".careCarousel .next").click(function () {
            if(el.length - 3 > index){
                index++;
                $(".carouselWrap>ul").stop().animate({
                    right:(el.width() + 70) * index + "px"
                },500)
            }
        });
        $(".careCarousel .prev").click(function () {
            if(index > 0){
                index--;
                $(".carouselWrap>ul").stop().animate({
                    right:(el.width() + 70) * index + "px"
                },500)
            }
        })
    })();
});





























