const LLC = {
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

        // 初始加载LLC拓扑图片
        this.loadTopologyImage('llc');

        if (topologySelect) {
            topologySelect.addEventListener('change', (e) => {
                const selectedTopology = e.target.value;
                App.loadTopologyModule(selectedTopology);
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
                        <rect x="150" y="50" width="60" height="20" rx="2" fill="none" stroke="#f59e0b" stroke-width="2"/>
                        <text x="180" y="65" text-anchor="middle" fill="#f59e0b" font-size="12" font-family="var(--font-mono)">Q1</text>
                        <rect x="150" y="90" width="60" height="20" rx="2" fill="none" stroke="#f59e0b" stroke-width="2"/>
                        <text x="180" y="105" text-anchor="middle" fill="#f59e0b" font-size="12" font-family="var(--font-mono)">Q2</text>
                        <line x1="210" y1="80" x2="280" y2="80" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="280" y="60" width="30" height="40" rx="2" fill="none" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="295" y1="60" x2="295" y2="100" stroke="#3b82f6" stroke-width="2"/>
                        <text x="295" y="120" text-anchor="middle" fill="#3b82f6" font-size="12" font-family="var(--font-mono)">Lr</text>
                        <line x1="310" y1="80" x2="380" y2="80" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="380" y="60" width="30" height="40" rx="2" fill="none" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="395" y1="70" x2="395" y2="90" stroke="#3b82f6" stroke-width="2"/>
                        <text x="395" y="110" text-anchor="middle" fill="#3b82f6" font-size="12" font-family="var(--font-mono)">Cr</text>
                        <line x1="410" y1="80" x2="480" y2="80" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="480" y="60" width="80" height="80" rx="2" fill="none" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="520" y1="60" x2="520" y2="140" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="480" y1="100" x2="560" y2="100" stroke="#3b82f6" stroke-width="2"/>
                        <text x="520" y="160" text-anchor="middle" fill="#3b82f6" font-size="12" font-family="var(--font-mono)">T</text>
                        <line x1="560" y1="100" x2="630" y2="100" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <circle cx="645" cy="85" r="20" fill="none" stroke="#10b981" stroke-width="2"/>
                        <line x1="645" y1="65" x2="645" y2="105" stroke="#10b981" stroke-width="2"/>
                        <text x="645" y="115" text-anchor="middle" fill="#10b981" font-size="12" font-family="var(--font-mono)">D1</text>
                        <circle cx="645" cy="115" r="20" fill="none" stroke="#10b981" stroke-width="2"/>
                        <line x1="645" y1="95" x2="645" y2="135" stroke="#10b981" stroke-width="2"/>
                        <text x="645" y="145" text-anchor="middle" fill="#10b981" font-size="12" font-family="var(--font-mono)">D2</text>
                        <line x1="645" y1="85" x2="710" y2="85" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <line x1="645" y1="115" x2="710" y2="115" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="710" y="90" width="60" height="40" rx="2" fill="none" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="710" y1="110" x2="770" y2="110" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="740" y1="90" x2="740" y2="130" stroke="#3b82f6" stroke-width="2"/>
                        <text x="740" y="150" text-anchor="middle" fill="#3b82f6" font-size="12" font-family="var(--font-mono)">Cout</text>
                        <line x1="770" y1="110" x2="830" y2="110" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="830" y="90" width="60" height="40" rx="2" fill="none" stroke="#60a5fa" stroke-width="2"/>
                        <text x="860" y="115" text-anchor="middle" fill="#60a5fa" font-size="14" font-family="var(--font-mono)">Vout</text>
                        <line x1="830" y1="130" x2="830" y2="250" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="830" y1="250" x2="50" y2="250" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="50" y1="250" x2="50" y2="100" stroke="#60a5fa" stroke-width="2" marker-start="url(#arrowhead-left)"/>
                        <text x="860" y="290" text-anchor="middle" fill="#64748b" font-size="11" font-family="var(--font-sans)">GND</text>
                        <line x1="10" y1="280" x2="890" y2="280" stroke="#475569" stroke-width="1" stroke-dasharray="5,5"/>
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
        const freqRes = parseFloat(document.getElementById('param-freq-res').value);
        const vripple = parseFloat(document.getElementById('param-vripple').value) / 1000;

        if (!vin || !vout || !pout || !fsw || !efficiency || !freqRes) {
            alert('请填写所有必填参数');
            return;
        }

        const eta = efficiency;
        const pin = pout / eta;
        const iin = pin / vin;
        const iout = pout / vout;

        const turnsRatio = (vin / 2) / vout;
        const lr = 10; // 假设谐振电感
        const cr = 1 / (Math.PI * Math.PI * freqRes * freqRes * lr * 1e-6) * 1e9;

        const cout = iout / (2 * Math.PI * fsw * vripple);
        const icRms = iout / Math.sqrt(2);

        const vswMax = vinMax;
        const iswMax = iin * 2;
        const vdMax = vout * 2;
        const idAvg = iout / 2;

        const ploss = pin - pout;

        const kSw = 0.2;
        const pSw = kSw * vswMax * iswMax * fsw / 1000;

        const kTransformer = 0.1;
        const pTransformer = kTransformer * ploss;

        const vfDiode = 0.5;
        const pDiode = idAvg * vfDiode * 2;

        const kResonant = 0.05;
        const pResonant = kResonant * ploss;

        document.getElementById('result-pin').textContent = pin.toFixed(4);
        document.getElementById('result-iin').textContent = iin.toFixed(4);
        document.getElementById('result-iout').textContent = iout.toFixed(4);

        document.getElementById('result-turns-ratio').textContent = turnsRatio.toFixed(2);
        document.getElementById('result-lr').textContent = lr.toFixed(2);
        document.getElementById('result-cr').textContent = cr.toFixed(2);

        document.getElementById('result-vsw-max').textContent = vswMax.toFixed(2);
        document.getElementById('result-isw-max').textContent = iswMax.toFixed(4);
        document.getElementById('result-vd-max').textContent = vdMax.toFixed(2);
        document.getElementById('result-id-avg').textContent = idAvg.toFixed(4);

        document.getElementById('result-cout').textContent = cout.toFixed(2);
        document.getElementById('result-ic-rms').textContent = icRms.toFixed(4);

        document.getElementById('result-ploss').textContent = ploss.toFixed(4);
        document.getElementById('result-psw').textContent = pSw.toFixed(4);
        document.getElementById('result-ptransformer').textContent = pTransformer.toFixed(4);
        document.getElementById('result-pdiode').textContent = pDiode.toFixed(4);
        document.getElementById('result-presonant').textContent = pResonant.toFixed(4);

        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

function llcInit() {
    LLC.init();
}

window.LLC = LLC;
window.llcInit = llcInit;