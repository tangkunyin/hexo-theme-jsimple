# JSimple

[![Build Status](https://travis-ci.org/tangkunyin/hexo-theme-jsimple.svg?branch=master)](https://travis-ci.org/tangkunyin/hexo-theme-jsimple)

**JSimple is a responsive blog theme for Hexo which include day-night mode, local search, article view count etc. Inspired by JianShu that in the earliest**.

- [**☞ Preview Demo**](https://shuoit.net) | [**For Chinese click here**](https://github.com/tangkunyin/hexo-theme-jsimple/blob/master/README.zhCN.md)

![JSimple-Snapshot-Macbook Pro15](/source/images/JSimple-Snapshot-Macbook%20Pro15.png)

<!--more-->

## Installation

 1. Get it from GitHub

 ```shell
 $ git clone https://github.com/tangkunyin/hexo-theme-jsimple themes/jsimple
 ```
 2. Enable

 Modify `theme` setting in `_config.yml` to `jsimple`.

 To use of the local search, please add `hexo-generator-search`

 3. Update

 ```shell
 $ cd themes/jsimple
 $ git pull
 ```

## Configurations

For a quick start, see my [Site backup](https://github.com/shuoit/blog) may be more convenient.

### site _config.yml

```yml
# choose your language. default Chinese
language:
    - en
    - zh-cn

# URL （Notice the permalink. Variable timestamp in post.md was added from hexo lib source）
##  Please see the scripts in patch dir for more details
url: https://shuoit.net
root: /
permalink: :category/:entitle-:timestamp.html
permalink_defaults:
  lang: en

# Local search
search:
  path: search.json
  field: all
  content: true
  
# Category alias
default_category: Tech
category_map:
   Tech: tech-notes
tag_map:
  hexo: hexo
```


### theme _config.yml

```yml
# Master information. At the other hand, the fields int post.md(author|avatar|authorLink|authorAbout|authorDesc）also have the same effects
## The priority in article config is higher than theme when you configuring at the same time. This used for multiplayer creation 
webmaster:
  name: Thomas Tang
  avatar: /images/favicon.png
  home: https://shuoit.net
  desc: Senior Chinglish writer and coder😁️️

# Decide whether the 'Content-Security-Policy = upgrade-insecure-requests' will be add in head tag.
csp_enable: false

# Article sort mode: -1(newer first)，1(older first). home_article_shown means paging count
home_page_sort: -1
home_article_shown: 10

# Article sticky top. You need to set top field to your post.md. The larger value of top the front the article.
sticky_top:
  enable: true

# Article category navigation 
menu:
  Tech: tech-notes
  Life: humanities

# Left navigation link. The faName is in FontAwesome styles.
left_nav_menus:
- uri: help
  title: Help
  faName: fa-question-circle
  
  
# Google AdSense. Support auto-ads and manual-unit
adsense:
  enable: false// manual-unit-ads
  auto: false// auto-ads
  client_id:
  archive_id:
  tags_id:    
  post_left_id:
  post_right_id:
  post_bottom_id:


# Only support Disqus and Gitment so far.
comments:
  enable: false
  disqus_shortname:
  gitment:
    repo:
    githubID:
    ClientID:
    ClientSecret:
    lazy: true
```

### Other config


#### Search Module

Because of the search in previous version didn't work well. Such as highlight content, responsive problem in small screen.

So I replace it with `hexo-generator-search`. Thanks for [Next](https://github.com/theme-next/hexo-theme-next) theme.

There are two Chinese articles that told how to create local-search in hexo.

- [hexo-generator-search](https://github.com/wzpan/hexo-generator-search)
- [为 Hexo 博客创建本地搜索引擎](https://liam.page/2017/09/21/local-search-engine-in-Hexo-site/)


#### How sticky top and timestamp works

 I have made some changes in hexo lib source code so that timestamp and sticky datasource could get when hexo-cli generating articles.
 
 From version `0.0.7`, JSimple have been adding `patch` scripts. You need to excute `patch/run.sh` when `node_modules` was deleted.
  
 You have to copy the `patch` dir into your site dir, otherwise sticky top and timestamp in permalink will not work.

#### AdSence

From version `0.0.7`. Google AdSense have been added. If you don't need this, just close it.


#### The other things about JSimple

If you don't understand Chinese. You can translate online by [Google Translate](https://translate.google.com/)  🤣🤣🤣

- [JSimple主题用户指南](https://shuoit.net/others/jsimple-usage-1492480198.html)
- [在hexo博客中打造相对完美的URL](https://shuoit.net/tech-notes/hexo-links-1483800845.html)
- [将Hexo博客url优化进行到底](https://shuoit.net/tech-notes/permalink-optimize-hexo-1528003174.html)
- [Update-for-JSimple-in-Early2019](https://shuoit.net/tech-notes/the-update-for-jsimple-in-early2019-1547728233.html)


## Browser support

![](https://raw.githubusercontent.com/iTimeTraveler/hexo-theme-hipaper/master/source/preview/browser-support.png?raw=true)


## Contributing

All kinds of contributions (enhancements, new features, documentation & code improvements, issues & bugs reporting) are welcome.

Looking forward to your pull request.

> Special thanks to iTimeTraveler and jiangmuzi, who designed the theme [Hipaper](https://github.com/iTimeTraveler/hexo-theme-hipaper) and [JianShu](https://github.com/jiangmuzi/jianshu).


## License

JSimple is under the MIT license. See the [LICENSE](https://github.com/tangkunyin/hexo-theme-jsimple/blob/master/LICENSE) file for details.

## Thanks

[Hexo](https://hexo.io)
[Font Awesome](http://fontawesome.io)


