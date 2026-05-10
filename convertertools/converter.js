// 单位换算模块

// 单位换算关系配置（用于 KaTeX 渲染）
const unitRelations = {
    basic: [
        {
            name: '电压',
            baseUnit: 'V',
            baseLabel: '伏特',
            relations: [
                { unit: 'V', exponent: 0, label: '伏特' },
                { unit: 'kV', exponent: -3, label: '千伏' },
                { unit: 'mV', exponent: 3, label: '毫伏' },
                { unit: 'uV', exponent: 6, label: '微伏' }
            ]
        },
        {
            name: '电流',
            baseUnit: 'A',
            baseLabel: '安培',
            relations: [
                { unit: 'A', exponent: 0, label: '安培' },
                { unit: 'kA', exponent: -3, label: '千安' },
                { unit: 'mA', exponent: 3, label: '毫安' },
                { unit: 'uA', exponent: 6, label: '微安' }
            ]
        },
        {
            name: '电阻',
            baseUnit: 'Ohm',
            baseLabel: '欧姆',
            relations: [
                { unit: 'Ohm', exponent: 0, label: '欧姆' },
                { unit: 'kOhm', exponent: -3, label: '千欧' },
                { unit: 'MOhm', exponent: -6, label: '兆欧' }
            ]
        },
        {
            name: '功率',
            baseUnit: 'W',
            baseLabel: '瓦特',
            relations: [
                { unit: 'W', exponent: 0, label: '瓦特' },
                { unit: 'kW', exponent: -3, label: '千瓦' },
                { unit: 'MW', exponent: -6, label: '兆瓦' }
            ]
        },
        {
            name: '电量',
            baseUnit: 'C',
            baseLabel: '库仑',
            relations: [
                { unit: 'C', exponent: 0, label: '库仑' }
            ]
        },
        {
            name: '电导',
            baseUnit: 'S',
            baseLabel: '西门子',
            relations: [
                { unit: 'S', exponent: 0, label: '西门子' }
            ]
        }
    ],
    power: [
        {
            name: '有功功率',
            baseUnit: 'W',
            baseLabel: '瓦特',
            relations: [
                { unit: 'W', exponent: 0, label: '瓦特' },
                { unit: 'kW', exponent: -3, label: '千瓦' },
                { unit: 'MW', exponent: -6, label: '兆瓦' }
            ]
        },
        {
            name: '无功功率',
            baseUnit: 'Var',
            baseLabel: '无功伏安',
            relations: [
                { unit: 'Var', exponent: 0, label: '无功伏安' },
                { unit: 'kVar', exponent: -3, label: '千无功伏安' },
                { unit: 'MVar', exponent: -6, label: '兆无功伏安' }
            ]
        },
        {
            name: '电能',
            baseUnit: 'kWh',
            baseLabel: '千瓦时',
            relations: [
                { unit: 'kWh', exponent: 0, label: '千瓦时' },
                { unit: 'MWh', exponent: -3, label: '兆瓦时' }
            ]
        },
        {
            name: '马力',
            baseUnit: 'HP',
            baseLabel: '马力',
            relations: [
                { unit: 'HP', exponent: 0, label: '马力' }
            ]
        }
    ],
    frequency: [
        {
            name: '频率',
            baseUnit: 'Hz',
            baseLabel: '赫兹',
            relations: [
                { unit: 'Hz', exponent: 0, label: '赫兹' },
                { unit: 'kHz', exponent: -3, label: '千赫兹' },
                { unit: 'MHz', exponent: -6, label: '兆赫兹' },
                { unit: 'GHz', exponent: -9, label: '吉赫兹' }
            ]
        },
        {
            name: '时间',
            baseUnit: 's',
            baseLabel: '秒',
            relations: [
                { unit: 's', exponent: 0, label: '秒' },
                { unit: 'ms', exponent: 3, label: '毫秒' },
                { unit: 'us', exponent: 6, label: '微秒' },
                { unit: 'ns', exponent: 9, label: '纳秒' }
            ]
        }
    ],
    component: [
        {
            name: '电容',
            baseUnit: 'F',
            baseLabel: '法拉',
            relations: [
                { unit: 'F', exponent: 0, label: '法拉' },
                { unit: 'mF', exponent: 3, label: '毫法' },
                { unit: 'uF', exponent: 6, label: '微法' },
                { unit: 'nF', exponent: 9, label: '纳法' },
                { unit: 'pF', exponent: 12, label: '皮法' }
            ]
        },
        {
            name: '电感',
            baseUnit: 'H',
            baseLabel: '亨利',
            relations: [
                { unit: 'H', exponent: 0, label: '亨利' },
                { unit: 'mH', exponent: 3, label: '毫亨' },
                { unit: 'uH', exponent: 6, label: '微亨' },
                { unit: 'nH', exponent: 9, label: '纳亨' }
            ]
        }
    ],
    electromagnetic: [
        {
            name: '磁通',
            baseUnit: 'Wb',
            baseLabel: '韦伯',
            relations: [
                { unit: 'Wb', exponent: 0, label: '韦伯' }
            ]
        },
        {
            name: '磁感应强度',
            baseUnit: 'T',
            baseLabel: '特斯拉',
            relations: [
                { unit: 'T', exponent: 0, label: '特斯拉' }
            ]
        },
        {
            name: '阻抗',
            baseUnit: 'OhmZ',
            baseLabel: '欧姆',
            relations: [
                { unit: 'OhmZ', exponent: 0, label: '欧姆' }
            ]
        },
        {
            name: '电抗',
            baseUnit: 'OhmX',
            baseLabel: '欧姆',
            relations: [
                { unit: 'OhmX', exponent: 0, label: '欧姆' }
            ]
        }
    ],
    engineering: [
        {
            name: '温度',
            baseUnit: 'C',
            baseLabel: '摄氏度',
            relations: [
                { unit: 'C', exponent: 0, label: '摄氏度' },
                { unit: 'Fahrenheit', exponent: null, label: '华氏度' }
            ],
            formula: 'C = (F - 32) \\times \\frac{5}{9}'
        },
        {
            name: '长度',
            baseUnit: 'm',
            baseLabel: '米',
            relations: [
                { unit: 'm', exponent: 0, label: '米' },
                { unit: 'cm', exponent: 2, label: '厘米' },
                { unit: 'mm', exponent: 3, label: '毫米' }
            ]
        },
        {
            name: '面积',
            baseUnit: 'm2',
            baseLabel: '平方米',
            relations: [
                { unit: 'm2', exponent: 0, label: '平方米' },
                { unit: 'cm2', exponent: 4, label: '平方厘米' }
            ]
        },
        {
            name: '重量',
            baseUnit: 'kg',
            baseLabel: '千克',
            relations: [
                { unit: 'kg', exponent: 0, label: '千克' },
                { unit: 'g', exponent: 3, label: '克' }
            ]
        },
        {
            name: '压力',
            baseUnit: 'Pa',
            baseLabel: '帕斯卡',
            relations: [
                { unit: 'Pa', exponent: 0, label: '帕斯卡' },
                { unit: 'kPa', exponent: -3, label: '千帕' },
                { unit: 'MPa', exponent: -6, label: '兆帕' }
            ]
        }
    ],
    data: [
        {
            name: '存储单位',
            baseUnit: 'B',
            baseLabel: '字节',
            relations: [
                { unit: 'B', exponent: 0, label: '字节' },
                { unit: 'KB', exponent: -10, label: '千字节' },
                { unit: 'MB', exponent: -20, label: '兆字节' },
                { unit: 'GB', exponent: -30, label: '吉字节' },
                { unit: 'TB', exponent: -40, label: '太字节' }
            ],
            note: '(二进制换算，1 KB = 1024 B)'
        }
    ]
};

