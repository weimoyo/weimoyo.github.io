---
title: Rust笔记（一）
date: 2025-07-10 09:56:50
categories: [笔记, Rust]
tags: [笔记, 编程语言, Rust, 编程]
cover: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/Rust-Ferris.png
series: Rust笔记
---

# 开端

参考[Rust语言圣经(Rust Course)](https://course.rs/first-try/installation.html)
{% note warning%}
Windows上的Rust有两个版本MSVC和GNU，这里涉及到Microsoft C++ Build Tools(对应于MSVC版本，官方推荐)安装c++环境，或者MSYS2(对应于GNU版本)安装c++环境。
{% endnote %}
其它安装的细节，以及在其它系统上的安装方式，请仔细阅读以上参考文档。
可以使用命令`rustup doc`查看文档。

## 在neovim里配置Rust开发环境

1. 安装`rust-analyzer`，这是Rust的LSP，需要对"neovim/nvim-lspconfig"进行配置。
2. 安装"saecki/crates.nvim"插件，这个插件用来提供依赖信息的增强支持。
以上两者的配置如下plugins\lsp.lua所示：
```lua
return {
  {
    "neovim/nvim-lspconfig",
    opts = {
      inlay_hints = { enable = true },
      servers = {
        lua_ls = {
          settings = {
            Lua = {
              hint = { enable = true },
            },
          },
        },
        ["rust_analyzer"] = {
          settings = {
            cargo = { allFeatures = true },
          },
        },
      },
    },
  },
  {
    "saecki/crates.nvim",
    tag = "stable",
    config = function()
      require("crates").setup({})
    end,
  },
}
```
3. 配置Rust调试，参考[nvim-dap](https://github.com/mfussenegger/nvim-dap/wiki/C-C---Rust-(via--codelldb))
具体配置如plugin\dap-rust.lua所示，需要修改codelldb.exe的路径：
```lua
return {
  "mfussenegger/nvim-dap",
  -- 强烈推荐安装 nvim-dap-ui 来获得更好的调试 UI 体验
  dependencies = {
    "rcarriga/nvim-dap-ui",
    "nvim-neotest/nvim-nio",
  },
  config = function()
    local dap = require("dap")
    local dapui = require("dapui")

    -- =================================================================
    -- 1. 适配器定义 (Adapter Definition)
    -- 这部分内容来自文档，并针对你的 v1.11.5 版本和 Windows 环境进行了适配
    -- =================================================================
    dap.adapters.codelldb = {
      type = "server",
      port = "${port}",
      executable = {
        -- !!! 重要 !!! 请将这里的路径替换为你第一步中解压得到的真实路径。
        -- 在 Lua 字符串中，即使是 Windows 路径，也建议使用正斜杠 "/"
        command = "C:/Users/weimo/AppData/Local/nvim/src/lldb/extension/adapter/codelldb.exe",

        args = { "--port", "${port}" },

        -- 根据文档建议，在 Windows 上，你可能需要设置这个为 false
        -- 这能确保 Neovim 退出时，codelldb 进程也能被正确关闭
        detached = false,
      },
    }

    -- =================================================================
    -- 2. 调试配置 (Debug Configuration)
    -- 这部分告诉 nvim-dap 如何启动一个 Rust 程序的调试会话
    -- =================================================================
    dap.configurations.rust = {
      {
        name = "Launch file (codelldb)",
        type = "codelldb", -- 必须与上面 dap.adapters 中定义的名字一致
        request = "launch",
        program = function()
          -- 启动时会提示你输入要调试的可执行文件的路径
          -- 默认会帮你填充到 cargo 的 debug 输出目录
          return vim.fn.input("Path to executable: ", vim.fn.getcwd() .. "/target/debug/", "file")
        end,
        cwd = "${workspaceFolder}",
        stopOnEntry = false,
        -- 如果你的程序需要命令行参数，可以像下面这样添加
        -- args = { "参数1", "参数2" },
      },
    }

    -- 如果你想 C 和 C++ 也使用这个配置，可以取消下面的注释
    -- dap.configurations.c = dap.configurations.rust
    -- dap.configurations.cpp = dap.configurations.rust

    -- =================================================================
    -- 3. DAP UI 配置和事件监听 (DAP UI Setup)
    -- =================================================================
    dapui.setup({
      -- 布局配置: 定义了哪些窗口以及它们如何排列
      layouts = {
        {
          elements = {
            -- 左侧窗口: 作用域和堆栈
            { id = "scopes", size = 0.5 }, -- 60% 的空间给变量作用域
            { id = "stacks", size = 0.5 }, -- 40% 的空间给调用堆栈
          },
          size = 80, -- 左侧边栏总共占用 40 列的宽度
          position = "left", -- 位置在左边
        },
        {
          elements = {
            -- 底部窗口: REPL 和 Console
            { id = "repl", size = 0.5 }, -- 50% 空间给 REPL
            { id = "console", size = 0.5 }, -- 50% 空间给程序输出
          },
          size = 20, -- 底部面板总共占用 10 行的高度
          position = "bottom", -- 位置在底部
        },
      },
      -- 其他 UI 选项
      floating = {
        max_height = nil, -- 浮动窗口的最大高度 (nil 表示无限制)
        max_width = nil, -- 浮动窗口的最大宽度 (nil 表示无限制)
        border = "rounded", -- 浮动窗口边框样式
        mappings = {
          close = { "q", "<Esc>" },
        },
      },
      -- 在变量和监视窗口中显示值的具体实现
      render = {
        max_value_lines = 1000, -- 显示值的最大行数
      },
    })

    -- 在调试会话开始时自动打开 DAP UI，在结束时自动关闭
    dap.listeners.after.event_initialized["dapui_config"] = function()
      dapui.open()
    end
    dap.listeners.before.event_terminated["dapui_config"] = function()
      dapui.close()
    end
    dap.listeners.before.event_exited["dapui_config"] = function()
      dapui.close()
    end

    -- =================================================================
    -- 4. 快捷键 (Keymaps)
    -- =================================================================

    -- 基础调试快捷键 (使用 <Leader>d 前缀)
    vim.keymap.set("n", "<Leader>db", dap.toggle_breakpoint, { desc = "[DAP] 切换断点" })
    vim.keymap.set("n", "<Leader>dc", dap.continue, { desc = "[DAP] 继续" })
    vim.keymap.set("n", "<Leader>do", dap.step_over, { desc = "[DAP] 单步跳过" })
    vim.keymap.set("n", "<Leader>di", dap.step_into, { desc = "[DAP] 单步进入" })
    vim.keymap.set("n", "<Leader>du", dap.step_out, { desc = "[DAP] 单步跳出" })
    vim.keymap.set("n", "<Leader>dr", dap.repl.open, { desc = "[DAP] 打开REPL" })
    vim.keymap.set("n", "<Leader>dl", dap.run_last, { desc = "[DAP] 运行上次配置" })
    vim.keymap.set({ "n", "v" }, "<Leader>dK", function()
      dapui.eval()
    end, { desc = "[DAP] 查看变量值" })
    vim.keymap.set("n", "<Leader>dt", dap.terminate, { desc = "[DAP] 终止调试" }) -- 新增：终止调试

    -- 传统 IDE 风格的 F 功能键 (冗余快捷键)
    vim.keymap.set("n", "<F5>", dap.continue, { desc = "[DAP] 继续 (F5)" })
    vim.keymap.set("n", "<F6>", dap.pause, { desc = "[DAP] 暂停 (F6)" }) -- 新增：暂停功能
    vim.keymap.set("n", "<F7>", dap.step_out, { desc = "[DAP] 单步跳出 (F7)" })
    vim.keymap.set("n", "<F8>", dap.step_over, { desc = "[DAP] 单步跳过 (F8)" })
    vim.keymap.set("n", "<F9>", dap.toggle_breakpoint, { desc = "[DAP] 切换断点 (F9)" })
    vim.keymap.set("n", "<F10>", dap.step_into, { desc = "[DAP] 单步进入 (F10)" })
    vim.keymap.set("n", "<F12>", function()
      dapui.toggle()
    end, { desc = "[DAP] 切换UI (F11)" }) -- 新增：方便地显示/隐藏UI

    -- Shift + F* 快捷键
    vim.keymap.set("n", "<S-F5>", dap.terminate, { desc = "[DAP] 终止调试 (Shift+F5)" }) -- 对应VSCode的Shift+F5
    vim.keymap.set("n", "<S-F8>", function()
      dap.run_to_cursor()
    end, { desc = "[DAP] 运行到光标处 (Shift+F8)" })
  end,
}
```
## 调试小技巧技巧

这些快捷键与我的配置有关。
1. 不熟悉快捷键时可以pin一个快捷键截图。
2. 善用`<C+方向键`调整窗口大小。
3. `<leader>dK`可以查看光标位置的变量值。
4. `<leader>dr`可以打开REPL，能够输入表达式并查看结果。

## Cargo

* cargo项目的主目录结构是有要求的
  + `Cargo.toml`、`src/`在项目顶层。
  + 源代码**全都**在`src/`目录下。
  + 使用`cargo new <name>`命令创建新项目时，Cargo会自动创建`Cargo.toml`和`src/main.rs`文件。
  + 也可以使用`cargo init <name>`命令在当前目录初始化Cargo项目。
* `cargo build`命令会编译当前目录下的Cargo项目。
  + 编译结果会放在`target/debug/`目录下。
  + 同时会生成`cargo.lock`文件，记录依赖的版本信息。
  + 如果需要编译成发布版本，编译器会对代码进行优化，编译时间更长，但执行更快，可以使用`cargo build --release`，结果会放在`target/release/`目录下。j
* `cargo run`命令会**编译并运行**当前目录下的Cargo项目。
  + 但是如果项目**没有修改**，Cargo会**跳过**编译步骤，直接运行上次编译的结果。
* `cargo check`可以检查代码是否有错误，但不会生成可执行文件。
  + 它比`cargo build`快很多，这对于**快速检查代码**很有用，尤其是在开发过程中。
* `[dependencies]`，`rand = "0.9.1"`与`rand = "^0.9.1"`等价。
  + `^`表示兼容版本，允许使用`0.9.x`版本。
  + `~`表示兼容次版本，兼容范围可能与`^`一致或小一点。
  + `=`表示精确版本，必须使用`0.9.1`。
* `cargo update`命令会更新依赖到最新的兼容版本。
  + 它会修改`Cargo.lock`文件，但不会修改`Cargo.toml`文件。

# 发展

## 数据

### 变量与常量

变量分成**可变变量**和**不可变变量**，都需要使用`let`声明。
* 可变变量需要额外加上`mut`。

常量使用`const`声明，必须指定类型。
{% note primary %}
不可变变量与常量的区别
{% endnote %}
* 不可变变量可以在运行时计算值，常量必须在**编译**时确定。
* 不可变变量的特性：**遮蔽**，重新声明以覆盖。

```rust
let x = 5; // 不可变变量
let x = 6; // 遮蔽，重新声明x为6
```

* 常量的特性：**全作用域可见**：
  + 常量不管在何处声明都会作用域整个作用域，因为编译器会将常量名替换成值。
  + 同一个作用域内不能有同名的常量，原因如上，会冲突。
  + 内层作用域可以**遮蔽**外层作用域的常量，因为编译器会先在当前作用域匹配，找不到才会去外层作用域找。
  ```rust
  const VALUE: u32 = 100_000;

  fn main() {
      println!("The value is: {}", VALUE);
      const VALUE: u32 = 200_000;
      {
          const VALUE: u32 = 300_000;
          println!("The value is: {}", VALUE);
      }
      println!("The value is: {}", VALUE);
  }
  ```
