/**
 * Created by tangkunyin on 2017/1/25.
 */
var SimpleCore = {
    buildingTime: new Date(),
    current: null,
    prevTop: 0,
    headerShow: true,
    donateImg: null,
    initParams: function (params) {
        SimpleCore.buildingTime = params.buildingTime;
        SimpleCore.current = params.current;
        SimpleCore.donateImg = params.donateImg;
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
                SimpleCore.alert('小奖赏激发大创造','<img style="width:160px;background:#fff;" src="' + SimpleCore.donateImg + '">');
            } else {
                SimpleCore.alert('暂未开通打赏功能','<h4 style="text-align: center;margin: 0">联系博主试试看 ：）</h4>');
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
/**
 * Insight search plugin
 * @author PPOffice { @link https://github.com/ppoffice }
 */
(function ($, CONFIG) {
    var $main = $('.ins-search');
    var $input = $main.find('.ins-search-input');
    var $wrapper = $main.find('.ins-section-wrapper');
    var $container = $main.find('.ins-section-container');
    $main.parent().remove('.ins-search');
    $('body').append($main);

    function section (title) {
        return $('<section>').addClass('ins-section')
            .append($('<header>').addClass('ins-section-header').text(title));
    }

    function searchItem (icon, title, slug, preview, url) {
        return $('<div>').addClass('ins-selectable').addClass('ins-search-item')
            .append($('<header>').append($('<i>').addClass('fa').addClass('fa-' + icon)).append(title != null && title != '' ? title : CONFIG.TRANSLATION['UNTITLED'])
                .append(slug ? $('<span>').addClass('ins-slug').text(slug) : null))
            .append(preview ? $('<p>').addClass('ins-search-preview').text(preview) : null)
            .attr('data-url', url);
    }

    function sectionFactory (type, array) {
        var sectionTitle;
        var $searchItems;
        if (array.length === 0) return null;
        sectionTitle = CONFIG.TRANSLATION[type];
        switch (type) {
            case 'POSTS':
            case 'PAGES':
                $searchItems = array.map(function (item) {
                    // Use config.root instead of permalink to fix url issue
                    return searchItem('file', item.title, null, item.text.slice(0, 150), CONFIG.ROOT_URL + item.path);
                });
                break;
            case 'CATEGORIES':
            case 'TAGS':
                $searchItems = array.map(function (item) {
                    return searchItem(type === 'CATEGORIES' ? 'folder' : 'tag', item.name, item.slug, null, item.permalink);
                });
                break;
            default:
                return null;
        }
        return section(sectionTitle).append($searchItems);
    }

    function extractToSet (json, key) {
        var values = {};
        var entries = json.pages.concat(json.posts);
        entries.forEach(function (entry) {
            if (entry[key]) {
                entry[key].forEach(function (value) {
                    values[value.name] = value;
                });
            }
        });
        var result = [];
        for (var key in values) {
            result.push(values[key]);
        }
        return result;
    }

    function parseKeywords (keywords) {
        return keywords.split(' ').filter(function (keyword) {
            return !!keyword;
        }).map(function (keyword) {
            return keyword.toUpperCase();
        });
    }

    /**
     * Judge if a given post/page/category/tag contains all of the keywords.
     * @param Object            obj     Object to be weighted
     * @param Array<String>     fields  Object's fields to find matches
     */
    function filter (keywords, obj, fields) {
        var result = false;
        var keywordArray = parseKeywords(keywords);
        var containKeywords = keywordArray.filter(function (keyword) {
            var containFields = fields.filter(function (field) {
                if (!obj.hasOwnProperty(field))
                    return false;
                if (obj[field].toUpperCase().indexOf(keyword) > -1)
                    return true;
            });
            if (containFields.length > 0)
                return true;
            return false;
        });
        return containKeywords.length === keywordArray.length;
    }

    function filterFactory (keywords) {
        return {
            POST: function (obj) {
                return filter(keywords, obj, ['title', 'text']);
            },
            PAGE: function (obj) {
                return filter(keywords, obj, ['title', 'text']);
            },
            CATEGORY: function (obj) {
                return filter(keywords, obj, ['name', 'slug']);
            },
            TAG: function (obj) {
                return filter(keywords, obj, ['name', 'slug']);
            }
        };
    }

    /**
     * Calculate the weight of a matched post/page/category/tag.
     * @param Object            obj     Object to be weighted
     * @param Array<String>     fields  Object's fields to find matches
     * @param Array<Integer>    weights Weight of every field
     */
    function weight (keywords, obj, fields, weights) {
        var value = 0;
        parseKeywords(keywords).forEach(function (keyword) {
            var pattern = new RegExp(keyword, 'img'); // Global, Multi-line, Case-insensitive
            fields.forEach(function (field, index) {
                if (obj.hasOwnProperty(field)) {
                    var matches = obj[field].match(pattern);
                    value += matches ? matches.length * weights[index] : 0;
                }
            });
        });
        return value;
    }

    function weightFactory (keywords) {
        return {
            POST: function (obj) {
                return weight(keywords, obj, ['title', 'text'], [3, 1]);
            },
            PAGE: function (obj) {
                return weight(keywords, obj, ['title', 'text'], [3, 1]);
            },
            CATEGORY: function (obj) {
                return weight(keywords, obj, ['name', 'slug'], [1, 1]);
            },
            TAG: function (obj) {
                return weight(keywords, obj, ['name', 'slug'], [1, 1]);
            }
        };
    }

    function search (json, keywords) {
        var WEIGHTS = weightFactory(keywords);
        var FILTERS = filterFactory(keywords);
        var posts = json.posts;
        var pages = json.pages;
        var tags = extractToSet(json, 'tags');
        var categories = extractToSet(json, 'categories');
        return {
            posts: posts.filter(FILTERS.POST).sort(function (a, b) { return WEIGHTS.POST(b) - WEIGHTS.POST(a); }).slice(0, 5),
            pages: pages.filter(FILTERS.PAGE).sort(function (a, b) { return WEIGHTS.PAGE(b) - WEIGHTS.PAGE(a); }).slice(0, 5),
            categories: categories.filter(FILTERS.CATEGORY).sort(function (a, b) { return WEIGHTS.CATEGORY(b) - WEIGHTS.CATEGORY(a); }).slice(0, 5),
            tags: tags.filter(FILTERS.TAG).sort(function (a, b) { return WEIGHTS.TAG(b) - WEIGHTS.TAG(a); }).slice(0, 5)
        };
    }

    function searchResultToDOM (searchResult) {
        $container.empty();
        for (var key in searchResult) {
            $container.append(sectionFactory(key.toUpperCase(), searchResult[key]));
        }
    }

    function scrollTo ($item) {
        if ($item.length === 0) return;
        var wrapperHeight = $wrapper[0].clientHeight;
        var itemTop = $item.position().top - $wrapper.scrollTop();
        var itemBottom = $item[0].clientHeight + $item.position().top;
        if (itemBottom > wrapperHeight + $wrapper.scrollTop()) {
            $wrapper.scrollTop(itemBottom - $wrapper[0].clientHeight);
        }
        if (itemTop < 0) {
            $wrapper.scrollTop($item.position().top);
        }
    }

    function selectItemByDiff (value) {
        var $items = $.makeArray($container.find('.ins-selectable'));
        var prevPosition = -1;
        $items.forEach(function (item, index) {
            if ($(item).hasClass('active')) {
                prevPosition = index;
                return;
            }
        });
        var nextPosition = ($items.length + prevPosition + value) % $items.length;
        $($items[prevPosition]).removeClass('active');
        $($items[nextPosition]).addClass('active');
        scrollTo($($items[nextPosition]));
    }

    function gotoLink ($item) {
        if ($item && $item.length) {
            location.href = $item.attr('data-url');
        }
    }

    $.getJSON(CONFIG.CONTENT_URL, function (json) {
        if (location.hash.trim() === '#ins-search') {
            $main.addClass('show');
        }
        $input.on('input', function () {
            var keywords = $(this).val();
            searchResultToDOM(search(json, keywords));
        });
        $input.trigger('input');
    });


    $(document).on('click focus', '.search-field', function () {
        $main.addClass('show');
        $main.find('.ins-search-input').focus();
    }).on('click focus', '.search-form-submit', function () {
        $main.addClass('show');
        $main.find('.ins-search-input').focus();
    }).on('click', '.ins-search-item', function () {
        gotoLink($(this));
    }).on('click', '.ins-close', function () {
        $main.removeClass('show');
    }).on('keydown', function (e) {
        if (!$main.hasClass('show')) return;
        switch (e.keyCode) {
            case 27: // ESC
                $main.removeClass('show'); break;
            case 38: // UP
                selectItemByDiff(-1); break;
            case 40: // DOWN
                selectItemByDiff(1); break;
            case 13: //ENTER
                gotoLink($container.find('.ins-selectable.active').eq(0)); break;
        }
    });
})(jQuery, window.INSIGHT_CONFIG);