(function(){
  const UNCAT = "بدون‌دسته";
  const STORAGE_KEY = 'benyweb-link-kardex:bookmarks:v1';
  const LEGACY_KEYS = ['bookmarks', 'link-kardex-bookmarks', 'linkKardexBookmarks'];
  const THEME_KEY = 'benyweb-link-kardex:theme';

  let items = [];
  let activeCat = "همه";
  let query = "";
  let sortMode = "new";
  let editingId = null;

  const el = (id) => document.getElementById(id);
  const escapeHtml = (s="") => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7);

  function domainOf(url){
    try{ return new URL(url).hostname.replace(/^www\./,''); }catch(e){ return url; }
  }
  function faviconUrl(url){
    const d = domainOf(url);
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(d)}&sz=64`;
  }

  /* ---------- persistence (localStorage) ---------- */

  // Normalizes a raw parsed bookmark into the shape the app relies on,
  // so older/partial data can never crash the renderer.
  function normalizeBookmark(b){
    if(!b || typeof b !== 'object' || !b.url) return null;
    return {
      id: typeof b.id === 'string' && b.id ? b.id : uid(),
      url: String(b.url),
      title: b.title ? String(b.title) : String(b.url),
      description: b.description ? String(b.description) : '',
      category: b.category ? String(b.category) : '',
      tags: Array.isArray(b.tags) ? b.tags.map(String) : [],
      pinned: !!b.pinned,
      createdAt: Number.isFinite(b.createdAt) ? b.createdAt : Date.now()
    };
  }

  function readRawList(raw){
    if(!raw) return null;
    try{
      const parsed = JSON.parse(raw);
      if(!Array.isArray(parsed)) return null;
      return parsed.map(normalizeBookmark).filter(Boolean);
    }catch(e){
      return null; // corrupted JSON — never let this crash the page
    }
  }

  function load(){
    let list = null;
    try{
      list = readRawList(localStorage.getItem(STORAGE_KEY));
    }catch(e){ list = null; }

    // Simple migration: if the main key is empty, check older key names
    // that a previous version of this page might have used.
    if(list === null){
      for(const key of LEGACY_KEYS){
        try{
          const legacy = readRawList(localStorage.getItem(key));
          if(legacy){ list = legacy; break; }
        }catch(e){ /* ignore and keep trying */ }
      }
    }

    items = list || [];
    render();
  }

  function save(){
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }catch(e){
      showToast('ذخیره‌سازی با خطا مواجه شد');
    }
  }

  function showToast(msg){
    const t = el('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(()=>t.classList.remove('show'), 1800);
  }

  function categories(){
    const set = new Map();
    items.forEach(it=>{
      const c = it.category && it.category.trim() ? it.category.trim() : UNCAT;
      set.set(c, (set.get(c)||0)+1);
    });
    return set;
  }

  function filteredSorted(){
    let list = items.filter(it=>{
      if(activeCat !== "همه"){
        const c = it.category && it.category.trim() ? it.category.trim() : UNCAT;
        if(c !== activeCat) return false;
      }
      if(query){
        const q = query.toLowerCase();
        const hay = [it.title, it.description, it.url, it.category, (it.tags||[]).join(' ')].join(' ').toLowerCase();
        if(!hay.includes(q)) return false;
      }
      return true;
    });
    if(sortMode === 'new') list.sort((a,b)=> b.createdAt - a.createdAt);
    else if(sortMode === 'old') list.sort((a,b)=> a.createdAt - b.createdAt);
    else if(sortMode === 'az') list.sort((a,b)=> a.title.localeCompare(b.title, 'fa'));
    return list;
  }

  function renderCats(){
    const map = categories();
    const total = items.length;
    let html = `<div class="cat-item ${activeCat==='همه'?'active':''}" data-cat="همه"><span>همه</span><span class="n">${total}</span></div>`;
    [...map.entries()].sort((a,b)=>a[0].localeCompare(b[0],'fa')).forEach(([c,n])=>{
      html += `<div class="cat-item ${activeCat===c?'active':''}" data-cat="${escapeHtml(c)}"><span>${escapeHtml(c)}</span><span class="n">${n}</span></div>`;
    });
    el('catList').innerHTML = html;
    el('catList').querySelectorAll('.cat-item').forEach(node=>{
      node.addEventListener('click', ()=>{ activeCat = node.dataset.cat; render(); });
    });
  }

  function renderStats(){
    const map = categories();
    el('stats').innerHTML = `<b>${items.length}</b> لینک در <b>${map.size}</b> دسته`;
  }

  function rowHtml(it){
    const cat = it.category && it.category.trim() ? it.category.trim() : UNCAT;
    const tagsHtml = (it.tags||[]).map(t=>`<span class="chip">#${escapeHtml(t)}</span>`).join('');
    return `
    <div class="row" data-id="${it.id}">
      <div class="favicon"><img src="${faviconUrl(it.url)}" alt="" loading="lazy" onerror="this.style.display='none'"></div>
      <div class="row-main">
        <div class="row-title-line">
          <svg class="pin-star ${it.pinned?'active':''}" data-act="pin" width="15" height="15" viewBox="0 0 24 24" fill="${it.pinned?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9 12 2"/></svg>
          <a class="row-title" href="${it.url}" target="_blank" rel="noopener">${escapeHtml(it.title)}</a>
          <span class="row-domain">${escapeHtml(domainOf(it.url))}</span>
        </div>
        ${it.description ? `<div class="row-desc">${escapeHtml(it.description)}</div>` : ''}
        <div class="row-meta">
          <span class="chip cat">${escapeHtml(cat)}</span>
          ${tagsHtml}
        </div>
      </div>
      <div class="row-actions" data-actions>
        <button class="icon-btn" data-act="copy" title="کپی لینک">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
        <button class="icon-btn" data-act="edit" title="ویرایش">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="icon-btn danger" data-act="del" title="حذف">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
      </div>
    </div>`;
  }

  function render(){
    renderCats();
    renderStats();
    const list = filteredSorted();
    if(items.length === 0){
      el('listZone').innerHTML = `
        <div class="empty">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 7h6v13H3V4h6l3 3z"/></svg>
          <p>هنوز لینکی ثبت نشده.</p>
          <p>اولین لینکت رو با دکمهٔ «لینک جدید» اضافه کن، یا فایل بوکمارک مرورگرت رو درون‌ریزی کن.</p>
        </div>`;
      return;
    }
    if(list.length === 0){
      el('listZone').innerHTML = `<div class="empty"><p>چیزی با این جستجو/دسته پیدا نشد.</p></div>`;
      return;
    }
    const pinned = list.filter(i=>i.pinned);
    const rest = list.filter(i=>!i.pinned);
    let html = '';
    if(pinned.length){
      html += `<div class="section-label">پین‌شده</div>` + pinned.map(rowHtml).join('');
      html += `<div class="section-label">همه</div>`;
    }
    html += rest.map(rowHtml).join('');
    el('listZone').innerHTML = html;

    el('listZone').querySelectorAll('.row').forEach(row=>{
      const id = row.dataset.id;
      row.querySelector('[data-act="pin"]').addEventListener('click', ()=>togglePin(id));
      row.querySelector('[data-act="copy"]').addEventListener('click', ()=>copyLink(id));
      row.querySelector('[data-act="edit"]').addEventListener('click', ()=>openForm(id));
      row.querySelector('[data-act="del"]').addEventListener('click', (e)=>askDelete(id, row));
    });
  }

  function togglePin(id){
    const it = items.find(i=>i.id===id);
    if(!it) return;
    it.pinned = !it.pinned;
    save(); render();
  }
  function copyLink(id){
    const it = items.find(i=>i.id===id);
    if(!it) return;
    navigator.clipboard.writeText(it.url).then(()=>showToast('لینک کپی شد')).catch(()=>showToast('کپی ناموفق بود'));
  }
  function askDelete(id, row){
    const actions = row.querySelector('[data-actions]');
    actions.innerHTML = `<div class="confirm-del">حذف شود؟ <button class="yes">بله</button><button class="no">انصراف</button></div>`;
    actions.querySelector('.yes').addEventListener('click', ()=>{
      items = items.filter(i=>i.id!==id);
      save(); render(); showToast('لینک حذف شد');
    });
    actions.querySelector('.no').addEventListener('click', render);
  }

  // ---------- add / edit form ----------
  function openForm(id){
    editingId = id || null;
    const it = id ? items.find(i=>i.id===id) : null;
    const existingCats = [...categories().keys()].filter(c=>c!==UNCAT);
    el('formZone').innerHTML = `
      <div class="form-card">
        <h4>${it ? 'ویرایش لینک' : 'افزودن لینک جدید'}</h4>
        <div class="frow">
          <div class="fgroup" style="flex:1 1 100%;">
            <label>آدرس (URL)*</label>
            <input type="text" id="f_url" placeholder="https://example.com/article" value="${it?escapeHtml(it.url):''}">
          </div>
        </div>
        <div class="frow">
          <div class="fgroup">
            <label>عنوان*</label>
            <input type="text" id="f_title" placeholder="عنوان لینک" value="${it?escapeHtml(it.title):''}">
          </div>
          <div class="fgroup">
            <label>دسته‌بندی</label>
            <input type="text" id="f_cat" list="catOptions" placeholder="مثلاً: مقاله، ابزار، آموزش…" value="${it?escapeHtml(it.category||''):''}">
            <datalist id="catOptions">${existingCats.map(c=>`<option value="${escapeHtml(c)}">`).join('')}</datalist>
          </div>
        </div>
        <div class="frow">
          <div class="fgroup" style="flex:1 1 100%;">
            <label>توضیح</label>
            <textarea id="f_desc" placeholder="چند کلمه دربارهٔ این لینک…">${it?escapeHtml(it.description||''):''}</textarea>
          </div>
        </div>
        <div class="frow">
          <div class="fgroup" style="flex:1 1 100%;">
            <label>برچسب‌ها (با کاما جدا کن)</label>
            <input type="text" id="f_tags" placeholder="مثلاً: پایتون, یادگیری" value="${it?escapeHtml((it.tags||[]).join(', ')):''}">
          </div>
        </div>
        <div class="form-actions">
          <button class="btn ghost sm" id="cancelForm">انصراف</button>
          <button class="btn sm" id="saveForm">${it ? 'به‌روزرسانی' : 'ذخیره'}</button>
        </div>
      </div>`;
    el('cancelForm').addEventListener('click', closeForm);
    el('saveForm').addEventListener('click', submitForm);
    el('f_url').focus();
    el('formZone').scrollIntoView({behavior:'smooth', block:'nearest'});
  }
  function closeForm(){
    editingId = null;
    el('formZone').innerHTML = '';
  }
  function submitForm(){
    let url = el('f_url').value.trim();
    const title = el('f_title').value.trim();
    const desc = el('f_desc').value.trim();
    const cat = el('f_cat').value.trim();
    const tags = el('f_tags').value.split(',').map(t=>t.trim()).filter(Boolean);
    if(!url){ showToast('آدرس لینک را وارد کن'); return; }
    if(!/^https?:\/\//i.test(url)) url = 'https://' + url;
    if(!title){ showToast('عنوان را وارد کن'); return; }

    if(editingId){
      const it = items.find(i=>i.id===editingId);
      Object.assign(it, {url, title, description:desc, category:cat, tags});
    } else {
      const dup = items.find(i=>i.url === url);
      if(dup){ showToast('این لینک قبلاً ثبت شده'); return; }
      items.push({id:uid(), url, title, description:desc, category:cat, tags, pinned:false, createdAt:Date.now()});
    }
    save(); closeForm(); render();
    showToast(editingId ? 'به‌روزرسانی شد' : 'لینک اضافه شد');
  }

  // ---------- import: browser bookmarks (Netscape HTML) ----------
  function parseNetscapeBookmarks(htmlText){
    const doc = new DOMParser().parseFromString(htmlText, 'text/html');
    const anchors = [...doc.querySelectorAll('a[href]')];
    function categoryFor(a){
      let dl = a.closest('dl');
      while(dl){
        const prev = dl.previousElementSibling;
        if(prev){
          const h3 = prev.tagName === 'H3' ? prev : prev.querySelector('h3');
          if(h3) return h3.textContent.trim();
        }
        const parentDl = dl.parentElement ? dl.parentElement.closest('dl') : null;
        dl = parentDl;
      }
      return '';
    }
    return anchors.map(a=>({
      url: a.getAttribute('href'),
      title: a.textContent.trim() || a.getAttribute('href'),
      category: categoryFor(a)
    })).filter(b=> /^https?:\/\//i.test(b.url));
  }
  function importNetscapeFile(file){
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = parseNetscapeBookmarks(reader.result);
      const existingUrls = new Set(items.map(i=>i.url));
      let added = 0;
      parsed.forEach(b=>{
        if(existingUrls.has(b.url)) return;
        existingUrls.add(b.url);
        items.push({id:uid(), url:b.url, title:b.title, description:'', category:b.category||'', tags:[], pinned:false, createdAt:Date.now()});
        added++;
      });
      save(); render();
      showToast(`${added} لینک درون‌ریزی شد (${parsed.length - added} تکراری رد شد)`);
    };
    reader.readAsText(file);
  }

  // ---------- import / export JSON ----------
  function exportJson(){
    const blob = new Blob([JSON.stringify(items, null, 2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'link-kardex-export.json';
    a.click();
  }
  function importJsonFile(file){
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const arr = JSON.parse(reader.result);
        if(!Array.isArray(arr)) throw new Error('bad format');
        const existingUrls = new Set(items.map(i=>i.url));
        let added = 0;
        arr.forEach(b=>{
          if(!b.url || existingUrls.has(b.url)) return;
          existingUrls.add(b.url);
          items.push({
            id: uid(), url: b.url, title: b.title || b.url,
            description: b.description || '', category: b.category || '',
            tags: Array.isArray(b.tags) ? b.tags : [], pinned: !!b.pinned,
            createdAt: b.createdAt || Date.now()
          });
          added++;
        });
        save(); render();
        showToast(`${added} لینک از JSON درون‌ریزی شد`);
      }catch(e){ showToast('فایل JSON معتبر نیست'); }
    };
    reader.readAsText(file);
  }

  // ---------- theme (light/dark) ----------
  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    const btn = el('themeToggle');
    if(btn) btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }
  function getStoredTheme(){
    try{
      const t = localStorage.getItem(THEME_KEY);
      return (t === 'dark' || t === 'light') ? t : null;
    }catch(e){ return null; }
  }
  function setStoredTheme(theme){
    try{ localStorage.setItem(THEME_KEY, theme); }catch(e){ /* theme just won't persist */ }
  }
  function initTheme(){
    // Default is Light; only Dark if the user explicitly chose it before.
    const stored = getStoredTheme();
    applyTheme(stored === 'dark' ? 'dark' : 'light');
  }
  function toggleTheme(){
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setStoredTheme(next);
  }

  // ---------- wire up ----------
  el('openAddBtn').addEventListener('click', ()=> openForm(null));
  el('search').addEventListener('input', (e)=>{ query = e.target.value; render(); });
  el('sortSel').addEventListener('change', (e)=>{ sortMode = e.target.value; render(); });
  el('exportBtn').addEventListener('click', exportJson);
  el('importBookmarksBtn').addEventListener('click', ()=> el('fileNetscape').click());
  el('importJsonBtn').addEventListener('click', ()=> el('fileJson').click());
  el('fileNetscape').addEventListener('change', (e)=>{ if(e.target.files[0]) importNetscapeFile(e.target.files[0]); e.target.value=''; });
  el('fileJson').addEventListener('change', (e)=>{ if(e.target.files[0]) importJsonFile(e.target.files[0]); e.target.value=''; });
  el('themeToggle').addEventListener('click', toggleTheme);

  document.addEventListener('keydown', (e)=>{
    if(e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA'){
      e.preventDefault(); el('search').focus();
    }
  });

  initTheme();
  load();
})();
