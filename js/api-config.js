// 本地磁芯数据库 - 完全免费，无需API
// 数据来源：主流磁芯厂家公开资料

const CORE_DATABASE = {
    // EE系列
    'EE10': { model: 'EE10', manufacturer: 'TDK', ap_min: 0.08, ap_max: 0.15, power_min: 2, power_max: 8, frequency_min: 50, frequency_max: 500, material: 'PC40', features: '超小型，适合微型电源' },
    'EE13': { model: 'EE13', manufacturer: 'TDK', ap_min: 0.2, ap_max: 0.4, power_min: 5, power_max: 15, frequency_min: 50, frequency_max: 500, material: 'PC40', features: '小体积，性价比高' },
    'EE16': { model: 'EE16', manufacturer: 'TDK', ap_min: 0.4, ap_max: 0.7, power_min: 10, power_max: 25, frequency_min: 50, frequency_max: 500, material: 'PC40', features: '通用性强，应用广泛' },
    'EE19': { model: 'EE19', manufacturer: 'TDK', ap_min: 0.8, ap_max: 1.2, power_min: 15, power_max: 40, frequency_min: 50, frequency_max: 500, material: 'PC40', features: '性能均衡' },
    'EE22': { model: 'EE22', manufacturer: 'TDK', ap_min: 1.5, ap_max: 2.5, power_min: 25, power_max: 60, frequency_min: 50, frequency_max: 500, material: 'PC40', features: '大功率应用首选' },
    'EE25': { model: 'EE25', manufacturer: 'TDK', ap_min: 2.8, ap_max: 4.2, power_min: 40, power_max: 100, frequency_min: 50, frequency_max: 500, material: 'PC40', features: '高功率密度' },
    'EE28': { model: 'EE28', manufacturer: 'TDK', ap_min: 4.5, ap_max: 6.5, power_min: 60, power_max: 150, frequency_min: 50, frequency_max: 500, material: 'PC40', features: '适合工业电源' },
    'EE30': { model: 'EE30', manufacturer: 'TDK', ap_min: 6.0, ap_max: 8.5, power_min: 80, power_max: 200, frequency_min: 50, frequency_max: 500, material: 'PC40', features: '大功率工业级' },
    
    // EI系列
    'EI16': { model: 'EI16', manufacturer: 'Epcos', ap_min: 0.35, ap_max: 0.6, power_min: 8, power_max: 20, frequency_min: 50, frequency_max: 400, material: 'N87', features: '性价比高' },
    'EI19': { model: 'EI19', manufacturer: 'Epcos', ap_min: 0.7, ap_max: 1.1, power_min: 12, power_max: 35, frequency_min: 50, frequency_max: 400, material: 'N87', features: '磁导率稳定' },
    'EI22': { model: 'EI22', manufacturer: 'Epcos', ap_min: 1.2, ap_max: 2.0, power_min: 20, power_max: 50, frequency_min: 50, frequency_max: 400, material: 'N87', features: '通用性强' },
    'EI25': { model: 'EI25', manufacturer: 'Epcos', ap_min: 2.0, ap_max: 3.5, power_min: 30, power_max: 80, frequency_min: 50, frequency_max: 400, material: 'N87', features: '散热性能好' },
    
    // PQ系列
    'PQ20': { model: 'PQ20', manufacturer: 'Murata', ap_min: 1.0, ap_max: 1.8, power_min: 15, power_max: 45, frequency_min: 100, frequency_max: 1000, material: 'PC44', features: '高功率密度，适合高频' },
    'PQ26': { model: 'PQ26', manufacturer: 'Murata', ap_min: 2.5, ap_max: 4.0, power_min: 40, power_max: 100, frequency_min: 100, frequency_max: 1000, material: 'PC44', features: '高效低损耗' },
    'PQ32': { model: 'PQ32', manufacturer: 'Murata', ap_min: 5.0, ap_max: 7.5, power_min: 80, power_max: 200, frequency_min: 100, frequency_max: 1000, material: 'PC44', features: '大功率高频应用' },
    'PQ35': { model: 'PQ35', manufacturer: 'Murata', ap_min: 7.0, ap_max: 10.0, power_min: 120, power_max: 300, frequency_min: 100, frequency_max: 1000, material: 'PC44', features: '工业级大功率' },
    
    // RM系列
    'RM8': { model: 'RM8', manufacturer: 'TDK', ap_min: 0.25, ap_max: 0.45, power_min: 6, power_max: 18, frequency_min: 100, frequency_max: 1000, material: 'PC40', features: '小体积高频' },
    'RM10': { model: 'RM10', manufacturer: 'TDK', ap_min: 0.5, ap_max: 0.9, power_min: 10, power_max: 30, frequency_min: 100, frequency_max: 1000, material: 'PC40', features: '良好的EMI性能' },
    'RM12': { model: 'RM12', manufacturer: 'TDK', ap_min: 1.2, ap_max: 2.0, power_min: 20, power_max: 55, frequency_min: 100, frequency_max: 1000, material: 'PC40', features: '高频高效' },
    'RM14': { model: 'RM14', manufacturer: 'TDK', ap_min: 2.5, ap_max: 4.0, power_min: 40, power_max: 100, frequency_min: 100, frequency_max: 1000, material: 'PC40', features: '大功率高频' },
    
    // ETD系列
    'ETD29': { model: 'ETD29', manufacturer: 'Epcos', ap_min: 4.0, ap_max: 6.0, power_min: 50, power_max: 120, frequency_min: 50, frequency_max: 500, material: 'N87', features: '低损耗，高效率' },
    'ETD34': { model: 'ETD34', manufacturer: 'Epcos', ap_min: 7.0, ap_max: 10.0, power_min: 80, power_max: 200, frequency_min: 50, frequency_max: 500, material: 'N87', features: '大功率应用' },
    
    // EER系列
    'EER28': { model: 'EER28', manufacturer: 'Murata', ap_min: 3.5, ap_max: 5.5, power_min: 45, power_max: 110, frequency_min: 50, frequency_max: 500, material: 'PC44', features: '适合反激/正激' },
    'EER35': { model: 'EER35', manufacturer: 'Murata', ap_min: 8.0, ap_max: 12.0, power_min: 100, power_max: 250, frequency_min: 50, frequency_max: 500, material: 'PC44', features: '超大功率' }
};

