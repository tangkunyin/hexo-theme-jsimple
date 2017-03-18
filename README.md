# JSimple

[![Build Status](https://travis-ci.org/tangkunyin/hexo-theme-jsimple.svg?branch=master)](https://travis-ci.org/tangkunyin/hexo-theme-jsimple)


**JSimple is a responsive blog theme for Hexo which include day night model,insight search,article view count etc. Inspired by JianShu.com**.

- [**☞ Preview Demo**](https://shuoit.net) | [**For Chinese click here**](https://github.com/tangkunyin/hexo-theme-jsimple/blob/master/README.zhCN.md)

![JSimple-iPhone-Landscape-Night-Demo](/source/images/JSimple-iPhone-Landscape-Night-Demo.jpg)

### Also this video may be vivid

[JSimple-pc-web-demo.mp4](http://7xseox.com1.z0.glb.clouddn.com/shuoit.net-pc-demo.mp4)


<!--more-->

## Installation

 1. Get it from GitHub

 ```shell
 $ git clone https://github.com/tangkunyin/hexo-theme-jsimple themes/jsimple
 ```
 2. Enable

 Modify `theme` setting in `_config.yml` to `jsimple`.

 3. Update

 ```shell
 $ cd themes/jsimple
 $ git pull
 ```


## Configurations

1. favicon

		favicon: favicon.png path

2. cover info config

		coverTitle: your cover title string
		
	There are two kinds of cover image. replace day and night in your theme images dir.

3. Home page sort type and article shown number

		homeArticleShown: 10
		homePageSortType: -1

	type: -1: newer first，1: older first.

4. webmaster info config

		avatar: avatar.png path
		authorName: your name
		authorLink: your website link
		authorAbout: about you link
		authorDesc: you description string

5. your site build time or founded date

		siteBuildingTime: 12/12/2014

6. Independent page of uri please generate yourself

		```
		# Example
		hexo n page about
		```

7. Social info config

		sinaWb: https://weibo.com/tangkunyin
		facebook: https://fackbook.com/tangkunyin
		github: https://github.com/tangkunyin

8. Git-pages server info

		pageServerName: your page server name
		pageServerUrl: page server invite link

9. Top navigate menu name

		menu:
  			category1: category alias1
   			category2: category alias2
   			category3: category alias3


> Name order decide show index.The name also called category alias,so you must set category alias before start server. BTW, `category_map` and `tag_map` field in site `_config.yml` file must one to one correspondence with menus above.


**Comment and CNZZ Analytics config in your site _config.yml, please add them manually**

## Browser support

![](https://raw.githubusercontent.com/iTimeTraveler/hexo-theme-hipaper/master/source/preview/browser-support.png?raw=true)

![JSimple-iPhone-Portrait-Day-Demo](/source/images/JSimple-iPhone-Portrait-Day-Demo.jpg)

## Contributing

All kinds of contributions (enhancements, new features, documentation & code improvements, issues & bugs reporting) are welcome.

Looking forward to your pull request.

> Special thanks to iTimeTraveler and jiangmuzi, who designed the theme [Hipaper](https://github.com/iTimeTraveler/hexo-theme-hipaper) and [JianShu](https://github.com/jiangmuzi/jianshu).


## License

JSimple is under the MIT license. See the [LICENSE](https://github.com/tangkunyin/hexo-theme-jsimple/blob/master/LICENSE) file for details.

## Thanks

[Hexo](https://hexo.io)
[Font Awesome](http://fontawesome.io)
