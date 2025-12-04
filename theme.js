(function(){
  const THEME_KEY = 'siteTheme';
  let storageAvailable = true;
  let inMemoryTheme = null;

  function safeGet(key){
    try { return localStorage.getItem(key); }
    catch(e){ storageAvailable = false; return null; }
  }
  function safeSet(key, value){
    try { localStorage.setItem(key, value); storageAvailable = true; }
    catch(e){ storageAvailable = false; inMemoryTheme = value; }
  }

  function getSystemTheme(){
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch(e) { return 'light'; }
  }

  // apply theme to document and update toggle button
  function applyTheme(theme){
    try { document.documentElement.setAttribute('data-theme', theme); } catch(e){}
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    if(toggle) toggle.setAttribute('aria-pressed', theme === 'dark');
    if(icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    console.log('[theme.js] Applied theme:', theme, 'storageAvailable:', storageAvailable);
  }

  // initialize theme on load
  function initTheme(){
    const saved = safeGet(THEME_KEY);
    const theme = saved || inMemoryTheme || 'light';
    applyTheme(theme);
  }

  function toggleTheme(){
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    safeSet(THEME_KEY, next);
    applyTheme(next);
  }

  // attach event handlers to toggle button
  function attachHandlers(){
    const toggle = document.getElementById('themeToggle');
    if(!toggle){
      console.log('[theme.js] themeToggle not found');
      return;
    }
    toggle.addEventListener('click', toggleTheme);
    toggle.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        toggleTheme();
      }
    });
    console.log('[theme.js] handlers attached');
  }

  // sync across tabs
  window.addEventListener('storage', e => {
    if(!storageAvailable) return;
    if(e.key === THEME_KEY) applyTheme(e.newValue || getSystemTheme());
  });

  // run init and attach once dom is ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => { initTheme(); attachHandlers(); });
  } else {
    initTheme(); attachHandlers();
  }
})();
