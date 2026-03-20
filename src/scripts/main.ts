// Tab switching functionality
export function initTabs(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.tab-btn');
  const panes = document.querySelectorAll<HTMLElement>('.tab-pane');
  const contentArea = document.getElementById('content-area');

  function activateTab(tabName: string): void {
    tabs.forEach((btn) => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle('border-terminal-text-bright', isActive);
      btn.classList.toggle('text-terminal-text-bright', isActive);
      btn.classList.toggle('border-transparent', !isActive);
      btn.classList.toggle('text-terminal-text-muted', !isActive);
      btn.setAttribute('aria-selected', String(isActive));
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    panes.forEach((pane) => {
      const isActive = pane.id === `tab-${tabName}`;
      pane.classList.toggle('hidden', !isActive);
    });

    if (contentArea) contentArea.scrollTop = 0;
  }

  // Click handlers
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;
      if (tabName) activateTab(tabName);
    });
  });

  // Keyboard navigation (arrow keys)
  tabs.forEach((btn, index) => {
    btn.addEventListener('keydown', (e: KeyboardEvent) => {
      const tabsArray = Array.from(tabs);
      let newIndex = index;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (index + 1) % tabsArray.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (index - 1 + tabsArray.length) % tabsArray.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = tabsArray.length - 1;
      }

      if (newIndex !== index) {
        const newTab = tabsArray[newIndex];
        newTab.focus();
        const tabName = newTab.dataset.tab;
        if (tabName) activateTab(tabName);
      }
    });
  });

  // Initialize first tab
  activateTab('about');
}

// Theme toggle functionality
export function initTheme(): void {
  const html = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const iconMoon = document.getElementById('icon-moon');
  const iconSun = document.getElementById('icon-sun');

  function syncIcons(): void {
    const isLight = html.classList.contains('light');
    iconMoon?.classList.toggle('hidden', isLight);
    iconSun?.classList.toggle('hidden', !isLight);
  }

  syncIcons();

  toggleBtn?.addEventListener('click', () => {
    html.classList.toggle('light');
    localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
    syncIcons();
  });
}

// Typewriter effect
export function initTypewriter(): void {
  const target = document.getElementById('typewriter-target');
  const aboutContent = document.getElementById('about-content');
  const text = 'cat about.md';
  let i = 0;

  function typeChar(): void {
    if (!target) return;

    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, 60 + Math.random() * 40);
    } else {
      // Typing done — reveal bio content
      setTimeout(() => {
        aboutContent?.classList.add('visible');
      }, 300);
    }
  }

  // Start typewriter after a short initial delay
  setTimeout(typeChar, 500);
}

// Initialize all functionality
export function init(): void {
  initTabs();
  initTheme();
  initTypewriter();
}
