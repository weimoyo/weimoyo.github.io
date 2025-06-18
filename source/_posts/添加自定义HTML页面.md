---
title: 添加自定义HTML页面
date: 2025-06-18 11:42:47
updated: 2025-06-18 11:42:47
categories: [实践指南, 大东西, Hexo]
tags: [工具, 实践, 记录, Hexo, 前端]
index_img: img/default.png
---

# 添加自定义HTML页面

## 步骤与说明

1. ```hexo new page 页面名称``` 创建新的页面。在source目录下会生成一个文件夹，文件夹里有个index.md。
2. 可以自定义一个layout，然后在index.md里编写新页面。这种方式适合创建一类页面，以后都用自定义的layout。layout目录位于主题目录下。
3. 也可以改用index.html，在Front-matter里写上```layout: false```，这样就可以完全自定义页面了，不会因为hexo的默认行为产生混乱。

**实践：** 参见我用Deepseek写的[贪吃蛇](http://lixiang.us.kg/snake "http://lixiang.us.kg/snake")，源文件位于{% icon icon-github-fill https://github.com/weimoyo/weimoyo.github.io/tree/gh-source/source/snake Github%}