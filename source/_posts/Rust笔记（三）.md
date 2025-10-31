---
title: Rust笔记（三）
date: 2025-10-29 10:37:16
categories: [笔记, Rust]
tags: [笔记, 编程语言, Rust, 编程]
cover: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/Rust-Ferris.png
series: Rust笔记
---

## 所有权和借用

### 所有权

所有权是用来进行内存管理，使得编译器可以在编译时根据一系列规则来确保内存安全。

#### 所有权原则

1. Rust 中每一个值都被一个变量所拥有。
2. 一个值同时只能被一个变量所拥有。
3. 当变量离开作用范围时，这个值也会被销毁。

#### 拷贝与移动（move）

##### 深拷贝

Rust 不会自动创建数据的深拷贝，需要使用 `clone` 方法来创建一个值的深拷贝。
例如
```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```

##### 浅拷贝

浅拷贝只发生在栈上，实现了 `Copy` 特征的类型在赋值的时候都会执行浅拷贝。一个基本的规则是：**任何基本类型的组合都可以 `Copy`，不需要分配内存或者某种形式资源的类型也是可以 `Copy` 的**。
包括，
- 所有整数类型
- 布尔类型
- 所有浮点数类型
- 字符类型
- 元组类型（如果元组中的所有元素都是 `Copy` 类型）
- 不可变引用类型 `&T` ，但是可变引用类型不可以 `Copy` 。

##### Tips

1. `as_` 系列方法可以将一个类型转换为另一个类型，但是不会改变值的所有权。
例如
```rust
let s = String::from("hello");
let s1 = s.as_bytes();
```
2. `into_` 系列方法可以将一个类型转换为另一个类型，但是会改变值的所有权。
例如
```rust
let s = String::from("hello");
let s1 = s.into_bytes();
```

### 借用
