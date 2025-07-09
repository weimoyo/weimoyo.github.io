---
title: 配置一个舒服的wsl开发环境
date: 2025-06-26 14:28:45
categories: [实践指南, 大东西, wsl]
tags: [工具, 实践, 记录, wsl, 终端, Debian, nushell, x-cmd, brew]
cover: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/%E7%9C%BA%E6%9C%9B%E7%9A%84%E6%B0%B4%E7%8D%AD.jpg
---

# 🦦配置一个舒服的wsl开发环境

## BUG: "wsl: 检测到 localhost 代理配置，但未镜像到 WSL。NAT 模式下的 WSL 不支持 localhost 代理。"

1. 打开或者创建%USERPROFILE%\.wslconfig，添加

    ```
    [experimental]
    autoMemoryReclaim=gradual  # gradual  | dropcache | disabled
    networkingMode=mirrored
    dnsTunneling=true
    firewall=true
    autoProxy=true
    ```
2. 关机```wsl --shutdown Debian```，重启```wsl -d Debian```。

## 安装brew包管理器

1. 安装依赖项 ```sudo apt-get install build-essential procps curl file git```。
2. 安装Homebrew ```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"```。
3. 配置环境变量和软链接 ```echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> $HOME/.bash_profile```，```eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"```。
4. 验证安装成功 ```brew doctor```。
5. 用法：
   * ```brew install <package_name>```
   * ```brew remove <package_name>```
   * ```brew list```
   * 删除不需要的依赖 ```brew autoremove```
6. 删除Homebrew ```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"```

## 安装、配置nushell

1. 安装nushell ```brew install nushell```
2. 修改nushell为默认shell
   1. 添加nu到shell列表里，有几种方式，行为可能因情况不确定，写在这作参考：
      * brew安装nu的默认位置是```/home/linuxbrew/.linuxbrew/bin/nu```，故可以```echo "/home/linuxbrew/.linuxbrew/bin/nu" | sudo tee -a /etc/shells```。
      * 在bash里执行```which nu | sudo tee -a /etc/shells```。
   2. 修改当前用户的默认shell，这也有几种不确定的方式：
      * ```chsh -s $(which nu)```，或使用默认位置。
      * 直接修改```/etc/passwd```，将对应用户原本的```.../bash```改为nu的位置，root用户可能也需要修改。
   3. 重启wsl，```exit```若无效，可以用```wsl --shutdown Debian```。
3. 一点小配置
    ```
    # set default editor
    $env.config.buffer_editor = "nvim"

    # cancle default message when boot
    $env.config.show_banner = false
    ```
4. **注：** 切换到nushell后环境变量都没了，```brew```、```nushell``` 等都需要重新加入环境变量。

## 安装、配置neovim

1. **安装neovim：**```brew install neovim```
2. **安装[<i class="fa-brands fa-github"></i>Lazyman](https://github.com/doctorfree/nvim-lazyman)**。

### Lazyman的各种问题

* neovim版本需要高于0.9。
* 使用lazyman（可能需要手动加入环境变量）命令打开交互式配置界面。
* 菜单后面几个安装依赖的都得先装一下，之后再去安装配置。
* 配置到```nvim```上需要写入环境变量，以nushell为例```$env.NVIM_APPNAME = 'nvim-Python'```。
* 复制、粘贴是有时会报错```clipboard: error invoking wl copy/paste failed to connect to a wayland server```，去```/usr/bin```将```wl-ccopy```和```wl-paste```删除即可。注：这与Wayland协议（用于ssh等场景）有关。
