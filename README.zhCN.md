# JSimple

[![Build Status](https://travis-ci.org/tangkunyin/hexo-theme-jsimple.svg?branch=master)](https://travis-ci.org/tangkunyin/hexo-theme-jsimple)


**适用于Hexo的三栏简书式主题。支持响应式、站内搜索、多说评论、文章浏览统计以及白天和夜间模式**.

- [**☞ 一睹为快**](https://shuoit.net) | [**For English Document click here**](https://github.com/tangkunyin/hexo-theme-jsimple/blob/master/README.md)

![JSimple-iPhone-Landscape-Night-Demo](/source/images/JSimple-iPhone-Landscape-Night-Demo.jpg)

### 下边这个视频更生动精彩

[JSimple-pc-web-demo.mp4](http://7xseox.com1.z0.glb.clouddn.com/shuoit.net-pc-demo.mp4)

<!--more-->

## 安装步骤

 1. 从 GitHub 下载代码

 ```shell
 $ git clone https://github.com/tangkunyin/hexo-theme-jsimple themes/jsimple
 ```
 2. 去主题中开启

 在`_config.yml`中更改 `theme` 字段为 `jsimple`.

 3. 更新主题

 ```shell
 $ cd themes/jsimple
 $ git pull
 ```


## 配置

1. favicon

		favicon: favicon.png path

2. 封面图和标题配置

		coverTitle: your cover title string
		
	有两种封面，分别是白天和夜间模式。对应的你只需要将主题文件夹下的相关图片换成你喜欢的就可以了

3. 首页文档展示顺序和展示数目

		homeArticleShown: 10
		homePageSortType: -1

	type: -1: 最新的在前，1: 最旧的在前

4. 网站管理者信息，这些信息将显示在文章头部

		avatar: avatar.png path
		authorName: your name
		authorLink: your website link
		authorAbout: about you link
		authorDesc: you description string

5. 网站建立时间，来纪念网站活了多久

		siteBuildingTime: 12/12/2014

6. 独立页面链接，请自行生成，如不合适请自行修改

		```
		# 例如：
		hexo n page about
		```

7. 社交信息

		sinaWb: https://weibo.com/tangkunyin
		facebook: https://fackbook.com/tangkunyin
		github: https://github.com/tangkunyin

8. 托管服务器信息

		pageServerName: your page server name
		pageServerUrl: page server invite link

9. 顶部导航菜单名称配置

		menu:
  			分类1: 分类别名1
   			分类2: 分类别名2
   			分类3: 分类别名3


> 名称的顺序决定在首页的展示顺序，因此在你启动网页服务器时，请先设置网站分类、标签的别名。具体字段是`category_map`和 `tag_map`,别名必须和这里的菜单设置一致。否则访问将出现异常。

  评论(`仅支持disqus`)和统计的配置直接写在_config.yml，请自行添加`disqus_shortname`和`cnzz_siteid`

## 浏览器支持

![](https://raw.githubusercontent.com/iTimeTraveler/hexo-theme-hipaper/master/source/preview/browser-support.png?raw=true)

![JSimple-iPhone-Portrait-Day-Demo](/source/images/JSimple-iPhone-Portrait-Day-Demo.jpg)

## 贡献

啥都不说了，喜欢就点赞。欢迎`PR`。已知代码高亮不是太完美，强迫症可以试试下边的主题...

> 特别感谢 `iTimeTraveler` 和 `jiangmuzi`, 他们提供了原型 [Hipaper](https://github.com/iTimeTraveler/hexo-theme-hipaper)、 [JianShu](https://github.com/jiangmuzi/jianshu).


## 乌谢

[Hexo](https://hexo.io)
[Font Awesome](http://fontawesome.io)

## License

JSimple is under the MIT license. See the [LICENSE](https://github.com/tangkunyin/hexo-theme-jsimple/blob/master/LICENSE) file for details.
