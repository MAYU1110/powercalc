/**
 * 变压器 AP 法自动设计工具 - 核心计算模块
 * 
 * 功能：
 * 1. 支持 5 种拓扑：Flyback / Forward / 半桥 / 全桥 / LLC
 * 2. AP 面积乘积法自动选型
 * 3. 匝数、线规自动计算
 * 4. 反激气隙计算
 * 5. 电气校验（饱和/填充率/电压偏差）
 * 6. 损耗与温升估算
 * 7. TXT/PDF 报告导出
 * 8. 设计历史记录
 */

const Transformer = {
    // 存储当前设计结果
    currentDesign: null,
    
    // 设计历史记录
    designHistory: [],

    // 拓扑视在功率系数 Ktopo
    Ktopo: {
        flyback_ccm: 1.6,
        flyback_dcm: 2.2,
        forward: 1.25,
        halfbridge: 1.4,
        fullbridge: 1.1,
        llc: 1.15
    },

    /**
     * 模块初始化
     */
    init() {
        // 加载历史记录
        this.loadHistory();
        
        // 初始化拓扑切换
        this.onTopologyChange();
        
        // 渲染拓扑示意图
        this.renderTopologySchematic('flyback');
    },

    /**
     * 拓扑切换事件处理
     */
    onTopologyChange() {
        const topoType = document.getElementById('topoType').value;
        
        // 隐藏所有拓扑专属参数区域
        document.querySelectorAll('.topology-specific-params').forEach(el => {
            el.style.display = 'none';
        });
        
        // 根据拓扑类型显示专属参数
        switch (topoType) {
            case 'flyback':
                document.getElementById('flyback-params').style.display = 'block';
                break;
            case 'llc':
                document.getElementById('llc-params').style.display = 'block';
                break;
            // forward, halfbridge, fullbridge 无专属参数
        }
        
        // 渲染对应拓扑示意图
        this.renderTopologySchematic(topoType);
    },

    /**
     * 渲染拓扑结构示意图
     * @param {string} topoType - 拓扑类型
     */
    renderTopologySchematic(topoType) {
        const container = document.getElementById('topology-schematic');
        if (!container) return;

        // 拓扑图片映射（图片路径：image/topology/xxx_topology.png）
        const schematics = {
            flyback: `<img src="image/topology/flyback_topology.png" alt="反激 (Flyback) 拓扑" style="max-width: 100%; max-height: 300px; object-fit: contain;">`,
            forward: `<img src="image/topology/forward_topology.png" alt="正激 (Forward) 拓扑" style="max-width: 100%; max-height: 300px; object-fit: contain;">`,
            halfbridge: `<img src="image/topology/halfbridge_topology.png" alt="半桥 (Half-Bridge) 拓扑" style="max-width: 100%; max-height: 300px; object-fit: contain;">`,
            fullbridge: `<img src="image/topology/fullbridge_topology.png" alt="全桥 (Full-Bridge) 拓扑" style="max-width: 100%; max-height: 300px; object-fit: contain;">`,
            llc: `<img src="image/topology/llc_topology.png" alt="LLC 谐振拓扑" style="max-width: 100%; max-height: 300px; object-fit: contain;">`
        };

        container.innerHTML = schematics[topoType] || schematics.flyback;
    },

    /**
     * 获取表单输入值
     */
    getInputParams() {
        return {
            // 通用参数
            Vin: Number(document.getElementById('Vin').value),
            Vout: Number(document.getElementById('Vout').value),
            Iout: Number(document.getElementById('Iout').value),
            fs: Number(document.getElementById('fs').value) * 1000,  // kHz → Hz
            eta: Number(document.getElementById('eta').value),
            Bmax: Number(document.getElementById('Bmax').value),
            J: Number(document.getElementById('J').value),
            Kw: Number(document.getElementById('Kw').value),
            Vf: Number(document.getElementById('Vf').value),
            coreMaterial: document.getElementById('coreMaterial').value,
            topoType: document.getElementById('topoType').value,
            
            // Flyback 专属参数
            workMode: document.getElementById('workMode')?.value || 'ccm',
            Dmax: Number(document.getElementById('Dmax')?.value || 0.45),
            Vor: Number(document.getElementById('Vor')?.value || 100),
            Lm: Number(document.getElementById('Lm')?.value || 500),
            
            // LLC 专属参数
            gainTarget: Number(document.getElementById('gainTarget')?.value || 1.0),
            LrRatio: Number(document.getElementById('LrRatio')?.value || 0.2),
            fr: Number(document.getElementById('fr')?.value || 100) * 1000,  // kHz → Hz
            Q: Number(document.getElementById('Q')?.value || 0.5)
        };
    },

    /**
     * 表单参数验证
     */
    validateParams(params) {
        const required = ['Vin', 'Vout', 'Iout', 'fs', 'eta', 'Bmax', 'J', 'Kw', 'Vf'];
        for (const key of required) {
            if (!params[key] || isNaN(params[key]) || params[key] <= 0) {
                return { valid: false, message: `参数 ${key} 必须为正数` };
            }
        }
        
        // Flyback 专属验证
        if (params.topoType === 'flyback') {
            if (!params.Dmax || params.Dmax <= 0 || params.Dmax >= 1) {
                return { valid: false, message: '占空比 Dmax 必须在 0~1 之间' };
            }
        }
        
        return { valid: true };
    },

    /**
     * 主计算函数
     */
    calculate() {
        // 获取输入参数
        const params = this.getInputParams();
        
        // 参数验证
        const validation = this.validateParams(params);
        if (!validation.valid) {
            alert(validation.message);
            return;
        }

        // 计算基础功率
        const Po = params.Vout * params.Iout;  // 输出功率
        const Pin = Po / params.eta;           // 输入功率

        // 获取拓扑系数
        let ktopoKey = params.topoType;
        if (params.topoType === 'flyback') {
            ktopoKey = `flyback_${params.workMode}`;
        }
        const Ktopo = this.Ktopo[ktopoKey] || 1.5;
        const Pt = Ktopo * Pin;  // 视在功率

        // 计算 AP 值
        // AP = Pt / (fs * Bmax * J * Kw)
        // 注意：单位转换 fs 单位 Hz，Bmax 单位 T，J 单位 A/mm²
        const fs_Hz = params.fs;
        const AP = Pt * 1e6 / (fs_Hz * params.Bmax * params.J * params.Kw);  // mm^4

        // 自动选择磁芯
        const coreSelection = CoreDatabase.selectCore(AP);
        const selectedCore = coreSelection.primary;
        const Ae_mm2 = selectedCore.Ae;  // mm²
        const Aw_mm2 = selectedCore.Aw;  // mm²
        const le_mm = selectedCore.le;   // mm
        const coreAP = Ae_mm2 * Aw_mm2; // mm^4

        // 获取磁芯材料参数
        const material = CoreDatabase.materials[params.coreMaterial] || CoreDatabase.materials['N87'];
        const Bs = material.Bs;  // 饱和磁通密度

        // 计算原边匝数
        // Np = Vin / (4 * fs * Bmax * Ae)
        // 注意：Ae 需要从 mm² 转换为 m²
        const Ae_m2 = Ae_mm2 * 1e-6;  // m²
        const Np_raw = params.Vin / (4 * params.fs * params.Bmax * Ae_m2);
        const Np = Math.ceil(Np_raw);  // 向上取整

        // 计算副边匝数
        const Vsec = params.Vout + params.Vf;  // 副边电压
        let Ns, n;
        
        if (params.topoType === 'flyback') {
            // 反激：根据反射电压Vor计算匝比和副边匝数
            // Vor = n * Vsec，其中 n = Np/Ns
            // 所以 Ns = Np * Vsec / Vor
            Ns = Math.ceil(Np * Vsec / params.Vor);
            n = Np / Ns;
        } else if (params.topoType === 'llc') {
            // LLC：匝比计算
            n = params.Vin / (2 * Vsec);
            Ns = Math.ceil(Np / n);
        } else {
            // 其他拓扑：n = Vin / (2 * Vsec)
            n = params.Vin / (2 * Vsec);
            Ns = Math.ceil(Np / n);
        }

        // 计算电流
        const Iin = Pin / params.Vin;  // 输入电流
        const Iprms = this.calculatePrimaryRMS(params, Iin);  // 原边有效值电流
        const Isrms = this.calculateSecondaryRMS(params, params.Iout);  // 副边有效值电流

        // 选择导线
        const Scu_p = Iprms / params.J;  // 原边导线截面积 (mm²)
        const Scu_s = Isrms / params.J;  // 副边导线截面积 (mm²)
        
        const wireP = WireGauge.selectWire(Scu_p, params.fs);
        const wireS = WireGauge.selectWire(Scu_s, params.fs);

        // 计算气隙（反激专属）
        let airGap = null;
        if (params.topoType === 'flyback') {
            // μ0 = 4π × 10^-7 H/m
            const mu0 = 4 * Math.PI * 1e-7;
            // Lm 需要从 μH 转换为 H
            const Lm_H = params.Lm * 1e-6;
            // δ = (μ0 * Np² * Ae / Lm) - le/μr
            // 假设无气隙时相对磁导率 μr ≈ 2000 (铁氧体)
            const ur = 2000;
            const airGapFirstTerm = mu0 * Np * Np * Ae_m2 / Lm_H;
            const airGapSecondTerm = le_mm * 1e-3 / ur;
            // 单边气隙长度 (mm)
            airGap = (airGapFirstTerm - airGapSecondTerm) * 1000 / 2;  // 除以2得到单边
            airGap = Math.max(0.01, airGap);  // 最小气隙 0.01mm
        }

        // 校验计算
        const verification = this.verifyDesign(params, selectedCore, Np, Ns, wireP, wireS);

        // 损耗计算（传入电流值）
        const losses = this.calculateLosses(params, selectedCore, Np, Ns, wireP, wireS, Iprms, Isrms);

        // 组装设计结果
        this.currentDesign = {
            params: params,
            power: { Po, Pin, Pt },
            core: {
                selected: selectedCore,
                alternative: coreSelection.alternative,
                warning: coreSelection.warning,
                material: material,
                AP: AP,
                coreAP: coreAP
            },
            turns: { Np, Ns, n, Np_raw },
            current: { Iin, Iprms, Isrms },
            wire: {
                primary: wireP.primary,
                secondary: wireS.primary
            },
            airGap: airGap,
            verification: verification,
            losses: losses,
            safety: this.generateSafetyAdvice(params, selectedCore)
        };

        // 保存设计历史
        this.saveDesign();

        // 渲染结果
        this.renderResults();

        // 显示手动调整区域
        document.getElementById('manual-adjust-section').style.display = 'block';
        document.getElementById('Np_manual').value = Np;
        document.getElementById('Ns_manual').value = Ns;
        document.getElementById('AWG_p_manual').value = wireP.primary.awg;
        document.getElementById('AWG_s_manual').value = wireS.primary.awg;

        // 滚动到结果区域
        document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
    },

    /**
     * 计算原边有效值电流
     */
    calculatePrimaryRMS(params, Iin) {
        const topo = params.topoType;
        // 获取占空比，非 flyback 拓扑使用默认值 0.5
        const D = params.Dmax || 0.5;
        
        switch (topo) {
            case 'flyback':
                if (params.workMode === 'ccm') {
                    return Iin * Math.sqrt(params.Dmax || 0.45);
                } else {
                    return Iin * Math.sqrt(2/3);
                }
            case 'forward':
                return Iin * Math.sqrt(D);
            case 'halfbridge':
            case 'fullbridge':
                return Iin * Math.sqrt(D);
            case 'llc':
                return Iin * 0.8;
            default:
                return Iin;
        }
    },

    /**
     * 计算副边有效值电流
     */
    calculateSecondaryRMS(params, Iout) {
        const topo = params.topoType;
        // 获取占空比，非 flyback 拓扑使用默认值 0.5
        const D = params.Dmax || 0.5;
        
        switch (topo) {
            case 'flyback':
                if (params.workMode === 'ccm') {
                    return Iout * Math.sqrt((1 - (params.Dmax || 0.45)) / 3);
                } else {
                    return Iout * Math.sqrt(2/3);
                }
            case 'forward':
                return Iout * Math.sqrt(1 - D);
            case 'halfbridge':
            case 'fullbridge':
                return Iout * Math.sqrt(1 - D);
            case 'llc':
                return Iout * 0.8;
            default:
                return Iout;
        }
    },

    /**
     * 校验设计结果
     */
    verifyDesign(params, core, Np, Ns, wireP, wireS) {
        const results = [];
        
        // 1. 校验磁通密度
        const Ae_m2 = core.Ae * 1e-6;
        const Bpk = params.Vin / (4 * params.fs * Np * Ae_m2);
        
        if (Bpk > core.Bs) {
            results.push({
                type: 'error',
                title: '磁芯饱和风险',
                message: `实际磁通密度 ${Bpk.toFixed(4)}T > 饱和磁通密度 ${core.Bs}T，建议增加匝数或升级磁芯`
            });
        } else if (Bpk > params.Bmax * 1.1) {
            results.push({
                type: 'warning',
                title: '磁通密度偏高',
                message: `实际磁通密度 ${Bpk.toFixed(4)}T 接近限值 ${params.Bmax}T，建议微调匝数`
            });
        } else {
            results.push({
                type: 'success',
                title: '磁通密度正常',
                message: `实际磁通密度 ${Bpk.toFixed(4)}T < 限值 ${params.Bmax}T`
            });
        }

        // 2. 校验窗口填充率
        const totalCopperArea = (Np * wireP.primary.area) + (Ns * wireS.primary.area);
        const availableWindow = params.Kw * core.Aw;
        const fillRatio = totalCopperArea / availableWindow;
        
        if (fillRatio > 1) {
            results.push({
                type: 'error',
                title: '窗口填充率超标',
                message: `填充率 ${(fillRatio * 100).toFixed(1)}% > 100%，需要放大磁芯或减小线径`
            });
        } else if (fillRatio > 0.85) {
            results.push({
                type: 'warning',
                title: '窗口填充率较高',
                message: `填充率 ${(fillRatio * 100).toFixed(1)}%，建议考虑工艺余量`
            });
        } else {
            results.push({
                type: 'success',
                title: '窗口填充率正常',
                message: `填充率 ${(fillRatio * 100).toFixed(1)}%，在合理范围内`
            });
        }

        // 3. 校验输出电压
        const Vsec_actual = Ns > 0 ? params.Vin / (params.topoType === 'flyback' ? (Np/Ns) : (2 * Np/Ns)) : 0;
        const Vout_calculated = Vsec_actual - params.Vf;
        const voltageError = Math.abs(Vout_calculated - params.Vout) / params.Vout * 100;
        
        if (voltageError > 5) {
            results.push({
                type: 'error',
                title: '输出电压偏差过大',
                message: `计算输出 ${Vout_calculated.toFixed(2)}V，与目标 ${params.Vout}V 偏差 ${voltageError.toFixed(1)}%`
            });
        } else if (voltageError > 2) {
            results.push({
                type: 'warning',
                title: '输出电压有偏差',
                message: `计算输出 ${Vout_calculated.toFixed(2)}V，与目标 ${params.Vout}V 偏差 ${voltageError.toFixed(1)}%`
            });
        } else {
            results.push({
                type: 'success',
                title: '输出电压正常',
                message: `计算输出 ${Vout_calculated.toFixed(2)}V，与目标 ${params.Vout}V 偏差 ${voltageError.toFixed(1)}%`
            });
        }

        return {
            Bpk: Bpk,
            fillRatio: fillRatio,
            Vout_calculated: Vout_calculated,
            voltageError: voltageError,
            checks: results
        };
    },

    /**
     * 计算损耗
     * @param {Object} params - 输入参数
     * @param {Object} core - 磁芯信息
     * @param {number} Np - 原边匝数
     * @param {number} Ns - 副边匝数
     * @param {Object} wireP - 原边导线信息
     * @param {Object} wireS - 副边导线信息
     * @param {number} Iprms - 原边有效值电流
     * @param {number} Isrms - 副边有效值电流
     */
    calculateLosses(params, core, Np, Ns, wireP, wireS, Iprms, Isrms) {
        // 单位转换
        const Ae_cm2 = core.Ae / 100;  // mm² → cm²
        const Ve_cm3 = (core.Ve || core.Ae * core.le) / 1000;  // mm³ → cm³，如果没有 Ve 则估算
        const fs_kHz = params.fs / 1000;  // Hz → kHz
        const Bac = params.Bmax * 0.8;  // 交流磁通密度
        
        // 计算趋肤深度
        const skinDepth = WireGauge.calculateSkinDepth(params.fs, 100);
        
        // 估算绕组长度（假设平均每匝长度为磁芯尺寸的函数）
        const avgTurnLength = Math.sqrt(core.Ae) * 4;  // mm
        const primaryLength = Np * avgTurnLength / 100;  // m
        const secondaryLength = Ns * avgTurnLength / 100;  // m
        
        // 计算直流电阻
        const R_primary = WireGauge.calculateResistance(wireP.primary.awg, primaryLength, 100);
        const R_secondary = WireGauge.calculateResistance(wireS.primary.awg, secondaryLength, 100);
        
        // 计算铜耗（I²R）
        const Pcu_primary = R_primary * Iprms * Iprms;
        const Pcu_secondary = R_secondary * Isrms * Isrms;
        
        // 趋肤效应附加损耗系数
        const skinEffectP = (wireP.primary.diameter / 2 > skinDepth) ? 1.2 : 1.0;
        const skinEffectS = (wireS.primary.diameter / 2 > skinDepth) ? 1.2 : 1.0;
        
        // 总铜耗
        const Pcu = (Pcu_primary * skinEffectP) + (Pcu_secondary * skinEffectS);

        // 铁耗计算（Steinmetz 公式近似）
        // Pcore = K * f^α * B^β * Ve
        const K = 0.001;  // 材料系数（铁氧体典型值）
        const alpha = 1.3;  // 频率指数
        const beta = 2.5;   // 磁通密度指数
        const Pcore = K * Math.pow(fs_kHz, alpha) * Math.pow(Bac * 1000, beta) * Ve_cm3 / 1000;  // W

        // 总损耗
        const Ptotal = Pcu + Pcore;
        
        // 温升估算（假设热阻为 30°C/W）
        const thermalResistance = 30;  // °C/W
        const tempRise = Ptotal * thermalResistance;

        return {
            Pcu_primary: Pcu_primary,
            Pcu_secondary: Pcu_secondary,
            Pcu_total: Pcu,
            Pcore: Pcore,
            Ptotal: Ptotal,
            tempRise: tempRise,
            skinDepth: skinDepth
        };
    },

    /**
     * 生成安规工艺建议
     */
    generateSafetyAdvice(params, core) {
        const advice = [];
        
        const creepage = params.Vin > 250 ? 8 : 4;
        advice.push({
            title: '原边-副边爬电距离',
            content: `建议 ≥ ${creepage}mm（根据绝缘等级）`
        });
        
        const insulationLevel = params.Vin > 250 ? '加强绝缘 (reinforced)' : '基本绝缘 (basic)';
        advice.push({
            title: '绝缘耐压等级',
            content: `${insulationLevel}，测试电压 ${params.Vin * 2 + 1000}V AC`
        });
        
        const bobbinType = core.series === 'EE' ? 'EE' : core.series;
        advice.push({
            title: '推荐骨架型号',
            content: `${bobbinType}${core.model.replace(core.series, '')} 型骨架，带安全挡墙`
        });
        
        if (params.topoType === 'flyback') {
            advice.push({
                title: '推荐绕制工艺',
                content: '三明治绕法：原边→副边→原边（夹层绕），减少漏感'
            });
        } else {
            advice.push({
                title: '推荐绕制工艺',
                content: '夹层绕或堆叠绕，优化耦合'
            });
        }
        
        advice.push({
            title: '层间绝缘',
            content: '原边/副边之间聚酰亚胺胶带 3 层 (0.05mm × 3)'
        });

        return advice;
    },

    /**
     * 渲染计算结果
     */
    renderResults() {
        if (!this.currentDesign) return;
        
        const d = this.currentDesign;
        
        document.getElementById('summary-results').innerHTML = this.renderSummaryCard(d);
        document.getElementById('core-results').innerHTML = this.renderCoreCard(d);
        document.getElementById('turns-results').innerHTML = this.renderTurnsCard(d);
        document.getElementById('wire-results').innerHTML = this.renderWireCard(d);
        
        const airGapContainer = document.getElementById('airgap-results-container');
        if (d.params.topoType === 'flyback' && d.airGap !== null) {
            airGapContainer.style.display = 'block';
            document.getElementById('airgap-results').innerHTML = this.renderAirGapCard(d);
        } else {
            airGapContainer.style.display = 'none';
        }
        
        document.getElementById('verify-results').innerHTML = this.renderVerifyCard(d);
        document.getElementById('loss-results').innerHTML = this.renderLossCard(d);
        document.getElementById('safety-results').innerHTML = this.renderSafetyCard(d);
        
        document.getElementById('results-section').style.display = 'block';
    },

    /**
     * 渲染概要卡片
     */
    renderSummaryCard(d) {
        return `
            <div class="result-card">
                <div class="result-item">
                    <span class="result-label">输出功率 Po</span>
                    <span class="result-value">${this.renderValue(d.power.Po, 'W')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">输入功率 Pin</span>
                    <span class="result-value">${this.renderValue(d.power.Pin, 'W')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">视在功率 Pt</span>
                    <span class="result-value">${this.renderValue(d.power.Pt, 'W')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">拓扑类型</span>
                    <span class="result-value">${this.getTopologyName(d.params.topoType)}</span>
                </div>
            </div>
        `;
    },

    /**
     * 渲染磁芯卡片
     */
    renderCoreCard(d) {
        const core = d.core.selected;
        const alt = d.core.alternative;
        const warning = d.core.warning;
        
        let altHtml = '';
        if (alt) {
            altHtml = `
                <div class="result-item" style="background: rgba(16, 185, 129, 0.1); padding: var(--spacing-sm); border-radius: var(--radius-sm); margin-top: var(--spacing-sm);">
                    <span class="result-label">备选磁芯</span>
                    <span class="result-value">${alt.model} (Ae=${alt.Ae}mm², Aw=${alt.Aw}mm², AP=${(alt.Ae*alt.Aw).toFixed(0)}mm⁴)</span>
                </div>
            `;
        }
        
        let warningHtml = '';
        if (warning) {
            warningHtml = `
                <div style="background: rgba(245, 158, 11, 0.1); padding: var(--spacing-md); border-radius: var(--radius-md); margin-top: var(--spacing-md); color: var(--accent-warning);">
                    ⚠️ ${warning}
                </div>
            `;
        }
        
        return `
            <div class="result-card">
                <div class="result-item">
                    <span class="result-label">推荐磁芯</span>
                    <span class="result-value" style="color: var(--accent-success); font-size: 1.125rem;">${core.model}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">磁芯截面积 Ae</span>
                    <span class="result-value">${this.renderValue(core.Ae, 'mm²')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">窗口面积 Aw</span>
                    <span class="result-value">${this.renderValue(core.Aw, 'mm²')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">磁路长度 le</span>
                    <span class="result-value">${this.renderValue(core.le, 'mm')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">面积乘积 AP</span>
                    <span class="result-value">${this.renderValue(d.core.AP, 'mm⁴')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">磁芯系列</span>
                    <span class="result-value">${CoreDatabase.series[core.series] || core.series}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">磁芯材料</span>
                    <span class="result-value">${d.core.material.name} (Bs=${d.core.material.Bs}T)</span>
                </div>
                ${altHtml}
            </div>
            ${warningHtml}
        `;
    },

    /**
     * 渲染匝数卡片
     */
    renderTurnsCard(d) {
        return `
            <div class="result-card">
                <div class="result-item">
                    <span class="result-label">原边匝数 Np</span>
                    <span class="result-value">${this.renderValue(d.turns.Np, '匝')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">副边匝数 Ns</span>
                    <span class="result-value">${this.renderValue(d.turns.Ns, '匝')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">匝比 n</span>
                    <span class="result-value">${this.renderValue(d.turns.n, '')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">原边RMS电流 Iprms</span>
                    <span class="result-value">${this.renderValue(d.current.Iprms, 'A')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">副边RMS电流 Isrms</span>
                    <span class="result-value">${this.renderValue(d.current.Isrms, 'A')}</span>
                </div>
            </div>
        `;
    },

    /**
     * 渲染导线卡片
     */
    renderWireCard(d) {
        const wireP = d.wire.primary;
        const wireS = d.wire.secondary;
        
        let litzP = '', litzS = '';
        if (wireP.needs_litz && wireP.litz_recommendation) {
            litzP = `<div class="result-item" style="color: var(--accent-warning);">
                <span class="result-label">原边利兹线建议</span>
                <span class="result-value">${wireP.litz_recommendation.strands}股 AWG ${wireP.litz_recommendation.awg}</span>
            </div>`;
        }
        if (wireS.needs_litz && wireS.litz_recommendation) {
            litzS = `<div class="result-item" style="color: var(--accent-warning);">
                <span class="result-label">副边利兹线建议</span>
                <span class="result-value">${wireS.litz_recommendation.strands}股 AWG ${wireS.litz_recommendation.awg}</span>
            </div>`;
        }
        
        return `
            <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--accent-primary);">原边绕组</h4>
                <div class="result-item">
                    <span class="result-label">导线截面积 ScuP</span>
                    <span class="result-value">${this.renderValue(wireP.area, 'mm²')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">推荐线规</span>
                    <span class="result-value">AWG ${wireP.awg} (直径 ${this.renderValue(wireP.diameter, 'mm', 3)})</span>
                </div>
                <div class="result-item">
                    <span class="result-label">绝缘外径</span>
                    <span class="result-value">${this.renderValue(wireP.insulation_diameter, 'mm', 3)}</span>
                </div>
                ${litzP}
            </div>
            <div class="result-card">
                <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--accent-success);">副边绕组</h4>
                <div class="result-item">
                    <span class="result-label">导线截面积 ScuS</span>
                    <span class="result-value">${this.renderValue(wireS.area, 'mm²')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">推荐线规</span>
                    <span class="result-value">AWG ${wireS.awg} (直径 ${this.renderValue(wireS.diameter, 'mm', 3)})</span>
                </div>
                <div class="result-item">
                    <span class="result-label">绝缘外径</span>
                    <span class="result-value">${this.renderValue(wireS.insulation_diameter, 'mm', 3)}</span>
                </div>
                ${litzS}
            </div>
            <div class="result-item" style="margin-top: var(--spacing-md); color: var(--text-secondary);">
                <span class="result-label">趋肤深度 @${d.params.fs/1000}kHz</span>
                <span class="result-value">${this.renderValue(wireP.skin_depth, 'mm', 3)}</span>
            </div>
        `;
    },

    /**
     * 渲染气隙卡片
     */
    renderAirGapCard(d) {
        return `
            <div class="result-card">
                <div class="result-item">
                    <span class="result-label">目标励磁电感 Lm</span>
                    <span class="result-value">${this.renderValue(d.params.Lm, 'μH')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">单边气隙长度 δ</span>
                    <span class="result-value" style="color: var(--accent-success); font-size: 1.25rem;">${this.renderValue(d.airGap, 'mm', 3)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">总气隙长度 2δ</span>
                    <span class="result-value">${this.renderValue(d.airGap * 2, 'mm', 3)}</span>
                </div>
            </div>
            <div style="background: rgba(59, 130, 246, 0.1); padding: var(--spacing-md); border-radius: var(--radius-md); margin-top: var(--spacing-md);">
                💡 提示：反激变压器必须开气隙以防止磁芯饱和，气隙长度直接影响励磁电感值
            </div>
        `;
    },

    /**
     * 渲染校验卡片
     */
    renderVerifyCard(d) {
        const v = d.verification;
        
        const checksHtml = v.checks.map(check => {
            const typeClass = {
                'success': 'var(--accent-success)',
                'warning': 'var(--accent-warning)',
                'error': 'var(--accent-danger)'
            };
            const icon = {
                'success': '✅',
                'warning': '⚠️',
                'error': '❌'
            };
            return `
                <div class="result-item" style="background: ${check.type === 'success' ? 'rgba(16, 185, 129, 0.05)' : check.type === 'warning' ? 'rgba(245, 158, 11, 0.05)' : 'rgba(239, 68, 68, 0.05)'}; padding: var(--spacing-sm); border-radius: var(--radius-sm);">
                    <span class="result-label">${icon[check.type]} ${check.title}</span>
                    <span class="result-value" style="color: ${typeClass[check.type]}; font-size: 0.875rem;">${check.message}</span>
                </div>
            `;
        }).join('');
        
        return `
            <div class="result-card">
                <div class="result-item">
                    <span class="result-label">实际峰值磁通密度 Bpk</span>
                    <span class="result-value">${this.renderValue(v.Bpk, 'T')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">窗口填充率 Kf</span>
                    <span class="result-value">${this.renderValue(v.fillRatio * 100, '%', 1)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">计算输出电压 Voutcalc</span>
                    <span class="result-value">${this.renderValue(v.Vout_calculated, 'V')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">电压偏差 ΔV</span>
                    <span class="result-value">${this.renderValue(v.voltageError, '%', 2)}</span>
                </div>
            </div>
            <div style="margin-top: var(--spacing-lg);">
                ${checksHtml}
            </div>
        `;
    },

    /**
     * 渲染损耗卡片
     */
    renderLossCard(d) {
        const l = d.losses;
        
        return `
            <div class="result-card">
                <div class="result-item">
                    <span class="result-label">原边铜耗 PcuP</span>
                    <span class="result-value">${this.renderValue(l.Pcu_primary, 'W', 3)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">副边铜耗 PcuS</span>
                    <span class="result-value">${this.renderValue(l.Pcu_secondary, 'W', 3)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">总铜耗 Pcu</span>
                    <span class="result-value">${this.renderValue(l.Pcu_total, 'W', 3)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">磁芯铁耗 Pcore</span>
                    <span class="result-value">${this.renderValue(l.Pcore, 'W', 3)}</span>
                </div>
                <div class="result-item" style="background: rgba(239, 68, 68, 0.1); padding: var(--spacing-md); border-radius: var(--radius-md);">
                    <span class="result-label" style="font-weight: 600; color: var(--accent-danger);">总损耗 Ploss</span>
                    <span class="result-value" style="font-size: 1.25rem; color: var(--accent-danger);">${this.renderValue(l.Ptotal, 'W', 3)}</span>
                </div>
                <div class="result-item" style="background: rgba(245, 158, 11, 0.1); padding: var(--spacing-md); border-radius: var(--radius-md);">
                    <span class="result-label" style="font-weight: 600; color: var(--accent-warning);">预估温升</span>
                    <span class="result-value" style="font-size: 1.25rem; color: var(--accent-warning);">${this.renderValue(l.tempRise, '°C', 1)}</span>
                </div>
            </div>
        `;
    },

    /**
     * 渲染安规卡片
     */
    renderSafetyCard(d) {
        const advice = d.safety;
        
        const adviceHtml = advice.map(item => `
            <div class="result-item" style="background: rgba(59, 130, 246, 0.05); padding: var(--spacing-sm); border-radius: var(--radius-sm); margin-bottom: var(--spacing-xs);">
                <span class="result-label" style="font-weight: 600; color: var(--accent-primary);">${item.title}</span>
                <span class="result-value" style="font-size: 0.875rem;">${item.content}</span>
            </div>
        `).join('');
        
        return adviceHtml;
    },

    /**
     * 获取拓扑中文名称
     */
    getTopologyName(topo) {
        const names = {
            flyback: '反激 (Flyback)',
            forward: '正激 (Forward)',
            halfbridge: '半桥 (Half-Bridge)',
            fullbridge: '全桥 (Full-Bridge)',
            llc: 'LLC 谐振'
        };
        return names[topo] || topo;
    },

    /**
     * 渲染数值
     */
    renderValue(value, unit = '', precision = 4) {
        const num = typeof value === 'number' ? value.toFixed(precision) : value;
        return `<span class="math-value" style="font-weight: 600; color: var(--accent-primary);">${num}</span>${unit ? `<span class="math-unit" style="color: var(--text-secondary);"> ${unit}</span>` : ''}`;
    },

    /**
     * 重新校核输出电压（手动调整后）
     */
    verifyVoltage() {
        if (!this.currentDesign) {
            alert('请先点击"开始设计"生成设计方案');
            return;
        }

        const Np = parseInt(document.getElementById('Np_manual').value);
        const Ns = parseInt(document.getElementById('Ns_manual').value);
        const AWG_p = parseInt(document.getElementById('AWG_p_manual').value);
        const AWG_s = parseInt(document.getElementById('AWG_s_manual').value);

        if (!Np || !Ns || !AWG_p || !AWG_s) {
            alert('请填写完整的调整参数');
            return;
        }

        const params = this.currentDesign.params;
        const core = this.currentDesign.core.selected;
        
        const wireP = WireGauge.findByAWG(AWG_p);
        const wireS = WireGauge.findByAWG(AWG_s);

        if (!wireP || !wireS) {
            alert('线规 AWG 值不合法');
            return;
        }

        const wireDataP = { primary: { ...wireP, area: wireP.area, diameter: wireP.diameter, awg: wireP.awg } };
        const wireDataS = { primary: { ...wireS, area: wireS.area, diameter: wireS.diameter, awg: wireS.awg } };

        const verification = this.verifyDesign(params, core, Np, Ns, wireDataP, wireDataS);

        this.currentDesign.turns.Np = Np;
        this.currentDesign.turns.Ns = Ns;
        this.currentDesign.verification = verification;
        this.currentDesign.wire.primary.awg = AWG_p;
        this.currentDesign.wire.secondary.awg = AWG_s;

        document.getElementById('verify-results').innerHTML = this.renderVerifyCard(this.currentDesign);

        alert('电压校核完成，请查看校验结果');
    },

    /**
     * 保存设计到历史记录
     */
    saveDesign() {
        if (!this.currentDesign) return;

        const designRecord = {
            id: Date.now(),
            timestamp: new Date().toLocaleString('zh-CN'),
            params: { ...this.currentDesign.params },
            summary: {
                topo: this.getTopologyName(this.currentDesign.params.topoType),
                core: this.currentDesign.core.selected.model,
                Po: this.currentDesign.power.Po,
                Np: this.currentDesign.turns.Np,
                Ns: this.currentDesign.turns.Ns
            },
            data: { ...this.currentDesign }
        };

        this.designHistory.push(designRecord);
        
        if (this.designHistory.length > 20) {
            this.designHistory = this.designHistory.slice(-20);
        }

        localStorage.setItem('transformer_design_history', JSON.stringify(this.designHistory));
        
        this.updateHistorySelect();
    },

    /**
     * 加载历史记录
     */
    loadHistory() {
        const saved = localStorage.getItem('transformer_design_history');
        if (saved) {
            try {
                this.designHistory = JSON.parse(saved);
                this.updateHistorySelect();
            } catch (e) {
                console.error('加载历史记录失败:', e);
                this.designHistory = [];
            }
        }
    },

    /**
     * 更新历史记录下拉框
     */
    updateHistorySelect() {
        const select = document.getElementById('history-select');
        if (!select) return;

        const options = ['<option value="">-- 新建设计 --</option>'];
        
        this.designHistory.slice().reverse().forEach((record) => {
            const label = `${record.summary.topo} | ${record.summary.core} | ${record.summary.Np}T:${record.summary.Ns}S | ${record.timestamp}`;
            options.push(`<option value="${record.id}">${label}</option>`);
        });

        select.innerHTML = options.join('');
        
        select.onchange = (e) => {
            if (e.target.value) {
                this.loadDesign(e.target.value);
            }
        };
    },

    /**
     * 加载指定历史设计
     */
    loadDesign(id) {
        const record = this.designHistory.find(r => r.id === parseInt(id));
        if (!record) return;

        const params = record.params;
        
        document.getElementById('topoType').value = params.topoType;
        document.getElementById('Vin').value = params.Vin;
        document.getElementById('Vout').value = params.Vout;
        document.getElementById('Iout').value = params.Iout;
        document.getElementById('fs').value = params.fs / 1000;  // Hz → kHz
        document.getElementById('eta').value = params.eta;
        document.getElementById('Bmax').value = params.Bmax;
        document.getElementById('J').value = params.J;
        document.getElementById('Kw').value = params.Kw;
        document.getElementById('Vf').value = params.Vf;
        document.getElementById('coreMaterial').value = params.coreMaterial;

        this.onTopologyChange();
        
        if (params.topoType === 'flyback') {
            document.getElementById('workMode').value = params.workMode;
            document.getElementById('Dmax').value = params.Dmax;
            document.getElementById('Vor').value = params.Vor;
            document.getElementById('Lm').value = params.Lm;
        } else if (params.topoType === 'llc') {
            document.getElementById('gainTarget').value = params.gainTarget;
            document.getElementById('LrRatio').value = params.LrRatio;
            document.getElementById('fr').value = params.fr / 1000;  // Hz → kHz
            document.getElementById('Q').value = params.Q;
        }

        this.currentDesign = record.data;
        this.renderResults();

        document.getElementById('manual-adjust-section').style.display = 'block';
        document.getElementById('Np_manual').value = record.data.turns.Np;
        document.getElementById('Ns_manual').value = record.data.turns.Ns;
        document.getElementById('AWG_p_manual').value = record.data.wire.primary.awg;
        document.getElementById('AWG_s_manual').value = record.data.wire.secondary.awg;
    },

    /**
     * 删除当前设计
     */
    deleteCurrentDesign() {
        const select = document.getElementById('history-select');
        const selectedId = select.value;
        
        if (!selectedId) {
            alert('请先选择一个历史设计');
            return;
        }

        if (!confirm('确定要删除这个设计方案吗？')) {
            return;
        }

        const idToDelete = parseInt(selectedId);
        this.designHistory = this.designHistory.filter(r => r.id !== idToDelete);
        localStorage.setItem('transformer_design_history', JSON.stringify(this.designHistory));
        
        this.updateHistorySelect();
        
        select.value = '';
    },

    /**
     * 导出 TXT 报告
     */
    exportTXT() {
        if (!this.currentDesign) {
            alert('请先生成设计方案');
            return;
        }

        const d = this.currentDesign;
        let report = '';
        
        report += '='.repeat(60) + '\n';
        report += '          变压器 AP 法自动设计报告\n';
        report += '='.repeat(60) + '\n\n';
        report += `生成时间: ${new Date().toLocaleString('zh-CN')}\n`;
        report += `拓扑类型: ${this.getTopologyName(d.params.topoType)}\n\n`;
        
        report += '-'.repeat(60) + '\n';
        report += '一、设计输入参数\n';
        report += '-'.repeat(60) + '\n';
        report += `输入电压 Vin:       ${d.params.Vin} V\n`;
        report += `输出电压 Vout:      ${d.params.Vout} V\n`;
        report += `输出电流 Iout:      ${d.params.Iout} A\n`;
        report += `开关频率 fs:        ${d.params.fs / 1000} kHz\n`;
        report += `效率 η:             ${d.params.eta}\n`;
        report += `最大磁通密度 Bmax:  ${d.params.Bmax} T\n`;
        report += `电流密度 J:         ${d.params.J} A/mm²\n`;
        report += `窗口系数 Kw:        ${d.params.Kw}\n`;
        report += `二极管压降 Vf:      ${d.params.Vf} V\n`;
        report += `磁芯材料:           ${d.core.material.name}\n`;
        
        report += '\n' + '-'.repeat(60) + '\n';
        report += '二、设计输出结果\n';
        report += '-'.repeat(60) + '\n';
        report += `输出功率 Po:         ${d.power.Po.toFixed(2)} W\n`;
        report += `输入功率 Pin:        ${d.power.Pin.toFixed(2)} W\n`;
        report += `视在功率 Pt:         ${d.power.Pt.toFixed(2)} W\n`;
        
        report += '\n' + '-'.repeat(60) + '\n';
        report += '三、磁芯选型\n';
        report += '-'.repeat(60) + '\n';
        report += `推荐磁芯:            ${d.core.selected.model}\n`;
        report += `磁芯系列:            ${CoreDatabase.series[d.core.selected.series]}\n`;
        report += `截面积 Ae:           ${d.core.selected.Ae} mm²\n`;
        report += `窗口面积 Aw:         ${d.core.selected.Aw} mm²\n`;
        report += `磁路长度 le:         ${d.core.selected.le} mm\n`;
        report += `计算 AP 值:          ${d.core.AP.toFixed(2)} mm⁴\n`;
        
        report += '\n' + '-'.repeat(60) + '\n';
        report += '四、绕组设计\n';
        report += '-'.repeat(60) + '\n';
        report += `原边匝数 Np:         ${d.turns.Np} 匝\n`;
        report += `副边匝数 Ns:         ${d.turns.Ns} 匝\n`;
        report += `匝比 n:              ${d.turns.n.toFixed(4)}\n`;
        report += `原边线规:            AWG ${d.wire.primary.awg}\n`;
        report += `原边线径:            ${d.wire.primary.diameter.toFixed(3)} mm\n`;
        report += `副边线规:            AWG ${d.wire.secondary.awg}\n`;
        report += `副边线径:            ${d.wire.secondary.diameter.toFixed(3)} mm\n`;
        
        if (d.airGap !== null) {
            report += '\n' + '-'.repeat(60) + '\n';
            report += '五、气隙设计\n';
            report += '-'.repeat(60) + '\n';
            report += `目标励磁电感 Lm:     ${d.params.Lm} μH\n`;
            report += `单边气隙长度 δ:       ${d.airGap.toFixed(3)} mm\n`;
        }
        
        report += '\n' + '-'.repeat(60) + '\n';
        report += '六、校验结果\n';
        report += '-'.repeat(60) + '\n';
        report += `实际磁通密度 Bpk:    ${d.verification.Bpk.toFixed(4)} T\n`;
        report += `窗口填充率:          ${(d.verification.fillRatio * 100).toFixed(1)}%\n`;
        report += `计算输出电压:        ${d.verification.Vout_calculated.toFixed(2)} V\n`;
        report += `电压偏差:            ${d.verification.voltageError.toFixed(2)}%\n`;
        
        report += '\n' + '-'.repeat(60) + '\n';
        report += '七、损耗与温升\n';
        report += '-'.repeat(60) + '\n';
        report += `原边铜耗:            ${d.losses.Pcu_primary.toFixed(3)} W\n`;
        report += `副边铜耗:            ${d.losses.Pcu_secondary.toFixed(3)} W\n`;
        report += `总铜耗:              ${d.losses.Pcu_total.toFixed(3)} W\n`;
        report += `磁芯铁耗:            ${d.losses.Pcore.toFixed(3)} W\n`;
        report += `总损耗:              ${d.losses.Ptotal.toFixed(3)} W\n`;
        report += `预估温升:            ${d.losses.tempRise.toFixed(1)} °C\n`;
        
        report += '\n' + '-'.repeat(60) + '\n';
        report += '八、安规工艺建议\n';
        report += '-'.repeat(60) + '\n';
        d.safety.forEach(item => {
            report += `${item.title}: ${item.content}\n`;
        });
        
        report += '\n' + '='.repeat(60) + '\n';
        report += '                    - PowerCalc 变压器设计工具 -\n';
        report += '='.repeat(60) + '\n';

        const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transformer_design_${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    },

    /**
     * 导出 PDF 报告（使用 HTML 打印）
     */
    exportPDF() {
        if (!this.currentDesign) {
            alert('请先生成设计方案');
            return;
        }

        const printWindow = window.open('', '_blank');
        
        const d = this.currentDesign;
        
        // 根据拓扑类型生成报告标题
        const topologyTitles = {
            flyback: '反激式变压器设计方案（AP法）',
            forward: '正激式变压器设计方案（AP法）',
            halfbridge: '半桥变压器设计方案（AP法）',
            fullbridge: '全桥变压器设计方案（AP法）',
            llc: 'LLC谐振变压器设计方案（AP法）'
        };
        const reportTitle = topologyTitles[d.params.topoType] || '变压器设计方案（AP法）';
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>${reportTitle}</title>
                <style>
                    @page {
                        margin: 20mm 15mm 15mm 15mm;  /* 上 右 下 左 - 打印页边距 */
                    }
                    body {
                        font-family: 'Microsoft YaHei', Arial, sans-serif;
                        padding: 20mm 15mm 15mm 15mm;  /* 上 右 下 左 - 内容边距 */
                        color: #333;
                        line-height: 1.6;
                        max-width: 100%;
                        box-sizing: border-box;
                    }
                    .header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 15px 0;
                        border-bottom: 2px solid #3b82f6;
                        margin-bottom: 20px;
                    }
                    .header-left {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }
                    .logo {
                        width: 50px;
                        height: 50px;
                    }
                    .brand-name {
                        font-size: 24px;
                        font-weight: bold;
                        color: #3b82f6;
                    }
                    .website {
                        font-size: 14px;
                        color: #666;
                    }
                    .report-title {
                        text-align: center;
                        font-size: 22px;
                        color: #1e40af;
                        margin: 25px 0 15px 0;
                        font-weight: bold;
                    }
                    .report-time {
                        text-align: center;
                        color: #666;
                        font-size: 13px;
                        margin-bottom: 25px;
                    }
                    h2 {
                        color: #3b82f6;
                        border-left: 4px solid #3b82f6;
                        padding-left: 12px;
                        margin-top: 25px;
                        margin-bottom: 12px;
                        font-size: 16px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 12px 0;
                        font-size: 13px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 10px 14px;
                        text-align: left;
                    }
                    th {
                        background-color: #f0f9ff;
                        font-weight: 600;
                    }
                    .success { color: #10b981; }
                    .warning { color: #f59e0b; }
                    .error { color: #ef4444; }
                    .footer {
                        text-align: center;
                        margin-top: 40px;
                        padding-top: 15px;
                        border-top: 1px solid #ddd;
                        color: #888;
                        font-size: 12px;
                    }
                    .footer-logo {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        margin-bottom: 8px;
                    }
                    .footer-logo img {
                        width: 20px;
                        height: 20px;
                    }
                    @media print {
                        body {
                            padding: 0;  /* 打印时使用 @page margin */
                        }
                        .header {
                            padding: 10px 0;
                        }
                    }
                </style>
            </head>
            <body>
                <!-- 页眉：Logo + 网站名 -->
                <div class="header">
                    <div class="header-left">
                        <img src="image/logo.svg" alt="PowerCalc Logo" class="logo">
                        <div>
                            <div class="brand-name">PowerCalc</div>
                            <div class="website">www.powercalc.cn</div>
                        </div>
                    </div>
                    <div style="font-size: 12px; color: #888;">
                        专业电力电子电路设计工具
                    </div>
                </div>
                
                <!-- 报告标题 -->
                <div class="report-title">${reportTitle}</div>
                <div class="report-time">生成时间: ${new Date().toLocaleString('zh-CN')}</div>
                
                <!-- 一、拓扑结构图 -->
                <h2>一、拓扑结构图</h2>
                <div style="text-align: center; margin: 15px 0;">
                    <img src="image/topology/${d.params.topoType}_topology.png" alt="${this.getTopologyName(d.params.topoType)}拓扑" style="max-width: 80%; max-height: 250px; object-fit: contain;">
                </div>
                <p style="text-align: center; color: #666; font-size: 12px; margin-bottom: 20px;">${this.getTopologyName(d.params.topoType)}拓扑结构示意图</p>
                
                <h2>二、设计输入参数</h2>
                <table>
                    <tr><th>参数</th><th>符号</th><th>值</th><th>单位</th></tr>
                    <tr><td>拓扑类型</td><td>-</td><td>${this.getTopologyName(d.params.topoType)}</td><td>-</td></tr>
                    <tr><td>输入电压</td><td>Vin</td><td>${d.params.Vin}</td><td>V</td></tr>
                    <tr><td>输出电压</td><td>Vout</td><td>${d.params.Vout}</td><td>V</td></tr>
                    <tr><td>输出电流</td><td>Iout</td><td>${d.params.Iout}</td><td>A</td></tr>
                    <tr><td>开关频率</td><td>fs</td><td>${d.params.fs / 1000}</td><td>kHz</td></tr>
                    <tr><td>效率</td><td>η</td><td>${d.params.eta}</td><td>-</td></tr>
                    <tr><td>最大磁通密度</td><td>Bmax</td><td>${d.params.Bmax}</td><td>T</td></tr>
                    <tr><td>电流密度</td><td>J</td><td>${d.params.J}</td><td>A/mm²</td></tr>
                    <tr><td>窗口系数</td><td>Kw</td><td>${d.params.Kw}</td><td>-</td></tr>
                    <tr><td>二极管压降</td><td>Vf</td><td>${d.params.Vf}</td><td>V</td></tr>
                </table>
                
                <h2>三、功率参数</h2>
                <table>
                    <tr><th>参数</th><th>符号</th><th>值</th><th>单位</th></tr>
                    <tr><td>输出功率</td><td>Po</td><td>${d.power.Po.toFixed(2)}</td><td>W</td></tr>
                    <tr><td>输入功率</td><td>Pin</td><td>${d.power.Pin.toFixed(2)}</td><td>W</td></tr>
                    <tr><td>视在功率</td><td>Pt</td><td>${d.power.Pt.toFixed(2)}</td><td>W</td></tr>
                </table>
                
                <h2>四、磁芯选型</h2>
                <table>
                    <tr><th>参数</th><th>值</th><th>单位</th></tr>
                    <tr><td>推荐磁芯</td><td>${d.core.selected.model}</td><td>-</td></tr>
                    <tr><td>磁芯系列</td><td>${CoreDatabase.series[d.core.selected.series]}</td><td>-</td></tr>
                    <tr><td>截面积 Ae</td><td>${d.core.selected.Ae}</td><td>mm²</td></tr>
                    <tr><td>窗口面积 Aw</td><td>${d.core.selected.Aw}</td><td>mm²</td></tr>
                    <tr><td>磁路长度 le</td><td>${d.core.selected.le}</td><td>mm</td></tr>
                    <tr><td>面积乘积 AP</td><td>${d.core.AP.toFixed(2)}</td><td>mm⁴</td></tr>
                </table>
                
                <h2>五、绕组设计</h2>
                <table>
                    <tr><th colspan="2">原边</th><th colspan="2">副边</th></tr>
                    <tr><td>匝数 Np</td><td>${d.turns.Np} 匝</td><td>匝数 Ns</td><td>${d.turns.Ns} 匝</td></tr>
                    <tr><td>线规</td><td>AWG ${d.wire.primary.awg}</td><td>线规</td><td>AWG ${d.wire.secondary.awg}</td></tr>
                    <tr><td>线径</td><td>${d.wire.primary.diameter.toFixed(3)} mm</td><td>线径</td><td>${d.wire.secondary.diameter.toFixed(3)} mm</td></tr>
                </table>
                
                ${d.airGap !== null ? `
                <h2>六、气隙设计</h2>
                <table>
                    <tr><td>目标励磁电感 Lm</td><td>${d.params.Lm} μH</td></tr>
                    <tr><td>单边气隙长度 δ</td><td>${d.airGap.toFixed(3)} mm</td></tr>
                </table>
                ` : ''}
                
                <h2>七、校验结果</h2>
                <table>
                    <tr><th>校验项</th><th>结果</th><th>状态</th></tr>
                    ${d.verification.checks.map(c => `
                    <tr>
                        <td>${c.title}</td>
                        <td>${c.message}</td>
                        <td class="${c.type === 'success' ? 'success' : c.type === 'warning' ? 'warning' : 'error'}">${c.type === 'success' ? '✓ 通过' : c.type === 'warning' ? '⚠ 警告' : '✗ 错误'}</td>
                    </tr>
                    `).join('')}
                </table>
                
                <h2>八、损耗与温升</h2>
                <table>
                    <tr><th>损耗类型</th><th>值</th><th>单位</th></tr>
                    <tr><td>原边铜耗</td><td>${d.losses.Pcu_primary.toFixed(3)}</td><td>W</td></tr>
                    <tr><td>副边铜耗</td><td>${d.losses.Pcu_secondary.toFixed(3)}</td><td>W</td></tr>
                    <tr><td>磁芯铁耗</td><td>${d.losses.Pcore.toFixed(3)}</td><td>W</td></tr>
                    <tr><td>总损耗</td><td>${d.losses.Ptotal.toFixed(3)}</td><td>W</td></tr>
                    <tr><td>预估温升</td><td>${d.losses.tempRise.toFixed(1)}</td><td>°C</td></tr>
                </table>
                
                <h2>九、安规工艺建议</h2>
                <table>
                    ${d.safety.map(item => `<tr><td style="width: 30%;">${item.title}</td><td>${item.content}</td></tr>`).join('')}
                </table>
                
                <!-- 页脚 -->
                <div class="footer">
                    <div class="footer-logo">
                        <img src="image/logo.svg" alt="PowerCalc">
                        <span>PowerCalc</span>
                    </div>
                    <div>www.powercalc.cn | 专业电力电子电路设计工具</div>
                    <div>报告生成时间: ${new Date().toLocaleString('zh-CN')}</div>
                </div>
                
                <script>
                    window.onload = function() {
                        window.print();
                    }
                </script>
            </body>
            </html>
        `);
        
        printWindow.document.close();
    }
};