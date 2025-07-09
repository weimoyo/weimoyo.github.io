---
title: pytest笔记（一）
date: 2025-07-07 10:35:36
categories: [笔记, python]
tags: [笔记, python, pytest, 测试, 测试框架]
cover: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/%E7%99%BD%E5%8C%96%E8%9F%92%E8%9B%87.jpg
series: pytest笔记（一）
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

- 用例发现规则和内容规则
  - 用例的发现规则——识别、加载用例的过程
    步骤：
    1. 遍历当前目录及子目录下的所有文件，例外：`venv`、`.*`。
    2. 打开`test_`开头或者`_test`结尾的python文件。
    3. 遍历所有`Test`开头的类（不过该类并非是用例）。
    4. 收集所有`test_`开头的**函数或方法**作为用例。
  - 用例的内容
    1. 可调用（函数、方法、类、对象）。
    2. `test_`开头。
    3. 没有参数，但可以使用内置标记等手段使用参数。
    4. 没有返回值（8.4版本后加入）。
  - 练习：对加法函数进行断言。
    {% note info %}
    注意本例里类和方法的命名方式，以及这种分组测试（封装）的设计思路。
    {% endnote %}
    ```python

    def add(a, b):
        """Returns the sum of a and b."""
        return a + b


    class TestAdd:
        def test_int(self):
            """Tests the add function."""
            assert add(2, 3) == 5

        def test_str(self):
            """Tests the add function with string inputs."""
            assert add("1", "2") == "12"

        def test_list(self):
            """Tests the add function with list inputs."""
            assert add([1, 2], [3, 4]) == [1, 2, 3, 4]
    ```

## 配置框架 

* 改变pytest的默认规则，方式有三种：
  + **命令参数**，例如`pytest -v`，`-`开头。
  + 在根目录创建一个**pytest.ini**配置文件，小写字母。
  + 环境变量（很有限），大写字母。
* 获取配置值的方式：`pytest -h`。
* 常见的命令参数:
  + `-v`: 增加详细输出。
  + `-s`: 在用例中正常使用**输入输出***，默认情况下pytest会捕获输出。
  + `-x`: 快速退出，一旦有用例失败就退出。
* `-m`: 用例筛选例如`pytest -m web`，只执行标记为`web`的用例。
## 标记

* 用例标记，装饰器：`@pytest.mark.标记名`，例如`@pytest.mark.web`。
* 标记的作用：筛选用例、分组用例、添加元数据。
* 用户自定义标，**仅用作用例筛选**，例如`@pytest.mark.slow`。使用步骤：
  1. 注册，命令参数或配置文件。
      ```ini
      [pytest]

      markers =
        api: 接口测试
        web: 慢速测试
        login: 登录测试
      ```
  2. 标记，装饰器。
      ```python
      import pytest

      @pytest.mark.slow
      def test_slow_function():
        assert True
      ```
  1. 筛选，`pytest -m marker`。
+ 框架内置标记，可以**增加特殊的执行效果**，例如`@pytest.mark.skip`。
  * `skip`: 无条件跳过用例。
  * `skipif`: 条件跳过用例。
  * `xfail`: 预期失败。
  * `parametrize`: 参数化用例。
    **数据驱动测试=参数化测试+数据文件**
    含义是，根据数据文件的内容，动态决定用例的数量、内容。
  * `usefixtures`: 使用fixture。

## 数据驱动测试

+ 从数据文件中读取数据，以列表按顺序赋值给参数。
+ 用例的数量由数据数量决定。
例子：
  ```python
  @pytest.mark.parametrize("a, b, c", read_csv("data.csv"))
  def test_ddt(self, a, b, c):
      assert add(a, b) == c 
  ```

## 夹具fixture

1. 创建一个fixture。
  ```python
  @pytest.fixture
  def f():
    # 前置操作
    yield # 执行用例
    # 后置操作
  ```
2. 使用，以参数形式传递给用例。
  ```python
  def test_1(f):
      pass
```
3. 使用，标记。
  ```python
  @pytest.mark.usefixtures("fgh")
  def test_2():
    pass
  ```

### 高级用法
1. 自动使用fixture。
   - 在配置文件中设置`autouse = True`。
   - 在用例中直接使用，不需要传递参数。
   ```python
   @pytest.fixture(autouse=True)
   def f():
       # 前置操作
       yield
       # 后置操作
   ```
2. 依赖使用。
   - 在一个fixture中使用另一个fixture。
   ```python
   @pytest.fixture
   def f1():
       # 前置操作
       yield
       # 后置操作

   @pytest.fixture
   def f2(f1):
       # 使用f1的前置操作
       yield
       # 使用f1的后置操作
   ```
3. 返回内容。
4. 范围共享。
