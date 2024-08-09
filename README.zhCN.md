# JSimple

> 主题样式参考简书早期时候的风格

**适用于Hexo的三栏式主题。支持响应式、站内搜索、主流评论系统、文章浏览统计以及白天和夜间模式**.

[**☞ 一睹为快**](https://tomartisan.com) | [**For English Document click here**](https://github.com/tangkunyin/hexo-theme-jsimple/blob/master/README.md)

![JSimple-Desktop](/source/images/JSimple-Desktop.png)

## 使用简介

### 1. 下载代码到hexo站点的theme文件夹

```bash
cd themes

git clone https://github.com/tangkunyin/hexo-theme-jsimple
```

### 2. 添加必要的依赖

```bash
yarn add hexo-generator-search hexo-generator-sitemap
```

### 3. 站点配置文件，更新主题设置和主题必须的配置

1. 启用新主题：`theme: hexo-theme-jsimple`
2. 配置分类、搜索、站点地图等设置项（下文详述）


### 4. 运行测试

```bash
yarn run server

or

hexo s
```


## 配置说明

### 站点配置

```yml
# 启用主题
theme: hexo-theme-jsimple

# 本地搜索配置，如果此项不配置。主题则无法使用搜索功能
search:
  path: search.json
  field: all
  content: true
  

# 网站地图配置
## Doc: https://github.com/hexojs/hexo-generator-sitemap#readme
sitemap:
  rel: true
  tags: true
  categories: true
  path:
    - sitemap.xml
    - sitemap.txt

# 分类配置，此处需要和主题中一一对应。文章分类不建议设置过多
default_category: top1
category_map:
  顶部菜单1: top1
  顶部菜单2: top2
  顶部菜单3: top3
  顶部菜单4: top4
```

### 主题配置

在主题目录下的`_config.yml`中，设置站点信息、三方功能增强等。
由于 [_config.yml](https://github.com/tangkunyin/hexo-theme-jsimple/blob/master/_config.yml) 文件每一项头部均有说明，配置一看就明白了，此处就不再赘述。

**要注意的是：对于站点统计和评论，仅支持Google和Disqus。因为就不打算支持别的，所以请勿提交这方面的PR或ISSUES**，像国内的备案号或其他模块更不会支持，有需要的朋友请自行解决。

> PS：目前支持的功能基本上能完美覆盖正常使用，因此这或许是继上一次以来的最后一波更新。且用，且珍惜！

![JSimple-Desktop](/source/images/pagespeed-test.png)

### 其他

#### 搜索模块

![JSimple-Desktop](/source/images/JSimple-Desktop-With-LocalSearch.png)

鉴于旧版本搜索有样式问题，另外检索词并不能匹配文章，也不能突出颜色。所以新版直接换成了`hexo-generator-search`

- [hexo-generator-search](https://github.com/wzpan/hexo-generator-search)
- [为 Hexo 博客创建本地搜索引擎](https://liam.page/2017/09/21/local-search-engine-in-Hexo-site/)


#### AdSence广告

从`0.0.7`版本开始，新增了广告位。为什么是AdSence？第一，无需备案；第二，覆盖范围广。此功能需要申请账户。具体谷歌解决


#### 主题配置指南相关

其中关于配置分类别名以及自定义文章链接，请看如下文章操作：

- [JSimple主题用户指南](https://tomartisan.com/groceries/jsimple-usage/)
- [在hexo博客中打造相对完美的URL](https://tomartisan.com/groceries/hexo-perfect-link/)
- [将Hexo博客url优化进行到底](https://tomartisan.com/groceries/permalink-optimize-hexo/)
- [Update-for-JSimple-in-Early2019](https://tomartisan.com/groceries/the-update-for-jsimple-in-early2019/)

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

