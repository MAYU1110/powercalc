const FullbridgeLLC = {
    init() {
        const topologySelect = document.getElementById('topology-select');
        const schematicSection = document.getElementById('schematic-section');
        const paramsSection = document.getElementById('params-section');

        if (schematicSection) {
            schematicSection.style.display = 'block';
        }
        if (paramsSection) {
            paramsSection.style.display = 'block';
        }

        this.loadTopologyImage('fullbridge_llc');

        if (topologySelect) {
            topologySelect.addEventListener('change', (e) => {
                const selectedTopology = e.target.value;
                App.loadTopologyModule(selectedTopology);
            });
        }
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
            const imagePath = `../../image/${topology}_topology.png`;

            const container = imageElement.parentElement;
            container.innerHTML = `<img id="topology-image" src="" alt="${topology}拓扑结构" style="max-width: 100%; height: auto; max-height: 300px; border-radius: var(--radius-md);">`;

            const newImageElement = document.getElementById('topology-image');

            newImageElement.src = imagePath;

            newImageElement.onerror = function() {
                console.log(`图片 ${imagePath} 不存在，使用默认拓扑结构`);

                container.innerHTML = `
                    <svg width="600" height="400" viewBox="0 0 600 400" style="max-width: 100%;">
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
                            </marker>
                            <marker id="arrowhead-left" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                <polygon points="10 0, 0 3.5, 10 7" fill="#60a5fa"/>
                            </marker>
                        </defs>
                        <text x="50" y="25" text-anchor="middle" fill="#64748b" font-size="11" font-family="var(--font-sans)">Vin</text>
                        <line x1="10" y1="50" x2="100" y2="50" stroke="#60a5fa" stroke-width="2"/>
                        <rect x="100" y="30" width="60" height="40" rx="2" fill="none" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="130" y1="30" x2="130" y2="70" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="100" y1="50" x2="160" y2="50" stroke="#60a5fa" stroke-width="2"/>
                        <text x="130" y="85" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="var(--font-mono)">Cin</text>

                        <line x1="160" y1="50" x2="200" y2="50" stroke="#f59e0b" stroke-width="2"/>
                        <rect x="200" y="30" width="40" height="40" rx="2" fill="none" stroke="#f59e0b" stroke-width="2"/>
                        <line x1="200" y1="40" x2="240" y2="40" stroke="#f59e0b" stroke-width="2"/>
                        <line x1="220" y1="30" x2="220" y2="70" stroke="#f59e0b" stroke-width="2"/>
                        <text x="220" y="85" text-anchor="middle" fill="#f59e0b" font-size="12" font-family="var(--font-mono)">Q1</text>

                        <line x1="240" y1="50" x2="280" y2="50" stroke="#f59e0b" stroke-width="2"/>
                        <rect x="280" y="30" width="40" height="40" rx="2" fill="none" stroke="#f59e0b" stroke-width="2"/>
                        <line x1="280" y1="40" x2="320" y2="40" stroke="#f59e0b" stroke-width="2"/>
                        <line x1="300" y1="30" x2="300" y2="70" stroke="#f59e0b" stroke-width="2"/>
                        <text x="300" y="85" text-anchor="middle" fill="#f59e0b" font-size="12" font-family="var(--font-mono)">Q2</text>

                        <line x1="320" y1="50" x2="360" y2="50" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>

                        <line x1="200" y1="90" x2="240" y2="90" stroke="#f59e0b" stroke-width="2"/>
                        <rect x="200" y="70" width="40" height="40" rx="2" fill="none" stroke="#f59e0b" stroke-width="2"/>
                        <line x1="200" y1="80" x2="240" y2="80" stroke="#f59e0b" stroke-width="2"/>
                        <line x1="220" y1="70" x2="220" y2="110" stroke="#f59e0b" stroke-width="2"/>
                        <text x="220" y="125" text-anchor="middle" fill="#f59e0b" font-size="12" font-family="var(--font-mono)">Q3</text>

                        <line x1="240" y1="90" x2="280" y2="90" stroke="#f59e0b" stroke-width="2"/>
                        <rect x="280" y="70" width="40" height="40" rx="2" fill="none" stroke="#f59e0b" stroke-width="2"/>
                        <line x1="280" y1="80" x2="320" y2="80" stroke="#f59e0b" stroke-width="2"/>
                        <line x1="300" y1="70" x2="300" y2="110" stroke="#f59e0b" stroke-width="2"/>
                        <text x="300" y="125" text-anchor="middle" fill="#f59e0b" font-size="12" font-family="var(--font-mono)">Q4</text>

                        <line x1="320" y1="90" x2="360" y2="90" stroke="#60a5fa" stroke-width="2"/>

                        <line x1="360" y1="50" x2="400" y2="50" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="360" y1="90" x2="400" y2="90" stroke="#60a5fa" stroke-width="2"/>

                        <circle cx="420" cy="70" r="20" fill="none" stroke="#ec4899" stroke-width="2"/>
                        <text x="420" y="74" text-anchor="middle" fill="#ec4899" font-size="12" font-family="var(--font-mono)">Lm</text>
                        <line x1="400" y1="50" x2="440" y2="50" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="400" y1="90" x2="440" y2="90" stroke="#60a5fa" stroke-width="2"/>

                        <line x1="440" y1="70" x2="480" y2="70" stroke="#10b981" stroke-width="2"/>
                        <circle cx="490" cy="70" r="20" fill="none" stroke="#10b981" stroke-width="2"/>
                        <text x="490" y="74" text-anchor="middle" fill="#10b981" font-size="12" font-family="var(--font-mono)">Lr</text>
                        <line x1="480" y1="70" x2="510" y2="70" stroke="#60a5fa" stroke-width="2"/>

                        <line x1="510" y1="70" x2="540" y2="70" stroke="#3b82f6" stroke-width="2"/>
                        <circle cx="555" cy="70" r="20" fill="none" stroke="#3b82f6" stroke-width="2"/>
                        <text x="555" y="74" text-anchor="middle" fill="#3b82f6" font-size="12" font-family="var(--font-mono)">Cr</text>
                        <line x1="540" y1="70" x2="575" y2="70" stroke="#60a5fa" stroke-width="2"/>

                        <line x1="575" y1="70" x2="575" y2="140" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="575" y1="140" x2="500" y2="140" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="455" y="110" width="90" height="60" rx="2" fill="none" stroke="#60a5fa" stroke-width="2"/>
                        <text x="500" y="145" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="var(--font-mono)">变压器</text>

                        <line x1="500" y1="170" x2="500" y2="220" stroke="#60a5fa" stroke-width="2"/>
                        <circle cx="500" cy="240" r="25" fill="none" stroke="#10b981" stroke-width="2"/>
                        <line x1="500" y1="215" x2="500" y2="265" stroke="#10b981" stroke-width="2"/>
                        <text x="500" y="280" text-anchor="middle" fill="#10b981" font-size="12" font-family="var(--font-mono)">D</text>
                        <line x1="500" y1="265" x2="500" y2="320" stroke="#60a5fa" stroke-width="2"/>

                        <line x1="500" y1="320" x2="500" y2="370" stroke="#60a5fa" stroke-width="2"/>
                        <rect x="460" y="320" width="80" height="40" rx="2" fill="none" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="470" y1="340" x2="530" y2="340" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="490" y1="320" x2="490" y2="360" stroke="#3b82f6" stroke-width="2"/>
                        <text x="500" y="375" text-anchor="middle" fill="#3b82f6" font-size="12" font-family="var(--font-mono)">Cout</text>

                        <line x1="540" y1="340" x2="590" y2="340" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="540" y="310" width="50" height="60" rx="2" fill="none" stroke="#60a5fa" stroke-width="2"/>
                        <text x="565" y="345" text-anchor="middle" fill="#60a5fa" font-size="14" font-family="var(--font-mono)">Vout</text>

                        <line x1="575" y1="70" x2="575" y2="30" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="575" y1="30" x2="130" y2="30" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="130" y1="30" x2="130" y2="50" stroke="#60a5fa" stroke-width="2"/>

                        <line x1="200" y1="110" x2="200" y2="370" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="200" y1="370" x2="590" y2="370" stroke="#475569" stroke-width="1" stroke-dasharray="5,5"/>
                        <text x="565" y="310" text-anchor="middle" fill="#64748b" font-size="11" font-family="var(--font-sans)">GND</text>
                    </svg>
                `;
            };
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

    calculate() {
        const vin_min = parseFloat(document.getElementById('param-vin_min').value);
        const vin_max = parseFloat(document.getElementById('param-vin_max').value);
        const vin_nom = parseFloat(document.getElementById('param-vin_nom').value);
        const vout = parseFloat(document.getElementById('param-vout').value);
        const io = parseFloat(document.getElementById('param-io').value);
        const po = parseFloat(document.getElementById('param-po').value);
        const fr = parseFloat(document.getElementById('param-fr').value);
        const fmin = parseFloat(document.getElementById('param-fmin').value);
        const fmax = parseFloat(document.getElementById('param-fmax').value);
        const eta = parseFloat(document.getElementById('param-eta').value);
        const k = parseFloat(document.getElementById('param-k').value);
        const q = parseFloat(document.getElementById('param-q').value);

        if (!vin_min || !vin_max || !vin_nom || !vout || !io || !po || !fr || !fmin || !fmax || !eta || !k || !q) {
            alert('请填写所有必填参数');
            return;
        }

        if (vin_min <= 0 || vin_max <= 0 || vin_nom <= 0 || vout <= 0 || io <= 0 || po <= 0 || fr <= 0 || fmin <= 0 || fmax <= 0 || eta <= 0 || k <= 0 || q <= 0) {
            alert('输入参数必须为正数');
            return;
        }

        const pi = Math.PI;

        const n = Math.ceil(vin_nom / (vout * eta));
        const n_fixed = parseFloat(n.toFixed(5));

        const m_max = parseFloat((n * vout / vin_min).toFixed(5));
        const m_min = parseFloat((n * vout / vin_max).toFixed(5));

        const rl = parseFloat((vout / io).toFixed(5));
        const r_ac = parseFloat((n * n * 8 * rl / (pi * pi)).toFixed(5));

        const zo = parseFloat((q * r_ac).toFixed(5));

        const lr = parseFloat((zo / (2 * pi * fr * Math.pow(10, 3))).toFixed(10) *Math.pow(10, 6));
        const cr = parseFloat((1 / (2 * pi * fr * Math.pow(10, 3) * zo)).toFixed(10) * Math.pow(10, 9));
        // console.log('cr value:', cr);
        const lm = parseFloat((k * lr).toFixed(10));

        const vds = vin_max;
        const vd = parseFloat((vin_max / n + vout).toFixed(5));

        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            resultsSection.innerHTML = `
                <div class="glass-card" style="padding: var(--spacing-xl); margin-bottom: var(--spacing-lg);">
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-lg); color: var(--accent-success);">✓ 全桥LLC谐振电路设计计算结果</h3>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">一、基础参数</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('变压器匝比', 'n')}</span>
                            <span class="result-value">${this.renderMathValue(n_fixed.toFixed(5), '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('最大电压增益', 'M_{max}')}</span>
                            <span class="result-value">${this.renderMathValue(m_max.toFixed(5), '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('最小电压增益', 'M_{min}')}</span>
                            <span class="result-value">${this.renderMathValue(m_min.toFixed(5), '')}</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">二、负载等效参数</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('输出侧等效电阻', 'R_l')}</span>
                            <span class="result-value">${this.renderMathValue(rl.toFixed(5), 'Ω')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('交流等效电阻', 'R_{ac}')}</span>
                            <span class="result-value">${this.renderMathValue(r_ac.toFixed(5), 'Ω')}</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">三、谐振腔参数</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('特征阻抗', 'Z_o')}</span>
                            <span class="result-value">${this.renderMathValue(zo.toFixed(5), 'Ω')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('谐振电感', 'L_r')}</span>
                            <span class="result-value">${this.renderMathValue(lr.toFixed(5), 'μH')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('谐振电容', 'C_r')}</span>
                            <span class="result-value">${this.renderMathValue(cr.toFixed(5), 'nF')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('励磁电感', 'L_m')}</span>
                            <span class="result-value">${this.renderMathValue(lm.toFixed(5), 'μH')}</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">四、器件应力分析</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('原边MOS电压应力', 'V_{ds}')}</span>
                            <span class="result-value">${this.renderMathValue(vds.toFixed(5), 'V')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('副边二极管反向电压', 'V_d')}</span>
                            <span class="result-value">${this.renderMathValue(vd.toFixed(5), 'V')}</span>
                        </div>
                    </div>

                    <div class="result-card" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">五、最终设计结果</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('变压器匝比', 'n')}</span>
                            <span class="result-value">${this.renderMathValue(n + ':1（原边:副边）', '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('谐振电感', 'L_r')}</span>
                            <span class="result-value">${this.renderMathValue(lr.toFixed(5), 'μH')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('谐振电容', 'C_r')}</span>
                            <span class="result-value">${this.renderMathValue(cr.toFixed(5), 'nF')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('励磁电感', 'L_m')}</span>
                            <span class="result-value">${this.renderMathValue(lm.toFixed(5), 'μH')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('谐振频率', 'f_r')}</span>
                            <span class="result-value">${this.renderMathValue(fr, 'kHz')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('工作频率范围', 'f_{min}~f_{max}')}</span>
                            <span class="result-value">${this.renderMathValue(fmin + '~' + fmax, 'kHz')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('MOS电压应力', 'V_{ds}')}</span>
                            <span class="result-value">${this.renderMathValue(vds, 'V')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('二极管耐压', 'V_d')}</span>
                            <span class="result-value">${this.renderMathValue('≥' + Math.ceil(vd * 1.2), 'V')}</span>
                        </div>
                    </div>
                </div>

                <div class="glass-card" style="padding: var(--spacing-xl);">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: var(--spacing-md);">设计要点说明</h3>
                    <div style="color: var(--text-secondary); line-height: 1.8; font-size: 0.9375rem;">
                        <p style="margin-bottom: var(--spacing-md);">
                            <strong style="color: var(--text-primary);">全桥LLC谐振变换器：</strong>全桥LLC采用4个开关管，相比半桥具有更高的功率密度和效率，适用于中大功率应用。
                        </p>
                        <p style="margin-bottom: var(--spacing-md);">
                            <strong style="color: var(--text-primary);">匝比计算：</strong>全桥匝比公式为n = Vin(nom) / (Vo·η)，与半桥不同，不需要除以2。
                        </p>
                        <p style="margin-bottom: var(--spacing-md);">
                            <strong style="color: var(--text-primary);">谐振网络设计：</strong>通过特征阻抗Zo = Q·Rac计算谐振电感和电容，确保系统工作在最佳状态。
                        </p>
                        <p>
                            <strong style="color: var(--text-primary);">开关管应力：</strong>开关管承受最大电压为Vin(max)，选择器件时需留20%以上电压裕量。
                        </p>
                    </div>
                </div>
            `;
        }
    }
};

function fullbridge_llcInit() {
    FullbridgeLLC.init();
}

window.FullbridgeLLC = FullbridgeLLC;
window.fullbridge_llcInit = fullbridge_llcInit;