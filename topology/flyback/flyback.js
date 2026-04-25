const Flyback = {
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

        // 初始加载反激拓扑图片
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
                App.loadTopologyModule(`flyback/${selectedMode}`);
            });
        }
    },

    loadTopologyImage(topology) {
        // 更新拓扑标题
        const titleElement = document.querySelector('.schematic-title');
        if (titleElement) {
            const topologyNames = {
                'buck': 'Buck降压电路',
                'boost': 'Boost升压电路',
                'buckboost': 'Buck-Boost升降压电路',
                'flyback': '反激电路',
                'llc': 'LLC谐振电路'
            };
            titleElement.textContent = topologyNames[topology] || '电路拓扑结构';
        }

        const imageElement = document.getElementById('topology-image');
        if (imageElement) {
            // 构造图片路径
            const imagePath = `../../image/${topology}_topology.png`;
            
            // 确保容器是图片元素，而不是SVG
            const container = imageElement.parentElement;
            container.innerHTML = `<img id="topology-image" src="" alt="${topology}拓扑结构" style="max-width: 100%; height: auto; max-height: 300px; border-radius: var(--radius-md);">`;
            
            // 获取新创建的图片元素
            const newImageElement = document.getElementById('topology-image');
            
            // 设置图片src
            newImageElement.src = imagePath;
            
            // 处理图片加载失败
            newImageElement.onerror = function() {
                // 如果图片不存在，显示默认的拓扑结构
                console.log(`图片 ${imagePath} 不存在，使用默认拓扑结构`);
                
                // 替换为默认的SVG拓扑结构
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
        const vin = parseFloat(document.getElementById('param-vin').value);
        const vinMax = parseFloat(document.getElementById('param-vin-max').value);
        const vout = parseFloat(document.getElementById('param-vout').value);
        const pout = parseFloat(document.getElementById('param-pout').value);
        const fsw = parseFloat(document.getElementById('param-fsw').value);
        const efficiency = parseFloat(document.getElementById('param-efficiency').value) / 100;
        const ripple = parseFloat(document.getElementById('param-ripple').value) / 100;
        const vripple = parseFloat(document.getElementById('param-vripple').value) / 1000;

        if (!vin || !vout || !pout || !fsw || !efficiency) {
            alert('请填写所有必填参数');
            return;
        }

        const eta = efficiency;
        const pin = pout / eta;
        const iin = pin / vin;
        const iout = pout / vout;

        const d = 0.4; // 假设占空比
        const turnsRatio = (vin * d) / (vout * (1 - d));
        const lPrimary = (vin * d) / (fsw * iin * ripple * 1000);
        const ilPeak = iin * (1 + ripple / 2);
        const ilRms = iin * Math.sqrt(d + (ripple * ripple) / 12);

        const cout = iout * (1 - d) / (8 * fsw * vripple * 1000);
        const icRms = (iout * Math.sqrt(d * (1 - d)));

        const vswMax = vinMax * (1 + 0.2); // 考虑漏感尖峰
        const iswMax = ilPeak;
        const vdMax = vout * (1 + 0.2);
        const idAvg = iout;

        const ploss = pin - pout;

        const kSw = 0.5;
        const pSw = kSw * vswMax * iswMax * fsw / 1000;

        const kTransformer = 0.15;
        const pTransformer = kTransformer * ploss;

        const vfDiode = 0.5;
        const pDiode = idAvg * vfDiode;

        document.getElementById('result-d').textContent = (d * 100).toFixed(2);
        document.getElementById('result-pin').textContent = pin.toFixed(4);
        document.getElementById('result-iin').textContent = iin.toFixed(4);
        document.getElementById('result-iout').textContent = iout.toFixed(4);

        document.getElementById('result-turns-ratio').textContent = turnsRatio.toFixed(2);
        document.getElementById('result-l-primary').textContent = lPrimary.toFixed(2);
        document.getElementById('result-il-peak').textContent = ilPeak.toFixed(4);
        document.getElementById('result-il-rms').textContent = ilRms.toFixed(4);

        document.getElementById('result-cout').textContent = cout.toFixed(2);
        document.getElementById('result-ic-rms').textContent = icRms.toFixed(4);

        document.getElementById('result-vsw-max').textContent = vswMax.toFixed(2);
        document.getElementById('result-isw-max').textContent = iswMax.toFixed(4);
        document.getElementById('result-vd-max').textContent = vdMax.toFixed(2);
        document.getElementById('result-id-avg').textContent = idAvg.toFixed(4);

        document.getElementById('result-ploss').textContent = ploss.toFixed(4);
        document.getElementById('result-psw').textContent = pSw.toFixed(4);
        document.getElementById('result-ptransformer').textContent = pTransformer.toFixed(4);
        document.getElementById('result-pdiode').textContent = pDiode.toFixed(4);

        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

function flybackInit() {
    Flyback.init();
}

window.Flyback = Flyback;
window.flybackInit = flybackInit;