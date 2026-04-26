const App = {
    modules: {},

    async init() {
        this.setupNavToggle();
        this.registerRoutes();
        this.setupModuleLoader();
    },

    setupNavToggle() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
            });
        }
    },

    registerRoutes() {
        Router.register('home', () => this.loadPage('home'));
        Router.register('topology', () => this.loadPage('topology'));
        Router.register('power', () => this.loadPage('power'));
        Router.register('unit', () => this.loadPage('unit'));
        Router.register('more', () => this.loadPage('more'));
    },

    async loadPage(pageName) {
        const pageEl = document.querySelector(`[data-page="${pageName}"]`);
        if (!pageEl) return;

        if (pageEl.innerHTML.trim() === '') {
            if (pageName === 'home') {
                this.renderHomePage(pageEl);
            } else if (pageName === 'topology') {
                await this.loadTopologyModule('buck');
            } else if (pageName === 'power') {
                this.loadPowerTool();
            } else if (pageName === 'unit') {
                this.loadUnitTool();
            } else if (pageName === 'more') {
                pageEl.innerHTML = `
                    <div class="container" style="padding-top: var(--spacing-xl);">
                        <div class="glass-card" style="padding: var(--spacing-xl); text-align: center;">
                            <h2>更多工具</h2>
                            <p style="color: var(--text-secondary); margin: var(--spacing-lg) 0;">持续更新中，敬请期待！</p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-lg); margin-top: var(--spacing-xl);">
                                <div style="text-align: center;">
                                    <div style="width: 64px; height: 64px; background: rgba(59, 130, 246, 0.2); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--spacing-md);">
                                        <svg width="32" height="32" fill="var(--accent-primary)" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H6v-2h4V7h2v4h4v2h-4v4z"/></svg>
                                    </div>
                                    <h4 style="font-weight: 600; margin-bottom: var(--spacing-xs);">Boost 升压电路</h4>
                                    <p style="color: var(--text-muted); font-size: 0.875rem;">开发中</p>
                                </div>
                                <div style="text-align: center;">
                                    <div style="width: 64px; height: 64px; background: rgba(16, 185, 129, 0.2); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--spacing-md);">
                                        <svg width="32" height="32" fill="var(--accent-success)" viewBox="0 0 24 24"><path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"/></svg>
                                    </div>
                                    <h4 style="font-weight: 600; margin-bottom: var(--spacing-xs);">反激式电源</h4>
                                    <p style="color: var(--text-muted); font-size: 0.875rem;">开发中</p>
                                </div>
                                <div style="text-align: center;">
                                    <div style="width: 64px; height: 64px; background: rgba(236, 72, 153, 0.2); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--spacing-md);">
                                        <svg width="32" height="32" fill="var(--accent-pink)" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                    </div>
                                    <h4 style="font-weight: 600; margin-bottom: var(--spacing-xs);">半桥LLC</h4>
                                    <p style="color: var(--text-muted); font-size: 0.875rem;">开发中</p>
                                </div>
                                <div style="text-align: center;">
                                    <div style="width: 64px; height: 64px; background: rgba(124, 58, 237, 0.2); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--spacing-md);">
                                        <svg width="32" height="32" fill="var(--accent-purple)" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                    </div>
                                    <h4 style="font-weight: 600; margin-bottom: var(--spacing-xs);">全桥LLC</h4>
                                    <p style="color: var(--text-muted); font-size: 0.875rem;">开发中</p>
                                </div>
                                <div style="text-align: center;">
                                    <div style="width: 64px; height: 64px; background: rgba(148, 163, 184, 0.2); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--spacing-md);">
                                        <svg width="32" height="32" fill="var(--text-muted)" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                                    </div>
                                    <h4 style="font-weight: 600; margin-bottom: var(--spacing-xs);">更多工具</h4>
                                    <p style="color: var(--text-muted); font-size: 0.875rem;">规划中</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        pageEl.classList.add('active');
    },

    renderHomePage(container) {
        container.innerHTML = `
            <section class="hero section">
                <div class="container">
                    <div class="hero-content" style="text-align: center; padding: var(--spacing-3xl) 0;">
                        <h1 style="font-size: 3rem; font-weight: 700; margin-bottom: var(--spacing-lg); background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                            专业电力电子电路设计工具
                        </h1>
                        <p style="font-size: 1.25rem; color: var(--text-secondary); max-width: 640px; margin: 0 auto var(--spacing-xl);">
                            专为电源工程师打造的在线计算工具集，涵盖DC-DC拓扑设计、功率换算、电气单位换算等常用功能
                        </p>
                        <div style="display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap;">
                            <a href="#topology" class="btn btn-primary" style="font-size: 1.125rem; padding: var(--spacing-md) var(--spacing-xl);">
                                开始设计
                            </a>
                            <a href="#power" class="btn btn-secondary" style="font-size: 1.125rem; padding: var(--spacing-md) var(--spacing-xl);">
                                功率换算
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="features section" style="background: var(--bg-secondary);">
                <div class="container">
                    <h2 class="section-title" style="text-align: center;">核心功能</h2>
                    <div class="grid grid-3" style="margin-top: var(--spacing-xl);">
                        <div class="glass-card" style="padding: var(--spacing-xl);">
                            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-md);">
                                <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                            </div>
                            <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-sm);">电路拓扑设计</h3>
                            <p style="color: var(--text-secondary); line-height: 1.7;">
                                支持Buck、Boost、Buck-Boost、反激等多种DC-DC拓扑，自动计算电感、电容、开关管应力等关键参数
                            </p>
                        </div>
                        <div class="glass-card" style="padding: var(--spacing-xl);">
                            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-md);">
                                <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20"/></svg>
                            </div>
                            <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-sm);">功率换算工具</h3>
                            <p style="color: var(--text-secondary); line-height: 1.7;">
                                电压、电流、电阻、功率之间的相互换算，支持分压、分流、功率损耗等常用计算公式
                            </p>
                        </div>
                        <div class="glass-card" style="padding: var(--spacing-xl);">
                            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-md);">
                                <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M4 12h16M12 4v16"/></svg>
                            </div>
                            <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-sm);">电气单位换算</h3>
                            <p style="color: var(--text-secondary); line-height: 1.7;">
                                电压（mV/V/kV）、电流（mA/A/kA）、功率（mW/W/kW/MW）、频率（Hz/kHz/MHz）等单位的快速转换
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="tools section">
                <div class="container">
                    <h2 class="section-title" style="text-align: center;">所有工具入口</h2>
                    <div class="grid grid-2" style="margin-top: var(--spacing-xl); max-width: 800px; margin-left: auto; margin-right: auto;">
                        <a href="#topology" class="tool-card glass-card" style="display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-lg);">
                            <div style="width: 56px; height: 56px; background: rgba(59, 130, 246, 0.2); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                                <svg width="28" height="28" fill="var(--accent-primary)" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H6v-2h4V7h2v4h4v2h-4v4z"/></svg>
                            </div>
                            <div>
                                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: var(--spacing-xs);">电路拓扑设计</h3>
                                <p style="color: var(--text-secondary); font-size: 0.875rem;">Buck/Boost/反激等拓扑计算</p>
                            </div>
                        </a>
                        <a href="#power" class="tool-card glass-card" style="display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-lg);">
                            <div style="width: 56px; height: 56px; background: rgba(16, 185, 129, 0.2); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                                <svg width="28" height="28" fill="var(--accent-success)" viewBox="0 0 24 24"><path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"/></svg>
                            </div>
                            <div>
                                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: var(--spacing-xs);">功率换算工具</h3>
                                <p style="color: var(--text-secondary); font-size: 0.875rem;">P=U×I等功率相关计算</p>
                            </div>
                        </a>
                        <a href="#unit" class="tool-card glass-card" style="display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-lg);">
                            <div style="width: 56px; height: 56px; background: rgba(245, 158, 11, 0.2); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                                <svg width="28" height="28" fill="var(--accent-warning)" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                            </div>
                            <div>
                                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: var(--spacing-xs);">电压电流单位换算</h3>
                                <p style="color: var(--text-secondary); font-size: 0.875rem;">mV/A/kV等单位的快速转换</p>
                            </div>
                        </a>
                        <a href="#more" class="tool-card glass-card" style="display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-lg);">
                            <div style="width: 56px; height: 56px; background: rgba(148, 163, 184, 0.2); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                                <svg width="28" height="28" fill="var(--text-muted)" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                            </div>
                            <div>
                                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: var(--spacing-xs);">更多工具</h3>
                                <p style="color: var(--text-secondary); font-size: 0.875rem;">持续更新中...</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <section class="audience section" style="background: var(--bg-secondary);">
                <div class="container">
                    <h2 class="section-title" style="text-align: center;">面向人群</h2>
                    <div style="max-width: 800px; margin: var(--spacing-xl) auto 0;">
                        <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-md); justify-content: center;">
                            <span class="badge" style="padding: var(--spacing-sm) var(--spacing-md); font-size: 0.9375rem;">电源硬件工程师</span>
                            <span class="badge" style="padding: var(--spacing-sm) var(--spacing-md); font-size: 0.9375rem;">电力电子工程师</span>
                            <span class="badge" style="padding: var(--spacing-sm) var(--spacing-md); font-size: 0.9375rem;">嵌入式硬件工程师</span>
                            <span class="badge" style="padding: var(--spacing-sm) var(--spacing-md); font-size: 0.9375rem;">电路设计人员</span>
                            <span class="badge" style="padding: var(--spacing-sm) var(--spacing-md); font-size: 0.9375rem;">电子专业学生</span>
                            <span class="badge" style="padding: var(--spacing-sm) var(--spacing-md); font-size: 0.9375rem;">PCB Layout工程师</span>
                        </div>
                        <p style="text-align: center; color: var(--text-secondary); margin-top: var(--spacing-xl); max-width: 640px; margin-left: auto; margin-right: auto;">
                            无论你是资深电源工程师还是电子专业学生，PowerCalc都能为你提供快速、准确的电路参数计算支持，让设计工作更加高效。
                        </p>
                    </div>
                </div>
            </section>

            <section class="features-detail section">
                <div class="container">
                    <h2 class="section-title" style="text-align: center;">网站特点</h2>
                    <div class="grid grid-2" style="margin-top: var(--spacing-xl); max-width: 900px; margin-left: auto; margin-right: auto; gap: var(--spacing-xl);">
                        <div style="display: flex; gap: var(--spacing-md);">
                            <div style="color: var(--accent-success); font-size: 1.5rem;">✓</div>
                            <div>
                                <h4 style="font-weight: 600; margin-bottom: var(--spacing-xs);">纯前端计算</h4>
                                <p style="color: var(--text-secondary); font-size: 0.9375rem;">所有计算完全在浏览器本地完成，无需上传数据，保护您的设计隐私</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: var(--spacing-md);">
                            <div style="color: var(--accent-success); font-size: 1.5rem;">✓</div>
                            <div>
                                <h4 style="font-weight: 600; margin-bottom: var(--spacing-xs);">无广告干扰</h4>
                                <p style="color: var(--text-secondary); font-size: 0.9375rem;">专注工具属性，界面简洁专业，开箱即用，无需注册登录</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: var(--spacing-md);">
                            <div style="color: var(--accent-success); font-size: 1.5rem;">✓</div>
                            <div>
                                <h4 style="font-weight: 600; margin-bottom: var(--spacing-xs);">模块化架构</h4>
                                <p style="color: var(--text-secondary); font-size: 0.9375rem;">扩展性强，后续将支持更多电路拓扑和新功能</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: var(--spacing-md);">
                            <div style="color: var(--accent-success); font-size: 1.5rem;">✓</div>
                            <div>
                                <h4 style="font-weight: 600; margin-bottom: var(--spacing-xs);">专业公式</h4>
                                <p style="color: var(--text-secondary); font-size: 0.9375rem;">基于电力电子经典理论，公式严谨，计算结果可靠</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer style="border-top: 1px solid var(--border-default); padding: var(--spacing-xl) 0; text-align: center; color: var(--text-muted);">
                <div class="container">
                    <p>PowerCalc - 专业电力电子电路设计工具 | 纯前端计算，保护隐私</p>
                    <p style="margin-top: var(--spacing-sm); font-size: 0.875rem;">专为电源工程师打造，开箱即用</p>
                </div>
            </footer>
        `;
    },

    async loadTopologyModule(topologyName) {
        const pageEl = document.querySelector('[data-page="topology"]');
        if (!pageEl) {
            console.log('loadTopologyModule: page element not found');
            return;
        }

        console.log('loadTopologyModule called with:', topologyName);

        try {
            if (topologyName === 'flyback') {
                topologyName = 'flyback/ccm';
            }

            const parts = topologyName.split('/');
            let fileName;
            if (parts.length === 2) {
                fileName = `${parts[0]}_${parts[1]}`;
            } else {
                fileName = topologyName;
            }
            console.log('loadTopologyModule: loading', `topology/${topologyName}/${fileName}.html`);
            const response = await fetch(`topology/${topologyName}/${fileName}.html`);
            if (response.ok) {
                const html = await response.text();
                pageEl.innerHTML = html;
                
                document.querySelectorAll('link[href*="topology/"]').forEach(link => link.remove());
                document.querySelectorAll('script[src*="topology/"]').forEach(script => script.remove());

                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `topology/${topologyName}/${fileName}.css`;
                document.head.appendChild(link);

                const script = document.createElement('script');
                script.src = `topology/${topologyName}/${fileName}.js`;
                script.onload = () => {
                    const initFunctionName = `${fileName}Init`;
                    console.log('loadTopologyModule: calling', initFunctionName);
                    if (window[initFunctionName]) {
                        window[initFunctionName]();
                    } else {
                        console.log('loadTopologyModule:', initFunctionName, 'not found');
                    }
                };
                script.onerror = () => {
                    console.log('loadTopologyModule: failed to load script');
                };
                document.body.appendChild(script);
            } else {
                console.log('loadTopologyModule: fetch failed, status:', response.status);
            }
        } catch (e) {
            console.log('loadTopologyModule: error', e);
            pageEl.innerHTML = `
                <div class="container" style="padding-top: var(--spacing-xl);">
                    <div class="glass-card" style="padding: var(--spacing-xl); text-align: center;">
                        <h2 style="margin-bottom: var(--spacing-md);">电路拓扑设计</h2>
                        <p style="color: var(--text-secondary);">正在加载模块...</p>
                    </div>
                </div>
            `;
        }
    },

    loadPowerTool() {
        const pageEl = document.querySelector('[data-page="power"]');
        if (!pageEl) return;

        pageEl.innerHTML = `
            <div class="container" style="padding-top: var(--spacing-xl);">
                <h1 class="section-title">功率换算工具</h1>
                <p class="section-subtitle">电压、电流、电阻、功率之间的相互换算</p>

                <div class="grid grid-2" style="gap: var(--spacing-xl);">
                    <div class="glass-card" style="padding: var(--spacing-xl);">
                        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-lg);">基本功率计算</h3>
                        <div class="form-group">
                            <label class="form-label">电压 (V)</label>
                            <input type="number" id="power-vin" class="form-input" placeholder="输入电压" step="0.01">
                        </div>
                        <div class="form-group">
                            <label class="form-label">电流 (A)</label>
                            <input type="number" id="power-iin" class="form-input" placeholder="输入电流" step="0.01">
                        </div>
                        <div class="form-group">
                            <label class="form-label">电阻 (Ω)</label>
                            <input type="number" id="power-r" class="form-input" placeholder="输入电阻" step="0.01">
                        </div>
                        <button onclick="App.calculatePower()" class="btn btn-primary" style="width: 100%; margin-top: var(--spacing-md);">
                            计算
                        </button>

                        <div id="power-results" style="margin-top: var(--spacing-lg); display: none;">
                            <div class="result-card">
                                <div class="result-item">
                                    <span class="result-label">功率 (P)</span>
                                    <span class="result-value" id="result-p">-</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="glass-card" style="padding: var(--spacing-xl);">
                        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-lg);">欧姆定律</h3>
                        <div style="background: var(--bg-secondary); border-radius: var(--radius-md); padding: var(--spacing-lg); margin-bottom: var(--spacing-lg); text-align: center;">
                            <p style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-secondary);">P = V × I = I² × R = V² / R</p>
                        </div>
                        <div class="form-group">
                            <label class="form-label">选择要计算的值</label>
                            <select id="power-calc-type" class="form-select">
                                <option value="power">计算功率 (P)</option>
                                <option value="voltage">计算电压 (V)</option>
                                <option value="current">计算电流 (I)</option>
                                <option value="resistance">计算电阻 (R)</option>
                            </select>
                        </div>
                        <div id="power-inputs">
                            <div class="form-group" id="input-voltage-group">
                                <label class="form-label">电压 (V)</label>
                                <input type="number" id="calc-voltage" class="form-input" placeholder="输入电压" step="0.01">
                            </div>
                            <div class="form-group" id="input-current-group">
                                <label class="form-label">电流 (A)</label>
                                <input type="number" id="calc-current" class="form-input" placeholder="输入电流" step="0.01">
                            </div>
                            <div class="form-group" id="input-resistance-group" style="display: none;">
                                <label class="form-label">电阻 (Ω)</label>
                                <input type="number" id="calc-resistance" class="form-input" placeholder="输入电阻" step="0.01">
                            </div>
                        </div>
                        <button onclick="App.calculateOhmsLaw()" class="btn btn-primary" style="width: 100%; margin-top: var(--spacing-md);">
                            计算
                        </button>
                        <div id="ohms-result" style="margin-top: var(--spacing-lg); display: none;">
                            <div class="result-card">
                                <div class="result-item">
                                    <span class="result-label">计算结果</span>
                                    <span class="result-value" id="ohms-result-value">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    calculatePower() {
        const vin = parseFloat(document.getElementById('power-vin').value);
        const iin = parseFloat(document.getElementById('power-iin').value);
        const r = parseFloat(document.getElementById('power-r').value);

        let power = 0;
        if (vin && iin) {
            power = vin * iin;
        } else if (vin && r) {
            power = (vin * vin) / r;
        } else if (iin && r) {
            power = iin * iin * r;
        }

        document.getElementById('result-p').textContent = power.toFixed(4) + ' W';
        document.getElementById('power-results').style.display = 'block';
    },

    calculateOhmsLaw() {
        const calcType = document.getElementById('power-calc-type').value;
        const v = parseFloat(document.getElementById('calc-voltage').value);
        const i = parseFloat(document.getElementById('calc-current').value);
        const r = parseFloat(document.getElementById('calc-resistance').value);

        let result = 0;
        let unit = '';

        switch (calcType) {
            case 'power':
                if (v && i) {
                    result = v * i;
                    unit = 'W';
                } else if (v && r) {
                    result = (v * v) / r;
                    unit = 'W';
                } else if (i && r) {
                    result = i * i * r;
                    unit = 'W';
                }
                break;
            case 'voltage':
                if (i && r) {
                    result = i * r;
                    unit = 'V';
                } else if (i && document.getElementById('input-resistance-group').style.display !== 'none' && r) {
                    result = i * r;
                    unit = 'V';
                } else if (document.getElementById('input-current-group').style.display !== 'none' && i) {
                    result = i * r;
                    unit = 'V';
                }
                break;
            case 'current':
                if (v && r) {
                    result = v / r;
                    unit = 'A';
                } else if (v && document.getElementById('input-resistance-group').style.display !== 'none' && r) {
                    result = v / r;
                    unit = 'A';
                }
                break;
            case 'resistance':
                if (v && i) {
                    result = v / i;
                    unit = 'Ω';
                } else if (v && document.getElementById('input-current-group').style.display !== 'none' && i) {
                    result = v / i;
                    unit = 'Ω';
                }
                break;
        }

        document.getElementById('ohms-result-value').textContent = result.toFixed(4) + ' ' + unit;
        document.getElementById('ohms-result').style.display = 'block';
    },

    loadUnitTool() {
        const pageEl = document.querySelector('[data-page="unit"]');
        if (!pageEl) return;

        pageEl.innerHTML = `
            <div class="container" style="padding-top: var(--spacing-xl);">
                <h1 class="section-title">电压电流单位换算</h1>
                <p class="section-subtitle">常见电气单位的快速转换工具</p>

                <div class="grid grid-2" style="gap: var(--spacing-xl);">
                    <div class="glass-card" style="padding: var(--spacing-xl);">
                        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-lg);">电压换算</h3>
                        <div style="display: flex; gap: var(--spacing-md); margin-bottom: var(--spacing-md);">
                            <input type="number" id="voltage-input" class="form-input" placeholder="输入数值" step="0.001">
                            <select id="voltage-from" class="form-select" style="width: 100px;">
                                <option value="V">V</option>
                                <option value="mV">mV</option>
                                <option value="kV">kV</option>
                            </select>
                        </div>
                        <button onclick="App.convertVoltage()" class="btn btn-primary" style="width: 100%;">
                            换算
                        </button>
                        <div id="voltage-results" style="margin-top: var(--spacing-lg); display: none;">
                            <div class="result-card">
                                <div class="result-item">
                                    <span class="result-label">mV</span>
                                    <span class="result-value" id="voltage-mv">-</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">V</span>
                                    <span class="result-value" id="voltage-v">-</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">kV</span>
                                    <span class="result-value" id="voltage-kv">-</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="glass-card" style="padding: var(--spacing-xl);">
                        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-lg);">电流换算</h3>
                        <div style="display: flex; gap: var(--spacing-md); margin-bottom: var(--spacing-md);">
                            <input type="number" id="current-input" class="form-input" placeholder="输入数值" step="0.001">
                            <select id="current-from" class="form-select" style="width: 100px;">
                                <option value="A">A</option>
                                <option value="mA">mA</option>
                                <option value="kA">kA</option>
                            </select>
                        </div>
                        <button onclick="App.convertCurrent()" class="btn btn-primary" style="width: 100%;">
                            换算
                        </button>
                        <div id="current-results" style="margin-top: var(--spacing-lg); display: none;">
                            <div class="result-card">
                                <div class="result-item">
                                    <span class="result-label">mA</span>
                                    <span class="result-value" id="current-ma">-</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">A</span>
                                    <span class="result-value" id="current-a">-</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">kA</span>
                                    <span class="result-value" id="current-ka">-</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="glass-card" style="padding: var(--spacing-xl);">
                        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-lg);">功率换算</h3>
                        <div style="display: flex; gap: var(--spacing-md); margin-bottom: var(--spacing-md);">
                            <input type="number" id="powerunit-input" class="form-input" placeholder="输入数值" step="0.001">
                            <select id="powerunit-from" class="form-select" style="width: 100px;">
                                <option value="W">W</option>
                                <option value="mW">mW</option>
                                <option value="kW">kW</option>
                                <option value="MW">MW</option>
                            </select>
                        </div>
                        <button onclick="App.convertPower()" class="btn btn-primary" style="width: 100%;">
                            换算
                        </button>
                        <div id="powerunit-results" style="margin-top: var(--spacing-lg); display: none;">
                            <div class="result-card">
                                <div class="result-item">
                                    <span class="result-label">mW</span>
                                    <span class="result-value" id="powerunit-mw">-</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">W</span>
                                    <span class="result-value" id="powerunit-w">-</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">kW</span>
                                    <span class="result-value" id="powerunit-kw">-</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">MW</span>
                                    <span class="result-value" id="powerunit-mwunit">-</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="glass-card" style="padding: var(--spacing-xl);">
                        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: var(--spacing-lg);">频率换算</h3>
                        <div style="display: flex; gap: var(--spacing-md); margin-bottom: var(--spacing-md);">
                            <input type="number" id="freq-input" class="form-input" placeholder="输入数值" step="0.001">
                            <select id="freq-from" class="form-select" style="width: 100px;">
                                <option value="Hz">Hz</option>
                                <option value="kHz">kHz</option>
                                <option value="MHz">MHz</option>
                            </select>
                        </div>
                        <button onclick="App.convertFreq()" class="btn btn-primary" style="width: 100%;">
                            换算
                        </button>
                        <div id="freq-results" style="margin-top: var(--spacing-lg); display: none;">
                            <div class="result-card">
                                <div class="result-item">
                                    <span class="result-label">Hz</span>
                                    <span class="result-value" id="freq-hz">-</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">kHz</span>
                                    <span class="result-value" id="freq-khz">-</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">MHz</span>
                                    <span class="result-value" id="freq-mhz">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    convertVoltage() {
        const val = parseFloat(document.getElementById('voltage-input').value);
        const from = document.getElementById('voltage-from').value;
        if (!val) return;

        let v = val;
        if (from === 'mV') v = val / 1000;
        if (from === 'kV') v = val * 1000;

        document.getElementById('voltage-mv').textContent = (v * 1000).toFixed(6);
        document.getElementById('voltage-v').textContent = v.toFixed(6);
        document.getElementById('voltage-kv').textContent = (v / 1000).toFixed(6);
        document.getElementById('voltage-results').style.display = 'block';
    },

    convertCurrent() {
        const val = parseFloat(document.getElementById('current-input').value);
        const from = document.getElementById('current-from').value;
        if (!val) return;

        let a = val;
        if (from === 'mA') a = val / 1000;
        if (from === 'kA') a = val * 1000;

        document.getElementById('current-ma').textContent = (a * 1000).toFixed(6);
        document.getElementById('current-a').textContent = a.toFixed(6);
        document.getElementById('current-ka').textContent = (a / 1000).toFixed(6);
        document.getElementById('current-results').style.display = 'block';
    },

    convertPower() {
        const val = parseFloat(document.getElementById('powerunit-input').value);
        const from = document.getElementById('powerunit-from').value;
        if (!val) return;

        let w = val;
        if (from === 'mW') w = val / 1000;
        if (from === 'kW') w = val * 1000;
        if (from === 'MW') w = val * 1000000;

        document.getElementById('powerunit-mw').textContent = (w * 1000).toFixed(6);
        document.getElementById('powerunit-w').textContent = w.toFixed(6);
        document.getElementById('powerunit-kw').textContent = (w / 1000).toFixed(6);
        document.getElementById('powerunit-mwunit').textContent = (w / 1000000).toFixed(6);
        document.getElementById('powerunit-results').style.display = 'block';
    },

    convertFreq() {
        const val = parseFloat(document.getElementById('freq-input').value);
        const from = document.getElementById('freq-from').value;
        if (!val) return;

        let hz = val;
        if (from === 'kHz') hz = val * 1000;
        if (from === 'MHz') hz = val * 1000000;

        document.getElementById('freq-hz').textContent = hz.toFixed(2);
        document.getElementById('freq-khz').textContent = (hz / 1000).toFixed(6);
        document.getElementById('freq-mhz').textContent = (hz / 1000000).toFixed(6);
        document.getElementById('freq-results').style.display = 'block';
    },

    getPlaceholderContent(pageName) {
        return `
            <div class="container" style="padding-top: var(--spacing-xl);">
                <div class="glass-card" style="padding: var(--spacing-xl); text-align: center;">
                    <h2>${pageName}</h2>
                    <p style="color: var(--text-secondary);">页面加载中...</p>
                </div>
            </div>
        `;
    },

    setupModuleLoader() {}
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});