// 单位分组配置
const unitGroups = {
    basic: [
        { name: '电压', units: ['V', 'kV', 'mV', 'uV'] },
        { name: '电流', units: ['A', 'kA', 'mA', 'uA'] },
        { name: '电阻', units: ['Ohm', 'kOhm', 'MOhm'] },
        { name: '功率', units: ['W'] },
        { name: '电量', units: ['C'] },
        { name: '电导', units: ['S'] }
    ],
    power: [
        { name: '有功功率', units: ['W', 'kW', 'MW'] },
        { name: '无功功率', units: ['Var', 'kVar', 'MVar'] },
        { name: '电能', units: ['kWh', 'MWh'] },
        { name: '马力', units: ['HP'] }
    ],
    frequency: [
        { name: '频率', units: ['Hz', 'kHz', 'MHz', 'GHz'] },
        { name: '时间', units: ['s', 'ms', 'us', 'ns'] }
    ],
    component: [
        { name: '电容', units: ['F', 'mF', 'uF', 'nF', 'pF'] },
        { name: '电感', units: ['H', 'mH', 'uH', 'nH'] }
    ],
    electromagnetic: [
        { name: '磁通', units: ['Wb'] },
        { name: '磁感应强度', units: ['T'] },
        { name: '阻抗', units: ['OhmZ'] },
        { name: '电抗', units: ['OhmX'] }
    ],
    engineering: [
        { name: '温度', units: ['C', 'Fahrenheit'] },
        { name: '长度', units: ['m', 'cm', 'mm'] },
        { name: '面积', units: ['m2', 'cm2'] },
        { name: '重量', units: ['kg', 'g'] },
        { name: '压力', units: ['Pa', 'kPa', 'MPa'] }
    ],
    data: [
        { name: '存储单位', units: ['B', 'KB', 'MB', 'GB', 'TB'] }
    ]
};

