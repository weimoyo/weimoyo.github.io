---
title: neovim插件记录、用法
date: 2025-07-07 17:39:10
categories: [笔记, neovim]
tags: [工具, 笔记, 终端, 编辑器, neovim]
cover: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/%E5%A5%94%E8%B7%91%E7%9A%84%E7%8C%8E%E8%B1%B9.jpg
series: neovim
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

## [lspsaga.nvim](https://github.com/nvimdev/lspsaga.nvim)

功能：提供了一组LSP增强功能，有原本`nvim-lspconfig`不包含的功能，也有做得更好的功能，也有原本就足够的功能，列举几个比较有用的：
{% note warning %}
以下快捷键都来源于我的个人配置。
{% endnote %}
1. `Hober`: 本插件提供的悬浮信息窗口支持markdown渲染，快捷键是`<leader>k`。
2. `Diagnostic`: 本插件提供了更丰富的诊断信息、可能的修复建议，以及光标、行、buff、工作区四个范围的诊断信息展示。

    |功能|快捷键|
    |-|-|
    |上一个诊断信息|`[e`|
    |下一个诊断信息|`]e`|
    |光标位置的诊断信息|`<leader>dc`|
    |光标所在行的诊断信息|`<leader>dl`|
    |当前buff的诊断信息|`<leader>db`|
    |当前工作区的诊断信息|`<leader>dw`|

1. `Outline`: 按下`<C-o>`就可以打开文件的大纲，在大纲里按`e`可以跳转到对应位置。
2. `Definition`: 提供了一个定义悬浮窗，可以在里面编辑。

## [flash.nvim](https://github.com/folke/flash.nvim)

这是一个`LazyVim`自带的插件，提供了极其好用的跳转功能，正如其名——FLASH。

|快捷键|功能|详细描述|
|-|-|-|
|`s`|搜索|会给每个匹配项提供唯一标识，便于快速跳转|
|`S`|`treesitter`搜索|为每个层级的代码提供表示，便于快速选择整块的代码|
|`f`/`F`|向后、前字符跳转|跳转到下一个/上一个字符|
|`;`/`,`|向后、前字符跳转|使用前一次`f`/`F`的跳转模式|
|`[dyc]r`|闪现删除、复制、替换|跳转到某个位置，完成操作后返回|
|`[dyc]R`|`treesitter`闪现|操作的单位是`treesitter`块，可以选择所有包含输入的字符的块|
|`<C-s>`|在`/`或者`?`搜索模式下开关|会给每个匹配项提供唯一标识|
