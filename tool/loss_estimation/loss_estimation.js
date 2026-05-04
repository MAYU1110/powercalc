const LossEstimation = {
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

        this.loadTopologyImage('buck');

        if (topologySelect) {
            topologySelect.addEventListener('change', (e) => {
                this.loadTopologyImage(e.target.value);
            });
        }
    },

    loadTopologyImage(topology) {
        const titleElement = document.querySelector('.schematic-title');
        if (titleElement) {
            const topologyNames = {
                'buck': 'Buck降压电路损耗分析',
                'boost': 'Boost升压电路损耗分析',
                'buckboost': 'Buck-Boost升降压电路损耗分析',
                'halfbridge_llc': '半桥LLC谐振电路损耗分析',
                'fullbridge_llc': '全桥LLC谐振电路损耗分析'
            };
            titleElement.textContent = topologyNames[topology] || '损耗估算';
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
                    <svg width="400" height="300" viewBox="0 0 400 300" style="max-width: 100%;">
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
                            </marker>
                        </defs>
                        <text x="30" y="25" text-anchor="middle" fill="#64748b" font-size="12">Vin</text>
                        <line x1="10" y1="50" x2="80" y2="50" stroke="#60a5fa" stroke-width="2"/>
                        <rect x="80" y="30" width="50" height="40" rx="2" fill="none" stroke="#f59e0b" stroke-width="2"/>
                        <text x="105" y="85" text-anchor="middle" fill="#f59e0b" font-size="12">Q</text>
                        <line x1="130" y1="50" x2="180" y2="50" stroke="#f59e0b" stroke-width="2"/>
                        <line x1="180" y1="50" x2="200" y2="80" stroke="#f59e0b" stroke-width="2"/>
                        <line x1="200" y1="80" x2="240" y2="80" stroke="#10b981" stroke-width="2"/>
                        <line x1="240" y1="80" x2="260" y2="50" stroke="#10b981" stroke-width="2"/>
                        <line x1="260" y1="50" x2="320" y2="50" stroke="#10b981" stroke-width="2"/>
                        <line x1="320" y1="50" x2="350" y2="50" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="270" y="110" width="60" height="40" rx="2" fill="none" stroke="#3b82f6" stroke-width="2"/>
                        <text x="300" y="155" text-anchor="middle" fill="#3b82f6" font-size="12">Cout</text>
                        <line x1="300" y1="150" x2="300" y2="220" stroke="#60a5fa" stroke-width="2"/>
                        <rect x="260" y="220" width="80" height="40" rx="2" fill="none" stroke="#60a5fa" stroke-width="2"/>
                        <text x="300" y="245" text-anchor="middle" fill="#60a5fa" font-size="14">Vout</text>
                        <line x1="350" y1="50" x2="350" y2="260" stroke="#475569" stroke-width="1" stroke-dasharray="5,5"/>
                        <text x="365" y="250" text-anchor="middle" fill="#64748b" font-size="11">GND</text>
                    </svg>
                `;
            };
        }

        // 清除之前的计算结果
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.style.display = 'none';
            resultsSection.innerHTML = '';
        }
    },

    calculate() {
        const topology = document.getElementById('topology-select').value;
        const vin = parseFloat(document.getElementById('param-vin').value);
        const vout = parseFloat(document.getElementById('param-vout').value);
        const iout = parseFloat(document.getElementById('param-iout').value);
        const fsw = parseFloat(document.getElementById('param-fsw').value);
        const rds = parseFloat(document.getElementById('param-rds').value);
        const temp = parseFloat(document.getElementById('param-temp').value);
        const vf = parseFloat(document.getElementById('param-vf').value);
        const dcr = parseFloat(document.getElementById('param-dcr').value);
        const eff = parseFloat(document.getElementById('param-eff').value);

        if (!vin || !vout || !iout || !fsw || !rds || !temp || !vf || !dcr || !eff) {
            alert('请填写所有必填参数');
            return;
        }

        const io = iout;
        const po = vout * io;
        const eta = eff / 100;
        const pin = po / eta;
        const total_loss = pin - po;

        const rds_correction = 1 + 0.005 * (temp - 25);
        const rds_actual = rds * rds_correction;

        let p_mos_conduction = 0;
        let p_mos_switching = 0;
        let p_diode = 0;
        let p_inductor = 0;
        let duty_cycle = 0;

        // 定义开关时间参数，供所有拓扑使用
        const tr = 50e-9;  // 上升时间
        const tf = 50e-9;  // 下降时间

        switch (topology) {
            case 'buck':
                duty_cycle = vout / vin;
                const i_ripple = 0.3 * io;
                const i_avg_mos = io * (1 - duty_cycle) + i_ripple / 2;
                p_mos_conduction = i_avg_mos * i_avg_mos * rds_actual * duty_cycle;
                const i_rms_mos = io * Math.sqrt(duty_cycle) * Math.sqrt(1 + (i_ripple / (2 * io)) ** 2);
                const vds = vin;
                p_mos_switching = 0.5 * vds * io * (tr + tf) * fsw * 1000;
                const i_diode_avg = io * (1 - duty_cycle);
                p_diode = i_diode_avg * vf;
                const i_ind_avg = io;
                p_inductor = i_ind_avg * i_ind_avg * dcr;
                break;

            case 'boost':
                duty_cycle = 1 - (vin / vout);
                const i_ripple_boost = 0.3 * io / (1 - duty_cycle);
                const i_avg_mos_boost = io / (1 - duty_cycle);
                p_mos_conduction = i_avg_mos_boost * i_avg_mos_boost * rds_actual * duty_cycle;
                const i_rms_mos_boost = io / (1 - duty_cycle) * Math.sqrt(duty_cycle);
                p_mos_switching = 0.5 * vout * i_avg_mos_boost * (tr + tf) * fsw * 1000;
                p_diode = io * vf;
                p_inductor = (io / (1 - duty_cycle)) ** 2 * (i_ripple_boost ** 2 / 12 + dcr);
                break;

            case 'buckboost':
                duty_cycle = vout / (vout + vin);
                p_mos_conduction = io * io * rds_actual * duty_cycle;
                p_mos_switching = 0.5 * (vin + vout) * io * (tr + tf) * fsw * 1000;
                p_diode = io * vf;
                p_inductor = io * io * dcr;
                break;

            case 'halfbridge_llc':
            case 'fullbridge_llc':
                const n = 3;
                const v_ac = vin / 2;
                const i_primary = po / (v_ac * eta);
                duty_cycle = 0.5;
                p_mos_conduction = i_primary * i_primary * rds_actual * duty_cycle * 2;
                p_mos_switching = 0.25 * vin * vin * (tr + tf) * fsw * 1000 / (2 * Math.PI);
                p_diode = (vin / n) * io * vf * 2;
                p_inductor = po * 0.02;
                break;
        }

        const loss_mos = p_mos_conduction + p_mos_switching;
        const loss_total = loss_mos + p_diode + p_inductor;
        const eta_calculated = (po / (po + loss_total)) * 100;

        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            resultsSection.innerHTML = `
                <div class="glass-card" style="padding: var(--spacing-xl); margin-bottom: var(--spacing-lg);">
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-lg); color: var(--accent-success);">✓ 损耗估算结果</h3>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">一、基本参数</h4>
                        <div class="result-item">
                            <span class="result-label">输入功率 Pin:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${parseFloat(pin.toFixed(5))} W</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">输出功率 Po:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${parseFloat(po.toFixed(5))} W</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">总损耗 P_loss:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${parseFloat(loss_total.toFixed(5))} W</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">占空比 D:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${parseFloat(duty_cycle.toFixed(5))}</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">二、损耗分布</h4>
                        <div class="result-item">
                            <span class="result-label">MOSFET导通损耗:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${parseFloat(p_mos_conduction.toFixed(5))} W</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">MOSFET开关损耗:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${parseFloat(p_mos_switching.toFixed(5))} W</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">二极管损耗:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${parseFloat(p_diode.toFixed(5))} W</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">电感损耗 (DCR):</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${parseFloat(p_inductor.toFixed(5))} W</span>
                        </div>
                    </div>

                    <div class="result-card" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">三、效率分析</h4>
                        <div class="result-item">
                            <span class="result-label">计算效率 η:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary); font-family: var(--font-sans); font-size: 1.25rem;">${parseFloat(eta_calculated.toFixed(5))} %</span>
                        </div>
                        <div class="efficiency-bar">
                            <div class="efficiency-fill" style="width: ${Math.min(eta_calculated, 100)}%;"></div>
                        </div>
                        <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: var(--spacing-sm);">
                            损耗占比: ${parseFloat((loss_total / pin * 100).toFixed(5))} %
                        </p>
                    </div>
                </div>

                <div class="glass-card" style="padding: var(--spacing-xl);">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: var(--spacing-md);">损耗估算说明</h3>
                    <div style="color: var(--text-secondary); line-height: 1.8; font-size: 0.9375rem;">
                        <p style="margin-bottom: var(--spacing-md);">
                            <strong style="color: var(--text-primary);">MOSFET导通损耗：</strong>由导通电阻Rds(on)产生的I²R损耗，受温度影响进行校正。
                        </p>
                        <p style="margin-bottom: var(--spacing-md);">
                            <strong style="color: var(--text-primary);">MOSFET开关损耗：</strong>由开关过程中的电压电流交叠产生的损耗，与开关频率成正比。
                        </p>
                        <p style="margin-bottom: var(--spacing-md);">
                            <strong style="color: var(--text-primary);">二极管损耗：</strong>由二极管正向压降Vf产生的损耗，主要发生在续流阶段。
                        </p>
                        <p>
                            <strong style="color: var(--text-primary);">电感损耗：</strong>由电感线圈电阻DCR产生的铜损，与电流平方成正比。
                        </p>
                    </div>
                </div>
            `;
        }
    }
};

function loss_estimationInit() {
    LossEstimation.init();
}

window.LossEstimation = LossEstimation;
window.loss_estimationInit = loss_estimationInit;