const unitData = {
    basic: {
        units: ['V', 'kV', 'mV', 'uV', 'A', 'kA', 'mA', 'uA', 'Ohm', 'kOhm', 'MOhm', 'W', 'C', 'S'],
        labels: {
            'V': '伏特 (V)',
            'kV': '千伏 (kV)',
            'mV': '毫伏 (mV)',
            'uV': '微伏 (μV)',
            'A': '安培 (A)',
            'kA': '千安 (kA)',
            'mA': '毫安 (mA)',
            'uA': '微安 (μA)',
            'Ohm': '欧姆 (Ω)',
            'kOhm': '千欧 (kΩ)',
            'MOhm': '兆欧 (MΩ)',
            'W': '瓦特 (W)',
            'C': '库仑 (C)',
            'S': '西门子 (S)'
        },
        baseUnit: {
            'V': 'V', 'kV': 'V', 'mV': 'V', 'uV': 'V',
            'A': 'A', 'kA': 'A', 'mA': 'A', 'uA': 'A',
            'Ohm': 'Ohm', 'kOhm': 'Ohm', 'MOhm': 'Ohm',
            'W': 'W', 'C': 'C', 'S': 'S'
        },
        toBase: {
            'V': 1, 'kV': 1000, 'mV': 0.001, 'uV': 0.000001,
            'A': 1, 'kA': 1000, 'mA': 0.001, 'uA': 0.000001,
            'Ohm': 1, 'kOhm': 1000, 'MOhm': 1000000,
            'W': 1, 'C': 1, 'S': 1
        },
        fromBase: {
            'V': 1, 'kV': 0.001, 'mV': 1000, 'uV': 1000000,
            'A': 1, 'kA': 0.001, 'mA': 1000, 'uA': 1000000,
            'Ohm': 1, 'kOhm': 0.001, 'MOhm': 0.000001,
            'W': 1, 'C': 1, 'S': 1
        }
    },
    power: {
        units: ['W', 'kW', 'MW', 'Var', 'kVar', 'MVar', 'kWh', 'MWh', 'HP'],
        labels: {
            'W': '瓦特 (W)',
            'kW': '千瓦 (kW)',
            'MW': '兆瓦 (MW)',
            'Var': '无功伏安 (Var)',
            'kVar': '千无功伏安 (kVar)',
            'MVar': '兆无功伏安 (MVar)',
            'kWh': '千瓦时 (kWh)',
            'MWh': '兆瓦时 (MWh)',
            'HP': '马力 (HP)'
        },
        baseUnit: {
            'W': 'W', 'kW': 'W', 'MW': 'W',
            'Var': 'Var', 'kVar': 'Var', 'MVar': 'Var',
            'kWh': 'kWh', 'MWh': 'kWh',
            'HP': 'HP'
        },
        toBase: {
            'W': 1, 'kW': 1000, 'MW': 1000000,
            'Var': 1, 'kVar': 1000, 'MVar': 1000000,
            'kWh': 1, 'MWh': 1000,
            'HP': 1
        },
        fromBase: {
            'W': 1, 'kW': 0.001, 'MW': 0.000001,
            'Var': 1, 'kVar': 0.001, 'MVar': 0.000001,
            'kWh': 1, 'MWh': 0.001,
            'HP': 1
        }
    },
    frequency: {
        units: ['Hz', 'kHz', 'MHz', 'GHz', 's', 'ms', 'us', 'ns'],
        labels: {
            'Hz': '赫兹 (Hz)',
            'kHz': '千赫兹 (kHz)',
            'MHz': '兆赫兹 (MHz)',
            'GHz': '吉赫兹 (GHz)',
            's': '秒 (s)',
            'ms': '毫秒 (ms)',
            'us': '微秒 (μs)',
            'ns': '纳秒 (ns)'
        },
        baseUnit: {
            'Hz': 'Hz', 'kHz': 'Hz', 'MHz': 'Hz', 'GHz': 'Hz',
            's': 's', 'ms': 's', 'us': 's', 'ns': 's'
        },
        toBase: {
            'Hz': 1, 'kHz': 1000, 'MHz': 1000000, 'GHz': 1000000000,
            's': 1, 'ms': 0.001, 'us': 0.000001, 'ns': 0.000000001
        },
        fromBase: {
            'Hz': 1, 'kHz': 0.001, 'MHz': 0.000001, 'GHz': 0.000000001,
            's': 1, 'ms': 1000, 'us': 1000000, 'ns': 1000000000
        }
    },
    component: {
        units: ['F', 'mF', 'uF', 'nF', 'pF', 'H', 'mH', 'uH', 'nH'],
        labels: {
            'F': '法拉 (F)',
            'mF': '毫法 (mF)',
            'uF': '微法 (μF)',
            'nF': '纳法 (nF)',
            'pF': '皮法 (pF)',
            'H': '亨利 (H)',
            'mH': '毫亨 (mH)',
            'uH': '微亨 (μH)',
            'nH': '纳亨 (nH)'
        },
        baseUnit: {
            'F': 'F', 'mF': 'F', 'uF': 'F', 'nF': 'F', 'pF': 'F',
            'H': 'H', 'mH': 'H', 'uH': 'H', 'nH': 'H'
        },
        toBase: {
            'F': 1, 'mF': 0.001, 'uF': 0.000001, 'nF': 0.000000001, 'pF': 0.000000000001,
            'H': 1, 'mH': 0.001, 'uH': 0.000001, 'nH': 0.000000001
        },
        fromBase: {
            'F': 1, 'mF': 1000, 'uF': 1000000, 'nF': 1000000000, 'pF': 1000000000000,
            'H': 1, 'mH': 1000, 'uH': 1000000, 'nH': 1000000000
        }
    },
    electromagnetic: {
        units: ['Wb', 'T', 'OhmZ', 'OhmX'],
        labels: {
            'Wb': '韦伯 (Wb)',
            'T': '特斯拉 (T)',
            'OhmZ': '阻抗 (Ω)',
            'OhmX': '电抗 (Ω)'
        },
        baseUnit: { 'Wb': 'Wb', 'T': 'T', 'OhmZ': 'OhmZ', 'OhmX': 'OhmX' },
        toBase: { 'Wb': 1, 'T': 1, 'OhmZ': 1, 'OhmX': 1 },
        fromBase: { 'Wb': 1, 'T': 1, 'OhmZ': 1, 'OhmX': 1 }
    },
    engineering: {
        units: ['C', 'Fahrenheit', 'm', 'cm', 'mm', 'm2', 'cm2', 'kg', 'g', 'Pa', 'kPa', 'MPa'],
        labels: {
            'C': '摄氏度 (℃)',
            'Fahrenheit': '华氏度 (℉)',
            'm': '米 (m)',
            'cm': '厘米 (cm)',
            'mm': '毫米 (mm)',
            'm2': '平方米 (m²)',
            'cm2': '平方厘米 (cm²)',
            'kg': '千克 (kg)',
            'g': '克 (g)',
            'Pa': '帕斯卡 (Pa)',
            'kPa': '千帕 (kPa)',
            'MPa': '兆帕 (MPa)'
        },
        baseUnit: {
            'C': 'C', 'Fahrenheit': 'C',
            'm': 'm', 'cm': 'm', 'mm': 'm',
            'm2': 'm2', 'cm2': 'm2',
            'kg': 'kg', 'g': 'kg',
            'Pa': 'Pa', 'kPa': 'Pa', 'MPa': 'Pa'
        },
        toBase: {
            'C': 1, 'Fahrenheit': function(val) { return (val - 32) * 5/9; },
            'm': 1, 'cm': 0.01, 'mm': 0.001,
            'm2': 1, 'cm2': 0.0001,
            'kg': 1, 'g': 0.001,
            'Pa': 1, 'kPa': 1000, 'MPa': 1000000
        },
        fromBase: {
            'C': 1, 'Fahrenheit': function(val) { return val * 9/5 + 32; },
            'm': 1, 'cm': 100, 'mm': 1000,
            'm2': 1, 'cm2': 10000,
            'kg': 1, 'g': 1000,
            'Pa': 1, 'kPa': 0.001, 'MPa': 0.000001
        }
    },
    data: {
        units: ['B', 'KB', 'MB', 'GB', 'TB'],
        labels: {
            'B': '字节 (B)',
            'KB': '千字节 (KB)',
            'MB': '兆字节 (MB)',
            'GB': '吉字节 (GB)',
            'TB': '太字节 (TB)'
        },
        baseUnit: { 'B': 'B', 'KB': 'B', 'MB': 'B', 'GB': 'B', 'TB': 'B' },
        toBase: { 'B': 1, 'KB': 1024, 'MB': 1048576, 'GB': 1073741824, 'TB': 1099511627776 },
        fromBase: { 'B': 1, 'KB': 1/1024, 'MB': 1/1048576, 'GB': 1/1073741824, 'TB': 1/1099511627776 }
    }
};

