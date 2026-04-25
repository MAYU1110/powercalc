const Router = {
    routes: {},

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    },

    register(path, handler) {
        this.routes[path] = handler;
    },

    navigate(path) {
        window.location.hash = path;
    },

    handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        const [path, ...params] = hash.split('/');

        Object.keys(this.routes).forEach(key => {
            const page = document.querySelector(`[data-page="${key}"]`);
            if (page) {
                page.classList.remove('active');
            }
        });

        const handler = this.routes[path] || this.routes['home'];
        if (handler) {
            handler(path, params);
        }

        this.updateNavLinks(path);
    },

    updateNavLinks(currentPath) {
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href').slice(1);
            if (href === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});