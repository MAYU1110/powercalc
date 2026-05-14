---
title: "LLC谐振变换器设计与优化技巧"
category: "topology"
tag: "电路拓扑"
date: "2026-05-10"
readTime: "15分钟"
author: "李四"
email: "lisi@example.com"
cover: "articles/image/co.png"
---



## 一、引言

LLC谐振变换器因其高效率、高功率密度的特点，广泛应用于服务器电源、适配器等领域。

## 二、谐振原理

LLC谐振电路的核心是谐振腔，由电感 $L_r$、励磁电感 $L_m$和谐振电容 $C_r$ 组成。

### 2.1 谐振频率

谐振频率计算公式：

$$ f_r = \frac{1}{2\pi\sqrt{L_r C_r}} $$

### 2.2 增益特性

LLC变换器的电压增益公式：

$$ M = \frac{V_{out}}{V_{in}} = \frac{1}{\sqrt{(1 - \frac{f_r}{f_s})^2 + (Q(\frac{f_s}{f_r} - \frac{f_r}{f_s}))^2}} $$

其中：
- $Q$：品质因数，$Q = \frac{\omega_r L_r}{R_{ac}}$
- $f_s$：开关频率

## 三、参数设计

### 3.1 谐振电感设计

$$ L_r = \frac{V_{in(min)} \cdot D_{max}}{2 \cdot f_s \cdot \Delta I_{Lr}} $$

### 3.2 励磁电感设计

励磁电感通常取谐振电感的5-20倍：

![图片说明](./image/buck.png)


$$ L_m = (5 \sim 20) \cdot L_r $$

## 四、设计流程图

```
输入规格 → 确定拓扑 → 计算谐振参数 → 选择磁性元件 → 电路仿真 → 样机制作 → 测试验证
```

## 五、仿真验证

使用PSPICE或SIMPLIS进行仿真分析：

```python
# 伪代码：LLC仿真参数设置
llc_params = {
    'Vin': 380,          # 输入电压
    'Vout': 12,          # 输出电压
    'Pout': 600,         # 输出功率
    'fs': 100e3,         # 开关频率
    'Lr': 15e-6,         # 谐振电感
    'Cr': 220e-12,       # 谐振电容
    'Lm': 200e-6         # 励磁电感
}
```

## 六、优化技巧

1. **软开关实现**：工作在谐振频率附近实现ZVS
2. **死区时间优化**：避免桥臂直通
3. **磁芯损耗降低**：选择低损耗磁芯材料
4. **PCB布局**：减小环路面积，降低EMI
