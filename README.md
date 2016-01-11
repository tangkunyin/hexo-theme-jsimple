# hexo-theme-ttstyle

> 此主题根据`Jekyll`版本的`闫肃博客的3-Jekyll `移植并修改的。感谢[闫肃的博客](http://yansu.org/)

# 主题特点
1. 三栏式主题，支持全屏浏览、目录浏览。页面具有自适应性，微信内也可完美支持；
2. 支持SEO关键字描述及标题设置；
3. 默认百度统计(异步)、多说评论组件，内置5套代码高亮样式；
4. 提供WebFont自定义修改
5. 增加阅读打赏功能，默认支持微信和支付宝二维码捐赠。

# 安装与使用

### 安装主题
你可使用`git clone https://github.com/tangkunyin/hexo-theme-ttstyle.git`命令将本项目下载到你本地。然后复制到`hexo`主题目录，改下总配置文件`_config.yml`

### 配置主题
1.使用别名和时间戳作为文章永久访问链接(因为`title`配置会产生中文URL，`_id`又是随机的。所有很不爽):`permalink: :catAlias/:timestamp.html`

2.主题左侧导航栏使用分类目录，因此你需要在`aricleName.md`中加入`categories`

3.关键字和文章描述也是一样，需要增加`keywords`和`description`

		title: {{ title }}
		date: {{ date }}
		timestamp:
		catAlias:
		categories: defaultCategory
		tags:
		keywords:
		description:
		---

> `scaffolds`文件夹里增加article.md，加入上边的代码。更改总配置文件为`default_layout: article`。需要注意的是`timestamp`这个是需要手填的。目前我还不知道调用什么属性或方法能显示时间戳。希望知道的朋友不吝赐教:)

### 多平台发布配置图示

![发布配置](http://i11.tietuku.com/ac416783141af114.png)

# 效果演示
### PC演示请直接移步鄙人博客：[说IT](http://shuoit.net)
### 手机屏幕样式
![demo1](http://i11.tietuku.com/ee00ef94d30904eb.png)
![demo2](http://i11.tietuku.com/50178db972598212.png)
### pad 屏幕样式
![demo3](http://i11.tietuku.com/673b38e3bdd7182a.png)

# WebFont使用
![webfontName](http://i13.tietuku.com/b7fcf437dcf55d59.jpg)
![webfontCode](http://i13.tietuku.com/81bcc72615ee42aa.jpg)

## 是的，如果你要自定义网站一部分图标，这些可以通过以上设置。

> 有问题，欢迎跟我交流！
> > IT小伙伴QQ群欢迎你加入：43250524
