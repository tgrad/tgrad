document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Management (Light / Dark Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply theme on load
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateToggleIcon('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateToggleIcon('light');
    }

    // Toggle theme on button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateToggleIcon('light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateToggleIcon('dark');
            }
        });
    }

    function updateToggleIcon(theme) {
        if (!themeToggleBtn) return;
        
        // If theme is dark, show sun icon (to switch to light)
        // If theme is light, show moon icon (to switch to dark)
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            `;
            themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeToggleBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            `;
            themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    // 2. Abstract Toggling (for Publications/Research page)
    const abstractToggles = document.querySelectorAll('.abstract-toggle');
    abstractToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.classList.toggle('active');
            const targetId = toggle.getAttribute('data-target');
            const abstractText = document.getElementById(targetId);
            
            if (abstractText) {
                if (isExpanded) {
                    abstractText.style.display = 'block';
                    toggle.setAttribute('aria-expanded', 'true');
                    toggle.innerHTML = `
                        Hide Abstract
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    `;
                } else {
                    abstractText.style.display = 'none';
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.innerHTML = `
                        Show Abstract
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    `;
                }
            }
        });
    });

    // 3. Auto-highlight Active Navigation Links
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (
            (pageName === '' && linkPath === 'index.html') ||
            (pageName === 'index.html' && linkPath === 'index.html') ||
            (pageName === linkPath)
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
