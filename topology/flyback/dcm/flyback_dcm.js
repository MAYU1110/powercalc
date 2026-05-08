const FlybackDCM = {
    init() {
        const topologySelect = document.getElementById('topology-select');
        const modeSelect = document.getElementById('flyback-mode-select');
        const schematicSection = document.getElementById('schematic-section');
        const paramsSection = document.getElementById('params-section');

        if (schematicSection) {
            schematicSection.style.display = 'block';
        }
        if (paramsSection) {
            paramsSection.style.display = 'block';
        }

        this.loadTopologyImage('flyback');

        if (topologySelect) {
            topologySelect.value = 'flyback';
            topologySelect.addEventListener('change', (e) => {
                const selectedTopology = e.target.value;
                App.loadTopologyModule(selectedTopology);
            });
        }

        if (modeSelect) {
            modeSelect.addEventListener('change', (e) => {
                const selectedMode = e.target.value;
                if (selectedMode === 'ccm') {
                    App.loadTopologyModule('flyback/ccm');
                }
            });
            modeSelect.value = 'dcm';
        }
    },

    renderMathKey(label, formula) {
        try {
            const rendered = katex.renderToString(formula, {
                throwOnError: false,
                displayMode: false
            });
            return `${label}（<span class="math-formula" style="color: var(--accent-primary);">${rendered}</span>）`;
        } catch (e) {
            return `${label}（${formula}）`;
        }
    },

    renderMathValue(value, unit = '') {
        return `<span class="math-value" style="font-weight: 600; color: var(--accent-primary);">${value}</span>${unit ? `<span class="math-unit" style="color: var(--text-secondary);"> ${unit}</span>` : ''}`;
    },

    loadTopologyImage(topology) {
        const titleElement = document.querySelector('.schematic-title');
        if (titleElement) {
            const topologyNames = {
                'buck': 'Buck降压电路',
                'boost': 'Boost升压电路',
                'buckboost': 'Buck-Boost升降压电路',
                'flyback': '反激电路',
                'halfbridge_llc': '半桥LLC谐振电路',
                'fullbridge_llc': '全桥LLC谐振电路'
            };
            titleElement.textContent = topologyNames[topology] || '电路拓扑结构';
        }

        const imageElement = document.getElementById('topology-image');
        if (imageElement) {
            const imagePath = `../../../image/flyback_topology.png`;

            const container = imageElement.parentElement;
            container.innerHTML = `<img id="topology-image" src="" alt="${topology}拓扑结构" style="max-width: 100%; height: auto; max-height: 300px; border-radius: var(--radius-md);">`;

            const newImageElement = document.getElementById('topology-image');
            newImageElement.src = imagePath;

            newImageElement.onerror = function() {
                console.log(`图片 ${imagePath} 不存在，使用默认拓扑结构`);

                container.innerHTML = `
                    <svg width="600" height="320" viewBox="0 0 600 320" style="max-width: 100%;">
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
                            </marker>
                            <marker id="arrowhead-left" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                <polygon points="10 0, 0 3.5, 10 7" fill="#60a5fa"/>
                            </marker>
                        </defs>
                        <rect x="10" y="60" width="80" height="40" rx="2" fill="none" stroke="#60a5fa" stroke-width="2"/>
                        <text x="50" y="85" text-anchor="middle" fill="#60a5fa" font-size="14" font-family="var(--font-mono)">Vin</text>
                        <line x1="90" y1="80" x2="150" y2="80" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="150" y="60" width="60" height="40" rx="2" fill="none" stroke="#f59e0b" stroke-width="2"/>
                        <line x1="165" y1="80" x2="195" y2="80" stroke="#f59e0b" stroke-width="2"/>
                        <line x1="180" y1="65" x2="180" y2="95" stroke="#f59e0b" stroke-width="2"/>
                        <text x="180" y="110" text-anchor="middle" fill="#f59e0b" font-size="12" font-family="var(--font-mono)">SW</text>
                        <line x1="210" y1="80" x2="280" y2="80" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="280" y="60" width="80" height="80" rx="2" fill="none" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="320" y1="60" x2="320" y2="140" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="280" y1="100" x2="360" y2="100" stroke="#3b82f6" stroke-width="2"/>
                        <text x="320" y="160" text-anchor="middle" fill="#3b82f6" font-size="12" font-family="var(--font-mono)">T</text>
                        <line x1="360" y1="100" x2="430" y2="100" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <circle cx="445" cy="100" r="25" fill="none" stroke="#10b981" stroke-width="2"/>
                        <line x1="445" y1="75" x2="445" y2="125" stroke="#10b981" stroke-width="2"/>
                        <text x="445" y="130" text-anchor="middle" fill="#10b981" font-size="12" font-family="var(--font-mono)">D</text>
                        <line x1="445" y1="75" x2="445" y2="20" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="445" y1="20" x2="50" y2="20" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="50" y1="20" x2="50" y2="60" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <line x1="445" y1="100" x2="510" y2="100" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="510" y="80" width="60" height="40" rx="2" fill="none" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="510" y1="100" x2="570" y2="100" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="540" y1="80" x2="540" y2="120" stroke="#3b82f6" stroke-width="2"/>
                        <text x="540" y="140" text-anchor="middle" fill="#3b82f6" font-size="12" font-family="var(--font-mono)">Cout</text>
                        <line x1="570" y1="100" x2="630" y2="100" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="630" y="80" width="60" height="40" rx="2" fill="none" stroke="#60a5fa" stroke-width="2"/>
                        <text x="660" y="105" text-anchor="middle" fill="#60a5fa" font-size="14" font-family="var(--font-mono)">Vout</text>
                        <line x1="630" y1="120" x2="630" y2="250" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="630" y1="250" x2="50" y2="250" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="50" y1="250" x2="50" y2="100" stroke="#60a5fa" stroke-width="2" marker-start="url(#arrowhead-left)"/>
                        <text x="660" y="290" text-anchor="middle" fill="#64748b" font-size="11" font-family="var(--font-sans)">GND</text>
                        <line x1="10" y1="280" x2="690" y2="280" stroke="#475569" stroke-width="1" stroke-dasharray="5,5"/>
                    </svg>
                `;
            };
        }
    },

    calculate() {
        const vgmin = parseFloat(document.getElementById('param-vgmin').value);
        const vgmax = parseFloat(document.getElementById('param-vgmax').value);
        const vo = parseFloat(document.getElementById('param-vo').value);
        const deltavo = parseFloat(document.getElementById('param-deltavo').value);
        const iolmax = parseFloat(document.getElementById('param-iolmax').value);
        const eta = parseFloat(document.getElementById('param-eta').value);
        const fs = parseFloat(document.getElementById('param-fs').value);
        const vds = parseFloat(document.getElementById('param-vds').value);
        const deltavds = parseFloat(document.getElementById('param-deltavds').value);
        const bm = parseFloat(document.getElementById('param-bm').value);
        const j = parseFloat(document.getElementById('param-j').value);
        const k = parseFloat(document.getElementById('param-k').value);

        if (!vgmin || !vgmax || !vo || !deltavo || !iolmax || !eta || !fs || !vds || !deltavds || !bm || !j || !k) {
            alert('请填写所有必填参数');
            return;
        }

        const p_omax = Number((vo * iolmax).toFixed(5));
        const r_min = Number((vo / iolmax).toFixed(5));

        const n = Math.round((vds - deltavds - vgmax) / vo);
        const d_max = Number((1 / (1 + eta * vgmin / (n * vo))).toFixed(5));

        const wa_ac = Number(((2 / Math.sqrt(3)) * (p_omax * (Math.sqrt(1 - d_max) + Math.sqrt(d_max))) / (bm * j * k * fs * eta * 1000) * Math.pow(10, 6)).toFixed(5));
        const ap = wa_ac;
        
        const lm = Number(((Math.pow(n, 2) * Math.pow(1 - d_max, 2) / (2 * eta * fs * 1000)) * (vo / iolmax)).toFixed(5));

        const ipri_rms_max = Number(((2 / Math.sqrt(3)) * (Math.sqrt(d_max) * iolmax) / (n * (1 - d_max))).toFixed(5));
        const isec_rms_max = Number(((2 / Math.sqrt(3)) * iolmax / Math.sqrt(1 - d_max)).toFixed(5));

        const vds_stress = Number((vgmax + n * vo).toFixed(5));
        const vd_max = Number((vgmax / n + vo).toFixed(5));

        const rc_max = Number(((1 - d_max) * deltavo / (2 * iolmax)).toFixed(5));
        const c_min = Number((d_max * iolmax * Math.pow(10, 6) / (fs * deltavo * 1000)).toFixed(5));

        const coreRecommendations = this.getCoreRecommendations(ap, p_omax, fs);

        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.innerHTML = `
                <div class="glass-card" style="padding: var(--spacing-xl); margin-bottom: var(--spacing-lg);">
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-lg); color: var(--accent-success);">✓ DCM 反激变换器设计计算结果</h3>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">一、基础参数</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('最大输出功率', 'P_{omax}')}</span>
                            <span class="result-value">${this.renderMathValue(p_omax.toFixed(5), 'W')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('最小负载电阻', 'R_{min}')}</span>
                            <span class="result-value">${this.renderMathValue(r_min.toFixed(5), 'Ω')}</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">二、变压器设计（AP法）</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('匝比', 'N')}</span>
                            <span class="result-value">${this.renderMathValue(n + ':1', '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('最大占空比', 'D_{max}')}</span>
                            <span class="result-value">${this.renderMathValue(d_max.toFixed(5), '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('理论AP值', 'AP')}</span>
                            <span class="result-value">${this.renderMathValue(ap.toFixed(5), 'cm⁴')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('激磁电感', 'L_m')}</span>
                            <span class="result-value">${this.renderMathValue((lm * 1000000).toFixed(5), 'μH')}</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg); background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">三、磁芯推荐（理论AP=${ap.toFixed(5)} cm⁴）</h4>
                        ${coreRecommendations}
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">四、绕组电流与线规</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('原边有效值电流', 'I_{pri(rms)}')}</span>
                            <span class="result-value">${this.renderMathValue(ipri_rms_max.toFixed(5), 'A')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('副边有效值电流', 'I_{sec(rms)}')}</span>
                            <span class="result-value">${this.renderMathValue(isec_rms_max.toFixed(5), 'A')}</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">五、MOSFET与二极管</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('MOS电压应力', 'V_{ds}')}</span>
                            <span class="result-value">${this.renderMathValue(vds_stress.toFixed(5), 'V')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('二极管反向电压', 'V_{d(max)}')}</span>
                            <span class="result-value">${this.renderMathValue(vd_max.toFixed(5), 'V')}</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">六、输出滤波电容</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('最大允许ESR', 'R_{c(max)}')}</span>
                            <span class="result-value">${this.renderMathValue(rc_max.toFixed(5), 'Ω')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('最小电容量', 'C_{min}')}</span>
                            <span class="result-value">${this.renderMathValue(c_min.toFixed(5), 'μF')}</span>
                        </div>
                    </div>

                    <div class="result-card" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">七、器件选型建议</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('输出电容', 'C_{out}')}</span>
                            <span class="result-value">${this.renderMathValue('220~330 μF/25 V 低ESR', '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('负载电阻', 'R')}</span>
                            <span class="result-value">${this.renderMathValue(r_min.toFixed(2) + ' Ω/30 W', '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('MOSFET', 'V_{ds}')}</span>
                            <span class="result-value">${this.renderMathValue('600 V/≥0.5 A', '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('二极管', 'V_d')}</span>
                            <span class="result-value">${this.renderMathValue('100 V/≥2 A', '')}</span>
                        </div>
                    </div>
                </div>
            `;
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    getCoreRecommendations(apValue, power, frequency) {
        if (typeof recommendCores === 'function') {
            const recommendations = recommendCores(apValue, power, frequency);
            return this.formatCoreRecommendations(recommendations);
        }
        return this.getFallbackRecommendations(apValue);
    },

    getFallbackRecommendations(apValue) {
        const level = apValue < 1.0 ? 'small' : (apValue < 3.0 ? 'medium' : 'large');
        
        const fallbackData = {
            'small': [
                { model: 'EE16', manufacturer: 'TDK', ap_range: '0.4-0.7 cm⁴', power_range: '10-25W', features: '体积小巧，适合小功率应用' },
                { model: 'EI16', manufacturer: 'Epcos', ap_range: '0.35-0.6 cm⁴', power_range: '8-20W', features: '性价比高，通用性强' },
                { model: 'RM10', manufacturer: 'TDK', ap_range: '0.5-0.9 cm⁴', power_range: '10-30W', features: '良好的EMI性能' }
            ],
            'medium': [
                { model: 'EE22', manufacturer: 'TDK', ap_range: '1.5-2.5 cm⁴', power_range: '25-60W', features: '性能均衡，应用广泛' },
                { model: 'PQ20', manufacturer: 'Murata', ap_range: '1.0-1.8 cm⁴', power_range: '15-45W', features: '高功率密度，适合高频' },
                { model: 'EI22', manufacturer: 'Epcos', ap_range: '1.2-2.0 cm⁴', power_range: '20-50W', features: '通用性强' }
            ],
            'large': [
                { model: 'EE28', manufacturer: 'TDK', ap_range: '4.5-6.5 cm⁴', power_range: '60-150W', features: '适合工业电源' },
                { model: 'PQ26', manufacturer: 'Murata', ap_range: '2.5-4.0 cm⁴', power_range: '40-100W', features: '高效低损耗' },
                { model: 'EER28', manufacturer: 'Murata', ap_range: '3.5-5.5 cm⁴', power_range: '45-110W', features: '适合反激/正激' }
            ]
        };

        return this.formatCoreRecommendations(fallbackData[level]);
    },

    formatCoreRecommendations(recommendations) {
        if (!Array.isArray(recommendations) || recommendations.length === 0) {
            return `<p style="color: var(--text-secondary);">无法获取磁芯推荐</p>`;
        }

        return recommendations.map((core, index) => `
            <div style="border-bottom: 1px dashed var(--border-light); padding: var(--spacing-md) 0; ${index === recommendations.length - 1 ? 'border-bottom: none;' : ''}">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm);">
                    <span style="font-weight: 600; color: var(--accent-primary); font-size: 1rem;">${index + 1}. ${core.model}</span>
                    <span style="color: var(--text-muted); font-size: 0.875rem;">${core.manufacturer}</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-sm); font-size: 0.875rem;">
                    <div style="color: var(--text-secondary);">AP范围: <span style="color: var(--accent-primary);">${core.ap_range || `${core.ap_min}-${core.ap_max} cm⁴`}</span></div>
                    <div style="color: var(--text-secondary);">功率范围: <span style="color: var(--accent-primary);">${core.power_range || `${core.power_min}-${core.power_max}W`}</span></div>
                </div>
                ${core.material ? `<div style="color: var(--text-secondary); font-size: 0.875rem; margin-top: var(--spacing-xs);">材料: <span style="color: var(--accent-primary);">${core.material}</span></div>` : ''}
                ${core.features ? `<p style="color: var(--text-secondary); font-size: 0.875rem; margin-top: var(--spacing-sm);">特点: ${core.features}</p>` : ''}
                ${core.matchScore ? `<div style="color: var(--text-secondary); font-size: 0.875rem; margin-top: var(--spacing-xs);">匹配度: <span style="color: var(--accent-success); font-weight: 600;">${(core.matchScore * 100).toFixed(1)}%</span></div>` : ''}
            </div>
        `).join('');
    }
};

function flyback_dcmInit() {
    FlybackDCM.init();
}

window.FlybackDCM = FlybackDCM;
window.flyback_dcmInit = flyback_dcmInit;
