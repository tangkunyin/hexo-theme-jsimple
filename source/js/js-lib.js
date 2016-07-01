/*! NProgress (c) 2013, Rico Sta. Cruz http://ricostacruz.com/nprogress */
(function(factory){if(typeof module==="function"){module.exports=factory(this.jQuery||require("jquery"))}else{if(typeof define==="function"&&define.amd){define(["js-lib"],function($){return factory($)})}else{this.NProgress=factory(this.jQuery)}}})(function($){var NProgress={};NProgress.version="0.1.2";var Settings=NProgress.settings={minimum:0.08,easing:"ease",positionUsing:"",speed:200,trickle:true,trickleRate:0.02,trickleSpeed:800,showSpinner:true,template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};NProgress.configure=function(options){$.extend(Settings,options);return this};NProgress.status=null;NProgress.set=function(n){var started=NProgress.isStarted();n=clamp(n,Settings.minimum,1);NProgress.status=(n===1?null:n);var $progress=NProgress.render(!started),$bar=$progress.find('[role="bar"]'),speed=Settings.speed,ease=Settings.easing;$progress[0].offsetWidth;$progress.queue(function(next){if(Settings.positionUsing===""){Settings.positionUsing=NProgress.getPositioningCSS()}$bar.css(barPositionCSS(n,speed,ease));if(n===1){$progress.css({transition:"none",opacity:1});$progress[0].offsetWidth;setTimeout(function(){$progress.css({transition:"all "+speed+"ms linear",opacity:0});setTimeout(function(){NProgress.remove();next()},speed)},speed)}else{setTimeout(next,speed)}});return this};NProgress.isStarted=function(){return typeof NProgress.status==="number"};NProgress.start=function(){if(!NProgress.status){NProgress.set(0)}var work=function(){setTimeout(function(){if(!NProgress.status){return}NProgress.trickle();work()},Settings.trickleSpeed)};if(Settings.trickle){work()}return this};NProgress.done=function(force){if(!force&&!NProgress.status){return this}return NProgress.inc(0.3+0.5*Math.random()).set(1)};NProgress.inc=function(amount){var n=NProgress.status;if(!n){return NProgress.start()}else{if(typeof amount!=="number"){amount=(1-n)*clamp(Math.random()*n,0.1,0.95)}n=clamp(n+amount,0,0.994);return NProgress.set(n)}};NProgress.trickle=function(){return NProgress.inc(Math.random()*Settings.trickleRate)};(function(){var initial=0,current=0;NProgress.promise=function($promise){if(!$promise||$promise.state()=="resolved"){return this}if(current==0){NProgress.start()}initial++;current++;$promise.always(function(){current--;if(current==0){initial=0;NProgress.done()}else{NProgress.set((initial-current)/initial)}});return this}})();NProgress.render=function(fromStart){if(NProgress.isRendered()){return $("#nprogress")}$("html").addClass("nprogress-busy");var $el=$("<div id='nprogress'>").html(Settings.template);var perc=fromStart?"-100":toBarPerc(NProgress.status||0);$el.find('[role="bar"]').css({transition:"all 0 linear",transform:"translate3d("+perc+"%,0,0)"});if(!Settings.showSpinner){$el.find('[role="spinner"]').remove()}$el.appendTo(document.body);return $el};NProgress.remove=function(){$("html").removeClass("nprogress-busy");$("#nprogress").remove()};NProgress.isRendered=function(){return($("#nprogress").length>0)};NProgress.getPositioningCSS=function(){var bodyStyle=document.body.style;var vendorPrefix=("WebkitTransform" in bodyStyle)?"Webkit":("MozTransform" in bodyStyle)?"Moz":("msTransform" in bodyStyle)?"ms":("OTransform" in bodyStyle)?"O":"";if(vendorPrefix+"Perspective" in bodyStyle){return"translate3d"}else{if(vendorPrefix+"Transform" in bodyStyle){return"translate"}else{return"margin"}}};function clamp(n,min,max){if(n<min){return min}if(n>max){return max}return n}function toBarPerc(n){return(-1+n)*100}function barPositionCSS(n,speed,ease){var barCSS;if(Settings.positionUsing==="translate3d"){barCSS={transform:"translate3d("+toBarPerc(n)+"%,0,0)"}}else{if(Settings.positionUsing==="translate"){barCSS={transform:"translate("+toBarPerc(n)+"%,0)"}}else{barCSS={"margin-left":toBarPerc(n)+"%"}}}barCSS.transition="all "+speed+"ms "+ease;return barCSS}return NProgress});
//----------------------------  custom js codeing -----------
// Detect window size, if less than 1280px add class 'mobile' to sidebar therefore it will be auto hide when trigger the pjax request in small screen devices.
if ($(window).width() <= 1280) {
    $('#sidebar').addClass('mobile')
}

