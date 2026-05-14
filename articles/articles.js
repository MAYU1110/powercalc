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
        try {
            const dirResponse = await fetch('articles/article/');
            if (!dirResponse.ok) {
                throw new Error(`无法访问文章目录: ${dirResponse.status}`);
            }
            const dirHtml = await dirResponse.text();
            
            const mdFileRegex = /href="([^"]+\.md)"/g;
            const articlesList = [];
            let match;
            
            while ((match = mdFileRegex.exec(dirHtml)) !== null) {
                const fullPath = match[1];
                const fileName = fullPath.split('/').pop();
                if (fileName && fileName.endsWith('.md')) {
                    articlesList.push(fileName);
                }
            }
            
            if (articlesList.length === 0) {
                console.warn('未找到任何文章文件，目录HTML:', dirHtml.substring(0, 500));
                this.renderArticles();
                return;
            }
            
            console.log('找到的文章列表:', articlesList);
            
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
        } catch (error) {
            console.error('扫描文章目录失败:', error);
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
            email: meta.email || '',
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
            
            // 点击文章卡片任意位置打开详情
            const articleCard = e.target.closest('.article-card');
            if (articleCard && !e.target.classList.contains('read-more')) {
                const index = parseInt(articleCard.dataset.index);
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
        
        // 获取当前页要显示的文章索引数组
        const currentPageArticles = articles.slice(start, end);
        
        // 只显示当前页的文章
        currentPageArticles.forEach(article => {
            article.style.display = 'block';
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
        
        const emptyState = document.querySelector('.articles-grid .empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        if (category !== 'all' && this.filteredArticles.length === 0) {
            this.showEmptyState();
        } else {
            this.showPage(1);
        }
    }

    showEmptyState() {
        const articlesGrid = document.querySelector('.articles-grid');
        if (!articlesGrid) return;
        
        if (this.allArticles) {
            this.allArticles.forEach(article => {
                article.style.display = 'none';
            });
        }

        articlesGrid.insertAdjacentHTML('beforeend', `
            <div class="empty-state">
                <p>暂无文章</p>
            </div>
        `);
        
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

        if (typeof marked === 'undefined' || typeof marked.parse !== 'function') {
            console.error('Marked library not loaded');
            var content = `<p style="color: var(--accent-danger);">文章内容加载失败：依赖库未加载</p>`;
        } else {
            try {
                var content = marked.parse(article.content);
            } catch (e) {
                console.error('Marked parse error:', e);
                var content = `<p style="color: var(--accent-danger);">文章内容加载失败，请稍后重试</p>`;
            }
        }
        
        const authorInfoHtml = (article.author || article.email) ? `
            <div style="text-align: center; font-size: 0.875rem; color: var(--text-secondary); margin-bottom: var(--spacing-lg);">
                ${article.author ? `<span>作者：${article.author}</span>` : ''}
                ${article.email ? `<span> | 邮箱：${article.email}</span>` : ''}
            </div>
        ` : '';
        
        const modal = document.createElement('div');
        modal.className = 'article-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">×</button>
                <div class="modal-header">
                    <span class="article-tag">${article.tag}</span>
                    <span class="article-date">${article.date}</span>
                </div>
                <h1 style="text-align: center;">${article.title}</h1>
                ${authorInfoHtml}
                <div class="modal-body">${content}</div>
            </div>
        `;
        document.body.appendChild(modal);

        document.body.style.overflow = 'hidden';

        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
        });

        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
        });

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
            if (window.hljs) {
                modal.querySelectorAll('.modal-body pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            }
        }, 150);
    }
}

window.ArticlesModule = ArticlesModule;