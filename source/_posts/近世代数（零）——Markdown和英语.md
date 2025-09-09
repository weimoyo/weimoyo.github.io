---
title: 近世代数（零）——Markdown和英语
date: 2025-08-23 10:30:35
categories: [笔记, 数学, 近世代数]
tags: [近世代数, md语法, 英语]
cover: https://pub-85c6ace1f3f74dfdbd0f332fbb2c2f97.r2.dev/PicGo/%E5%B0%8F%E7%8B%97%E7%8B%97.jpg
series: 近世代数
katex: true
---

## 用得到的符号

### 集合与逻辑符号

$A \subseteq B$   子集  `$A \subseteq B$`，$A \supseteq B$   超集  `$A \supseteq B$`
非子集、超集：$A \not\subseteq B$，$A \not\supseteq B$
$a \in A$         属于  `$a \in A$`，$a \notin A$         不属于  `$a \notin A$`
$A \cap B$         交集  `$A \cap B$`
$A \cup B$         并集  `$A \cup B$`
$A \setminus B$    差集  `$A \setminus B$`
$A^c$              补集  `$A^c$`
$\emptyset$       空集  `$\emptyset$`

$\forall x, \exists y$   全称、存在  `$\forall x, \exists y$`
$\land, \lor, \lnot$  与、或、非  `$\land, \lor, \lnot$`
$\Rightarrow, \Leftrightarrow$  推导、等价  `$\Rightarrow, \Leftrightarrow$`
$\pm$  加减；正负  `$\pm$`
$a \mid b$  整除  `$a \mid b$`
$a \nmid b$  不整除  `$a \nmid b$`

### 常见箭头符号对照表

| 类型   | 写法        | 显示 | HTML 实体 |
|--------|-------------|------|-----------|
| 单箭头  | `&rarr;`    | →    | &rarr;    |
|        | `&larr;`    | ←    | &larr;    |
|        | `&harr;`    | ↔    | &harr;    |
| 双箭头  | `&rArr;`    | ⇒    | &rArr;    |
|        | `&lArr;`    | ⇐    | &lArr;    |
|        | `&hArr;`    | ⇔    | &hArr;    |
| 其他    | `&uarr;`    | ↑    | &uarr;    |
|        | `&darr;`    | ↓    | &darr;    |
|        | `&UpDownArrow;` | ↕ | &UpDownArrow; |
|        | `&longrightarrow;` | ⟶ | &longrightarrow; |
|        | `&longleftarrow;`  | ⟵ | &longleftarrow;  |
|        | `&longleftrightarrow;` | ⟷ | &longleftrightarrow; |



### 群论

$(G, \cdot)$        群  `$(G, \cdot)$`
$\circ$，$\cdot$，$*$ 群运算  `$\circ$`，`$\cdot$ `，`$*$`
$e$                 群单位元  `$e$`
$a^{-1}$            逆元  `$a^{-1}$`
$\mathbb{Z}, \mathbb{Q}, \mathbb{R}, \mathbb{C}, \mathbb{F}_p$  整数、有理数、实数、复数、有限域  
$\langle a \rangle$  由 $a$ 生成的子群  `$\langle a \rangle$`
$\cong$             同构  `$\cong$`
$\triangleleft$      真正规子群  `$\triangleleft$`

### 环与域
    
$(R, +, \cdot)$    环  `$(R, +, \cdot)$`
$\mathbb{Z}_n$     模 $n$ 的整数环  `$\mathbb{Z}_n$`
$\mathbb{F}_{p^m}$ 有限域  `$\mathbb{F}_{p^m}$`
$\text{char}(R)$   环的特征  `$\text{char}(R)$`
$I \triangleleft R$   $R$ 的理想  `$I \triangleleft R$`
$R/I$              商环  `$R/I$`

### 数论 & 密码学常用

$\gcd(a,b)$       最大公因数  `$\gcd(a,b)$`
$\varphi(n)$      欧拉函数  `$\varphi(n)$`
$a \equiv b \pmod n$  同余  `$a \equiv b \pmod n$`
$\mathbb{Z}_n^*$   模 $n$ 的可逆元集合  `$\mathbb{Z}_n^*$`
$\text{ord}_n(a)$  元素阶  `$\text{ord}_n(a)$`

### 线性代数/向量空间

