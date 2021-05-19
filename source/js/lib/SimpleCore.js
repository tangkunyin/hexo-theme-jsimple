/**
 * Zepto扩展
 */
$.fn.scrollTo = function(options) {
        const defaults = {
            toT : 0,    //滚动目标位置
            durTime : 500,  //过渡动画时间
            delay : 30,     //定时器时间
            callback:null   //回调函数
        };
        let opts = $.extend(defaults,options),
            timer = null,
            _this = this,
            curTop = _this.scrollTop(),//滚动条当前的位置
            subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
            index = 0,
            dur = Math.round(opts.durTime / opts.delay),
            smoothScroll = function(t){
                index++;
                let per = Math.round(subTop/dur);
                if(index >= dur) {
                    _this.scrollTop(t);
                    window.clearInterval(timer);
                    if(opts.callback && typeof opts.callback == 'function'){
                        opts.callback();
                    }
                    return;
                } else {
                    _this.scrollTop(curTop + index*per);
                }
            };
        timer = window.setInterval(function(){
            smoothScroll(opts.toT);
        }, opts.delay);
        return _this;
    };
/**
 * Local Search
 * @author https://github.com/theme-next/hexo-theme-next
 */
const LocalSearch = {
    searchPath: '',
    trigger: 'auto',
    topN: '1',
    unescape: false,
    isfetched: false,
    isXml: true,
    initParams (data) {
        LocalSearch.searchPath = data.dbPath;
        LocalSearch.trigger = data.trigger;
        LocalSearch.topN = data.topN;
        LocalSearch.unescape = data.unescape === 'false' ? false : true;
        if (LocalSearch.searchPath.length === 0) {
            LocalSearch.searchPath = "/search.xml";
        } else if (/json$/i.test(LocalSearch.searchPath)) {
            LocalSearch.isXml = false;
        }
    },
    onPopupClose () {
        $('.popup').hide();
        $('#local-search-input').val('');
        $('.search-result-list').remove();
        $('#no-result').remove();
        $(".local-search-pop-overlay").remove();
        $('body').css('overflow', '');
    },
    proceedsearch () {
        $("body").append('<div class="search-popup-overlay local-search-pop-overlay"></div>').css('overflow', 'hidden');
        $('.search-popup-overlay').click(LocalSearch.onPopupClose);
        $('.popup').toggle();
        const $localSearchInput = $('#local-search-input');
        $localSearchInput.attr("autocapitalize", "none");
        $localSearchInput.attr("autocorrect", "off");
        $localSearchInput.focus();
    },
    // search function;
    searchFunc (search_id, content_id) {
        // if loading exists then return.
        if (!$('.search-popup-overlay').is(':visible')) {
            // start loading animation
            $("body").append('<div class="search-popup-overlay local-search-pop-overlay">' +
                '<div id="search-loading-icon">' +
                '<i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>' +
                '</div>' +
                '</div>').css('overflow', 'hidden');
            $("#search-loading-icon").css('margin', '20% auto 0 auto').css('text-align', 'center');
        } else {
            alert("Fetching data...don't worry")
        }
        const input = document.getElementById(search_id);
        const resultContent = document.getElementById(content_id);
        if (!input || !resultContent) {
            console.error('Elements not exists with searchId: '+search_id+', resultContentId: '+content_id);
            return;
        }
        if (LocalSearch.unescape) {
            // ref: https://github.com/ForbesLindesay/unescape-html
            var unescapeHtml = function(html) {
                return String(html)
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, '\'')
                    .replace(/&#x3A;/g, ':')
                    // replace all the other &#x; chars
                    .replace(/&#(\d+);/g, function (m, p) { return String.fromCharCode(p); })
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&amp;/g, '&');
            };
        }
        $.ajax({
            url: LocalSearch.searchPath,
            timeout: 5000,
            dataType: LocalSearch.isXml ? "xml" : "json",
            async: true,
            success (res) {
                // get the contents from search data
                LocalSearch.isfetched = true;
                $('.popup').detach().appendTo('body');
                const datas = LocalSearch.isXml ? $("entry", res).map(function () {
                    return {
                        title: $("title", this).text(),
                        content: $("content", this).text(),
                        url: $("url", this).text()
                    };
                }).get() : res;
                const inputEventFunction = function () {
                    const searchText = input.value.trim().toLowerCase();
                    const keywords = searchText.split(/[\s\-]+/);
                    if (keywords.length > 1) {
                        keywords.push(searchText);
                    }
                    const resultItems = [];
                    if (searchText.length > 0 && Array.isArray(datas)) {
                        for (const data of datas) {
                            if (!data || !data.content) continue;
                            let isMatch = false;
                            let hitCount = 0;
                            let searchTextCount = 0;
                            const title = data.title.trim();
                            const titleInLowerCase = title.toLowerCase();
                            let content = data.content.trim().replace(/<[^>]+>/g, "");
                            if (LocalSearch.unescape && content) {
                                content = unescapeHtml(content);
                            }
                            const contentInLowerCase = content.toLowerCase();
                            const articleUrl = decodeURIComponent(data.url).replace(/\/{2,}/g, '/');
                            let indexOfTitle = [];
                            let indexOfContent = [];
                            // only match articles with not empty titles
                            if (title != '') {
                                keywords.forEach(function (keyword) {
                                    function getIndexByWord(word, text, caseSensitive) {
                                        const wordLen = word.length;
                                        if (wordLen === 0) {
                                            return [];
                                        }
                                        let startPosition = 0, position = [], index = [];
                                        if (!caseSensitive) {
                                            text = text.toLowerCase();
                                            word = word.toLowerCase();
                                        }
                                        while ((position = text.indexOf(word, startPosition)) > -1) {
                                            index.push({position: position, word: word});
                                            startPosition = position + wordLen;
                                        }
                                        return index;
                                    }

                                    indexOfTitle = indexOfTitle.concat(getIndexByWord(keyword, titleInLowerCase, false));
                                    indexOfContent = indexOfContent.concat(getIndexByWord(keyword, contentInLowerCase, false));
                                });
                                if (indexOfTitle.length > 0 || indexOfContent.length > 0) {
                                    isMatch = true;
                                    hitCount = indexOfTitle.length + indexOfContent.length;
                                }
                            }
                            // show search results
                            if (isMatch) {
                                // sort index by position of keyword
                                [indexOfTitle, indexOfContent].forEach(function (index) {
                                    index.sort(function (itemLeft, itemRight) {
                                        if (itemRight.position !== itemLeft.position) {
                                            return itemRight.position - itemLeft.position;
                                        } else {
                                            return itemLeft.word.length - itemRight.word.length;
                                        }
                                    });
                                });

                                // merge hits into slices
                                function mergeIntoSlice(text, start, end, index) {
                                    let item = index[index.length - 1];
                                    let position = item.position;
                                    let word = item.word;
                                    let hits = [];
                                    let  searchTextCountInSlice = 0;
                                    while (position + word.length <= end && index.length != 0) {
                                        if (word === searchText) {
                                            searchTextCountInSlice++;
                                        }
                                        hits.push({position: position, length: word.length});
                                        const wordEnd = position + word.length;

                                        // move to next position of hit

                                        index.pop();
                                        while (index.length != 0) {
                                            item = index[index.length - 1];
                                            position = item.position;
                                            word = item.word;
                                            if (wordEnd > position) {
                                                index.pop();
                                            } else {
                                                break;
                                            }
                                        }
                                    }
                                    searchTextCount += searchTextCountInSlice;
                                    return {
                                        hits: hits,
                                        start: start,
                                        end: end,
                                        searchTextCount: searchTextCountInSlice
                                    };
                                }

                                const slicesOfTitle = [];
                                if (indexOfTitle.length != 0) {
                                    slicesOfTitle.push(mergeIntoSlice(title, 0, title.length, indexOfTitle));
                                }

                                let slicesOfContent = [];
                                while (indexOfContent.length != 0) {
                                    const item = indexOfContent[indexOfContent.length - 1];
                                    const position = item.position;
                                    const word = item.word;
                                    // cut out 100 characters
                                    let start = position - 20;
                                    let end = position + 80;
                                    if (start < 0) {
                                        start = 0;
                                    }
                                    if (end < position + word.length) {
                                        end = position + word.length;
                                    }
                                    if (end > content.length) {
                                        end = content.length;
                                    }
                                    slicesOfContent.push(mergeIntoSlice(content, start, end, indexOfContent));
                                }
                                // sort slices in content by search text's count and hits' count
                                slicesOfContent.sort(function (sliceLeft, sliceRight) {
                                    if (sliceLeft.searchTextCount !== sliceRight.searchTextCount) {
                                        return sliceRight.searchTextCount - sliceLeft.searchTextCount;
                                    } else if (sliceLeft.hits.length !== sliceRight.hits.length) {
                                        return sliceRight.hits.length - sliceLeft.hits.length;
                                    } else {
                                        return sliceLeft.start - sliceRight.start;
                                    }
                                });

                                // select top N slices in content
                                const upperBound = parseInt(LocalSearch.topN);
                                if (upperBound >= 0) {
                                    slicesOfContent = slicesOfContent.slice(0, upperBound);
                                }
                                // highlight title and content

                                function highlightKeyword(text, slice) {
                                    let result = '';
                                    let prevEnd = slice.start;
                                    slice.hits.forEach(function (hit) {
                                        result += text.substring(prevEnd, hit.position);
                                        const end = hit.position + hit.length;
                                        result += '<b class="search-keyword">' + text.substring(hit.position, end) + '</b>';
                                        prevEnd = end;
                                    });
                                    result += text.substring(prevEnd, slice.end);
                                    return result;
                                }

                                let resultItem = '';

                                if (slicesOfTitle.length != 0) {
                                    resultItem += "<li><a href='" + articleUrl + "' class='search-result-title'>" + highlightKeyword(title, slicesOfTitle[0]) + "</a>";
                                } else {
                                    resultItem += "<li><a href='" + articleUrl + "' class='search-result-title'>" + title + "</a>";
                                }

                                slicesOfContent.forEach(function (slice) {
                                    resultItem += "<a href='" + articleUrl + "'>" +
                                        "<p class=\"search-result\">" + highlightKeyword(content, slice) +
                                        "...</p>" + "</a>";
                                });

                                resultItem += "</li>";
                                resultItems.push({
                                    item: resultItem,
                                    searchTextCount: searchTextCount,
                                    hitCount: hitCount,
                                    id: resultItems.length
                                });
                            }
                        }
                    }
                    if (keywords.length === 1 && keywords[0] === "") {
                        resultContent.innerHTML = '<div id="no-result"><i class="fa fa-search fa-5x"></i></div>'
                    } else if (resultItems.length === 0) {
                        resultContent.innerHTML = '<div id="no-result"><i class="fa fa-frown-o fa-5x"></i></div>'
                    } else {
                        resultItems.sort(function (resultLeft, resultRight) {
                            if (resultLeft.searchTextCount !== resultRight.searchTextCount) {
                                return resultRight.searchTextCount - resultLeft.searchTextCount;
                            } else if (resultLeft.hitCount !== resultRight.hitCount) {
                                return resultRight.hitCount - resultLeft.hitCount;
                            } else {
                                return resultRight.id - resultLeft.id;
                            }
                        });
                        let searchResultList = '<ul class=\"search-result-list\">';
                        resultItems.forEach(function (result) {
                            searchResultList += result.item;
                        });
                        searchResultList += "</ul>";
                        resultContent.innerHTML = searchResultList;
                    }
                };

                if ('auto' === LocalSearch.trigger) {
                    input.addEventListener('input', inputEventFunction);
                } else {
                    $('.search-icon').click(inputEventFunction);
                    input.addEventListener('keypress', function (event) {
                        if (event.keyCode === 13) {
                            inputEventFunction();
                        }
                    });
                }
                // remove loading animation
                $(".local-search-pop-overlay").remove();
                $('body').css('overflow', '');
                LocalSearch.proceedsearch();
            },
            error (xhr,status,error) {
                alert(status+', Load error when get '+ LocalSearch.searchPath);
                console.error(error);
                window.location.reload(true);
            }
        });
    },
    doSearch (e) {
        e && e.stopPropagation();
        if (!LocalSearch.isfetched) {
            LocalSearch.searchFunc('local-search-input', 'local-search-result');
        } else {
            LocalSearch.proceedsearch();
        }
    }
};
/**
 * JSimple Theme CoreLib
 * @author tangkunyin 2017/1/25.
 */
