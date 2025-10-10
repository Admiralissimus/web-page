// Textbook functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
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