// 根据AP值智能匹配磁芯
function recommendCores(apValue, power, frequency = 100) {
    const candidates = [];
    
    // 遍历数据库，找到匹配的磁芯
    for (const key in CORE_DATABASE) {
        const core = CORE_DATABASE[key];
        
        // AP值匹配：目标AP值应在磁芯AP范围的20%-120%之间
        const apMatch = apValue >= core.ap_min * 0.2 && apValue <= core.ap_max * 1.2;
        
        // 功率匹配
        const powerMatch = power >= core.power_min * 0.5 && power <= core.power_max * 1.2;
        
        // 频率匹配
        const freqMatch = frequency >= core.frequency_min && frequency <= core.frequency_max;
        
        if (apMatch && powerMatch && freqMatch) {
            // 计算匹配度
            const apScore = 1 - Math.abs(apValue - (core.ap_min + core.ap_max) / 2) / ((core.ap_max - core.ap_min) / 2);
            const powerScore = 1 - Math.abs(power - (core.power_min + core.power_max) / 2) / ((core.power_max - core.power_min) / 2);
            const freqScore = frequency >= core.frequency_min && frequency <= core.frequency_max ? 1 : 0.5;
            
            const totalScore = (apScore * 0.5 + powerScore * 0.3 + freqScore * 0.2).toFixed(4);
            
            candidates.push({
                ...core,
                matchScore: parseFloat(totalScore),
                recommended_ap: ((core.ap_min + core.ap_max) / 2).toFixed(2),
                recommended_power: `${core.power_min}-${core.power_max}W`
            });
        }
    }
    
    // 按匹配度排序，取前3个
    candidates.sort((a, b) => b.matchScore - a.matchScore);
    
    return candidates.slice(0, 3);
}

// 导出供其他模块使用
window.CORE_DATABASE = CORE_DATABASE;
window.recommendCores = recommendCores;