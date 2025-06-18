---
title: 🐳docker使用笔记
date: 2025-06-17 11:40:30
updated: 2025-06-17 11:40:30
categories: [笔记, docker]
tags: [docker]
index_img: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/%E7%BB%93%E5%AF%B9%E7%9A%84%E8%93%9D%E9%B2%B8%EF%BC%9F.jpg
---

# 🐳docker使用笔记

## linux

### 运行Dockerfile时“permission denied”

**部分报错：**```ERROR: permission denied while trying to connect to the Docker daemon socket```
**解决方法：**
* ```sudo usermod -aG docker $USER```
* 需注销或重启才能生效，为的是让shell使用docker组的权限
* 或为当前终端临时添加权限，```newgrp docker```
* 可以用```groups```指令看当前shell是否拥有docker权限
