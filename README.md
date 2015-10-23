# hexo-theme-ttstyle
> hexo的三栏式主题，`ttstyle`(不是你想的那个tt喔)。内置百度统计(异步)、搜狐畅言。精简并压缩了代码，针对大陆实际情况，对访问速度进行了优化。
> > 此主题根据`Jekyll`版本的`闫肃博客的3-Jekyll `移植并修改的。感谢[闫肃的博客](http://yansu.org/)

# 主题特点
1. 支持响应式，自适应，微信里也完美支持；
2. 支持SEO关键字描述及标题设置；
3. 支持百度分享、异步统计、搜狐畅言组件；
4. 提供WebFont自定义修改

# 安装与使用

### 安装主题
你可使用`git clone https://github.com/tangkunyin/hexo-theme-ttstyle.git`命令将本项目下载到你本地。然后复制到`hexo`主题目录，改下总配置文件`_config.yml`

### 配置主题
1.使用文章ID作为访问链接(因为默认配置会产生中文URL，看着很不舒服):`permalink: :year/:month/:day/:_id/`

2.主题左侧导航栏使用分类目录，因此你需要在`aricleName.md`中加入`categories`

3.关键字和文章描述也是一样，需要增加`keywords`和`description`

	title: {{ title }}
	date: {{ date }}
	tags:
	categories:
	keywords:
	description:
	---

> `scaffolds`文件夹里增加article.md，加入上边的代码。更改总配置文件为`default_layout: article`

### 配置图示

![站点信息配置](http://i11.tietuku.com/6427adf85a35027f.png)
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
