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

                        <line x1="160" y1="50" x2="200" y2="50" stroke="#60a5fa" stroke-width="2"/>
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

    calculate() {
        const vin = parseFloat(document.getElementById('param-vin').value);
        const vout = parseFloat(document.getElementById('param-vout').value);
        const po = parseFloat(document.getElementById('param-po').value);
        const fs = parseFloat(document.getElementById('param-fs').value);
        const fr = parseFloat(document.getElementById('param-fr').value);
        const ku = parseFloat(document.getElementById('param-ku').value);
        const eta = parseFloat(document.getElementById('param-eta').value);

        if (!vin || !vout || !po || !fs || !fr || !ku || !eta) {
            alert('请填写所有必填参数');
            return;
        }

        if (vin <= 0 || vout <= 0 || po <= 0) {
            alert('输入参数必须为正数');
            return;
        }

        const pi = Math.PI;

        const io = po / vout;
        const pin = po / eta;
        const iin = pin / vin;

        const n = vin / (2 * vout);

        const m = vout / (vin / 2);

        const lambda = fs / fr;

        const q = 0.5;

        const k_val = 0.2;

        const lratio = 1 / k_val;

        const lk = lratio * 1000;

        const fr_rad = 2 * pi * fr * 1000;
        const lmr = lk / (lratio - 1);
        const cr = 1 / (Math.pow(fr_rad, 2) * lmr);

        const lm = lmr * 1000;

        const delta_i_m = (vout / (4 * fr * lm)) * Math.pow(10, 6);

        const i_rms_primary = (po / (2 * vout * eta)) * Math.sqrt((2 * lambda) / pi);

        const i_rms_secondary = (po / vout) * Math.sqrt(1 / (2 * lambda));

        const vds_stress = vin / 2;

        const vd_stress = 2 * vout * n;

        const delta_vout = vout * ku;
        const c_out = (po / (8 * fr * vout * delta_vout)) * Math.pow(10, 6);

        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.innerHTML = `
                <div class="glass-card" style="padding: var(--spacing-xl); margin-bottom: var(--spacing-lg);">
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-lg); color: var(--accent-success);">✓ 设计计算结果</h3>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">一、基础参数</h4>
                        <div class="result-item">
                            <span class="result-label">输入功率 Pin:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${pin.toFixed(5)} W</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">输入电流 Iin:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${iin.toFixed(5)} A</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">输出电流 Io:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${io.toFixed(5)} A</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">变压器匝比 n:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${n.toFixed(5)}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">电压增益 M:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${m.toFixed(5)}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">频率比 λ:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${lambda.toFixed(5)}</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">二、谐振网络设计</h4>
                        <div class="result-item">
                            <span class="result-label">励磁电感 Lm:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${lm.toFixed(5)} μH</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">谐振电感 Lr:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${lk.toFixed(5)} μH</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">谐振电容 Cr:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${cr.toFixed(5)} nF</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">励磁电流纹波 ΔIm:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${delta_i_m.toFixed(5)} A</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">三、绕组电流有效值</h4>
                        <div class="result-item">
                            <span class="result-label">原边电流 Irms:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${i_rms_primary.toFixed(5)} A</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">副边电流 Irms:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${i_rms_secondary.toFixed(5)} A</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">四、器件应力分析</h4>
                        <div class="result-item">
                            <span class="result-label">开关管电压应力 Vds:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${vds_stress.toFixed(5)} V</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">二极管电压应力 Vd:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${vd_stress.toFixed(5)} V</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">五、输出滤波电容</h4>
                        <div class="result-item">
                            <span class="result-label">最小输出电容 Cmin:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${c_out.toFixed(5)} μF</span>
                        </div>
                    </div>

                    <div class="result-card" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">六、器件选型建议</h4>
                        <div class="result-item">
                            <span class="result-label">开关管:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary); font-family: var(--font-sans);">${vds_stress.toFixed(0)} V/≥${(i_rms_primary * 2).toFixed(2)} A SiC MOSFET ×4</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">输出二极管:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary); font-family: var(--font-sans);">${vd_stress.toFixed(0)} V/≥${io.toFixed(2)} A 肖特基或SiC二极管</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">输出电容:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary); font-family: var(--font-sans);">${c_out.toFixed(0)} μF/25 V 低ESR</span>
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
                            <strong style="color: var(--text-primary);">谐振网络设计：</strong>Lr与Cr形成串联谐振，Lm参与谐振形成LLC特性。k值（Lr/Lm）影响增益曲线形状，一般取0.15~0.25。
                        </p>
                        <p style="margin-bottom: var(--spacing-md);">
                            <strong style="color: var(--text-primary);">频率控制：</strong>当fs接近fr时，变换器工作于谐振点附近，效率最高；当fs > fr时为感性区，fs < fr时为容性区。
                        </p>
                        <p>
                            <strong style="color: var(--text-primary);">开关管应力：</strong>开关管承受最大电压为Vin/2，比半桥LLC低一半，有利于选择更低耐压的器件，降低成本。
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