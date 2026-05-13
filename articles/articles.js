class ArticlesModule {
    constructor() {
        this.articlesPerPage = 6;
        this.currentPage = 1;
        this.filteredArticles = [];
        this.allArticlesData = [];
        this.init();
    }

    async init() {
        await this.loadArticlesFromMarkdown();
        this.setupEventListeners();
    }

    async loadArticlesFromMarkdown() {
        const articlesList = [
            'buck-boost-intro.md',
            'llc-resonant.md',
            'transformer-design.md'
        ];

        for (const fileName of articlesList) {
            try {
                const response = await fetch(`articles/article/${fileName}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const markdown = await response.text();
                const article = this.parseMarkdown(markdown);
                article.fileName = fileName;
                this.allArticlesData.push(article);
            } catch (error) {
                console.error('加载文章失败:', fileName, error);
            }
        }

        this.renderArticles();
    }

    parseMarkdown(markdown) {
        const metaRegex = /^---\n([\s\S]*?)\n---/;
        const match = markdown.match(metaRegex);
        
        const meta = {};
        let content = markdown;
        
        if (match) {
            content = markdown.replace(metaRegex, '').trim();
            const metaLines = match[1].split('\n');
            
            metaLines.forEach(line => {
                const [key, value] = line.split(':').map(s => s.trim());
                if (key && value) {
                    meta[key] = value.replace(/["']/g, '');
                }
            });
        }

        const firstImageMatch = content.match(/!\[.*?\]\((.*?)\)/);
        const firstImage = firstImageMatch ? firstImageMatch[1] : null;

        return {
            title: meta.title || '未命名文章',
            category: meta.category || 'other',
            tag: meta.tag || '其他',
            date: meta.date || new Date().toISOString().split('T')[0],
            readTime: meta.readTime || '5分钟',
            author: meta.author || '',
            contact: meta.contact || '',
            cover: meta.cover || firstImage,
            content: content,
            excerpt: this.extractExcerpt(content)
        };
    }

    extractExcerpt(content) {
        const text = content
            .replace(/[#*`>\-\[\]]/g, '')
            .replace(/!\[.*?\]\(.*?\)/g, '')
            .replace(/```[\s\S]*?```/g, '')
            .trim();
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
    }

    getCategoryColor(category) {
        const colors = {
            topology: 'rgba(59, 130, 246, 0.8)',
            power: 'rgba(245, 158, 11, 0.8)',
            magnetic: 'rgba(16, 185, 129, 0.8)',
            control: 'rgba(139, 92, 246, 0.8)',
            thermal: 'rgba(239, 68, 68, 0.8)',
            other: 'rgba(107, 114, 128, 0.8)'
        };
        return colors[category] || colors.other;
    }

    renderArticles() {
        const articlesGrid = document.querySelector('.articles-grid');
        if (!articlesGrid) return;

        articlesGrid.innerHTML = this.allArticlesData.map((article, index) => {
            const coverImage = article.cover 
                ? `<img src="${article.cover}" alt="${article.title}">`
                : this.generateDefaultCover(article.tag, article.category);
            
            const authorHtml = article.author ? `
                <div class="article-author">
                    <div class="author-avatar">${article.author.charAt(0)}</div>
                    <div class="author-info">
                        <div class="author-name">${article.author}</div>
                        ${article.contact ? `<div class="author-contact">${article.contact}</div>` : ''}
                    </div>
                </div>
            ` : '';
            
            return `
                <article class="article-card glass-card" data-category="${article.category}" data-index="${index}">
                    <div class="article-image-wrapper">
                        <div class="article-image">${coverImage}</div>
                    </div>
                    <div class="article-content">
                        <div class="article-meta">
                            <span class="article-tag">${article.tag}</span>
                            <span class="article-date">${article.date}</span>
                        </div>
                        <h2 class="article-title">${article.title}</h2>
                        <p class="article-excerpt">${article.excerpt}</p>
                        ${authorHtml}
                        <div class="article-footer">
                            <span class="read-time">阅读时间：${article.readTime}</span>
                            <button class="read-more" data-index="${index}">阅读全文</button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        this.allArticles = Array.from(document.querySelectorAll('.article-card'));
        this.totalPages = Math.ceil(this.allArticles.length / this.articlesPerPage);
        this.renderPagination();
        this.showPage(1);
    }

    generateDefaultCover(tag, category) {
        const color = this.getCategoryColor(category);
        return `
            <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="200" fill="${color}"/>
                <text x="200" y="110" text-anchor="middle" fill="white" font-size="18" font-weight="bold">
                    ${tag}
                </text>
            </svg>
        `;
    }

    setupEventListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterArticles(e.target.dataset.category);
            });
        });

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchArticles(e.target.value);
            });
        }

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('read-more')) {
                const index = parseInt(e.target.dataset.index);
                this.openArticleDetail(index);
            }
        });

        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.showPage(this.currentPage - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.showPage(this.currentPage + 1);
            });
        }
    }

    renderPagination() {
        const paginationNumbers = document.querySelector('.pagination-numbers');
        const paginationInfo = document.querySelector('.pagination-info');
        
        if (!paginationNumbers || !paginationInfo) return;

        paginationNumbers.innerHTML = '';
        
        for (let i = 1; i <= this.totalPages; i++) {
            const button = document.createElement('button');
            button.className = 'pagination-btn number-btn';
            button.textContent = i;
            button.dataset.page = i;
            
            if (i === this.currentPage) {
                button.classList.add('active');
            }
            
            button.addEventListener('click', () => {
                this.showPage(parseInt(button.dataset.page));
            });
            
            paginationNumbers.appendChild(button);
        }

        this.updatePaginationInfo();
        this.updatePaginationButtons();
    }

    updatePaginationInfo() {
        const paginationInfo = document.querySelector('.pagination-info');
        if (!paginationInfo) return;

        const start = (this.currentPage - 1) * this.articlesPerPage + 1;
        const end = Math.min(this.currentPage * this.articlesPerPage, this.filteredArticles.length || this.allArticles.length);
        const total = this.filteredArticles.length || this.allArticles.length;
        
        paginationInfo.textContent = `共 ${total} 篇文章，当前显示第 ${start}-${end} 篇`;
    }

    updatePaginationButtons() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentPage >= this.totalPages;
        }

        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.page) === this.currentPage) {
                btn.classList.add('active');
            }
        });
    }

    showPage(pageNumber) {
        if (pageNumber < 1 || pageNumber > this.totalPages) return;
        
        this.currentPage = pageNumber;
        
        const articles = this.filteredArticles.length > 0 ? this.filteredArticles : this.allArticles;
        
        // 先隐藏所有文章
        this.allArticles.forEach(article => {
            article.style.display = 'none';
        });
        
        const start = (pageNumber - 1) * this.articlesPerPage;
        const end = start + this.articlesPerPage;
        
        // 只显示当前页的文章
        articles.forEach((article, index) => {
            if (index >= start && index < end) {
                article.style.display = 'block';
            }
        });
        
        // 恢复分页显示
        const paginationContainer = document.querySelector('.pagination-container');
        if (paginationContainer) {
            paginationContainer.style.display = 'flex';
        }
        
        this.updatePaginationInfo();
        this.updatePaginationButtons();
    }

    filterArticles(category) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        if (category === 'all') {
            this.filteredArticles = [];
        } else {
            this.filteredArticles = this.allArticles.filter(article => 
                article.dataset.category === category
            );
        }

        // 更新总页数
        const totalArticles = this.filteredArticles.length > 0 ? this.filteredArticles.length : this.allArticles.length;
        this.totalPages = Math.max(1, Math.ceil(totalArticles / this.articlesPerPage));
        this.currentPage = 1;
        this.renderPagination();
        
        // 如果筛选结果为空且不是"全部"，显示空状态
        if (category !== 'all' && this.filteredArticles.length === 0) {
            this.showEmptyState();
        } else {
            // 如果当前是从空状态切换回来，需要重新渲染文章
            if (!document.querySelector('.article-card')) {
                this.renderArticles();
            } else {
                this.showPage(1);
            }
        }
    }

    showEmptyState() {
        const articlesGrid = document.querySelector('.articles-grid');
        if (!articlesGrid) return;
        
        articlesGrid.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"/>
                    <circle cx="12" cy="10" r="3"/>
                    <path d="M12 14v6"/>
                </svg>
                <h3>暂无文章</h3>
                <p>该分类下暂无文章，请选择其他分类</p>
            </div>
        `;
        
        // 隐藏分页
        const paginationContainer = document.querySelector('.pagination-container');
        if (paginationContainer) {
            paginationContainer.style.display = 'none';
        }
    }

    searchArticles(query) {
        const lowerQuery = query.toLowerCase();
        
        if (!lowerQuery.trim()) {
            this.filteredArticles = [];
        } else {
            this.filteredArticles = this.allArticles.filter((article, index) => {
                const data = this.allArticlesData[index];
                const title = data.title.toLowerCase();
                const excerpt = data.excerpt.toLowerCase();
                return title.includes(lowerQuery) || excerpt.includes(lowerQuery);
            });
        }

        const activeFilter = document.querySelector('.filter-btn.active');
        if (query && activeFilter && activeFilter.dataset.category !== 'all') {
            activeFilter.classList.remove('active');
            document.querySelector('[data-category="all"]').classList.add('active');
        }

        this.totalPages = Math.ceil((this.filteredArticles.length || this.allArticles.length) / this.articlesPerPage);
        this.currentPage = 1;
        this.renderPagination();
        this.showPage(1);
    }

    openArticleDetail(index) {
        const article = this.allArticlesData[index];
        if (!article) return;

        let content = marked(article.content);
        
        const authorHtml = article.author ? `
            <div class="article-author" style="margin-bottom: var(--spacing-lg);">
                <div class="author-avatar">${article.author.charAt(0)}</div>
                <div class="author-info">
                    <div class="author-name">作者：${article.author}</div>
                    ${article.contact ? `<div class="author-contact">联系方式：${article.contact}</div>` : ''}
                </div>
            </div>
        ` : '';
        
        const modal = document.createElement('div');
        modal.className = 'article-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">×</button>
                <div class="modal-header">
                    <span class="article-tag">${article.tag}</span>
                    <span class="article-date">${article.date}</span>
                </div>
                <h1>${article.title}</h1>
                ${authorHtml}
                <div class="modal-body">${content}</div>
            </div>
        `;
        document.body.appendChild(modal);

        setTimeout(() => {
            if (window.renderMathInElement) {
                renderMathInElement(modal.querySelector('.modal-body'), {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '$', right: '$', display: false }
                    ]
                });
            }
        }, 100);

        setTimeout(() => {
            document.querySelectorAll('.modal-body pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        }, 150);
    }
}

window.ArticlesModule = ArticlesModule;