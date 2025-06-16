---
title: 🐙x-cmd实践记录
date: 2025-06-16 11:02:01
updated: 2025-06-16 11:02:01
categories: [实践指南, 大东西, x-cmd]
tags: [工具用法, 实践指南, 记录]
index_img: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/%E7%AB%A0%E9%B1%BC.jpg
---

# [x-cmd](https://cn.x-cmd.com/)实践记录

## 安装

在powershell里安装，参考<https://cn.x-cmd.com/start/powershell>，只需要运行一条指令
```powershell
[System.Text.Encoding]::GetEncoding("utf-8").GetString($(Invoke-WebRequest -Uri "https://get.x-cmd.com/x-cmd.ps1").RawContentStream.ToArray()) | Invoke-Expression
```
## 更改主题

1. ```x starship```和```x ohmyposh```是两个主题模块，直接运行即可打开TUI交互选择。
2. 需要安装[Nerd Fonts](https://www.nerdfonts.com/font-downloads)，否则图标无法正常显示。推荐选择（gemini 2.5 pro），
   * FiraCode Nerd Font (非常流行，支持编程连字)
   * JetBrains Mono Nerd Font (JetBrains IDE 的默认字体，非常清晰)
   * MesloLGS NF (Powerlevel10k 主题官方推荐，兼容性极佳)
3. 效果，![starship效果](https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/starship%E6%95%88%E6%9E%9C.png)

## 使用大模型，以Deepseek为例

1. ```x deepseek init```进行交互式配置，只需要提供key。
2. ```a:ds```和```a:dsr1```使用
   * 对话```a:ds "用户提示词"```
   * ```a:ds -f 本地文件 "用户提示词"```
3. ```a:ds -f 本地文件 "用户提示词" >> ds.md 2>&1```可以输出到文档里，但是中文会乱码
   * **原因：** PowerShell 7 查看 ```[System.Console]::OutputEncoding``` 的设置，发现是 GBK。于是，它用 GBK 的规则去“错误地”解码了这串 UTF-8 的字节流，在内存中得到了一堆乱码字符串。
   * **解决方法：**  
      1. 修改powershell配置文件 
         ```powershell
         notepad $PROFILE
         如果不存在，新建
         New-Item -Path $PROFILE -ItemType File -Force
         ```
         在最后一行添加```[System.Console]::OutputEncoding = [System.Text.Encoding]::UTF8```
      2. 使用管道```a:ds -f 本地文件 "用户提示词" 2>&1 | Out-File -FilePath ds.md -Encoding utf8```(尚未验证，不过原理可信)

## 
