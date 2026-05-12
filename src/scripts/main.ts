// Tab switching functionality
let hasContactAnimated = false;

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

    if (tabName === 'contact' && !hasContactAnimated) {
      hasContactAnimated = true;
      initContactTypewriter();
    }
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

function initContactTypewriter(): void {
  const target = document.getElementById('contact-typewriter-target');
  const contactContent = document.getElementById('contact-content');
  const cursor = document.getElementById('contact-typewriter-cursor');
  if (!target || !contactContent || !cursor) return;

  const text = 'cat contact.yml';
  let i = 0;

  function typeChar(): void {
    if (i < text.length) {
      target!.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, 60 + Math.random() * 40);
    } else {
      setTimeout(showLoader, 150);
    }
  }

  function showLoader(): void {
    const placeholder = document.createElement('div');
    placeholder.className = 'flex items-center gap-2 min-h-[1.5em] text-terminal-accent-cyan font-mono text-sm opacity-80'; 
    const spinnerSpan = document.createElement('span');
    placeholder.appendChild(spinnerSpan);
    placeholder.appendChild(cursor!);

    contactContent!.parentNode!.insertBefore(placeholder, contactContent);

    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let frameIdx = 0;
    const spinnerInterval = setInterval(() => {
      spinnerSpan.textContent = frames[frameIdx];
      frameIdx = (frameIdx + 1) % frames.length;
    }, 80);

    setTimeout(() => {
      clearInterval(spinnerInterval);
      placeholder.remove();
      dumpYaml();
    }, 400 + Math.random() * 200); // 400-600ms realistic short loading time
  }

  function dumpYaml(): void {
    // Show the YAML block all at once
    contactContent!.style.opacity = '1';
    
    // Add final prompt
    const finalPrompt = document.createElement('div');
    finalPrompt.className = 'mt-6 text-sm';
    finalPrompt.innerHTML = '<span class="text-terminal-accent-indigo">muratlevent@server</span>\n<span class="text-terminal-accent-cyan ml-1">~&gt;</span>\n<span class="ml-2"></span>';
    
    // Append the prompt after the YAML block
    contactContent!.parentNode!.appendChild(finalPrompt);
    finalPrompt.lastElementChild!.appendChild(cursor!);
  }

  // Start typewriter after a short delay
  setTimeout(typeChar, 300);
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
  const cursor = document.getElementById('typewriter-cursor');
  if (!target || !aboutContent || !cursor) return;

  const text = 'npx murat-cli';
  let i = 0;

  function typeChar(): void {
    if (i < text.length) {
      target!.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, 60 + Math.random() * 40);
    } else {
      setTimeout(startTerminalDump, 300);
    }
  }

  function startTerminalDump(): void {
    // Extract elements
    const children = Array.from(aboutContent!.children);
    if (children.length < 4) return;

    const bioNode = children[0].cloneNode(true) as HTMLElement;
    const logsContainer = children[1].cloneNode(false) as HTMLElement; // empty container
    const logNodes = Array.from(children[1].children).map(n => n.cloneNode(true) as HTMLElement);
    const statusNode = children[2].cloneNode(true) as HTMLElement;
    const decoNode = children[3].cloneNode(true) as HTMLElement;

    // Make container visible
    aboutContent!.innerHTML = '';
    aboutContent!.classList.remove('about-reveal');
    aboutContent!.style.opacity = '1';
    aboutContent!.style.animation = 'none';

    // Set up queue of elements to reveal
    const queue: { node: HTMLElement, parent: HTMLElement, delay: number }[] = [
      { node: bioNode, parent: aboutContent!, delay: 1000 }, // long delay for the first fetch
      { node: logsContainer, parent: aboutContent!, delay: 0 }, // Instantly append empty container
      { node: logNodes[0], parent: logsContainer, delay: 300 + Math.random() * 200 },
      { node: logNodes[1], parent: logsContainer, delay: 100 + Math.random() * 100 },
      { node: logNodes[2], parent: logsContainer, delay: 150 + Math.random() * 150 },
      { node: logNodes[3], parent: logsContainer, delay: 100 + Math.random() * 100 },
      { node: logNodes[4], parent: logsContainer, delay: 400 + Math.random() * 200 },
      { node: statusNode, parent: aboutContent!, delay: 500 + Math.random() * 200 },
      { node: decoNode, parent: aboutContent!, delay: 300 + Math.random() * 200 }
    ];

    let qIdx = 0;
    const placeholder = document.createElement('div');
    placeholder.className = 'flex items-center gap-2 min-h-[1.5em] text-terminal-accent-cyan font-mono text-sm opacity-80'; 
    const spinnerSpan = document.createElement('span');
    placeholder.appendChild(spinnerSpan);
    placeholder.appendChild(cursor!);

    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let frameIdx = 0;
    const spinnerInterval = setInterval(() => {
      spinnerSpan.textContent = frames[frameIdx];
      frameIdx = (frameIdx + 1) % frames.length;
    }, 80);

    function processQueue(): void {
      if (qIdx < queue.length) {
        const item = queue[qIdx];
        
        if (item.delay > 0) {
          // Put spinner on a new line while waiting
          item.parent.appendChild(placeholder);
        }

        setTimeout(() => {
          if (placeholder.parentNode === item.parent) {
            item.parent.removeChild(placeholder);
          }
          item.parent.appendChild(item.node);
          
          qIdx++;
          processQueue();
        }, item.delay);
      } else {
        // Done! Drop to a new terminal prompt
        clearInterval(spinnerInterval);
        const finalPrompt = document.createElement('div');
        finalPrompt.className = 'mt-6 text-sm';
        finalPrompt.innerHTML = '<span class="text-terminal-accent-indigo">muratlevent@server</span>\n<span class="text-terminal-accent-cyan ml-1">~&gt;</span>\n<span class="ml-2"></span>';
        aboutContent!.appendChild(finalPrompt);
        finalPrompt.lastElementChild!.appendChild(cursor!);
      }
    }

    processQueue();
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
