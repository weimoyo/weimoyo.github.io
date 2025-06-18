---
title: 🕷️markdown语法笔记
date: 2025-06-16 11:27:13
categories: [笔记, markdown]
tags: [markdown]
index_img: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/%E5%B0%8F%E5%8F%AF%E7%88%B1%E8%B7%B3%E8%9B%9B.jpg
---

# 🕷️markdown语法笔记

## 插入

### 链接

1. 行内链接：```[显示文本](链接地址 "可选标题")```
2. 引用式链接：
   ```markdown
   [显示文本][链接标识]

   [链接标识]: 链接地址 "可选标题"
   ```
3. 直接显示URL：```<https://markdown.org>```
4. 图片链接：```[![图片替代文本](图片URL)](链接地址)```

### emoji

* ```win + .```打开系统自带的emoji搜索
* [emoji中文网](https://www.emojiall.com/zh-hans)等复制粘贴
* 使用标签符号简码，需要安装Markdown Emoji插件，语法```:joy:```，效果:joy:。（此方法hexo不支持）
* fluid主题内置了一些图标，在配置about页的时候用到了，在文档里也可以如```<i class="iconfont icon-github-fill"></i>```的方式使用，带链接的方式：
  * ```[<i class="iconfont icon-github-fill"></i>](https://github.com/weimoyo/weimoyo.github.io/tree/gh-source/source/snake)```
  * ```<a href="https://github.com/weimoyo/weimoyo.github.io/tree/gh-source/source/snake)" title="GitHub" target="_blank" rel="noopener noreferrer"><i class="iconfont icon-github-fill"></i></a>```
* fluid内置的图标的便捷使用方式，添加一个图标插件：
  1. 在主题目录的scripts目录里创建一个icon.js，内容如下
      ```js
      hexo.extend.tag.register('icon', function(args) {
      const iconClass = args[0];
      const link = args[1];
      const tip = args[2];

      if (!iconClass) {
         return '';
      }

      // 智能判断基础类
      let baseClass = 'iconfont'; // 默认是 iconfont
      if (iconClass.startsWith('fa-')) {
         baseClass = 'fa'; // 如果以 fa- 开头，则是 Font Awesome
      }

      let iconHtml = `<i class="${baseClass} ${iconClass}"></i>`;

      if (link) {
         const titleAttr = tip ? `title="${tip}"` : '';
         iconHtml = `<a href="${link}" ${titleAttr} target="_blank" rel="noopener noreferrer">${iconHtml}</a>`;
      }

      return iconHtml;
      });
      ```
  2. 三种使用方式
     * 只显示图标```{% icon icon-github-fill %}```:{% icon icon-github-fill %}
     * 带链接的图标```{% icon icon-github-fill https://github.com/weimoyo %}```:{% icon icon-github-fill https://github.com/weimoyo %}
     * 带链接和提示的图标```{% icon icon-github-fill https://github.com/weimoyo GitHub %}```:{% icon icon-github-fill https://github.com/weimoyo GitHub %}