class ConverterModule {
    constructor() {
        this.currentCategory = 'basic';
        requestAnimationFrame(() => this.init());
    }

    init() {
        if (!document.querySelector('.tab-item')) {
            setTimeout(() => this.init(), 50);
            return;
        }
        this.setupElements();
        this.setupEventListeners();
        this.populateUnits('basic');
        // 初始化单位换算关系显示（只显示当前选中单位类型）
        this.renderUnitRelationsByUnit(this.inputUnit.value);
    }

    setupElements() {
        this.tabItems = document.querySelectorAll('.tab-item');
        this.inputValue = document.getElementById('inputValue');
        this.inputUnit = document.getElementById('inputUnit');
        this.outputValue = document.getElementById('outputValue');
        this.outputUnit = document.getElementById('outputUnit');
    }

    setupEventListeners() {
        const self = this;
        
        // 一级分类标签切换
        document.querySelector('.tab-nav').addEventListener('click', function(e) {
            const target = e.target;
            if (target.classList.contains('tab-item')) {
                const category = target.dataset.category;
                self.switchCategory(category);
            }
        });

        // 输入变化
        this.inputValue.addEventListener('input', () => {
            this.convert();
        });

        // 单位变化 - 输入单位变化时自动同步输出单位到同类型
        this.inputUnit.addEventListener('change', () => {
            this.syncOutputUnit();
            this.renderUnitRelationsByUnit(this.inputUnit.value);
            this.convert();
        });

        this.outputUnit.addEventListener('change', () => {
            this.convert();
        });
    }

