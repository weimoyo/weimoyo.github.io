---
title: neovim配置
date: 2025-06-26 09:39:30
categories: [笔记, neovim]
tags: [工具, 笔记, 终端, 编辑器, neovim]
cover: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/%E5%A5%94%E8%B7%91%E7%9A%84%E7%8C%8E%E8%B1%B9.jpg
series: neovim
---

## 前置

### 配置文件在哪

在neovim的命令模式输入```:= vim.fn.stdpath("config")```可以查看配置文件所在的目录，win下默认为```~\AppData\Local\nvim\```，在此目录下创建/修改主配置文件```init.lua```。

### 模块化配置

在```init.lua```的同级目录创建```lua```目录用以存放各个模块，继而使用```require("module")```引入名为```module.lua```的模块。

**建议：** 在```lua```下再细分，例如基础的配置放到```lua/core/```下，拓展的配置放到```lua/plugins/```，引入的时候使用```require("core.module")```

### 配置命令结构与一次性使用

大多数配置命令都在```vim.opt.```之下，可以在命令模式使用例如```:lua vim.opt.number = true```对当前会话生效。

## 配置项

### 行号

行号：```vim.opt.number = true```

相对行号，便于快捷移动光标：```vim.opt.relativenumber = true```

### 高亮、最大长度

```vim.opt.cursorline = true```

```vim.opt.colorcolumn = "80"```

### tab键行为

改为插入空格：```vim.opt.expandtab = true```

一个制表符显示为多少空格：```vim.opt.tabstop = 4```

行首缩进长度，0表示与```tabstop```一致```vim.opt.shiftwidth = 0```

### 配置更新相关

```vim.opt.autoread = true```

### 快捷键

api: ```vim.keymap.set(mode, lhs, rhs, opts)```。

参数解释：

* mode: 快捷键生效模式（nvim的模式，"n"是normal模式，"i"是insert模式等），可以是单一模式（字符）也可以是组合模式（table）。
* lsh: 按键，其中，
  * Ctrl + a: ```<C-a>```
  * Alt + a: ```<A-a>```
* rhs: 功能、映射的另一组按键、lua函数。
* opts: table，额外配置。

### 插件


