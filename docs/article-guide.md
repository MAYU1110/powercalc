# PowerCalc 技术文章写作指南

## 一、文章格式规范

### 1. 文件命名规则
- 使用英文小写字母和连字符
- 文件名应反映文章内容
- 示例：`buck-boost-design.md`

### 2. 元数据格式（必须放在文章开头）

```markdown
---
title: "文章标题"           # 必填
category: "topology"       # 必填，分类标识
tag: "电路拓扑"            # 必填，显示标签
date: "2026-05-15"        # 必填，格式：YYYY-MM-DD
readTime: "10分钟"         # 必填，预估阅读时间
author: "作者名"           # 选填，作者姓名
email: "author@example.com" # 选填，作者邮箱
cover: "articles/image/cover.png"  # 选填，封面图路径（绝对路径）
---
```

### 3. 分类标识对应关系

| category 值 | tag 显示 | 说明 |
|-------------|----------|------|
| topology | 电路拓扑 | Buck、Boost、LLC等拓扑相关 |
| power | 功率变换 | 功率转换、效率优化等 |
| magnetic | 磁性元件 | 电感、变压器、磁芯设计 |
| control | 控制策略 | PID、数字控制等 |
| thermal | 热设计 | 散热、温度管理 |

## 二、写作规范

### 1. 标题层级
- 一级标题：`# 标题`（文章标题，仅一个）
- 二级标题：`## 章节标题`
- 三级标题：`### 小节标题`

### 2. 代码块
```markdown
```javascript
function calculate() {
    return result;
}
```
```

### 3. 数学公式（使用 LaTeX 语法）

**行内公式**：
```markdown
欧姆定律：$V = IR$
```

**独立公式**：
```markdown
$$ P = \frac{V^2}{R} $$
```

常用公式示例：
- 下标：`$V_{in}$` → $V_{in}$
- 上标：`$R^2$` → $R^2$
- 分数：`$\frac{a}{b}$` → $\frac{a}{b}$
- 根号：`$\sqrt{x}$` → $\sqrt{x}$
- 三角函数：`$\sin\theta$` → $\sin\theta$
- 积分：`$\int f(x)dx$` → $\int f(x)dx$

### 4. 图片引用

文章图片存放在 `articles/image/` 目录下，分为两种用法：

**封面图**（用于文章列表卡片显示）：
- 在 frontmatter 的 `cover` 字段中指定
- 使用绝对路径：`articles/image/your-cover.png`

```markdown
---
title: "文章标题"
cover: "articles/image/buck-boost-cover.png"
---
```

**正文图**（在文章内容中显示）：
- 在正文中使用相对路径引用
- 格式：`./image/your-image.png`

```markdown
![正文图片说明](./image/your-image.png)
```

> **注意**：封面图和正文图的路径写法不同，请勿混淆！

## 三、示例文章

```markdown
---
title: "深入理解Buck-Boost转换器"
category: "topology"
tag: "电路拓扑"
date: "2026-05-15"
readTime: "12分钟"
author: "作者名"
email: "author@example.com"
cover: "articles/image/buckboost-cover.png"
---

# 深入理解Buck-Boost转换器

## 一、概述

Buck-Boost转换器是一种常见的DC-DC拓扑，可以实现电压的升降压转换。

![buck-boost拓扑图](./image/buckboost_topology.png)

## 二、工作原理

### 2.1 基本公式

输出电压公式：
$$ V_{out} = V_{in} \cdot \frac{D}{1-D} $$

其中，$D$ 为占空比。

### 2.2 电流纹波

电感电流纹波：
$$ \Delta I_L = \frac{V_{in} \cdot D \cdot T_s}{L} $$

## 三、代码示例

```python
def calculate_output(input_voltage, duty_cycle):
    """计算Buck-Boost输出电压"""
    return input_voltage * duty_cycle / (1 - duty_cycle)
```

## 四、结论

Buck-Boost转换器适用于需要宽输入电压范围的场合。
```

## 四、注意事项

1. **文件编码**：必须使用 UTF-8 编码
2. **图片路径**：
   - 封面图：在 frontmatter 中使用 `articles/image/xxx.png`
   - 正文图：在正文中使用 `./image/xxx.png`
3. **图片尺寸**：封面图建议 400×200 像素
4. **公式语法**：使用标准 LaTeX 语法，KaTeX 会自动渲染
5. **分类一致性**：category 值必须与 filter 按钮一致
6. **摘要长度**：建议摘要不超过 150 字

## 五、新增文章步骤

1. 在 `articles/article/` 目录创建 `.md` 文件
2. 添加元数据和文章内容
3. 如需封面图，上传到 `articles/image/`
4. 刷新页面即可看到新文章
