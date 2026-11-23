/**
 * REAL CAPITA — LOCAL FRONTEND DEMO DATA ADAPTER
 *
 * This adapter makes the static GitHub Pages prototype interactive by using
 * localStorage. It is NOT a production backend. Data is saved only in the
 * current browser and is not shared with other visitors or Real Capita staff.
 * Replace this adapter with authenticated server API calls before production.
 */
(function () {
  'use strict';

  const memory = Object.create(null);
  const KEY = {
    rfqs: 'rc-demo-rfqs-v2',
    profile: 'rc-demo-profile-v2',
    session: 'rc-demo-session-v2',
    saved: 'rc-demo-saved-v2',
    statuses: 'rc-demo-admin-status-v2',
    accounts: 'rc-demo-accounts-v2',
    products: 'rc-demo-custom-products-v2'
  };

  const storage = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (error) {
        return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : fallback;
      }
    },
    set(key, value) {
      memory[key] = value;
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* private mode fallback */ }
      return value;
    }
  };

  const wait = value => Promise.resolve(value);
  const normalEmail = value => String(value || '').trim().toLowerCase();
  const today = () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  // Demo-only digest. Web Crypto is used on HTTPS; the fallback is not secure.
  async function passwordDigest(password) {
    const value = String(password || '');
    if (window.crypto && window.crypto.subtle && window.TextEncoder) {
      const bytes = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
      return Array.from(new Uint8Array(bytes)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `local-demo-${(hash >>> 0).toString(16)}`;
  }

  function customProducts() { return storage.get(KEY.products, []); }
  function allProducts() { return [...window.RC_DATA.products, ...customProducts()]; }
  function allRFQs() {
    const stored = storage.get(KEY.rfqs, []);
    return [...stored, ...window.RC_DATA.sampleRFQs];
  }

  // Demo accounts are intentionally public so a supervisor can test the UI.
  // Never use hard-coded browser credentials for a real application.
  const demoAccounts = [
    { email: 'buyer@realcapita.demo', password: 'Buyer@123', name: 'Demo Buyer', company: 'Demo Trading Company Ltd.', role: 'buyer' },
    { email: 'admin@realcapita.demo', password: 'Admin@123', name: 'Demo Administrator', company: 'Real Capita Group', role: 'admin' }
  ];

  window.RC_API = {
    mode: 'local-demo',

    getProducts: async filters => {
      const f = filters || {};
      const q = String(f.query || '').toLowerCase().trim();
      const category = f.category || 'All';
      return wait(allProducts().filter(product => {
        const haystack = [product.name, product.category, product.description, product.tag, product.origin].join(' ').toLowerCase();
        return (!q || haystack.includes(q)) && (!category || category === 'All' || product.category === category);
      }));
    },

    getCategories: async () => wait(window.RC_DATA.categories),
    getProductById: async id => wait(allProducts().find(product => product.id === id) || null),

    submitRFQ: async rfq => {
      const session = storage.get(KEY.session, null);
      const record = {
        id: `RFQ-${Date.now().toString().slice(-8)}`,
        productId: rfq.productId || '',
        product: String(rfq.product || 'Custom product request').trim(),
        quantity: `${Number(rfq.quantity || 1)} ${String(rfq.unit || 'units')}`,
        quantityValue: Number(rfq.quantity || 1),
        unit: String(rfq.unit || 'units'),
        date: today(),
        createdAt: new Date().toISOString(),
        status: 'In review',
        company: String(rfq.company || session?.company || 'Business buyer').trim(),
        email: normalEmail(rfq.email || session?.email),
        notes: String(rfq.notes || '').trim(),
        createdBy: normalEmail(session?.email || rfq.email)
      };
      storage.set(KEY.rfqs, [record, ...storage.get(KEY.rfqs, [])]);
      return wait(record);
    },

    getRFQs: async () => wait(allRFQs()),
    deleteRFQ: async id => {
      storage.set(KEY.rfqs, storage.get(KEY.rfqs, []).filter(r => r.id !== id));
      return true;
    },

    getProfile: async () => wait(storage.get(KEY.profile, {
      company: 'Your Company Ltd.', industry: 'Manufacturing & Trade', contact: 'Business Account',
      email: 'hello@yourcompany.com', phone: '+880 17XX-XXXXXX', address: 'Dhaka, Bangladesh',
      website: '', trade: 'Import & wholesale distribution', size: '11–50 employees'
    })),

    saveProfile: async profile => {
      const current = storage.get(KEY.profile, {});
      const next = { ...current, ...profile };
      storage.set(KEY.profile, next);
      return wait(next);
    },

    getSession: () => storage.get(KEY.session, null),

    signIn: async ({ email, password }) => {
      const address = normalEmail(email);
      const pass = String(password || '');
      const demo = demoAccounts.find(account => account.email === address && account.password === pass);
      if (demo) {
        const session = { name: demo.name, email: demo.email, company: demo.company, role: demo.role };
        storage.set(KEY.session, session);
        return wait(session);
      }
      const accounts = storage.get(KEY.accounts, []);
      const account = accounts.find(item => item.email === address);
      if (!account) throw new Error('No local preview account was found for this email. Register first or use one of the demo accounts.');
      const digest = await passwordDigest(pass);
      if (digest !== account.passwordDigest) throw new Error('Incorrect password. Please try again.');
      const session = { name: account.name, email: account.email, company: account.company, role: 'buyer' };
      storage.set(KEY.session, session);
      return wait(session);
    },

    register: async details => {
      const address = normalEmail(details.email);
      const accounts = storage.get(KEY.accounts, []);
      if (accounts.some(account => account.email === address) || demoAccounts.some(account => account.email === address)) {
        throw new Error('An account with this email already exists in this browser. Please sign in instead.');
      }
      const account = {
        name: String(details.name || '').trim(),
        email: address,
        company: String(details.company || '').trim(),
        passwordDigest: await passwordDigest(details.password),
        createdAt: new Date().toISOString()
      };
      storage.set(KEY.accounts, [...accounts, account]);
      const session = { name: account.name, email: account.email, company: account.company, role: 'buyer' };
      storage.set(KEY.session, session);
      const profile = { ...details };
      delete profile.password;
      delete profile.confirmPassword;
      delete profile.terms;
      await window.RC_API.saveProfile({ ...profile, contact: details.name, email: address, company: details.company });
      return wait(session);
    },

    signOut: () => storage.set(KEY.session, null),
    getSaved: () => storage.get(KEY.saved, []),
    toggleSaved: id => {
      const saved = storage.get(KEY.saved, []);
      const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
      storage.set(KEY.saved, next);
      return next;
    },

    getAdminStatuses: () => storage.get(KEY.statuses, {}),
    setAdminStatus: (id, status) => {
      const statuses = storage.get(KEY.statuses, {});
      statuses[id] = status;
      storage.set(KEY.statuses, statuses);
      return statuses;
    },

    addProduct: async product => {
      const list = customProducts();
      const record = { ...product, id: product.id || `RC-C${Date.now().toString().slice(-6)}`, featured: false, origin: product.origin || 'China', image: product.image || 'carton.svg', specs: product.specs || [] };
      storage.set(KEY.products, [record, ...list]);
      return wait(record);
    },
    deleteProduct: async id => {
      storage.set(KEY.products, customProducts().filter(product => product.id !== id));
      return true;
    },
    resetPreviewData: () => {
      Object.values(KEY).forEach(key => { try { localStorage.removeItem(key); } catch (error) {} });
      return true;
    }
  };
})();
