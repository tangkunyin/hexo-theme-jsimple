/**
 * Created by tangkunyin on 2017/1/25.
 */

var jBlog = {
    url: null,	//网址
    prefix: null,	//cookie前缀
    current: null,	//当前页面类型
    prevTop: 0,
    headerShow: true,
    loadingShow: true,
    usePjax: true,
    donateImg: null,
    initParams: function (params) {
        jBlog.url = params.url;
        jBlog.usePjax = params.usePjax;
        jBlog.prefix = params.prefix;
        jBlog.current = params.current;
        jBlog.donateImg = params.donateImg;
    },
    initPjax: function () {
        $(document).pjax('a[target!=_blank]', '#wrapper', {fragment: '#wrapper', timeout: 10000});
        $(document).on('pjax:send', function (e) {
            jBlog.pjaxLoading('show');
        });
        $(document).on('pjax:complete', function (e) {
            jBlog.pjaxLoading('hide');
        });
        $(document).on('pjax:end', function (e) {
            var baseURI = e.relatedTarget.baseURI;
            if (baseURI && baseURI.indexOf('.html') == -1) {
                jBlog.current = 'archive';
            }else {
                jBlog.current = 'post';
            }
            jBlog.setPageCurrent();
            jBlog.syncSize();
        });
    },
    initPageParams: function (params) {
        jBlog.current = params.current;
        $('title').text(params.title);
    },
    //外部调用初始化
    init: function (params) {
        jBlog.initParams(params);

        $(window).resize(function () {
            jBlog.syncSize();
        });
        $(window).scroll(function (e) {
            jBlog.scrollCallback();
        });

        $(document).on('click', '.btn-read-mode', function (e) {
            e.preventDefault();
            jBlog.switchReadMode();
        });
        $(document).on('click', '.btn-search', function (e) {
            e.preventDefault();
            jBlog.switchSearch();
        });
        $(document).on('click', '.btn-donate', function (e) {
            e.preventDefault();
            if (jBlog.donateImg != '') {
                jBlog.alert('<h3>扫描二维码打赏</h3><img style="width:160px;background:#fff;" src="' + jBlog.donateImg + '">', 'success', 0);
            } else {
                jBlog.alert('暂未开通打赏功能');
            }
        });
        $(document).on('click', '.btn-like', function () {
            jBlog.ajaxSetLike($(this));
            return false;
        });
        $(document).on('click', '.btn-gotop', function (e) {
            e.preventDefault();
            jBlog.goTop();
        });
        jBlog.syncSize();

        if (jBlog.usePjax) {
            jBlog.initPjax();
        }
    },
    pjaxLoading: function (type) {
        var loading = $('#pjax-loading'), width = 0;
        var progress = function () {
            if (jBlog.loadingShow === true && width < $(window).width()) {
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
            jBlog.loadingShow = true;
            progress();
        } else {
            jBlog.loadingShow = false;
        }
    },
    goTop: function () {
        $("html, body").animate({scrollTop: 0}, 200);
    },
    setPageCurrent: function () {
        if (jBlog.current === 'post' || jBlog.current === 'page') {
            $('#cover').hide();
            $('body').addClass('single');
        } else {
            $('#cover').show();
            $('body').removeClass('single');
        }
        $.each($('.nav-menu a'), function (k, v) {
            if ($(v).attr('href') === window.location.href) {
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
            jBlog.headerShow = (top < 100 || (jBlog.prevTop - top) > 0) ? true : false;
            jBlog.headerToggle();
        }
        jBlog.prevTop = top;
    },
    headerToggle: function () {
        if (jBlog.headerShow) {
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
        if (size > 768 && (jBlog.current != 'post' && jBlog.current != 'page')) {
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
            jBlog.alert('请选择要点赞的文章!', type);
            return false;
        }
        jBlog.alert('多谢支持 ：）');
    },
    switchSearch: function () {	//显示搜索
        var srh = $('#search');
        if (srh.hasClass('active')) {
            srh.removeClass('active');
        } else {
            srh.addClass('active');
        }
    },
    switchReadMode: function () {		//切换显示模式
        var btn = $('.btn-read-mode');
        var next_mode = $('body').hasClass('night-mode') ? 'day' : 'night';
        var mode = next_mode == 'day' ? '' : 'night-mode';
        var icon = next_mode == 'day' ? 'fa fa-sun-o' : 'fa fa-moon-o';
        if (next_mode == 'day') {
            $('body').removeClass('night-mode');
        } else {
            $('body').addClass('night-mode');
        }
        btn.find('i').attr('class', icon);
        jBlog.setCookie('read-mode', next_mode);
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
    setCookie: function (name, value, expires) {
        expires = expires === undefined ? 1 : expires;
        expires = new Date(+new Date + 1000 * 60 * 60 * 24 * expires);
        expires = ';expires=' + expires.toGMTString();
        path = ';path=/';
        document.cookie = jBlog.prefix + name + "=" + escape(value) + expires + path;   //转码并赋值
    }
}