    switchCategory(category) {
        this.currentCategory = category;
        
        // 更新标签状态
        this.tabItems.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            }
        });

        // 更新单位选项
        this.populateUnits(category);
        
        // 同步输出单位到同类型（修复切换分类时输出单位不同步的问题）
        this.syncOutputUnit();
        
        // 更新单位换算关系显示（只显示当前选中单位类型）
        this.renderUnitRelationsByUnit(this.inputUnit.value);
        
        // 清空输入输出
        this.inputValue.value = '';
        this.outputValue.value = '';
    }

    populateUnits(category) {
        const data = unitData[category];
        const groups = unitGroups[category];
        
        if (!data || !groups) return;

        // 清空并填充输入单位（带分组）
        this.inputUnit.innerHTML = '';
        this.outputUnit.innerHTML = '';

        let firstUnit = null;
        let secondUnit = null;
        let unitCount = 0;

        groups.forEach(group => {
            // 创建分组标签
            const optgroup1 = document.createElement('optgroup');
            optgroup1.label = group.name;
            
            const optgroup2 = document.createElement('optgroup');
            optgroup2.label = group.name;

            group.units.forEach((unit, index) => {
                // 记录第一个和第二个单位
                if (unitCount === 0) firstUnit = unit;
                if (unitCount === 1) secondUnit = unit;
                unitCount++;

                const option1 = document.createElement('option');
                option1.value = unit;
                option1.textContent = data.labels[unit];
                optgroup1.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = unit;
                option2.textContent = data.labels[unit];
                optgroup2.appendChild(option2);
            });

            this.inputUnit.appendChild(optgroup1);
            this.outputUnit.appendChild(optgroup2);
        });

        // 设置默认选中值
        if (firstUnit) {
            this.inputUnit.value = firstUnit;
        }
        if (secondUnit) {
            this.outputUnit.value = secondUnit;
        } else if (firstUnit) {
            this.outputUnit.value = firstUnit;
        }
    }

    syncOutputUnit() {
        const inputUnit = this.inputUnit.value;
        const outputUnit = this.outputUnit.value;
        const data = unitData[this.currentCategory];
        
        if (!data) return;

        const inputBase = data.baseUnit[inputUnit];
        const outputBase = data.baseUnit[outputUnit];

        // 如果基础类型相同，不需要切换
        if (inputBase === outputBase) return;

        // 获取当前分类的单位分组
        const groups = unitGroups[this.currentCategory];
        if (!groups) return;

        // 找到同类型的单位
        let targetUnit = null;
        for (const group of groups) {
            if (group.units.includes(inputUnit)) {
                // 在同一组中找一个不同的单位
                targetUnit = group.units.find(u => u !== inputUnit);
                break;
            }
        }

        if (targetUnit) {
            this.outputUnit.value = targetUnit;
        }
    }

    // 根据当前选中的单位渲染换算关系（只显示该单位类型）
    renderUnitRelationsByUnit(unit) {
        const relations = unitRelations[this.currentCategory];
        const container = document.getElementById('unitRelations');
        
        if (!relations || !container || !unit) return;

        // 找到当前单位所属的分组
        let currentGroup = null;
        for (const group of relations) {
            if (group.relations.some(r => r.unit === unit)) {
                currentGroup = group;
                break;
            }
        }

        if (!currentGroup) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">暂无换算关系</p>';
            return;
        }

        let html = `
            <div class="relation-group">
                <div class="relation-formula">`;

        // 生成 KaTeX 公式
        const formulaParts = [];
        currentGroup.relations.forEach((rel, index) => {
            if (rel.exponent !== null) {
                const unitSymbol = this.getUnitSymbol(rel.unit);
                if (rel.exponent === 0) {
                    formulaParts.push(`1${unitSymbol}`);
                } else {
                    const exp = Math.abs(rel.exponent);
                    const prefix = rel.exponent > 0 ? '' : '=';
                    formulaParts.push(`${prefix}10^{${-rel.exponent}}${unitSymbol}`);
                }
            }
        });

        html += `<span class="katex">\\(${formulaParts.join(' = ')}\\)</span>`;

        html += `</div></div>`;

        container.innerHTML = html;

        // 延迟调用 KaTeX 渲染
        setTimeout(() => {
            if (window.renderMathInElement) {
                renderMathInElement(container, {
                    delimiters: [
                        { left: '\\(', right: '\\)', display: false }
                    ]
                });
            }
        }, 100);
    }

    convert() {
        const inputVal = parseFloat(this.inputValue.value);
        
        if (isNaN(inputVal)) {
            this.outputValue.value = '';
            return;
        }

        const fromUnit = this.inputUnit.value;
        const toUnit = this.outputUnit.value;
        const data = unitData[this.currentCategory];

        if (!data) {
            this.outputValue.value = '无法换算';
            return;
        }

        // 检查是否可换算（同类型单位）
        if (data.baseUnit[fromUnit] !== data.baseUnit[toUnit]) {
            this.outputValue.value = '无法换算';
            return;
        }

        try {
            // 转换到基准单位
            let baseValue;
            if (typeof data.toBase[fromUnit] === 'function') {
                baseValue = data.toBase[fromUnit](inputVal);
            } else {
                baseValue = inputVal * data.toBase[fromUnit];
            }

            // 转换到目标单位
            let result;
            if (typeof data.fromBase[toUnit] === 'function') {
                result = data.fromBase[toUnit](baseValue);
            } else {
                result = baseValue * data.fromBase[toUnit];
            }

            // 处理极端数值
            if (Math.abs(result) < 0.0000000001 && result !== 0) {
                this.outputValue.value = '数值超出范围';
            } else if (Math.abs(result) > 1000000000000) {
                this.outputValue.value = '数值超出范围';
            } else {
                // 格式化输出
                this.outputValue.value = this.formatNumber(result);
            }
        } catch (e) {
            this.outputValue.value = '计算错误';
        }
    }

    formatNumber(num) {
        if (Math.abs(num) >= 1000000000) {
            return num.toExponential(6);
        } else if (Math.abs(num) >= 1000000) {
            return num.toFixed(6);
        } else if (Math.abs(num) >= 1000) {
            return num.toFixed(4);
        } else if (Math.abs(num) >= 0.001) {
            return num.toFixed(6);
        } else if (Math.abs(num) > 0) {
            return num.toExponential(6);
        } else {
            return '0';
        }
    }

    // 渲染单位换算关系（保留作为备用方法）
    renderUnitRelations(category) {
        const relations = unitRelations[category];
        const container = document.getElementById('unitRelations');
        
        if (!relations || !container) return;

        let html = '';
        
        relations.forEach(group => {
            html += `
                <div class="relation-group">
                    <div class="relation-title">${group.name}</div>
                    <div class="relation-formula">`;
            
            // 生成 KaTeX 公式
            const formulaParts = [];
            group.relations.forEach((rel, index) => {
                if (rel.exponent !== null) {
                    const unitSymbol = this.getUnitSymbol(rel.unit);
                    if (rel.exponent === 0) {
                        formulaParts.push(`1${unitSymbol}`);
                    } else {
                        const exp = Math.abs(rel.exponent);
                        const prefix = rel.exponent > 0 ? '' : '=';
                        formulaParts.push(`${prefix}10^{${-rel.exponent}}${unitSymbol}`);
                    }
                }
            });
            
            html += `<span class="katex">\\(${formulaParts.join(' = ')}\\)</span>`;
            
            if (group.formula) {
                html += `<br><span class="katex">\\(${group.formula}\\)</span>`;
            }
            
            if (group.note) {
                html += `<br><span style="font-size: 0.8rem; color: var(--text-muted);">${group.note}</span>`;
            }
            
            html += `</div></div>`;
        });
        
        container.innerHTML = html;
        
        // 延迟调用 KaTeX 渲染
        setTimeout(() => {
            if (window.renderMathInElement) {
                renderMathInElement(container, {
                    delimiters: [
                        { left: '\\(', right: '\\)', display: false }
                    ]
                });
            }
        }, 100);
    }

    // 获取单位符号
    getUnitSymbol(unit) {
        const symbolMap = {
            'V': '\\text{V}', 'kV': '\\text{kV}', 'mV': '\\text{mV}', 'uV': '\\mu\\text{V}',
            'A': '\\text{A}', 'kA': '\\text{kA}', 'mA': '\\text{mA}', 'uA': '\\mu\\text{A}',
            'Ohm': '\\Omega', 'kOhm': 'k\\Omega', 'MOhm': 'M\\Omega',
            'W': '\\text{W}', 'kW': '\\text{kW}', 'MW': '\\text{MW}',
            'C': '\\text{C}', 'S': '\\text{S}',
            'Var': '\\text{Var}', 'kVar': '\\text{kVar}', 'MVar': '\\text{MVar}',
            'kWh': '\\text{kWh}', 'MWh': '\\text{MWh}', 'HP': '\\text{HP}',
            'Hz': '\\text{Hz}', 'kHz': '\\text{kHz}', 'MHz': '\\text{MHz}', 'GHz': '\\text{GHz}',
            's': '\\text{s}', 'ms': '\\text{ms}', 'us': '\\mu\\text{s}', 'ns': '\\text{ns}',
            'F': '\\text{F}', 'mF': '\\text{mF}', 'uF': '\\mu\\text{F}', 'nF': '\\text{nF}', 'pF': '\\text{pF}',
            'H': '\\text{H}', 'mH': '\\text{mH}', 'uH': '\\mu\\text{H}', 'nH': '\\text{nH}',
            'Wb': '\\text{Wb}', 'T': '\\text{T}', 'OhmZ': '\\Omega', 'OhmX': '\\Omega',
            'm': '\\text{m}', 'cm': '\\text{cm}', 'mm': '\\text{mm}',
            'm2': '\\text{m}^2', 'cm2': '\\text{cm}^2',
            'kg': '\\text{kg}', 'g': '\\text{g}',
            'Pa': '\\text{Pa}', 'kPa': '\\text{kPa}', 'MPa': '\\text{MPa}',
            'B': '\\text{B}', 'KB': '\\text{KB}', 'MB': '\\text{MB}', 'GB': '\\text{GB}', 'TB': '\\text{TB}'
        };
        return symbolMap[unit] || unit;
    }
}

window.ConverterModule = ConverterModule;