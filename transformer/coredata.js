/**
 * 磁芯数据库 - Magnetic Core Database
 * 
 * 内置常用变压器磁芯规格：
 * - EE/EC 系列：开关电源最常用
 * - PQ 系列：高功率密度
 * - RM 系列：高频应用
 * - EPC 系列：平面磁芯
 * 
 * 数据来源：Magnetics, TDK, Ferroxcube, Hitachi 等厂家规格书
 */

const CoreDatabase = {
    // 磁芯系列分类
    series: {
        EE: 'EE型磁芯',
        EC: 'EC型磁芯',
        PQ: 'PQ型磁芯',
        RM: 'RM型磁芯',
        EPC: 'EPC平面磁芯',
        EFD: 'EFD平面磁芯',
        ETD: 'ETD型磁芯'
    },

    // 铁氧体材料
    materials: {
        '3C90': { name: '3C90', Bs: 0.47, mu_i: 2300, rho: 1, loss_factor: 'medium' },
        '3C94': { name: '3C94', Bs: 0.47, mu_i: 2300, rho: 1, loss_factor: 'low' },
        '3F3': { name: '3F3', Bs: 0.44, mu_i: 2000, rho: 1, loss_factor: 'low' },
        'N87': { name: 'N87', Bs: 0.49, mu_i: 2200, rho: 1, loss_factor: 'medium' },
        'PC40': { name: 'PC40', Bs: 0.49, mu_i: 2400, rho: 1, loss_factor: 'medium' },
        'PC95': { name: 'PC95', Bs: 0.5, mu_i: 3400, rho: 1, loss_factor: 'ultra_low' }
    },

    /**
     * 磁芯数据库
     * Ae: 有效截面积 (mm²)
     * Aw: 窗口面积 (mm²)
     * le: 有效磁路长度 (mm)
     * Ap: 面积乘积 (mm⁴)
     * Ve: 有效体积 (mm³)
     * Bs: 饱和磁通密度 (T)
     * type: 磁芯类型
     * manufacturer: 制造商
     */
    cores: [
        // EE 系列
        { model: 'EE16', series: 'EE', Ae: 19.0, Aw: 17.0, le: 35.0, Ve: 665, Bs: 0.49, type: 'standard', manufacturer: 'Generic' },
        { model: 'EE19', series: 'EE', Ae: 22.0, Aw: 22.0, le: 41.0, Ve: 902, Bs: 0.49, type: 'standard', manufacturer: 'Generic' },
        { model: 'EE20', series: 'EE', Ae: 31.0, Aw: 27.0, le: 47.0, Ve: 1457, Bs: 0.49, type: 'standard', manufacturer: 'Generic' },
        { model: 'EE22', series: 'EE', Ae: 41.0, Aw: 32.0, le: 51.0, Ve: 2091, Bs: 0.49, type: 'standard', manufacturer: 'Generic' },
        { model: 'EE25', series: 'EE', Ae: 40.0, Aw: 43.0, le: 57.0, Ve: 2280, Bs: 0.49, type: 'standard', manufacturer: 'Generic' },
        { model: 'EE28', series: 'EE', Ae: 78.0, Aw: 60.0, le: 65.0, Ve: 5070, Bs: 0.49, type: 'standard', manufacturer: 'Generic' },
        { model: 'EE30', series: 'EE', Ae: 111.0, Aw: 74.0, le: 73.0, Ve: 8103, Bs: 0.49, type: 'standard', manufacturer: 'Generic' },
        { model: 'EE33', series: 'EE', Ae: 117.0, Aw: 90.0, le: 77.0, Ve: 9009, Bs: 0.49, type: 'standard', manufacturer: 'Generic' },
        { model: 'EE40', series: 'EE', Ae: 127.0, Aw: 136.0, le: 91.0, Ve: 11557, Bs: 0.49, type: 'standard', manufacturer: 'Generic' },
        { model: 'EE42', series: 'EE', Ae: 170.0, Aw: 157.0, le: 96.0, Ve: 16320, Bs: 0.49, type: 'standard', manufacturer: 'Generic' },
        { model: 'EE50', series: 'EE', Ae: 228.0, Aw: 240.0, le: 111.0, Ve: 25308, Bs: 0.49, type: 'standard', manufacturer: 'Generic' },
        { model: 'EE55', series: 'EE', Ae: 354.0, Aw: 336.0, le: 128.0, Ve: 45312, Bs: 0.49, type: 'standard', manufacturer: 'Generic' },
        { model: 'EE65', series: 'EE', Ae: 520.0, Aw: 455.0, le: 146.0, Ve: 75920, Bs: 0.49, type: 'standard', manufacturer: 'Generic' },

        // EC 系列
        { model: 'EC35', series: 'EC', Ae: 84.0, Aw: 87.0, le: 76.0, Ve: 6384, Bs: 0.49, type: 'high_power', manufacturer: 'Generic' },
        { model: 'EC41', series: 'EC', Ae: 118.0, Aw: 111.0, le: 88.0, Ve: 10384, Bs: 0.49, type: 'high_power', manufacturer: 'Generic' },
        { model: 'EC45', series: 'EC', Ae: 150.0, Aw: 136.0, le: 98.0, Ve: 14700, Bs: 0.49, type: 'high_power', manufacturer: 'Generic' },
        { model: 'EC52', series: 'EC', Ae: 180.0, Aw: 171.0, le: 111.0, Ve: 19980, Bs: 0.49, type: 'high_power', manufacturer: 'Generic' },
        { model: 'EC70', series: 'EC', Ae: 275.0, Aw: 274.0, le: 136.0, Ve: 37400, Bs: 0.49, type: 'high_power', manufacturer: 'Generic' },

        // PQ 系列 (高功率密度)
        { model: 'PQ20-16', series: 'PQ', Ae: 62.0, Aw: 43.0, le: 47.0, Ve: 2914, Bs: 0.49, type: 'high_density', manufacturer: 'Generic' },
        { model: 'PQ20-20', series: 'PQ', Ae: 62.0, Aw: 59.0, le: 56.0, Ve: 3472, Bs: 0.49, type: 'high_density', manufacturer: 'Generic' },
        { model: 'PQ26-20', series: 'PQ', Ae: 119.0, Aw: 67.0, le: 60.0, Ve: 7140, Bs: 0.49, type: 'high_density', manufacturer: 'Generic' },
        { model: 'PQ32-20', series: 'PQ', Ae: 170.0, Aw: 85.0, le: 68.0, Ve: 11560, Bs: 0.49, type: 'high_density', manufacturer: 'Generic' },
        { model: 'PQ35-30', series: 'PQ', Ae: 196.0, Aw: 112.0, le: 78.0, Ve: 15288, Bs: 0.49, type: 'high_density', manufacturer: 'Generic' },
        { model: 'PQ40-40', series: 'PQ', Ae: 201.0, Aw: 175.0, le: 91.0, Ve: 18291, Bs: 0.49, type: 'high_density', manufacturer: 'Generic' },
        { model: 'PQ50-50', series: 'PQ', Ae: 326.0, Aw: 266.0, le: 111.0, Ve: 36186, Bs: 0.49, type: 'high_density', manufacturer: 'Generic' },

        // RM 系列 (高频)
        { model: 'RM4', series: 'RM', Ae: 12.5, Aw: 12.0, le: 25.0, Ve: 312.5, Bs: 0.49, type: 'high_freq', manufacturer: 'Generic' },
        { model: 'RM5', series: 'RM', Ae: 24.6, Aw: 17.0, le: 31.0, Ve: 762.6, Bs: 0.49, type: 'high_freq', manufacturer: 'Generic' },
        { model: 'RM6', series: 'RM', Ae: 36.0, Aw: 23.0, le: 36.0, Ve: 1296, Bs: 0.49, type: 'high_freq', manufacturer: 'Generic' },
        { model: 'RM7', series: 'RM', Ae: 49.0, Aw: 33.0, le: 41.0, Ve: 2009, Bs: 0.49, type: 'high_freq', manufacturer: 'Generic' },
        { model: 'RM8', series: 'RM', Ae: 64.0, Aw: 44.0, le: 46.0, Ve: 2944, Bs: 0.49, type: 'high_freq', manufacturer: 'Generic' },
        { model: 'RM10', series: 'RM', Ae: 97.0, Aw: 65.0, le: 54.0, Ve: 5238, Bs: 0.49, type: 'high_freq', manufacturer: 'Generic' },
        { model: 'RM12', series: 'RM', Ae: 143.0, Aw: 94.0, le: 63.0, Ve: 9009, Bs: 0.49, type: 'high_freq', manufacturer: 'Generic' },
        { model: 'RM14', series: 'RM', Ae: 198.0, Aw: 131.0, le: 71.0, Ve: 14058, Bs: 0.49, type: 'high_freq', manufacturer: 'Generic' },

        // EPC 系列 (平面磁芯)
        { model: 'EPC13', series: 'EPC', Ae: 15.5, Aw: 20.0, le: 25.0, Ve: 387.5, Bs: 0.49, type: 'planar', manufacturer: 'Generic' },
        { model: 'EPC17', series: 'EPC', Ae: 22.0, Aw: 30.0, le: 29.0, Ve: 638, Bs: 0.49, type: 'planar', manufacturer: 'Generic' },
        { model: 'EPC19', series: 'EPC', Ae: 30.0, Aw: 42.0, le: 33.0, Ve: 990, Bs: 0.49, type: 'planar', manufacturer: 'Generic' },
        { model: 'EPC25', series: 'EPC', Ae: 55.0, Aw: 71.0, le: 39.0, Ve: 2145, Bs: 0.49, type: 'planar', manufacturer: 'Generic' },
        { model: 'EPC30', series: 'EPC', Ae: 87.0, Aw: 110.0, le: 46.0, Ve: 4002, Bs: 0.49, type: 'planar', manufacturer: 'Generic' },

        // EFD 系列 (平面磁芯)
        { model: 'EFD15', series: 'EFD', Ae: 17.0, Aw: 15.0, le: 28.0, Ve: 476, Bs: 0.49, type: 'planar', manufacturer: 'Generic' },
        { model: 'EFD20', series: 'EFD', Ae: 31.0, Aw: 25.0, le: 34.0, Ve: 1054, Bs: 0.49, type: 'planar', manufacturer: 'Generic' },
        { model: 'EFD25', series: 'EFD', Ae: 58.0, Aw: 41.0, le: 40.0, Ve: 2320, Bs: 0.49, type: 'planar', manufacturer: 'Generic' },
        { model: 'EFD30', series: 'EFD', Ae: 69.0, Aw: 56.0, le: 46.0, Ve: 3174, Bs: 0.49, type: 'planar', manufacturer: 'Generic' },

        // ETD 系列
        { model: 'ETD29', series: 'ETD', Ae: 76.0, Aw: 71.0, le: 70.0, Ve: 5320, Bs: 0.49, type: 'high_power', manufacturer: 'Generic' },
        { model: 'ETD34', series: 'ETD', Ae: 97.0, Aw: 95.0, le: 78.0, Ve: 7566, Bs: 0.49, type: 'high_power', manufacturer: 'Generic' },
        { model: 'ETD39', series: 'ETD', Ae: 125.0, Aw: 125.0, le: 87.0, Ve: 10875, Bs: 0.49, type: 'high_power', manufacturer: 'Generic' },
        { model: 'ETD44', series: 'ETD', Ae: 173.0, Aw: 156.0, le: 97.0, Ve: 16781, Bs: 0.49, type: 'high_power', manufacturer: 'Generic' },
        { model: 'ETD49', series: 'ETD', Ae: 211.0, Aw: 202.0, le: 107.0, Ve: 22577, Bs: 0.49, type: 'high_power', manufacturer: 'Generic' }
    ],

    /**
     * 根据 AP 值自动选择磁芯
     * @param {number} requiredAP - 所需的面积乘积 (mm⁴)
     * @returns {Object} - 包含主选和备选磁芯
     */
    selectCore(requiredAP) {
        // 计算所需 AP (考虑安全裕量 20%)
        const safeAP = requiredAP * 1.2;

        // 筛选满足条件的磁芯
        const suitableCores = this.cores.filter(core => {
            const coreAP = core.Ae * core.Aw;
            return coreAP >= safeAP;
        });

        if (suitableCores.length === 0) {
            // 如果没有满足条件的，返回最大的磁芯
            const maxCore = this.cores.reduce((max, core) => {
                const coreAP = core.Ae * core.Aw;
                const maxAP = max.Ae * max.Aw;
                return coreAP > maxAP ? core : max;
            }, this.cores[0]);
            
            return {
                primary: maxCore,
                alternative: null,
                warning: '推荐磁芯 AP 值不足，建议联系磁芯厂家定制或考虑多磁芯组合'
            };
        }

        // 按 AP 值排序，找到最接近的
        suitableCores.sort((a, b) => {
            const apA = a.Ae * a.Aw;
            const apB = b.Ae * b.Aw;
            return apA - apB;
        });

        // 主选：第一个满足条件的（最小满足）
        const primary = suitableCores[0];

        // 备选：比主选大一档的磁芯
        let alternative = null;
        for (let i = 1; i < suitableCores.length; i++) {
            if ((suitableCores[i].Ae * suitableCores[i].Aw) > (primary.Ae * primary.Aw) * 1.5) {
                alternative = suitableCores[i];
                break;
            }
        }

        // 如果没找到大一档的，选择第二小的
        if (!alternative && suitableCores.length > 1) {
            alternative = suitableCores[1];
        }

        return {
            primary: primary,
            alternative: alternative,
            warning: null
        };
    },

    /**
     * 根据磁芯型号查找
     * @param {string} model - 磁芯型号
     * @returns {Object|null}
     */
    findByModel(model) {
        return this.cores.find(core => core.model.toLowerCase() === model.toLowerCase()) || null;
    },

    /**
     * 获取指定系列的磁芯
     * @param {string} series - 系列名称
     * @returns {Array}
     */
    getBySeries(series) {
        return this.cores.filter(core => core.series === series);
    },

    /**
     * 获取磁芯系列列表
     * @returns {Array}
     */
    getSeriesList() {
        const seriesSet = new Set(this.cores.map(core => core.series));
        return Array.from(seriesSet);
    },

    /**
     * 计算磁芯的 AP 值
     * @param {string} model - 磁芯型号
     * @returns {number|null}
     */
    calculateAP(model) {
        const core = this.findByModel(model);
        if (!core) return null;
        return core.Ae * core.Aw;
    }
};

// 导出供外部使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoreDatabase;
}