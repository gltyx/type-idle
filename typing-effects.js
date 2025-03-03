/**
 * Particle System for TypeIdle
 * Adds visual effects for typing actions
 */

class Particle {
    constructor(x, y, color, size, speed, lifetime, behavior) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.color = color;
        this.originalSize = size;
        this.size = size;
        this.speed = speed;
        this.lifetime = lifetime;
        this.age = 0;
        this.dead = false;
        this.behavior = behavior || 'float';
        this.angle = Math.random() * Math.PI * 2;
        this.rotation = (Math.random() - 0.5) * 0.1;
        this.velocityX = (Math.random() - 0.5) * speed * 2;
        this.velocityY = -speed - Math.random() * speed;
        this.gravity = 0.05;
        this.friction = 0.98;
        this.alpha = 1;
    }

    update() {
        this.age++;
        
        if (this.age >= this.lifetime) {
            this.dead = true;
            return;
        }

        // Calculate alpha based on lifetime
        this.alpha = 1 - (this.age / this.lifetime);
        
        // Update position based on behavior
        switch(this.behavior) {
            case 'float':
                this.x += this.velocityX;
                this.y += this.velocityY;
                this.velocityY *= this.friction;
                break;
            case 'fountain':
                this.velocityY += this.gravity;
                this.x += this.velocityX;
                this.y += this.velocityY;
                this.velocityX *= this.friction;
                break;
            case 'sparkle':
                this.angle += this.rotation;
                this.x = this.originalX + Math.cos(this.angle) * (this.age / 10);
                this.y = this.originalY + Math.sin(this.angle) * (this.age / 10);
                this.size = this.originalSize * (1 - this.age / this.lifetime);
                break;
            case 'explode':
                this.x += this.velocityX;
                this.y += this.velocityY;
                this.velocityX *= this.friction;
                this.velocityY *= this.friction;
                break;
        }
    }

    draw(ctx) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

class TypeParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '999';
        this.canvas.style.opacity = '0.5';
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        document.body.appendChild(this.canvas);
        
        // Keep track of the last character element that's being typed
        this.lastCharacterElement = null;
        
        // Bind methods
        this.animate = this.animate.bind(this);
        this.handleCorrectType = this.handleCorrectType.bind(this);
        this.handleMistake = this.handleMistake.bind(this);
        this.handleCompletedWord = this.handleCompletedWord.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
        
        // Set up event listeners
        window.addEventListener('resize', this.resizeCanvas);
        
        // Start animation loop
        this.animate();
        
        // Set up mutation observer to detect when new characters are added/modified
        this.setupObserver();
    }
    
    setupObserver() {
        const wordsContainer = document.getElementById('words-to-type');
        if (!wordsContainer) return;
        
        // Create a mutation observer to watch for changes to correct/mistake classes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    this.checkForTypingEvents();
                }
            });
        });
        
        // Observe the words container for any changes
        observer.observe(wordsContainer, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
    }
    
    checkForTypingEvents() {
        const currentChar = document.querySelector('.character.current');
        if (currentChar && currentChar !== this.lastCharacterElement) {
            this.lastCharacterElement = currentChar;
            
            // Check for newly correct characters
            const correctChars = document.querySelectorAll('.character.correct');
            const lastCorrect = correctChars[correctChars.length - 1];
            if (lastCorrect && !lastCorrect.dataset.particleEmitted) {
                lastCorrect.dataset.particleEmitted = 'true';
                
                const rect = lastCorrect.getBoundingClientRect();
                this.handleCorrectType(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
            
            // Check for newly incorrect characters
            const mistakeChars = document.querySelectorAll('.character.mistake');
            const lastMistake = mistakeChars[mistakeChars.length - 1];
            if (lastMistake && !lastMistake.dataset.particleEmitted) {
                lastMistake.dataset.particleEmitted = 'true';
                
                const rect = lastMistake.getBoundingClientRect();
                this.handleMistake(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        }
        
        // Check for completed words
        const completedWords = document.querySelectorAll('.word.completed');
        completedWords.forEach(word => {
            if (!word.dataset.particleEmitted) {
                word.dataset.particleEmitted = 'true';
                
                const rect = word.getBoundingClientRect();
                this.handleCompletedWord(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update();
            
            if (particle.dead) {
                this.particles.splice(i, 1);
            } else {
                particle.draw(this.ctx);
            }
        }
        
        // Continue animation loop
        requestAnimationFrame(this.animate);
    }
    
    getRandomColor(palette) {
        const colors = {
            correct: ['#4caf50', '#81c784', '#a5d6a7', '#c8e6c9'],
            mistake: ['#f44336', '#e57373', '#ef9a9a', '#ffcdd2'],
            streak: ['#ffd700', '#ffeb3b', '#fff176', '#fff59d']
        };
        
        const selectedPalette = colors[palette] || colors.correct;
        return selectedPalette[Math.floor(Math.random() * selectedPalette.length)];
    }
    
    createParticle(x, y, options = {}) {
        const {
            color = this.getRandomColor('correct'),
            size = Math.random() * 6 + 2,
            speed = Math.random() * 2 + 1,
            lifetime = Math.floor(Math.random() * 40 + 20),
            behavior = 'float'
        } = options;
        
        const particle = new Particle(x, y, color, size, speed, lifetime, behavior);
        this.particles.push(particle);
        return particle;
    }
    
    // Effect handlers
    handleCorrectType(x, y) {
        // Create a small burst of particles
        const particleCount = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(x, y, {
                color: this.getRandomColor('correct'),
                size: Math.random() * 4 + 1,
                speed: Math.random() * 1.5 + 0.5,
                lifetime: Math.floor(Math.random() * 30 + 10),
                behavior: 'float'
            });
        }
    }
    
    handleMistake(x, y) {
        // Create a burst of red particles for mistakes
        const particleCount = Math.floor(Math.random() * 5) + 3;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(x, y, {
                color: this.getRandomColor('mistake'),
                size: Math.random() * 5 + 2,
                speed: Math.random() * 2 + 1,
                lifetime: Math.floor(Math.random() * 25 + 15),
                behavior: 'explode'
            });
        }
    }
    
    handleCompletedWord(x, y) {
        // Create a celebration effect when a word is completed
        const particleCount = Math.floor(Math.random() * 15) + 10;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(x, y, {
                color: this.getRandomColor(i % 2 === 0 ? 'correct' : 'streak'),
                size: Math.random() * 6 + 2,
                speed: Math.random() * 3 + 1.5,
                lifetime: Math.floor(Math.random() * 50 + 30),
                behavior: 'fountain'
            });
        }
    }
    
    // Public API
    createParticleEffect(x, y, type, count = 10) {
        const behaviors = {
            correct: 'float',
            mistake: 'explode',
            streak: 'fountain',
            sparkle: 'sparkle'
        };
        
        for (let i = 0; i < count; i++) {
            this.createParticle(x, y, {
                color: this.getRandomColor(type),
                behavior: behaviors[type] || 'float'
            });
        }
    }
    
    createPerfectWordEffect(word) {
        const rect = document.getElementById('input-box').getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;
        
        // Create sparkles around the perfect word
        const particleCount = word.length * 5;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(x + (Math.random() - 0.5) * 100, y + (Math.random() - 0.5) * 20, {
                color: this.getRandomColor('streak'),
                size: Math.random() * 5 + 2,
                speed: Math.random() * 2 + 1,
                lifetime: Math.floor(Math.random() * 60 + 30),
                behavior: i % 2 === 0 ? 'sparkle' : 'fountain'
            });
        }
    }
    
    createStreakEffect(streak) {
        const streakContainer = document.getElementById('streak-container');
        if (!streakContainer) return;
        
        const rect = streakContainer.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Create particles based on streak level
        const particleCount = Math.min(streak * 2, 30);
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(x, y, {
                color: this.getRandomColor('streak'),
                size: Math.random() * 5 + 3,
                speed: Math.random() * 3 + 1,
                lifetime: Math.floor(Math.random() * 40 + 40),
                behavior: 'fountain'
            });
        }
    }
}
