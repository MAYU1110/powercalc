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
        }
    },

    loadTopologyImage(topology) {
        const titleElement = document.querySelector('.schematic-title');
        if (titleElement) {
            titleElement.textContent = '反激电路经典拓扑结构 (DCM模式)';
        }

        const imageElement = document.getElementById('topology-image');
        if (imageElement) {
            const imagePath = `../../../image/${topology}_topology.png`;

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
        const vinMin = parseFloat(document.getElementById('param-vin-min').value);
        const vinMax = parseFloat(document.getElementById('param-vin-max').value);
        const vout = parseFloat(document.getElementById('param-vout').value);
        const vripple = parseFloat(document.getElementById('param-vripple').value);
        const ioutMax = parseFloat(document.getElementById('param-iout-max').value);
        const efficiency = parseFloat(document.getElementById('param-efficiency').value) / 100;
        const fsw = parseFloat(document.getElementById('param-fsw').value);
        const vds = parseFloat(document.getElementById('param-vds').value);
        const vdsDerate = parseFloat(document.getElementById('param-vds-derate').value);
        const bm = parseFloat(document.getElementById('param-bm').value);
        const j = parseFloat(document.getElementById('param-j').value);
        const k = parseFloat(document.getElementById('param-k').value);

        if (!vinMin || !vinMax || !vout || !ioutMax || !fsw || !efficiency) {
            alert('请填写所有必填参数');
            return;
        }

        const pomax = vout * ioutMax;
        const rmin = vout / ioutMax;

        const N = (vds - vdsDerate - vinMax) / vout;
        const N_int = Math.round(N);

        const dmax = 1 / (1 + efficiency * vinMin / (N_int * vout));

        const Wa_Ac = (2 / Math.sqrt(3)) * (pomax * (Math.sqrt(1 - dmax) + Math.sqrt(dmax))) / (bm * j * k * fsw * 1000 * efficiency) * 1000000;

        const Ac = 0.38;
        const Wa = Wa_Ac / Ac;

        const Ns = Math.round((vout * (1 - dmax)) / (Ac * bm * fsw * efficiency) * 100000000);
        const Np = Math.round(N_int * Ns);

        const Lm = (Math.pow(N_int, 2) * Math.pow(1 - dmax, 2) * vout) / (2 * efficiency * fsw * 1000 * ioutMax);

        const lg = (4 * Math.PI * 1e-9 * Math.pow(Np, 2) * Ac * 1e-4) / (Lm * 1e-6) * 100;

        const IpriRms = (2 / Math.sqrt(3)) * (Math.sqrt(dmax) * ioutMax) / (N_int * (1 - dmax));
        const IsecRms = (2 / Math.sqrt(3)) * ioutMax / Math.sqrt(1 - dmax);

        const Vds = vinMax + N_int * vout;
        const Vdmax = vinMax / N_int + vout;

        const Rc_max = ((1 - dmax) * vripple) / (2 * ioutMax);
        const Cmin = (dmax * ioutMax) / (fsw * 1000 * vripple);

        document.getElementById('result-pomax').textContent = pomax.toFixed(5);
        document.getElementById('result-rmin').textContent = rmin.toFixed(5);

        document.getElementById('result-turns-ratio').textContent = `${Np}:${Ns} = ${N_int}:1`;
        document.getElementById('result-dmax').textContent = dmax.toFixed(5);
        document.getElementById('result-ap').textContent = Wa_Ac.toFixed(5);
        document.getElementById('result-ac').textContent = Ac.toFixed(5);
        document.getElementById('result-wa').textContent = Wa.toFixed(5);
        document.getElementById('result-ns').textContent = Ns;
        document.getElementById('result-np').textContent = Np;
        document.getElementById('result-lm').textContent = Lm.toFixed(5);
        document.getElementById('result-lg').textContent = lg.toFixed(5);

        document.getElementById('result-ipri-rms').textContent = IpriRms.toFixed(5);
        document.getElementById('result-isec-rms').textContent = IsecRms.toFixed(5);

        document.getElementById('result-vds').textContent = Vds.toFixed(5);
        document.getElementById('result-vd-max').textContent = Vdmax.toFixed(5);

        document.getElementById('result-rc-max').textContent = Rc_max.toFixed(5);
        document.getElementById('result-cmin').textContent = Cmin.toFixed(5);

        document.getElementById('results-section').style.display = 'block';
    }
};

function flybackDCMInit() {
    FlybackDCM.init();
}

window.FlybackDCM = FlybackDCM;
window.flybackDCMInit = flybackDCMInit;