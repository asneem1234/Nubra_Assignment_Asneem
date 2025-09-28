// JavaScript for Nubra Algo Transition Suite

document.addEventListener('DOMContentLoaded', function() {
    // Initialize strike bars with their data-level attribute
    const strikeBars = document.querySelectorAll('.strike-bar');
    strikeBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.setProperty('--level', level + '%');
    });
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        });
        
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });

    // Add animation to statistics when they come into view
    const stats = document.querySelector('.stats');
    const statItems = document.querySelectorAll('.stat-item h3');
    
    // Simple intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats when they come into view
                statItems.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.opacity = '1';
                        stat.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (stats) {
        observer.observe(stats);

        // Initialize stat items for animation
        statItems.forEach(stat => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Feature buttons interaction
    const featureButtons = document.querySelectorAll('.feature-button');
    featureButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a simple feedback animation
            this.classList.add('clicked');
            
            // Remove the class after animation completes
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // In a real application, this would trigger an action
            console.log('Feature button clicked:', this.textContent);
        });
    });
    
    // Add style for clicked buttons
    const style = document.createElement('style');
    style.textContent = `
        .feature-button.clicked {
            transform: scale(0.95);
            opacity: 0.9;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Filter buttons in options chain
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // For links with href attributes, we don't want to toggle classes
            // as they navigate away from the page
            if (this.getAttribute('href')) {
                return;
            }
            
            e.preventDefault();
            // Toggle active state
            this.classList.toggle('active');
            
            // Get filter type from button text or data attribute
            const filterType = this.id || this.textContent.trim().toLowerCase();
            
            // In a real application, this would filter data
            console.log('Filter applied:', filterType);
            
            // If in options-chain page, we would call the filter function
            if (window.location.href.includes('options-chain.html')) {
                filterOptions(filterType);
            } else {
                alert(`Filter selected: ${this.textContent.trim()}`);
            }
        });
    });
    
    // Functions for the options chain page
    function filterOptions(filterType) {
        console.log('Filtering options by:', filterType);
        // In a real app, this would actually filter the options data
        if (filterType === 'quickFilters') {
            alert('Quick filters: ITM Only, OTM Only, High IV, High OI Change');
        } else if (filterType === 'atmFilter') {
            alert('Showing only strikes near ATM (±5 strikes)');
        } else if (filterType === 'highVolumeFilter') {
            alert('Showing only high volume options');
        }
    }
    
    // Add style for active filter buttons
    const filterStyle = document.createElement('style');
    filterStyle.textContent = `
        .filter-btn.active {
            background-color: rgba(97, 145, 255, 0.2);
            border-color: var(--accent-blue);
            color: var(--accent-blue);
        }
    `;
    document.head.appendChild(filterStyle);
});