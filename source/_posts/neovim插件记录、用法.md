---
title: neovim插件记录、用法
date: 2025-07-07 17:39:10
categories: [笔记, neovim]
tags: [工具, 笔记, 终端, 编辑器, neovim]
index_img: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/%E5%A5%94%E8%B7%91%E7%9A%84%E7%8C%8E%E8%B1%B9.jpg
---

## [bullets-vim](https://github.com/bullets-vim/bullets.vim)
功能：自动处理markdown中的列表序号。
快捷键：
|按键|模式|功能|
|-|-|--|
|`<cr>`|INSERT|换行并插入新的bullet|
|`o`|NORMAL|效果同上。|
|`<C-cr>`|INSERT|仅换行|
|`gN`|NORMAL/VISUAL|对光标所在列表(或者所选中的部分)重排序|
|`>>`|NORMAL|缩进（同时调整编号，下皆同）|
|`<C-t>`|INSERT|缩进|
|`>`|ViSUAL|缩进|
|`<<`|NORMAL|取消缩进|
|`<C-d>`|INSERT|取消缩进|
|`<`|VISUAL|取消缩进|

## [render-markdown](https://github.com/MeanderingProgrammer/render-markdown.nvim)
功能：文档超详细，配置非常简单的markdown渲染插件。建议用它替代`:LazyExtra`里的markdown模块。
  1. 标题图标、padding，高亮范围。
  2. 代码块、callouts、链接图标。
  3. 列表美化。
  4. 等等。

配置：[详情见此链接](https://github.com/MeanderingProgrammer/render-markdown.nvim?tab=readme-ov-file#setup)

{% note info %}
要想舒舒服服编辑markdown文档还需要关闭拼写检查。
{% endnote %}
