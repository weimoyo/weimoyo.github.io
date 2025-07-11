---
title: 远程连接win11主机
date: 2025-06-09 14:42:36
categories: [实践指南, 小玩意]
tags: [工具用法, 实践指南, 记录]
cover: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/%E9%82%A3%E5%B9%B4%E5%A4%8F%E5%A4%A9.jpg
banner_img: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/%E5%87%B9%E9%9D%A2%E5%B1%B1.jpg
---

# 远程连接win11主机

## ssh（仅命令行）

### 坑

- 服务端防火墙要配置**入站规则**，开放22端口。
- 客户端的公钥应该放在哪。

  **ChatGPT o3:**
  >**管理员账户**必须把公钥写入 `C:\ProgramData\ssh\administrators_authorized_keys`<a id="note1">​<sup>1</sup></a>。  
  >**非管理员账户**用 `%USERPROFILE%\.ssh\authorized_keys`<a id="note2">​<sup>2</sup></a>。

  事实证明这一点不准确，FixedIdiot上的weimo账户不被认为是管理员账户，但是放在[2](#note2)没有效果，放在[1](#note1)却可以。我估计是因为判断标准是**用户组**，weimo在Administrators用户组里。

## RDP（微软远程连接，图形化界面）

### 步骤

1. **Win11 服务器端**

    “设置 → 系统 → 远程桌面 → 打开”，记下计算机名并确认用户在“**远程桌面用户**”名单内。
2. **Win10 客户端**  
    运行 `mstsc`​ → 输入服务器名/IP:PORT。
3. **Tips**

    - 要想校园网可以访问实验室网络（校园网的内网）内的主机，则需要配置一下端口映射3389、TCP协议。
    - 与其他远程桌面、多端协同的工具可能会产生冲突，例如同时Mouse without Boarders会导致鼠标消失。