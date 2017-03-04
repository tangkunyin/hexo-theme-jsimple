/**
 * Created by tangkunyin on 2017/1/25.
 */
var SimpleCore = {
    url: null,	//网址
    buildingTime: new Date(), //网站建立时间，默认当前
    prefix: null,	//cookie前缀
    current: null,	//当前页面类型
    prevTop: 0,
    headerShow: true,
    loadingShow: true,
    usePjax: true,
    donateImg: null,
    initParams: function (params) {
        SimpleCore.url = params.url;
        SimpleCore.buildingTime = params.buildingTime;
        SimpleCore.usePjax = params.usePjax;
        SimpleCore.prefix = params.prefix;
        SimpleCore.current = params.current;
        SimpleCore.donateImg = params.donateImg;
    },
    initPjax: function () {
        $(document).pjax('a[target!=_blank]', '#main', {fragment: '#main', timeout: 10000});
        $(document).on('pjax:send', function (e) {
            SimpleCore.pjaxLoading('show');
        });
        $(document).on('pjax:complete', function (e) {
            SimpleCore.pjaxLoading('hide');
            SimpleCore.pajx_loadDuodsuo();//pjax加载完成之后调用重载多说函数
        });
        $(document).on('pjax:end', function (e) {
            if (!e.currentTarget || e.currentTarget.baseURI.indexOf('.html') == -1) {
                SimpleCore.current = 'archive';
            } else {
                SimpleCore.current = 'post';
            }
            SimpleCore.changeReadModel();
            SimpleCore.setPageCurrent();
            SimpleCore.syncSize();
        });
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
        $(document).on('click', '.btn-donate', function (e) {
            e.preventDefault();
            if (SimpleCore.donateImg != '') {
                SimpleCore.alert('<h3>扫描二维码打赏</h3><img style="width:160px;background:#fff;" src="' + SimpleCore.donateImg + '">', 'success', 0);
            } else {
                SimpleCore.alert('暂未开通打赏功能');
            }
        });
        $(document).on('click', '.btn-like', function () {
            SimpleCore.ajaxSetLike($(this));
            return false;
        });
        $(document).on('click', '.btn-gotop', function (e) {
            e.preventDefault();
            SimpleCore.goTop();
        });
        if (SimpleCore.usePjax) {
            SimpleCore.initPjax();
        }
        SimpleCore.changeReadModel();
        SimpleCore.setPageCurrent();
        SimpleCore.setBuildingTime();
        SimpleCore.syncSize();
    },
    pjaxLoading: function (type) {
        var loading = $('#pjax-loading'), width = 0;
        var progress = function () {
            if (SimpleCore.loadingShow === true && width < $(window).width()) {
                $('#pjax-loading').width(width).show();
                width += 4;
                setTimeout(function () {
                    progress();
                }, 10);
            } else {
                $('#pjax-loading').width($(window).width());
                setTimeout(function () {
                    $('#pjax-loading').width(0).hide();
                }, 300);
            }
        }
        if (type == 'show') {
            if (loading.length == 0) {
                $('<div id="pjax-loading"></div>').appendTo($('body'));
            }
            SimpleCore.loadingShow = true;
            progress();
        } else {
            SimpleCore.loadingShow = false;
        }
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
    ajaxSetLike: function (that) {		//提交like
        var cid = that.data('cid');
        var num = parseInt(that.find('span').text());
        if (cid === undefined) {
            SimpleCore.alert('请选择要点赞的文章!', type);
            return false;
        }
        SimpleCore.alert('多谢支持 ：）');
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
    alert: function (msg, type, time) {  //提示信息
        var id = 'notice-' + (new Date().getTime());
        type = type === 'error' ? 'error' : 'success';
        time = time === undefined ? (type == 'success' ? 3000 : 5000) : time;
        var html = '<div id="' + id + '" class="notice-item ' + type + '"><span class="notice-item-close"><i class="fa fa-close"></i></span>'
            + '<span class="notice-item-type"><i class="fa fa-' + type + '"></i></span><p>' + msg + '</p></div>';
        var notice = $('#notice');
        if (notice.length == 0) {
            $('<div id="notice"></div>').appendTo($('body'));
        }
        $(html).appendTo($('#notice')).on('click', '.notice-item-close', function () {
            $(this).parent().remove();
            return false;
        });
        //居中显示
        $('#notice').css('margin-right', -$('#notice').width() / 2);
        if (time != 0) {
            setTimeout(function () {
                $('#' + id).remove();
            }, time);
        }
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
    pajx_loadDuodsuo: function () {
        var dus = $("#ds-thread");
        if ($(dus).length == 1) {
            try {
                var el = document.createElement('div');
                el.setAttribute('data-thread-key', $(dus).attr("data-thread-key"));//必选参数
                el.setAttribute('data-url', $(dus).attr("data-url"));
                DUOSHUO.EmbedThread(el);
                $(dus).html(el);
            } catch (e) {
                console.log(e);
            }
        }
    },
    setBuildingTime: function () {
        var urodz = new Date(SimpleCore.buildingTime);  //建站时间
        var now = new Date();
        var ile = now.getTime() - urodz.getTime();
        $('#siteBuildingTime').html(Math.floor(ile / (1000 * 60 * 60 * 24)));
    }
}