const SimpleCore = {
    rootUrl: '',
    buildingTime: new Date(),
    isPost: 'false',
    prevTop: 0,
    headerShow: true,
    snsQRCode: null,
    donateImg: null,
    localSearch: {},
    readMode: 'day',
    initParams (params) {
        SimpleCore.rootUrl = params.rootUrl || location.href;
        SimpleCore.buildingTime = params.buildingTime;
        SimpleCore.isPost = params.isPost;
        SimpleCore.snsQRCode = params.snsQRCode;
        SimpleCore.donateImg = params.donateImg;
        SimpleCore.localSearch = params.localSearch;
        SimpleCore.readMode = params.readMode;
    },
    init (params) {
        SimpleCore.initParams(params);
        LocalSearch.initParams(SimpleCore.localSearch);
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
        $(document).on('click', '#local-search-input-tip', function (e) {
            LocalSearch.doSearch(e);
        });
        $(document).on('click', '.popup-btn-close', function (e) {
            e.preventDefault();
            LocalSearch.onPopupClose();
        });
        $(document).on('click', '.popup', function (e) {
            e.stopPropagation();
        });
        $(document).on('click', '.btn-sns-qr', function (e) {
            e.preventDefault();
            if (SimpleCore.snsQRCode != '') {
                SimpleCore.alert('交个朋友，扫我','<img style="width:180px;background:#fff;" src="' + SimpleCore.snsQRCode + '">');
            } else {
                SimpleCore.alert('未开通社交功能','<h4 style="text-align: center;margin: 0">联系博主试试看 ：）</h4>');
            }
        });
        $(document).on('click', '.btn-thumbs-up', function (e) {
            e.preventDefault();
            if (SimpleCore.donateImg != '') {
                SimpleCore.alert('随意赞赏，谢谢','<img style="width:180px;background:#fff;" src="' + SimpleCore.donateImg + '">');
            } else {
                SimpleCore.alert('未开通赞赏功能','<h4 style="text-align: center;margin: 0">联系博主试试看 ：）</h4>');
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
        SimpleCore.printGreeting();
        SimpleCore.registerHotKeyEvent();
        SimpleCore.setDefaultReadingMode();
    },
    goTop () {
        $("html, body").scrollTo({toT: 0});
    },
    setPageCurrent () {
        if (SimpleCore.isPost === 'true') {
            $('#cover').hide();
            $('body').addClass('single');
        } else {
            $('#cover').show();
            $('body').removeClass('single');
        }
        $.each($('.nav-menu a'), function (k, v) {
            if (v.href === window.location.href || v.href === window.location.href.replace(/\/$/, '')) {
                $(v).addClass('current');
            } else {
                $(v).removeClass('current');
            }
        });
    },
    scrollCallback () {
        const top = document.documentElement.scrollTop
            || document.body.scrollTop
            || 0;
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
    headerToggle () {
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
    syncSize () {	//同步窗口大小
        const pageTitle = $('.page-title');
        const size = $(window).width();
        if (size > 768 && SimpleCore.isPost !== 'true') {
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
    switchSearch () {
        const srh = $('#search');
        if (srh.hasClass('active')) {
            srh.removeClass('active');
        } else {
            srh.addClass('active');
        }
    },
    switchReadMode (mode) {
        let next_mode = $('body').hasClass('night-mode') ? 'day' : 'night';
        if (typeof mode === 'string' && mode.length > 0) {
            next_mode = mode;
        }
        SimpleCore.setLocalData('read-mode', next_mode);
        SimpleCore.changeReadModel();
    },
    changeReadModel () {
        const btn = $('.btn-read-mode');
        if (SimpleCore.getLocalData('read-mode') == 'night') {
            $('body').addClass('night-mode');
            btn.find('i').attr('class', 'fa fa-moon-o');
            $(".cover-img").attr('src', `${SimpleCore.rootUrl}images/cover-night.jpg`);
        } else {
            $('body').removeClass('night-mode');
            btn.find('i').attr('class', 'fa fa-sun-o');
            $(".cover-img").attr('src', `${SimpleCore.rootUrl}images/cover-day.jpg`);
        }
    },
    alert (title,msg) {
        const id = 'notice-' + (new Date().getTime());
        const html = '<div id="' + id + '" class="notice-item">'
            + '<span class="notice-item-close"><i class="fa fa-close"></i></span>'
            + '<p><h3 style="text-align: center;margin:0 0 10px 0">'+title+'</h3>' + msg + '</p></div>';
        const notice = $('#notice');
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
    setLocalData (key, value) {
        if (window.localStorage) {
            window.localStorage.setItem(key, value);
        }
    },
    getLocalData (key) {
        if (window.localStorage) {
            return window.localStorage.getItem(key);
        }
    },
    setBuildingTime () {
        const urodz = new Date(SimpleCore.buildingTime);  //建站时间
        const now = new Date();
        const ile = now.getTime() - urodz.getTime();
        const buildingDays = Math.floor(ile / (1000 * 60 * 60 * 24));
        $('#cpYear').html(now.getFullYear());
        $('#siteBuildingTime').html(buildingDays);
        return buildingDays;
    },
    printGreeting () {
        const asciiTxt = " _   _         _    _              _       _              _        _ \n" +
            "( ) ( )       (_ ) (_ )           ( )  _  ( )            (_ )     ( )\n" +
            "| |_| |   __   | |  | |    _      | | ( ) | |   _    _ __ | |    _| |\n" +
            "|  _  | /'__`\\ | |  | |  /'_`\\    | | | | | | /'_`\\ ( '__)| |  /'_` |\n" +
            "| | | |(  ___/ | |  | | ( (_) )   | (_/ \\_) |( (_) )| |   | | ( (_| |\n" +
            "(_) (_)`\\____)(___)(___)`\\___/'   `\\___x___/'`\\___/'(_)  (___)`\\__,_)\n" +
            "\n已稳定运行" + this.setBuildingTime() + "天，拦截了无数次逗比攻击！🎉🎉🎉\n    ";
        console.log("%c\n"+asciiTxt, "color: #527fe2; font-family:KaiTi;font-size: 16px");
    },
    registerHotKeyEvent(e) {
        $(document).on('keyup', function(event) {
            const shouldDismissSearchPopup = event.key === 'Escape'
                && $('.search-popup').css('display') === 'block';
                if (shouldDismissSearchPopup) {
                    $('.search-popup').hide();
                    $('.search-popup-overlay').remove();
                    $('body').css('overflow', '');
                }
            const shouldShowSearchPopup = event.key === 'Control'
                && $('.search-popup').css('display') === 'none';
                if (shouldShowSearchPopup) {
                    LocalSearch.doSearch(e);
                }
        });
    },
    setDefaultReadingMode() {
        if (!SimpleCore.getLocalData('read-mode')
            && ('day' === SimpleCore.readMode || 'night' === SimpleCore.readMode)) {
            SimpleCore.switchReadMode(SimpleCore.readMode);
        }
    }
};

$(function () {
    window.jsi_config ? SimpleCore.init(window.jsi_config)
     : console.error('JSimple get wrong config: ', window.jsi_config)
});