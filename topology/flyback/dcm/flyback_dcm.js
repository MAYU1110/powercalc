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
        
        const lm = Number(((Math.pow(n, 2) * Math.pow(1 - d_max, 2) / (2 * eta * fs * 1000)) * (vo / iolmax)).toFixed(5));

        const ipri_rms_max = Number(((2 / Math.sqrt(3)) * (Math.sqrt(d_max) * iolmax) / (n * (1 - d_max))).toFixed(5));
        const isec_rms_max = Number(((2 / Math.sqrt(3)) * iolmax / Math.sqrt(1 - d_max)).toFixed(5));

        const vds_stress = Number((vgmax + n * vo).toFixed(5));
        const vd_max = Number((vgmax / n + vo).toFixed(5));

        const rc_max = Number(((1 - d_max) * deltavo / (2 * iolmax)).toFixed(5));
        const c_min = Number((d_max * iolmax * Math.pow(10, 6) / (fs * deltavo * 1000)).toFixed(5));

        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.innerHTML = `
                <div class="glass-card" style="padding: var(--spacing-xl); margin-bottom: var(--spacing-lg);">
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-lg); color: var(--accent-success);">✓ DCM 反激变换器设计计算结果</h3>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">一、基础参数</h4>
                        <div class="result-item">
                            <span class="result-label">最大输出功率 Pomax:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${p_omax.toFixed(5)} W</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">最小负载电阻 Rmin:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${r_min.toFixed(5)} Ω</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">二、变压器设计（AP法）</h4>
                        <div class="result-item">
                            <span class="result-label">匝比 N:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${n}:1</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">最大占空比 Dmax:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${d_max.toFixed(5)}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">面积积 Wa·Ac:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${wa_ac.toFixed(5)} cm⁴</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">激磁电感 Lm:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${(lm * 1000000).toFixed(5)} μH</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">三、绕组电流与线规</h4>
                        <div class="result-item">
                            <span class="result-label">原边有效值电流 Ipri(rms):</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${ipri_rms_max.toFixed(5)} A</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">副边有效值电流 Isec(rms):</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${isec_rms_max.toFixed(5)} A</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">四、MOSFET与二极管</h4>
                        <div class="result-item">
                            <span class="result-label">MOS电压应力 Vds:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${vds_stress.toFixed(5)} V</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">二极管反向电压 Vd(max):</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${vd_max.toFixed(5)} V</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">五、输出滤波电容</h4>
                        <div class="result-item">
                            <span class="result-label">最大允许ESR Rc_max:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${rc_max.toFixed(5)} Ω</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">最小电容量 Cmin:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${c_min.toFixed(5)} μF</span>
                        </div>
                    </div>

                    <div class="result-card" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">六、器件选型建议</h4>
                        <div class="result-item">
                            <span class="result-label">输出电容:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary); font-family: var(--font-sans);">220~330 μF/25 V 低ESR</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">负载电阻:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary); font-family: var(--font-sans);">${r_min.toFixed(2)} Ω/30 W</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">MOSFET:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary); font-family: var(--font-sans);">600 V/≥0.5 A</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">二极管:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary); font-family: var(--font-sans);">100 V/≥2 A</span>
                        </div>
                    </div>
                </div>
            `;
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

function flyback_dcmInit() {
    FlybackDCM.init();
}

window.FlybackDCM = FlybackDCM;
window.flyback_dcmInit = flyback_dcmInit;