// Variables
var sidebar    = $('#sidebar'),
    container  = $('#post'),
    content    = $('#pjax'),
    button     = $('#icon-arrow'),
    main       = $('#post__content')

function titleClick(){
    $(".pl__all").unbind("click");
    $(".pl__all").bind("click",function(){
        NProgress.start();
    });
}
$(document).pjax('.pl__all', '#post__content', {fragment:'#post__content', timeout:3000});
$(document).on({
    'pjax:click': function() {
      NProgress.start();
      main.removeClass('fadeIn');
      console.log("pjax",main);
    },
    'pjax:end': function() {
      afterPjax();
      NProgress.done();
      main.scrollTop(0).addClass('fadeIn');
      sidebar.add(sidebar).removeClass('open');

    }
  });
$().ready(function(){
   // titleClick();
    afterPjax();
    NProgress.done();
    hightLightCode();

    $("#search-input").unbind("keydown");
    $("#search-input").bind("keydown",function(event){
        if (event.keyCode == "13") {
            var keywords = $.trim($("#search-input").val());
            if (keywords != "") {
              window.location.href = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=site%3Ashuoit.net%20"+keywords;
            }
            return false;
        }
    });
});

function hightLightCode(){
  hljs.configure({useBR: true});
  $('figure.highlight').each(function(i, block) {
    hljs.highlightBlock(block);
  });
}

// Tags switcher
var clickHandler = function(id) {
    return function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('.pl__all').hide();
        $('.' + id).delay(50).fadeIn(350);
    }
};

$('#tags__ul li').each(function(index){
    $('#' + $(this).attr('id')).on('click', clickHandler($(this).attr('id')));
});

// If sidebar has class 'mobile', hide it after clicking.
$('.pl__all').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    if (sidebar.hasClass('mobile')) {
        $('#sidebar, #pjax, #icon-arrow').addClass('fullscreen');
    }
});

// Enable fullscreen.
$('#js-fullscreen').on('click', function() {
    if (button.hasClass('fullscreen')) {
        sidebar.removeClass('fullscreen');
        button.removeClass('fullscreen');
        content.delay(300).queue(function(){
            $(this).removeClass('fullscreen').dequeue();
        });
    } else {
        sidebar.addClass('fullscreen');
        button.addClass('fullscreen');
        content.delay(200).queue(function(){
            $(this).addClass('fullscreen').dequeue();
        });
    }
});

$('#mobile-avatar').on('click', function(){
    $('#sidebar, #pjax, #icon-arrow').addClass('fullscreen');
});

function afterPjax() {

    // Open links in new tab
    $('#post__content a').attr('target','_blank');

    // Generate post TOC for h1 h2 and h3
    var toc = $('#post__toc-ul');
    // Empty TOC and generate an entry for h1
    toc.empty().append('<li class="post__toc-li post__toc-h1"><a href="#post__title" class="js-anchor-link">' + $('#post__title').text() + '</a></li>');

    // Generate entries for h2 and h3
    $('#post__content').children('h2,h3').each(function() {
        // Generate random ID for each heading
        $(this).attr('id', function() {
            var ID = "",
                alphabet = "abcdefghijklmnopqrstuvwxyz";

            for(var i=0; i < 5; i++) {
                ID += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            }
            return ID;
        });

        if ($(this).prop("tagName") == 'H2') {
            toc.append('<li class="post__toc-li post__toc-h2"><a href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
        } else {
            toc.append('<li class="post__toc-li post__toc-h3"><a href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
        }
    });

    // Smooth scrolling
    $('.js-anchor-link').on('click', function() {
        var target = $(this.hash);
        container.animate({scrollTop: target.offset().top + container.scrollTop() - 70}, 500, function() {
            target.addClass('flash').delay(700).queue(function() {
                $(this).removeClass('flash').dequeue();
            });
        });
    });
};
/* 为保持移动端适配，捐赠图片大小默认为：400px * 500px ，过大产生的问题你懂的... */
function donate(){
    $.getJSON('/js/donates.json', function(json){
      layer.photos({
          photos: json
      });
    });
}
