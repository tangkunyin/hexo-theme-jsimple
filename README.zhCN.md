# JSimple

[![Build Status](https://travis-ci.org/tangkunyin/hexo-theme-jsimple.svg?branch=master)](https://travis-ci.org/tangkunyin/hexo-theme-jsimple)


**适用于Hexo的三栏简书式主题。支持响应式、站内搜索、主流评论系统、文章浏览统计以及白天和夜间模式**.

[**☞ 一睹为快**](https://shuoit.net) | [**For English Document click here**](https://github.com/tangkunyin/hexo-theme-jsimple/blob/master/README.md)

![JSimple-Snapshot-Macbook Pro15](/source/images/JSimple-Snapshot-Macbook%20Pro15.png)

<!--more-->


## 安装步骤

1. 从 GitHub 下载代码

```shell
$ git clone https://github.com/tangkunyin/hexo-theme-jsimple themes/jsimple
```
2. 去主题中开启

在`_config.yml`中更改 `theme` 字段为 `jsimple`.

请在站点配置文件中，手动添加依赖： `hexo-generator-search` ，搜索会用到此

3. 更新主题

```shell
$ cd themes/jsimple
$ git pull
```


## 配置

便于快速上手, 直接看我的 [网站备份](https://github.com/shuoit/blog) 可能更方便，有朋友下载主题使用报错，看那里最直接。

### 站点配置

```yml
# 语言配置
language:
    - zh-cn
    - en

# URL （注意 permalink 格式。其中timestamp是改了源码加上的，具体参见patch目录文件）
url: https://shuoit.net
root: /
permalink: :category/:entitle-:timestamp.html
permalink_defaults:
  lang: en

# 搜索配置
search:
  path: search.json
  field: all
  content: true
  
# 分类和标签别名
default_category: 技术
category_map:
   技术: tech-notes
tag_map:
  hexo: hexo
```


### 主题配置

```yml
# 作者信息。文章页同样有配置字段：(author|avatar|authorLink|authorAbout|authorDesc），同时配置时，文章页的会优先于主题。当多人创作时，这个配置会很有用
webmaster:
  name: 纠结伦
  avatar: /images/favicon.png
  home: https://shuoit.net
  desc: 一个搬🧱的劳斯基😁️️

# 内容安全策略。 true时，会在网页头部增加一行：Content-Security-Policy = upgrade-insecure-requests。会将不是https的资源自动提升为https
csp_enable: false

# 文章排序模式: -1新的靠前，1旧的靠前。home_article_shown是每一页显示的文章数量（分页条数）
home_page_sort: -1
home_article_shown: 10

# 文章置顶功能。开启后同时需要再文章种配置top字段，数字越大，越靠前
sticky_top:
  enable: true

# 文章分类导航  
menu:
  技术: tech-notes
  人文: humanities

# 左侧自定义导航。图标是FontAwesome名称，不支持的请更换内置的FontAwesome字体库
left_nav_menus:
- uri: help
  title: 帮助
  faName: fa-question-circle
  
  
# Google AdSense. 支持手动位置，即内置固定位置广告。还有自动广告，自动广告是否显示、显示在哪，由谷歌决定，因此你如果觉得手动广告不爽，可是用自动模式
adsense:
  enable: false     // 手动广告开关
  auto: false       // 自动广告位开关 
  client_id:
  archive_id:       // 归档页广告
  tags_id:          // 标签页广告
  post_left_id:    // 文章页左侧，竖条横幅
  post_right_id:   // 文章页右侧，竖条横幅
  post_bottom_id:  // 文章页评论上边，竖条横幅


# 评论支持 Disqus和Gitment
comments:
  enable: false     // 总开关
  disqus_shortname:
  gitment:
    repo:
    githubID:
    ClientID:
    ClientSecret:
    lazy: true
```

### 其他配置说明


#### 搜索模块

鉴于旧版本搜索有样式问题，另外检索词并不能匹配文章，也不能突出颜色。所以新版直接换成了`hexo-generator-search`

- [hexo-generator-search](https://github.com/wzpan/hexo-generator-search)
- [为 Hexo 博客创建本地搜索引擎](https://liam.page/2017/09/21/local-search-engine-in-Hexo-site/)


#### 置顶和时间戳数据源处理

 从`0.0.7`版本开始，增加了`patch`脚本。某些不适合PR的改动，就自己改了源码，当`node_modules`被删后，需要手动执行一下`patch/run.sh`
 
 主题安装后，请把`patch`文件夹复制到站点根目录。一定要执行一次，否则置顶功能和时间戳会有问题

#### AdSence广告

从`0.0.7`版本开始，新增了广告位。为什么是AdSence？第一，无需备案；第二，覆盖范围广。此功能需要申请账户。具体谷歌解决


#### 主题配置指南相关

其中关于配置分类别名以及自定义文章链接，请看如下文章操作：

- [JSimple主题用户指南](https://shuoit.net/others/jsimple-usage-1492480198.html)
- [在hexo博客中打造相对完美的URL](https://shuoit.net/tech-notes/hexo-links-1483800845.html)
- [将Hexo博客url优化进行到底](https://shuoit.net/tech-notes/permalink-optimize-hexo-1528003174.html)
- [Update-for-JSimple-in-Early2019](https://shuoit.net/tech-notes/the-update-for-jsimple-in-early2019-1547728233.html)


## 浏览器支持

![](https://raw.githubusercontent.com/iTimeTraveler/hexo-theme-hipaper/master/source/preview/browser-support.png?raw=true)


## 贡献

啥都不说了，喜欢就点赞。欢迎`PR`。已知代码高亮不是太完美，强迫症可以试试下边的主题...

> 特别感谢 `iTimeTraveler` 和 `jiangmuzi`, 他们提供了原型 [Hipaper](https://github.com/iTimeTraveler/hexo-theme-hipaper)、 [JianShu](https://github.com/jiangmuzi/jianshu).


## 鸣谢

[Hexo](https://hexo.io)
[Font Awesome](http://fontawesome.io)

## License

JSimple is under the MIT license. See the [LICENSE](https://github.com/tangkunyin/hexo-theme-jsimple/blob/master/LICENSE) file for details.




