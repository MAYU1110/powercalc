/**
 * AWG 线规数据库 - American Wire Gauge Database
 * 
 * 内置标准 AWG 漆包线规格：
 * - AWG 10 ~ AWG 38
 * - 包含裸线直径、绝缘外径、直流电阻、截面积
 * 
 * 趋肤深度计算：
 * δ ≈ 0.0661 / sqrt(f) mm (20°C 铜)
 * δ ≈ 0.0764 / sqrt(f) mm (100°C 铜)
 */

const WireGauge = {
    /**
     * AWG 线规数据库
     * awg: AWG 编号
     * diameter: 裸线直径 (mm)
     * insulation_diameter: 带绝缘外径 (mm)
     * area: 截面积 (mm²)
     * resistance_20: 直流电阻 @20°C (Ω/km)
     * resistance_100: 直流电阻 @100°C (Ω/km)
     * current_max: 最大电流 (A) - 典型值 4A/mm²
     */
    awg_data: [
        { awg: 10, diameter: 2.588, insulation_diameter: 2.74, area: 5.261, resistance_20: 3.277, resistance_100: 4.239, current_max: 21.0 },
        { awg: 11, diameter: 2.305, insulation_diameter: 2.44, area: 4.172, resistance_20: 4.134, resistance_100: 5.343, current_max: 16.7 },
        { awg: 12, diameter: 2.053, insulation_diameter: 2.18, area: 3.309, resistance_20: 5.211, resistance_100: 6.737, current_max: 13.2 },
        { awg: 13, diameter: 1.828, insulation_diameter: 1.95, area: 2.624, resistance_20: 6.574, resistance_100: 8.499, current_max: 10.5 },
        { awg: 14, diameter: 1.628, insulation_diameter: 1.73, area: 2.081, resistance_20: 8.289, resistance_100: 10.715, current_max: 8.3 },
        { awg: 15, diameter: 1.450, insulation_diameter: 1.54, area: 1.650, resistance_20: 10.45, resistance_100: 13.51, current_max: 6.6 },
        { awg: 16, diameter: 1.291, insulation_diameter: 1.37, area: 1.309, resistance_20: 13.17, resistance_100: 17.03, current_max: 5.2 },
        { awg: 17, diameter: 1.150, insulation_diameter: 1.22, area: 1.039, resistance_20: 16.61, resistance_100: 21.48, current_max: 4.2 },
        { awg: 18, diameter: 1.024, insulation_diameter: 1.09, area: 0.823, resistance_20: 20.95, resistance_100: 27.09, current_max: 3.3 },
        { awg: 19, diameter: 0.912, insulation_diameter: 0.97, area: 0.653, resistance_20: 26.41, resistance_100: 34.14, current_max: 2.6 },
        { awg: 20, diameter: 0.812, insulation_diameter: 0.86, area: 0.518, resistance_20: 33.31, resistance_100: 43.06, current_max: 2.1 },
        { awg: 21, diameter: 0.723, insulation_diameter: 0.77, area: 0.410, resistance_20: 42.00, resistance_100: 54.30, current_max: 1.6 },
        { awg: 22, diameter: 0.644, insulation_diameter: 0.68, area: 0.326, resistance_20: 52.96, resistance_100: 68.48, current_max: 1.3 },
        { awg: 23, diameter: 0.573, insulation_diameter: 0.61, area: 0.258, resistance_20: 66.79, resistance_100: 86.34, current_max: 1.0 },
        { awg: 24, diameter: 0.511, insulation_diameter: 0.54, area: 0.205, resistance_20: 84.22, resistance_100: 108.9, current_max: 0.82 },
        { awg: 25, diameter: 0.455, insulation_diameter: 0.48, area: 0.162, resistance_20: 106.2, resistance_100: 137.3, current_max: 0.65 },
        { awg: 26, diameter: 0.405, insulation_diameter: 0.43, area: 0.129, resistance_20: 133.9, resistance_100: 173.1, current_max: 0.51 },
        { awg: 27, diameter: 0.361, insulation_diameter: 0.38, area: 0.102, resistance_20: 168.9, resistance_100: 218.4, current_max: 0.41 },
        { awg: 28, diameter: 0.321, insulation_diameter: 0.34, area: 0.081, resistance_20: 212.9, resistance_100: 275.3, current_max: 0.32 },
        { awg: 29, diameter: 0.286, insulation_diameter: 0.30, area: 0.064, resistance_20: 268.5, resistance_100: 347.1, current_max: 0.26 },
        { awg: 30, diameter: 0.255, insulation_diameter: 0.27, area: 0.051, resistance_20: 338.6, resistance_100: 437.8, current_max: 0.21 },
        { awg: 31, diameter: 0.227, insulation_diameter: 0.24, area: 0.040, resistance_20: 427.0, resistance_100: 552.2, current_max: 0.16 },
        { awg: 32, diameter: 0.202, insulation_diameter: 0.22, area: 0.032, resistance_20: 538.6, resistance_100: 696.3, current_max: 0.13 },
        { awg: 33, diameter: 0.180, insulation_diameter: 0.19, area: 0.025, resistance_20: 679.2, resistance_100: 878.2, current_max: 0.10 },
        { awg: 34, diameter: 0.160, insulation_diameter: 0.17, area: 0.020, resistance_20: 856.6, resistance_100: 1107.6, current_max: 0.08 },
        { awg: 35, diameter: 0.143, insulation_diameter: 0.15, area: 0.016, resistance_20: 1080.5, resistance_100: 1397.1, current_max: 0.06 },
        { awg: 36, diameter: 0.127, insulation_diameter: 0.14, area: 0.013, resistance_20: 1362.7, resistance_100: 1762.0, current_max: 0.05 },
        { awg: 37, diameter: 0.113, insulation_diameter: 0.12, area: 0.010, resistance_20: 1718.7, resistance_100: 2221.8, current_max: 0.04 },
        { awg: 38, diameter: 0.101, insulation_diameter: 0.11, area: 0.008, resistance_20: 2167.5, resistance_100: 2802.3, current_max: 0.03 }
    ],

    /**
     * 物理常数
     */
    constants: {
        // 真空磁导率 (H/m)
        mu_0: 4 * Math.PI * 1e-7,
        // 铜的电导率 @20°C (S/m)
        sigma_cu_20: 5.8e7,
        // 铜的电导率 @100°C (S/m)
        sigma_cu_100: 4.5e7,
        // 趋肤深度计算系数 (铜，20°C)
        skin_depth_const_20: 0.0661,  // mm
        // 趋肤深度计算系数 (铜，100°C)
        skin_depth_const_100: 0.0764  // mm
    },

    /**
     * 计算趋肤深度
     * @param {number} frequency - 频率 (Hz)
     * @param {number} temperature - 温度 (°C)，默认 100°C
     * @returns {number} - 趋肤深度 (mm)
     */
    calculateSkinDepth(frequency, temperature = 100) {
        const f_kHz = frequency / 1000;
        if (temperature <= 30) {
            // 20°C
            return this.constants.skin_depth_const_20 / Math.sqrt(f_kHz);
        } else {
            // 100°C
            return this.constants.skin_depth_const_100 / Math.sqrt(f_kHz);
        }
    },

    /**
     * 根据所需截面积自动选择标准 AWG 线规
     * @param {number} requiredArea - 所需截面积 (mm²)
     * @param {number} frequency - 工作频率 (Hz)，用于趋肤效应判断
     * @returns {Object} - 推荐的线规信息
     */
    selectWire(requiredArea, frequency = 100000) {
        if (requiredArea <= 0) {
            return { error: '截面积必须大于0' };
        }

        // 查找截面积最接近且大于所需面积的线规
        let selectedWire = null;
        for (const wire of this.awg_data) {
            if (wire.area >= requiredArea) {
                selectedWire = wire;
                break;
            }
        }

        // 如果没有找到满足条件的，选择最大截面积的线规
        if (!selectedWire) {
            selectedWire = this.awg_data[0]; // AWG 10
        }

        // 计算趋肤深度
        const skinDepth = this.calculateSkinDepth(frequency);

        // 判断是否需要多股利兹线
        const wireRadius = selectedWire.diameter / 2;
        const needsLitzWire = wireRadius > skinDepth;

        // 如果需要利兹线，计算并联根数
        let litzStrands = 1;
        let litzWireInfo = null;

        if (needsLitzWire) {
            // 利兹线典型线径为趋肤深度的 1/3 ~ 1/2
            const litzDiameter = skinDepth * 0.4;
            // 查找最接近的细线规
            const litzWire = this.findNearestWire(litzDiameter);
            if (litzWire) {
                // 计算并联根数：单根截面积 * 并联根数 >= 所需截面积
                litzStrands = Math.ceil(requiredArea / litzWire.area);
                litzWireInfo = {
                    awg: litzWire.awg,
                    diameter: litzWire.diameter,
                    area: litzWire.area,
                    strands: litzStrands,
                    totalArea: litzWire.area * litzStrands,
                    reason: `趋肤深度 ${skinDepth.toFixed(3)}mm < 线半径 ${wireRadius.toFixed(3)}mm，建议使用利兹线`
                };
            }
        }

        return {
            primary: {
                awg: selectedWire.awg,
                diameter: selectedWire.diameter,
                insulation_diameter: selectedWire.insulation_diameter,
                area: selectedWire.area,
                resistance_20: selectedWire.resistance_20,
                resistance_100: selectedWire.resistance_100,
                skin_depth: skinDepth,
                needs_litz: needsLitzWire,
                litz_recommendation: litzWireInfo
            },
            alternative: null // 可扩展：提供备选线规
        };
    },

    /**
     * 查找最接近指定直径的线规
     * @param {number} diameter - 目标直径 (mm)
     * @returns {Object|null}
     */
    findNearestWire(diameter) {
        let nearest = null;
        let minDiff = Infinity;

        for (const wire of this.awg_data) {
            const diff = Math.abs(wire.diameter - diameter);
            if (diff < minDiff) {
                minDiff = diff;
                nearest = wire;
            }
        }

        return nearest;
    },

    /**
     * 根据 AWG 编号查找线规
     * @param {number} awg - AWG 编号
     * @returns {Object|null}
     */
    findByAWG(awg) {
        return this.awg_data.find(wire => wire.awg === awg) || null;
    },

    /**
     * 计算导线的直流电阻
     * @param {number} awg - AWG 编号
     * @param {number} length - 导线长度 (m)
     * @param {number} temperature - 温度 (°C)，默认 100
     * @returns {number} - 电阻 (Ω)
     */
    calculateResistance(awg, length, temperature = 100) {
        const wire = this.findByAWG(awg);
        if (!wire) return null;

        // 电阻 = (Ω/km) * 长度(m) / 1000
        if (temperature <= 30) {
            return (wire.resistance_20 * length) / 1000;
        } else {
            return (wire.resistance_100 * length) / 1000;
        }
    },

    /**
     * 计算趋肤效应附加损耗系数
     * @param {number} wireRadius - 导线半径 (mm)
     * @param {number} skinDepth - 趋肤深度 (mm)
     * @returns {number} - 损耗系数 (1.0 = 无附加损耗)
     */
    calculateSkinEffectLoss(wireRadius, skinDepth) {
        if (wireRadius <= skinDepth) {
            return 1.0; // 无趋肤效应
        }

        // 趋肤效应电阻增加比例
        // R_ac / R_dc ≈ (d/2) / δ 当 d/2 > δ
        const ratio = wireRadius / skinDepth;
        return ratio;
    },

    /**
     * 获取 AWG 线规列表
     * @returns {Array}
     */
    getAWGList() {
        return this.awg_data.map(wire => ({
            awg: wire.awg,
            diameter: wire.diameter,
            area: wire.area
        }));
    },

    /**
     * 获取指定 AWG 范围的数据
     * @param {number} minAWG - 最小 AWG 编号
     * @param {number} maxAWG - 最大 AWG 编号
     * @returns {Array}
     */
    getRange(minAWG, maxAWG) {
        return this.awg_data.filter(wire => wire.awg >= minAWG && wire.awg <= maxAWG);
    }
};

// 导出供外部使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WireGauge;
}