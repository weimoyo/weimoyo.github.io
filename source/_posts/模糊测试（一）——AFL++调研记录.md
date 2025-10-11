---
title: 模糊测试（一）——AFL++调研记录
date: 2025-09-22 09:54:01
categories: [笔记, 网络安全, 网络通信安全, 模糊测试]
tags: [网络安全, 软件安全, 系统安全, 模糊测试, AFL, AFL++]
cover: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/%E5%9D%A1%E4%B8%8A%E9%A9%AC.jpg
series: 模糊测试
katex: true
---

## What is Fuzz Testing?

Fuzz Testing is a software testing technique that employs automatically generated random inputs to identify potential vulnerabilities in software.

### Fuzz Testing Process

The fuzz testing process, illustrated in the Figure below, which can be divided into seed selection, input mutation and result analysis.
![Fuzz process](https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/fuzz%20process.png)

### Important Sub-processes

#### Instrumentation

Instrumentation adds hooks to the target program to collect runtime information while preserving the original behavior of the program.

The methods for instrumentation differ depending on whether the source code is available.
- Source code available: 
  - A basic method is inserting debugging statements such as `print()` or logging functions. Although this method is simple and direct, it is labor-intensive and error-prone.
  - Modern compilers provide the ability to insert instrumentation automatically. GCC/Clang automatically insert instrumentation code using flags like `-finstrument=functions`.
- Source code not available:
  - Static binary rewriting involves modifying the executable file on disk before it is run.
  - Dynamic binary instrumentation (DBI) tools insert instrumentation code in memory at runtime, which is the most common and powerful approach for binary software.

#### Sanitizer

Sanitizers are typical tools of compiler-based instrumentation including Address Sanitizer(ASan), Memory Sanitizer(MSan), Undefined Behavior Sanitizer(UBSan), and Thread Sanitizer(TSan).

Code can be compiled with sanitizers by adding flags such as `-fsanitize=address` or `-fsanitize=memory`, which instruct the compiler to insert runtime checks into the program.

## AFL++

AFL++ is born from AFL and incorporates various improvements and extensions.