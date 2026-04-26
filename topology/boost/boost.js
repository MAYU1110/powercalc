const Boost = {
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

        // 初始加载Boost拓扑图片
        this.loadTopologyImage('boost');

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
                'halfbridge_llc': '半桥LLC谐振电路',
                'fullbridge_llc': '全桥LLC谐振电路'
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
                        <rect x="280" y="130" width="30" height="80" rx="2" fill="none" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="295" y1="130" x2="295" y2="115" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="280" y1="170" x2="310" y2="170" stroke="#3b82f6" stroke-width="2"/>
                        <text x="295" y="210" text-anchor="middle" fill="#3b82f6" font-size="12" font-family="var(--font-mono)">L</text>
                        <line x1="310" y1="170" x2="380" y2="170" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <circle cx="395" cy="170" r="25" fill="none" stroke="#10b981" stroke-width="2"/>
                        <line x1="395" y1="145" x2="395" y2="195" stroke="#10b981" stroke-width="2"/>
                        <text x="395" y="200" text-anchor="middle" fill="#10b981" font-size="12" font-family="var(--font-mono)">D</text>
                        <line x1="395" y1="145" x2="395" y2="130" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="395" y1="130" x2="180" y2="130" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <line x1="180" y1="130" x2="180" y2="100" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <line x1="420" y1="170" x2="500" y2="170" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="500" y="150" width="60" height="40" rx="2" fill="none" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="500" y1="170" x2="560" y2="170" stroke="#3b82f6" stroke-width="2"/>
                        <line x1="530" y1="150" x2="530" y2="190" stroke="#3b82f6" stroke-width="2"/>
                        <text x="530" y="210" text-anchor="middle" fill="#3b82f6" font-size="12" font-family="var(--font-mono)">Cout</text>
                        <line x1="560" y1="170" x2="580" y2="170" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <rect x="580" y="150" width="80" height="40" rx="2" fill="none" stroke="#60a5fa" stroke-width="2"/>
                        <text x="620" y="175" text-anchor="middle" fill="#60a5fa" font-size="14" font-family="var(--font-mono)">Vout</text>
                        <line x1="580" y1="190" x2="580" y2="250" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="580" y1="250" x2="50" y2="250" stroke="#60a5fa" stroke-width="2"/>
                        <line x1="50" y1="250" x2="50" y2="100" stroke="#60a5fa" stroke-width="2" marker-start="url(#arrowhead-left)"/>
                        <text x="620" y="290" text-anchor="middle" fill="#64748b" font-size="11" font-family="var(--font-sans)">GND</text>
                        <line x1="10" y1="280" x2="680" y2="280" stroke="#475569" stroke-width="1" stroke-dasharray="5,5"/>
                    </svg>
                `;
            };
        }
    },

    calculate() {
        const vin = parseFloat(document.getElementById('param-vin').value);
        const vout = parseFloat(document.getElementById('param-vout').value);
        const io = parseFloat(document.getElementById('param-io').value);
        const f = parseFloat(document.getElementById('param-f').value);
        const ku = parseFloat(document.getElementById('param-ku').value);
        const ki = parseFloat(document.getElementById('param-ki').value);

        if (!vin || !vout || !io || !f || !ku || !ki) {
            alert('请填写所有必填参数');
            return;
        }

        if (vout <= vin) {
            alert('输出电压必须大于输入电压（Boost拓扑特性）');
            return;
        }

        // 占空比
        const d = 1 - (vin / vout);
        
        // 周期
        const t = 1 / (f * 1000); // 转换为秒
        
        // 电感
        const l = (vin / (ki * f * 1000 * io)) * (1 - (vin / vout));
        
        // 纹波电压
        const deltaU = vout * ku;
        
        // 输入电容
        const c1 = (vin / (8 * Math.pow(f * 1000, 2) * l * ku * vout)) * (1 - (vin / vout));
        
        // 输出电容
        const c2 = (io / (f * 1000 * ku * vout)) * (1 - (vin / vout));
        
        // 负载
        const r = vout / io;

        // 显示计算结果
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.innerHTML = `
                <div class="glass-card" style="padding: var(--spacing-xl); margin-bottom: var(--spacing-lg);">
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-lg); color: var(--accent-success);">✓ 设计计算结果</h3>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <div class="result-item">
                            <span class="result-label">负载电阻 R:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${r.toFixed(4)} Ω</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">电感 L:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${(l * 1000).toFixed(4)} mH</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">输入电容 C1:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${(c1 * 1000000).toFixed(4)} μF</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">输出电容 C2:</span>
                            <span class="result-value" style="font-weight: 600; color: var(--accent-primary);">${(c2 * 1000000).toFixed(4)} μF</span>
                        </div>
                    </div>

                    <div class="result-card" style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: var(--spacing-md); color: var(--text-primary);">设计参数</h4>
                        <div class="result-item">
                            <span class="result-label">占空比 D:</span>
                            <span class="result-value">${(d * 100).toFixed(2)}%</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">周期 T:</span>
                            <span class="result-value">${(t * 1000000).toFixed(2)} μs</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">纹波电压 Δu:</span>
                            <span class="result-value">${(deltaU * 1000).toFixed(4)} mV</span>
                        </div>
                    </div>
                </div>
            `;
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

function boostInit() {
    Boost.init();
}

window.Boost = Boost;
window.boostInit = boostInit;