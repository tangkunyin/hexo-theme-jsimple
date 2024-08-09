# JSimple

> The style of this theme is inspired by the earlier stage of Jianshu.com

**JSimple is a responsive blog theme for Hexo, including local search, day-night mode, article view count, etc.**.

- [**☞ Preview Demo**](https://tomartisan.com) | [**For Chinese click here**](https://github.com/tangkunyin/hexo-theme-jsimple/blob/master/README.zhCN.md)

![JSimple-Desktop](/source/images/JSimple-Desktop.png)


## Usage

### 1. Download it to the theme folder of Hexo site

```bash
cd themes

git clone https://github.com/tangkunyin/hexo-theme-jsimple
```
 
### 2. Add dependencies for runtime

```bash
yarn add hexo-generator-search hexo-generator-sitemap
```

### 3. Configurations for site and theme

1. Enable new theme: `theme: hexo-theme-jsimple`
2. Configure categories, local-search, site-map

#### Config Details

##### For Site

```yml
# Enable theme
theme: hexo-theme-jsimple

# Enable local search, you must do this, otherwise it will not work for search(when press 'Shift' key)
search:
  path: search.json
  field: all
  content: true
  

# Sitemap config. It's not necessary.
## Doc: https://github.com/hexojs/hexo-generator-sitemap#readme
sitemap:
  rel: true
  tags: true
  categories: true
  path:
    - sitemap.xml
    - sitemap.txt

# Category settings, need to correspond one-to-one in the theme settings. It is not recommended to have too many article categories
default_category: top1
category_map:
  顶部菜单1: top1
  顶部菜单2: top2
  顶部菜单3: top3
  顶部菜单4: top4
```


##### For theme

Config file under the theme folder, also named `_config.yml`. We can put site info, and third extensions in it.

**Note: For site statistics and comments, only Google and Disqus are supported, and since there is no intention to support anything else, please do not submit PRs or ISSUES for this**, if you need other features, just do it yourself.

> PS: The current version brings many updates and optimizations, enough to cover most application scenarios. so use it and cherish it, maybe the last update.

![JSimple-Desktop](/source/images/pagespeed-test.png)

## Other notes

#### Local Search

![JSimple-Desktop](/source/images/JSimple-Desktop-With-LocalSearch.png)

Because the search in the previous version didn't work well. Such as highlighting content, and responsive problems on small screens.

So I replace it with `hexo-generator-search`. Thanks for [Next](https://github.com/theme-next/hexo-theme-next) theme.

There are two Chinese articles that told how to create local-search in Hexo.

- [hexo-generator-search](https://github.com/wzpan/hexo-generator-search)
- [为 Hexo 博客创建本地搜索引擎](https://liam.page/2017/09/21/local-search-engine-in-Hexo-site/)


#### AdSence

From version `0.0.7`. Google AdSense has been added. If you don't need this, just close it.


#### Something about Hexo optimizations

> I have written some posts for optimizing Hexo usage, if need please refer below articles

- [JSimple主题用户指南](https://tomartisan.com/groceries/jsimple-usage/)
- [在hexo博客中打造相对完美的URL](https://tomartisan.com/groceries/hexo-perfect-link/)
- [将Hexo博客url优化进行到底](https://tomartisan.com/groceries/permalink-optimize-hexo/)
- [Update-for-JSimple-in-Early2019](https://tomartisan.com/groceries/the-update-for-jsimple-in-early2019/)

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


