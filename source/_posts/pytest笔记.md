---
title: pytest笔记
date: 2025-07-07 10:35:36
categories: [笔记, python]
tags: [笔记, python, pytest, 测试, 测试框架]
index_img: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/%E7%99%BD%E5%8C%96%E8%9F%92%E8%9B%87.jpg
---

## 测试框架的作用

- 用例发现、管理、执行。
- 环境管理。
- 测试报告。

## pytest对比unittest

- 需要手动安装、可以指定版本。
- 代码风格不是Java而是Python。
- 拥有更丰富的插件生态。
- 完全兼容unittest。

## 快速上手

- 安装：`uv add pytest -U`
- 启动方式：
  1. 创建一个新文件添加`pytest.main()`。
  2. `pytest`：自动发现当前目录下的所有测试文件，执行所有测试用例。
  3. `pytest test_*.py`：执行指定的测试文件。
  4. `pytest test_*.py::test_func`：执行指定的测试函数。

## 用例

- 结果种类

  | 缩写 | 单词    | 含义                       |
  | ---- | ------- | -------------------------- |
  | .    | passed  | 通过                       |
  | F    | failed  | 失败（用例执行报错）       |
  | E    | error   | 出错（fixture执行报错）    |
  | s    | skipped | 跳过                       |
  | X    | xpassed | 预期外的通过（不符合预期） |
  | x    | xfailed | 预期内的失败（符合预期）   |

- 规则
  - 用例的发现规则——识别、加载用例的过程
    步骤：
    1. 遍历当前目录及子目录下的所有文件，例外：`venv`、`.*`。
    2. 打开`test_`开头或者`_test`结尾的python文件。
    3. 遍历所有`Test_`开头的类（不过类并非是用例）。
    4. 收集所有`test_`开头的**函数或方法**作为用例。
  - 用例的内容
