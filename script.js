// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const colorChange = document.getElementById('color-change');
    const body = document.body;
    
    // Theme toggle button
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        // Save theme preference
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDark);
        
        // Update button text
        themeToggle.textContent = isDark ? 'Светлая тема' : 'Темная тема';
    });
    
    // Color change button
    colorChange.addEventListener('click', function() {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        ];
        
        const darkColors = [
            'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
            'linear-gradient(135deg, #4a1a4a 0%, #2d1b2d 100%)',
            'linear-gradient(135deg, #1a365d 0%, #2d3748 100%)',
            'linear-gradient(135deg, #1a4d1a 0%, #2d4a2d 100%)',
            'linear-gradient(135deg, #4a1a1a 0%, #2d1b1b 100%)',
            'linear-gradient(135deg, #2d4a4a 0%, #1a2d2d 100%)'
        ];
        
        const currentTheme = body.classList.contains('dark-theme');
        const colorArray = currentTheme ? darkColors : colors;
        
        const randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
        body.style.background = randomColor;
        
        // Save color preference
        localStorage.setItem('backgroundColor', randomColor);
    });
    
    // Load saved preferences
    const savedTheme = localStorage.getItem('darkTheme');
    const savedColor = localStorage.getItem('backgroundColor');
    
    if (savedTheme === 'true') {
        body.classList.add('dark-theme');
        themeToggle.textContent = 'Светлая тема';
    }
    
    if (savedColor) {
        body.style.background = savedColor;
    }
    
    // Add smooth scroll effect
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
    
    // Add typing effect to title
    const title = document.querySelector('.title');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
    
    // Add particle effect
    createParticles();
});

// Particle effect function
function createParticles() {
    const particleCount = 50;
    const container = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        
        container.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
