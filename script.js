// Smooth scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for cards
                if (entry.target.dataset.delay) {
                    entry.target.style.transitionDelay = entry.target.dataset.delay + 'ms';
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));


    // Parallax effect for hero section
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.transform = `translateY(${scrolled * -0.2}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.002);
        }
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Add floating animation to garden icons
    const gardenIcons = document.querySelectorAll('.garden-icon');
    gardenIcons.forEach((icon, index) => {
        icon.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.2}s`;
    });

    // Dynamic gradient animation for accent elements
    const gradientElements = document.querySelectorAll('.card-number, .hero-title');
    gradientElements.forEach(el => {
        el.style.backgroundSize = '200% 200%';
        el.style.animation = 'gradientShift 3s ease infinite';
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.use-case-card, .garden-item, .insight-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Typing effect for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.opacity = '1';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Add pulse effect to result metrics
    const metrics = document.querySelectorAll('.result-metric');
    metrics.forEach(metric => {
        setInterval(() => {
            metric.classList.add('pulse');
            setTimeout(() => metric.classList.remove('pulse'), 1000);
        }, 3000);
    });

    // Interactive code demo
    const codePrompt = document.querySelector('.code-prompt');
    if (codePrompt) {
        codePrompt.addEventListener('click', function() {
            this.classList.add('typing');
            setTimeout(() => this.classList.remove('typing'), 2000);
        });
    }


    // Create floating particles for AI theme
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        document.querySelector('.hero').appendChild(particle);
        
        setTimeout(() => particle.remove(), 5000);
    }

    // Create particles periodically
    setInterval(createParticle, 300);

    // Progress bar for sections
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .pulse {
        animation: pulse 1s ease;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .typing::after {
        content: '|';
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, var(--accent-blue), var(--accent-purple));
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat linear infinite;
    }
    
    @keyframes particleFloat {
        from {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
        z-index: 9999;
        transition: width 0.3s ease;
    }
`;
document.head.appendChild(style);
