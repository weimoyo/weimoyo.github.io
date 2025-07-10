---
title: 临时文档展示
date: 2025-07-10 10:50:55
comments: false
---

太棒了！欢迎来到 Rust 的世界。我是你的专属 Rust 高级工程师导师，很高兴能带你踏上这段旅程。你已经完成了最重要的一步——迈出第一步并成功运行了 "Hello, World!"。这证明你的环境已经准备就绪。

忘掉 `rustc main.rs` 吧。虽然它很直接，但在真实的项目中，我们几乎从不单独使用它。从今天起，你的新朋友是 **Cargo**。

---

### **第一部分：拥抱 Cargo，Rust 的项目管家**

在专业的 Rust 开发中，Cargo 是不可或缺的核心工具。把它想象成你的项目管家、构建助手和包管理器，三位一体。它能帮你处理项目创建、编译、运行、测试、管理依赖（使用其他人的代码库）等一切繁杂事务。

#### **为什么需要 Cargo？**

当你只有一个 `main.rs` 文件时，`rustc` 足够了。但想象一下：

*   你的项目有几十个源文件。
*   你需要使用一个开源库来处理 JSON 或者网络请求。
*   你想为你的代码编写单元测试。
*   你想以“调试模式”快速编译，或者以“发布模式”进行性能优化。

手动处理这些会非常痛苦。Cargo 就是为了解决这些问题而生的。

#### **动手实践：创建你的第一个 Cargo 项目**

现在，请打开你的终端（命令行工具），我们来重新创建你的 "Hello, World!" 项目，但这次用更专业的方式。

1.  **创建一个新项目**
    在你喜欢的位置，运行以下命令：
    ```bash
    cargo new hello_cargo
    ```
    这个命令会创建一个名为 `hello_cargo` 的新目录。我们进去看看里面有什么：

    ```bash
    cd hello_cargo
    ```

    你会看到这样的目录结构：
    ```
    hello_cargo/
    ├── .git/          # 如果你安装了 git，cargo 会自动初始化一个 git 仓库
    ├── .gitignore     # 一个为 Rust 项目预设的 .gitignore 文件
    ├── Cargo.toml     # 项目的“清单”文件，非常重要！
    └── src/
        └── main.rs    # 你的源代码在这里
    ```

2.  **理解关键文件**
    *   `src/main.rs`: Cargo 已经为你生成了一个 "Hello, world!" 程序。它的位置遵循了 Rust 的约定：源代码都放在 `src` 目录下。
    *   `Cargo.toml`: 这是 Cargo 的核心配置文件，采用 TOML (Tom's Obvious, Minimal Language) 格式。打开它看看：
        ```toml
        [package]
        name = "hello_cargo"
        version = "0.1.0"
        edition = "2021"

        # See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

        [dependencies]
        ```
        - `[package]` 部分包含了项目的元数据：名称、版本、使用的 Rust Edition（可以暂时理解为语言的版本）。
        - `[dependencies]` 部分是空的，但未来我们会在这里添加外部库。

#### **Cargo 的核心命令**

在 `hello_cargo` 目录下，试试这几个命令：

1.  **`cargo run`**：编译并运行
    ```bash
    cargo run
    ```
    输出：
    ```
       Compiling hello_cargo v0.1.0 (/path/to/your/hello_cargo)
        Finished dev [unoptimized + debuginfo] target(s) in 0.50s
         Running `target/debug/hello_cargo`
    Hello, world!
    ```
    `cargo run` 帮你做了两件事：首先编译代码，然后如果编译成功，就运行生成的可执行文件。注意看，可执行文件被放在了 `target/debug/` 目录下。

2.  **`cargo build`**：只编译，不运行
    ```bash
    cargo build
    ```
    这个命令只会编译你的项目。它很有用，比如在你只想检查代码能否通过编译，而不想实际运行它的时候。同样，生成物在 `target/debug/`。

3.  **`cargo check`**：闪电般快速的检查
    ```bash
    cargo check
    ```
    这个命令是你的好帮手。它会快速检查你的代码，确保它能通过编译，但**不**会生成任何可执行文件。因为它跳过了代码生成阶段，所以速度比 `cargo build` 快得多。在你编码过程中，可以频繁使用 `cargo check` 来获取快速反馈。

4.  **`cargo build --release`**：为发布而构建
    当你准备发布你的程序时，使用这个命令。
    ```bash
    cargo build --release
    ```
    它会进行大量的优化，让你的程序运行得更快。生成的可执行文件会放在 `target/release/` 目录下。

---

### **本部分小结**

恭喜你！你已经掌握了 Rust 开发的正确姿势。

*   **核心理念**：我们使用 **Cargo** 来管理项目，而不是直接调用 `rustc`。
*   **项目结构**：源代码在 `src` 目录，项目配置在 `Cargo.toml`。
*   **常用命令**：
    *   `cargo run`：开发时最常用的，编译并运行。
    *   `cargo check`：写代码时频繁使用，用于快速检查错误。
    *   `cargo build`：只编译，不运行。
    *   `cargo build --release`：发布前用于优化。

从现在开始，我们所有的代码都将在 Cargo 项目中编写。这为你后续学习依赖管理、测试等内容打下了坚实的基础。

当你理解并实践了以上内容后，就告诉我**“继续”**，我们将进入下一个激动人心的主题：**变量、可变性与数据类型**。
