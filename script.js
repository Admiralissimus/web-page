// Textbook functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
    
    // Navigation links functionality
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close sidebar on mobile after navigation
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('open');
                }
            }
        });
    });
    
    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll('.textbook-section');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                if (activeId) {
                    // Update active navigation link
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add fade-in animation to content blocks
    const contentBlocks = document.querySelectorAll('.textbook-section, .recall-box, .question-box, .expert-club, .diagram-container, .figure-container');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    contentBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(block);
    });
    
    // Add interactive hover effects to special boxes
    const specialBoxes = document.querySelectorAll('.recall-box, .question-box, .interconnected-box, .belarus-box, .atlas-box, .expert-club, .dictionary-box, .summary-box');
    specialBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to navigation items
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key closes sidebar
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
        
        // Arrow keys for navigation (if needed)
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            const activeLink = document.querySelector('.nav-link.active');
            if (activeLink) {
                const currentIndex = Array.from(navLinks).indexOf(activeLink);
                let newIndex;
                
                if (e.key === 'ArrowUp' && currentIndex > 0) {
                    newIndex = currentIndex - 1;
                } else if (e.key === 'ArrowDown' && currentIndex < navLinks.length - 1) {
                    newIndex = currentIndex + 1;
                }
                
                if (newIndex !== undefined) {
                    navLinks[newIndex].click();
                }
            }
        }
    });
    
    // Add print styles
    const printStyles = `
        @media print {
            .sidebar { display: none !important; }
            .textbook-content { margin-left: 0 !important; }
            .page-header { break-inside: avoid; }
            .textbook-section { break-inside: avoid; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = printStyles;
    document.head.appendChild(styleSheet);
    
    // Add search functionality (enhanced)
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск по учебнику...';
    searchInput.style.cssText = `
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #34495e;
        border-radius: 4px;
        background: #34495e;
        color: white;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    `;
    
    const sidebarContent = document.querySelector('.sidebar-content');
    if (sidebarContent) {
        sidebarContent.insertBefore(searchInput, sidebarContent.firstChild);
        
        // Enhanced search with highlighting
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const sections = document.querySelectorAll('.textbook-section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            if (searchTerm === '') {
                // Show all sections
                sections.forEach(section => {
                    section.style.display = 'block';
                    // Remove highlighting
                    const highlightedText = section.querySelectorAll('.search-highlight');
                    highlightedText.forEach(el => {
                        el.outerHTML = el.innerHTML;
                    });
                });
                
                // Show all nav links
                navLinks.forEach(link => {
                    link.style.display = 'block';
                });
            } else {
                let foundSections = 0;
                
                sections.forEach(section => {
                    const text = section.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        section.style.display = 'block';
                        foundSections++;
                        
                        // Add highlighting
                        const content = section.innerHTML;
                        const regex = new RegExp(`(${searchTerm})`, 'gi');
                        const highlightedContent = content.replace(regex, '<span class="search-highlight" style="background: #f39c12; color: #2c3e50; padding: 2px 4px; border-radius: 3px;">$1</span>');
                        section.innerHTML = highlightedContent;
                    } else {
                        section.style.display = 'none';
                    }
                });
                
                // Update navigation based on visible sections
                navLinks.forEach(link => {
                    const targetId = link.getAttribute('href').substring(1);
                    const targetSection = document.querySelector(`#${targetId}`);
                    if (targetSection && targetSection.style.display !== 'none') {
                        link.style.display = 'block';
                    } else {
                        link.style.display = 'none';
                    }
                });
                
                // Show search results count
                if (foundSections > 0) {
                    searchInput.style.borderColor = '#27ae60';
                    searchInput.style.boxShadow = '0 0 5px rgba(39, 174, 96, 0.3)';
                } else {
                    searchInput.style.borderColor = '#e74c3c';
                    searchInput.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
                }
            }
        });
        
        // Clear search on escape
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                this.dispatchEvent(new Event('input'));
            }
        });
    }
    
    // Add progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: #3498db;
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress bar on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});
