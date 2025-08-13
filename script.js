// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.body.appendChild(mobileMenuBtn);

    const sidebar = document.querySelector('.sidebar');
    let isMenuOpen = false;

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        sidebar.classList.toggle('active', isMenuOpen);
        this.innerHTML = isMenuOpen ? '<i class="fa-solid fa-times"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            isMenuOpen = false;
            sidebar.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });

    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');

            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked item and corresponding section
            this.classList.add('active');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                isMenuOpen = false;
                sidebar.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    });

    // Smooth scroll for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip empty hash or just '#'
            if (href === '#' || href.length <= 1) {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Show loading state
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            // Create mailto link
            const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${subject}`);
            const mailtoBody = encodeURIComponent(`Hello Mani,

My name is ${name} and I would like to get in touch with you.

Subject: ${subject}

Message:
${message}

Best regards,
${name}
Email: ${email}`);

            const mailtoLink = `mailto:mani.paliwal.orai@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

            // Try to open email client
            try {
                window.location.href = mailtoLink;
                showNotification('Opening your email client... Please send the email to complete your message.', 'success');
                this.reset();
            } catch (error) {
                console.error('Error opening email client:', error);
                showNotification('Please email me directly at: mani.paliwal.orai@gmail.com', 'info');
            }

            // Reset button state
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-item, .info-item, .contact-form, .portfolio-item, .timeline-item, .cert-item, .education-item, .learning-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Portfolio filtering functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Typing effect for profile title
    if (typeof Typed !== 'undefined') {
        const profileTitleElement = document.querySelector('.profile-title');
        if (profileTitleElement && !profileTitleElement.textContent.trim()) {
            new Typed('.profile-title', {
                strings: [
                    'DevOps Engineer',
                    'Cloud Engineer',
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: false
            });
        }
    }

    // Floating animation for geometric shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * -3}s`;
    });

    // Add hover effects to skill items and portfolio items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Download CV functionality
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('CV download will be available soon!', 'info');
        });
    }

    // Portfolio external links - Force them to work by removing any blocking listeners
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    portfolioLinks.forEach(link => {
        // Remove any existing event listeners by cloning the element
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);

        // Add our own click handler that forces navigation
        newLink.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Portfolio link clicked, navigating to:', this.href);
            window.open(this.href, '_blank');
        });
    });

    // Add parallax effect to geometric shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.2;
            shape.style.transform = `translateY(${parallax * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
});

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    let bgColor;
    switch(type) {
        case 'success':
            bgColor = '#43e97b';
            break;
        case 'error':
            bgColor = '#ff6b6b';
            break;
        default:
            bgColor = '#00a8ff';
    }

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Hide notification
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Performance optimization
window.addEventListener('load', function() {
    // Remove loading states if any
    document.body.classList.add('loaded');

    // Initialize any additional animations
    const elementsToAnimate = document.querySelectorAll('.profile-section, .contact-info, .sidebar-nav');
    elementsToAnimate.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Initialize default section
    const defaultSection = document.getElementById('about');
    if (defaultSection) {
        defaultSection.classList.add('active');
    }
});

// Add resize handler for responsive behavior
window.addEventListener('resize', function() {
    const sidebar = document.querySelector('.sidebar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    }
});
