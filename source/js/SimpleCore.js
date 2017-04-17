/**
 * Created by tangkunyin on 2017/1/25.
 */
var SimpleCore = {
    buildingTime: new Date(),
    current: null,
    prevTop: 0,
    headerShow: true,
    customImg: null,
    initParams: function (params) {
        SimpleCore.buildingTime = params.buildingTime;
        SimpleCore.current = params.current;
        SimpleCore.customImg = params.customImg;
    },
    //外部调用初始化
    init: function (params) {
        SimpleCore.initParams(params);
        $(window).resize(function () {
            SimpleCore.syncSize();
        });
        $(window).scroll(function (e) {
            SimpleCore.scrollCallback();
        });
        $(document).on('click', '.btn-read-mode', function (e) {
            e.preventDefault();
            SimpleCore.switchReadMode();
        });
        $(document).on('click', '.btn-search', function (e) {
            e.preventDefault();
            SimpleCore.switchSearch();
        });
        $(document).on('click', '.btn-weixin-mp', function (e) {
            e.preventDefault();
            if (SimpleCore.customImg != '') {
                SimpleCore.alert('更多精彩扫扫这里','<img style="width:160px;background:#fff;" src="' + SimpleCore.customImg + '">');
            } else {
                SimpleCore.alert('未开通自定义功能','<h4 style="text-align: center;margin: 0">联系博主试试看 ：）</h4>');
            }
        });
        $(document).on('click', '.btn-gotop', function (e) {
            e.preventDefault();
            SimpleCore.goTop();
        });
        SimpleCore.changeReadModel();
        SimpleCore.setPageCurrent();
        SimpleCore.setBuildingTime();
        SimpleCore.syncSize();
    },
    goTop: function () {
        $("html, body").animate({scrollTop: 0}, 200);
    },
    setPageCurrent: function () {
        if (SimpleCore.current === 'post') {
            $('#cover').hide();
            $('body').addClass('single');
        } else {
            $('#cover').show();
            $('body').removeClass('single');
        }
        $.each($('.nav-menu a'), function (k, v) {
            if (v.href == window.location.href) {
                $(v).addClass('current');
            } else {
                $(v).removeClass('current');
            }
        });
    },
    scrollCallback: function () {
        var top = document.body.scrollTop;
        if (top > 100) {
            $('.fixed-btn').show();
        } else {
            $('.fixed-btn').hide();
        }
        if ($('body').hasClass('single')) {
            SimpleCore.headerShow = (top < 100 || (SimpleCore.prevTop - top) > 0) ? true : false;
            SimpleCore.headerToggle();
        }
        SimpleCore.prevTop = top;
    },
    headerToggle: function () {
        if (SimpleCore.headerShow) {
            $('.page-title').css("top", 0);
            $('.nav-user').css("top", 0);
            if ($(window).width() < 480) {
                $('#nav').css("top", 0);
            }
        } else {
            $('.page-title').css("top", -45);
            $('.nav-user').css("top", -45);
            if ($(window).width() < 480) {
                $('#nav').css("top", -45);
            }
        }
    },
    syncSize: function () {	//同步窗口大小
        var pageTitle = $('.page-title');
        var size = $(window).width();
        if (size > 768 && SimpleCore.current != 'post') {
            pageTitle.width($('#body > .main').width());
        } else {
            pageTitle.removeAttr('style');
        }
        if (size < 768) {
            $('.site-name').click(function (e) {
                e.preventDefault();
            });
        }
    },
    switchSearch: function () {	//显示搜索
        var srh = $('#search');
        if (srh.hasClass('active')) {
            srh.removeClass('active');
        } else {
            srh.addClass('active');
        }
    },
    switchReadMode: function () {
        var next_mode = $('body').hasClass('night-mode') ? 'day' : 'night';
        SimpleCore.setLocalData('read-mode', next_mode);
        SimpleCore.changeReadModel();
    },
    changeReadModel: function () {
        var btn = $('.btn-read-mode');
        if (SimpleCore.getLocalData('read-mode') == 'night') {
            $('body').addClass('night-mode');
            btn.find('i').attr('class', 'fa fa-moon-o');
            $(".cover-img").css({
                'background': "url('/images/cover-night.jpg')",
                'background-image': '/images/cover-night.jpg',
                'background-size': 'cover',
                'background-position': 'center',
                'background-repeat': 'no-repeat'
            });
        } else {
            $('body').removeClass('night-mode');
            btn.find('i').attr('class', 'fa fa-sun-o');
            $(".cover-img").css({
                'background': "url('/images/cover-day.jpg')",
                'background-image': '/images/cover-day.jpg',
                'background-size': 'cover',
                'background-position': 'center',
                'background-repeat': 'no-repeat'
            });
        }
    },
    alert: function (title,msg) {
        var id = 'notice-' + (new Date().getTime());
        var html = '<div id="' + id + '" class="notice-item">'
            + '<span class="notice-item-close"><i class="fa fa-close"></i></span>'
            + '<p><h3 style="text-align: center;margin:0 0 10px 0">'+title+'</h3>' + msg + '</p></div>';
        var notice = $('#notice');
        if (notice.length == 0) {
            $('<div id="notice"></div>').appendTo($('body'));
        }
        $(html).appendTo($('#notice')).on('click', '.notice-item-close', function () {
            $(this).parent().remove();
            return false;
        });
        //居中显示，于8秒后自动关闭
        $('#notice').css('margin-right', -$('#notice').width() / 2);
        setTimeout(function () {
            $('#' + id).remove();
        }, 8000);
    },
    setLocalData: function (key, value) {
        if (window.localStorage) {
            window.localStorage.setItem(key, value);
        }
    },
    getLocalData: function (key) {
        if (window.localStorage) {
            return window.localStorage.getItem(key);
        }
    },
    setBuildingTime: function () {
        var urodz = new Date(SimpleCore.buildingTime);  //建站时间
        var now = new Date();
        var ile = now.getTime() - urodz.getTime();
        $('#siteBuildingTime').html(Math.floor(ile / (1000 * 60 * 60 * 24)));
    }
}