$V$ 向量空间  `$V$`
$\dim V$ 维数  `$\dim V$`
$\mathbb{F}_q^n$ n维向量空间  `$\mathbb{F}_q^n$`
$\langle v_1, \dots, v_k \rangle$ 生成子空间  `$\langle v_1, \dots, v_k \rangle$`

### 希腊字母表

| 大写 | LaTeX      | 小写 | LaTeX              | 常见用法            |
| -- | ---------- | -- | ------------------ | --------------- |
| Α  | `A`        | α  | `\alpha`           | 角度、系数           |
| Β  | `B`        | β  | `\beta`            | 系数、β函数          |
| Γ  | `\Gamma`   | γ  | `\gamma`           | 伽马函数、欧拉常数       |
| Δ  | `\Delta`   | δ  | `\delta`           | 差分、Dirac δ、偏导符号 |
| Ε  | `E`        | ε  | `\epsilon`         | 小量、误差           |
| Ζ  | `Z`        | ζ  | `\zeta`            | ζ函数             |
| Η  | `H`        | η  | `\eta`             | 效率、曲率           |
| Θ  | `\Theta`   | θ  | `\theta`           | 角度、渐进复杂度        |
| Ι  | `I`        | ι  | `\iota`            | 单射符号            |
| Κ  | `K`        | κ  | `\kappa`           | 曲率、条件数          |
| Λ  | `\Lambda`  | λ  | `\lambda`          | 特征值、拉格朗日乘子      |
| Μ  | `M`        | μ  | `\mu`              | 均值、μ函数          |
| Ν  | `N`        | ν  | `\nu`              | 泊松分布参数          |
| Ξ  | `\Xi`      | ξ  | `\xi`              | 随机变量            |
| Ο  | `O`        | ο  | —                  | 很少用             |
| Π  | `\Pi`      | π  | `\pi`              | 圆周率、乘积符号        |
| Ρ  | `P`        | ρ  | `\rho`             | 密度、相关系数         |
| Σ  | `\Sigma`   | σ  | `\sigma`           | 求和、标准差          |
| Τ  | `T`        | τ  | `\tau`             | 时间常数            |
| Υ  | `\Upsilon` | υ  | `\upsilon`         | 物理符号            |
| Φ  | `\Phi`     | φ  | `\phi` / `\varphi` | 黄金比、势函数         |
| Χ  | `X`        | χ  | `\chi`             | 特征函数、χ²分布       |
| Ψ  | `\Psi`     | ψ  | `\psi`             | 波函数、ψ函数         |
| Ω  | `\Omega`   | ω  | `\omega`           | 渐进复杂度、角频率       |

## 英语词汇

### 音标

* 元音：/iː/, /ɪ/, /e/, /æ/, /ʌ/, /ɜː/, /ə/, /uː/, /ʊ/, /ɔː/, /ɑː/, /ɒ/
* 双元音：/eɪ/, /aɪ/, /ɔɪ/, /aʊ/, /əʊ/ (BrE) /oʊ/ (AmE), /ɪə/, /eə/, /ʊə/
* 爆破音(Plosives)：/p/, /b/, /t/, /d/, /k/, /g/
* 摩擦音(Fricatives)：/f/, /v/, /θ/, /ð/, /s/, /z/, /ʃ/, /ʒ/, /h/
* 塞擦音(Approximants)：/tʃ/, /dʒ/
* 鼻音 (Nasals)：/m/, /n/, /ŋ/
* 边音与近音 (Approximants & Laterals)：/l/, /r/, /w/, /j/
* 重音与符号：ˈ (主重音), ˌ (次重音), ː (长音), · (音节分隔), ʔ (喉塞音)

### 单词

1. 几何图形
   1. **asymmetry** /'æsɪmətri/ n. 非对称性
   2. **decagon** /ˈdekəgɑn/ n. 十边形
   3. **diagonal** /daɪˈæɡənəl/ n. 对角线
   4. **equilateral** /ˌikwəˈlætərəl, ˌɛkwə-/ **triangle** 等边三角形
   5. **hexagon** /'heksəɡənz/ n.六边形
   6. **permutation** /ˌpɜrmjuˈteɪʃn/ n. 排列
   7. **polygon** /ˈpɒlɪɡɒn/ n. 多边形
   8. **symmetry** /ˈsɪmətri/ n. 对称性
2. 群论
   1. **abelian** /ə'biːlɪən/ adj. 阿贝尔的，交换的
