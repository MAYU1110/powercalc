const HalfbridgeLLC = {
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

        this.loadTopologyImage('halfbridge_llc');

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
        const po = parseFloat(document.getElementById('param-po').value);
        const vmin = parseFloat(document.getElementById('param-vmin').value);
        const vmax = parseFloat(document.getElementById('param-vmax').value);
        const vin = parseFloat(document.getElementById('param-vin').value);
        const vout = parseFloat(document.getElementById('param-vout').value);
        const io = parseFloat(document.getElementById('param-io').value);
        const vf = parseFloat(document.getElementById('param-vf').value);
        const tdead = parseFloat(document.getElementById('param-tdead').value);
        const fmax = parseFloat(document.getElementById('param-fmax').value);
        const fo = parseFloat(document.getElementById('param-fo').value);
        const czvs = parseFloat(document.getElementById('param-czvs').value);
        const h = parseFloat(document.getElementById('param-h').value);

        if (!po || !vmin || !vmax || !vin || !vout || !io || !vf || !tdead || !fmax || !fo || !czvs || !h) {
            alert('请填写所有必填参数');
            return;
        }

        if (po <= 0 || vmin <= 0 || vmax <= 0 || vin <= 0 || vout <= 0 || io <= 0 || fo <= 0 || h <= 0) {
            alert('输入参数必须为正数');
            return;
        }

        const pi = Math.PI;

        const n = Math.ceil(vin / (2 * vout));

        const m_min = parseFloat((2 * n * vout / vmax).toFixed(5));
        const m_max = parseFloat((2 * n * vout / vmin).toFixed(5));

        const x_max = parseFloat((fmax / fo).toFixed(5));

        const f_min = parseFloat((fo / Math.sqrt(1 + h * (1 - 1 / (m_max * m_max)))).toFixed(5));

        const r = parseFloat((vout / io).toFixed(5));
        const r_ac = parseFloat((n * n * 8 * r / (pi * pi)).toFixed(5));

        const q_zvs1 = parseFloat((0.95 * 1 / (h * m_max) * Math.sqrt(h + m_max * m_max / (m_max * m_max - 1))).toFixed(5));

        const q_zvs2 = parseFloat((2 / pi * x_max / ((1 + h) * x_max * x_max - 1) * tdead * Math.pow(10, -9) / (r_ac * czvs * Math.pow(10, -12))).toFixed(5));

        const q_zvs = parseFloat(Math.min(q_zvs1, q_zvs2).toFixed(5));

        const cr = parseFloat((1 / (2 * pi * fo * r_ac * q_zvs)).toFixed(10)) * Math.pow(10, 6);
        // console.log('cr value:', cr);
        const lr = parseFloat((r_ac * q_zvs / (2 * pi * fo * Math.pow(10, 3))).toFixed(10)) * Math.pow(10, 6);
        // console.log('lr value:', lr);
        const lm = parseFloat((h * lr).toFixed(5));
        // console.log('lm value:', lm);

        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            resultsSection.innerHTML = `
                <div class="glass-card" style="padding: var(--spacing-xl); margin-bottom: var(--spacing-lg);">
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-lg); color: var(--accent-success);">✓ 半桥LLC谐振电路设计计算结果</h3>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">一、基础参数</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('变压器匝比', 'N')}</span>
                            <span class="result-value">${this.renderMathValue(n.toFixed(5), '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('最小电压增益', 'M_{min}')}</span>
                            <span class="result-value">${this.renderMathValue(m_min.toFixed(5), '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('最大电压增益', 'M_{max}')}</span>
                            <span class="result-value">${this.renderMathValue(m_max.toFixed(5), '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('最大归一化频率', 'x_{max}')}</span>
                            <span class="result-value">${this.renderMathValue(x_max.toFixed(5), '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('最小归一化频率', 'x_{min}')}</span>
                            <span class="result-value">${this.renderMathValue(f_min.toFixed(5), 'kHz')}</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">二、阻抗匹配参数</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('输出侧等效电阻', 'R')}</span>
                            <span class="result-value">${this.renderMathValue(r.toFixed(5), 'Ω')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('交流等效电阻', 'R_{ac}')}</span>
                            <span class="result-value">${this.renderMathValue(r_ac.toFixed(5), 'Ω')}</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">三、ZVS品质因数</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('满载ZVS品质因数', 'Q_{zvs1}')}</span>
                            <span class="result-value">${this.renderMathValue(q_zvs1.toFixed(5), '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('空载ZVS品质因数', 'Q_{zvs2}')}</span>
                            <span class="result-value">${this.renderMathValue(q_zvs2.toFixed(5), '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('选取品质因数', 'Q_{zvs}')}</span>
                            <span class="result-value">${this.renderMathValue(q_zvs.toFixed(5), '')}</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">四、谐振元件参数</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('谐振电容', 'C_r')}</span>
                            <span class="result-value">${this.renderMathValue(cr.toFixed(5), 'nF')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('谐振电感', 'L_r')}</span>
                            <span class="result-value">${this.renderMathValue(lr.toFixed(5), 'μH')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('励磁电感', 'L_m')}</span>
                            <span class="result-value">${this.renderMathValue(lm.toFixed(5), 'μH')}</span>
                        </div>
                    </div>

                    <div class="result-card" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">五、最终设计结果</h4>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('变压器匝比', 'N')}</span>
                            <span class="result-value">${this.renderMathValue(n + ':1（原边:副边）', '')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('谐振电容', 'C_r')}</span>
                            <span class="result-value">${this.renderMathValue(cr.toFixed(5), 'nF')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('谐振电感', 'L_r')}</span>
                            <span class="result-value">${this.renderMathValue(lr.toFixed(5), 'μH')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('励磁电感', 'L_m')}</span>
                            <span class="result-value">${this.renderMathValue(lm.toFixed(5), 'μH')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('串联谐振频率', 'f_o')}</span>
                            <span class="result-value">${this.renderMathValue(fo, 'kHz')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('工作频率范围', 'f_{min}~f_{max}')}</span>
                            <span class="result-value">${this.renderMathValue(f_min.toFixed(5) + '~' + fmax, 'kHz')}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">${this.renderMathKey('品质因数', 'Q_{zvs}')}</span>
                            <span class="result-value">${this.renderMathValue(q_zvs.toFixed(5), '')}</span>
                        </div>
                    </div>
                </div>

                <div class="glass-card" style="padding: var(--spacing-xl);">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: var(--spacing-md);">设计要点说明</h3>
                    <div style="color: var(--text-secondary); line-height: 1.8; font-size: 0.9375rem;">
                        <p style="margin-bottom: var(--spacing-md);">
                            <strong style="color: var(--text-primary);">半桥LLC谐振变换器：</strong>半桥LLC采用两个开关管，通过调节开关频率实现输出电压调节，具有软开关、高效率等优点。
                        </p>
                        <p style="margin-bottom: var(--spacing-md);">
                            <strong style="color: var(--text-primary);">ZVS条件：</strong>品质因数Q必须满足Qzvs = min(Qzvs1, Qzvs2)以确保在全负载范围内实现零电压开关。
                        </p>
                        <p style="margin-bottom: var(--spacing-md);">
                            <strong style="color: var(--text-primary);">频率控制：</strong>当fs接近fo时，变换器工作于谐振点附近，效率最高；当fs > fo时为感性区，fs < fo时为容性区。
                        </p>
                        <p>
                            <strong style="color: var(--text-primary);">开关管应力：</strong>开关管承受最大电压为Vin，选择器件时需留30%以上电压裕量。
                        </p>
                    </div>
                </div>
            `;
        }
    }
};

function halfbridge_llcInit() {
    HalfbridgeLLC.init();
}

window.HalfbridgeLLC = HalfbridgeLLC;
window.halfbridge_llcInit = halfbridge_llcInit;