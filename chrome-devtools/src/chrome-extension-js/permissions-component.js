class RxVisionPermissionRequestOverlay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const tpl = document.createElement('template');
        tpl.innerHTML = `
      <style>
        :host { all: initial; }
        .overlay {
          position: fixed; inset: 0; display: none;
          align-items: center; justify-content: center;
          background: rgba(255,255,255,.92); z-index: 999999;
          font: 14px/1.4 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          text-align: center;
        }
        .card {
          padding: 16px 20px; border: 1px solid #ddd; border-radius: 12px; background: #fff;
          max-width: 420px; width: clamp(260px, 80vw, 420px); box-sizing: border-box;
        }
        .title { font-weight: 600; margin-bottom: 6px; }
        .muted { color: #555; margin-bottom: 12px; }
        .row { display: flex; gap: 8px; justify-content: center; }
        button {
          padding: 8px 12px; border-radius: 8px; border: 1px solid #ccc; cursor: pointer;
          background: #fff;
        }
      </style>
      <div class="overlay" id="overlay" aria-hidden="true">
        <div class="card">
          <div class="title">Access permission needed</div>
          <div class="muted">Only data passed through the RxVision API is accessed and never sent outside your browser.</div>
          <div class="row">
            <button id="askAll">Enable on all sites</button>
            <button id="askThis">Enable on this site</button>
          </div>
        </div>
      </div>
    `;
        this.shadowRoot.appendChild(tpl.content.cloneNode(true));
        this.$overlay = this.shadowRoot.getElementById('overlay');
        this.shadowRoot.getElementById('askAll').addEventListener('click', () => this.requestAll());
        this.shadowRoot.getElementById('askThis').addEventListener('click', () => this.requestThis());
    }

    connectedCallback() { this.refresh(); }

    async refresh() {
        const [all, thisSite] = await Promise.all([this.hasAllSites(), this.hasThisSite()]);
        const allowed = all || thisSite;
        this.$overlay.style.display = allowed ? 'none' : 'flex';
        this.$overlay.setAttribute('aria-hidden', allowed ? 'true' : 'false');
    }

    contains(q) { return new Promise(res => chrome.permissions.contains(q, res)); }
    request(q) { return new Promise(res => chrome.permissions.request(q, res)); }

    async hasAllSites() { return this.contains({ origins: ['<all_urls>'] }); }

    async getInspectedOriginPattern() {
        return new Promise(resolve => {
            chrome.devtools.inspectedWindow.eval('location.origin', (origin, ex) => {
                if (ex?.isException || !origin || !origin.startsWith('http')) return resolve(null);
                resolve(`${origin}/*`);
            });
        });
    }

    async hasThisSite() {
        const pattern = await this.getInspectedOriginPattern();
        if (!pattern) return false;
        return this.contains({ origins: [pattern] });
    }

    async requestAll() {
        const granted = await this.request({ origins: ['<all_urls>'] });
        await this.afterGrant(granted);
    }

    async requestThis() {
        const pattern = await this.getInspectedOriginPattern();
        if (!pattern) {
            alert('This page cannot grant site access (e.g., chrome:// or file://).');
            return;
        }
        const granted = await this.request({ origins: [pattern] });
        await this.afterGrant(granted);
    }

    async afterGrant(granted) {
        await this.refresh();
        if (granted) chrome.devtools.inspectedWindow.reload({ ignoreCache: true });
    }
}

customElements.define('rx-vision-permissions-request-overlay', RxVisionPermissionRequestOverlay);
