
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const projects = document.querySelectorAll('.project-card');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
  
     // 初始化小圆点
    projects.forEach((_, index) => {
        const dot = document.createElement('span');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
  
    const dots = dotsContainer.querySelectorAll('span');
  
    // 添加平滑过渡效果
    track.style.transition = 'transform 0.5s ease';
    function updateCarousel(index) {
    const projectWidth = projects[0].offsetWidth + 20; // 图片宽+间距
    track.style.transform = `translateX(-${index * projectWidth}px)`;
          dots.forEach(dot => dot.classList.remove('active'));
          dots[index].classList.add('active');
      }
  
      function moveSlide(direction) {
          currentIndex += direction;
          if (currentIndex < 0) currentIndex = projects.length - 1;
          if (currentIndex >= projects.length) currentIndex = 0;
          updateCarousel(currentIndex);
      }
  
      prevButton.addEventListener('click', () => {
          moveSlide(-1);
      });
  
      nextButton.addEventListener('click', () => {
          moveSlide(1);
      });
  
      dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              currentIndex = index;
              updateCarousel(currentIndex);
          });
      });
  
      // 初始位置
      updateCarousel(currentIndex);
  
      // 下面是你已有的内容（没改）
      const languageToggle = document.getElementById('languageToggle');
      const typingName = document.getElementById('typingName');
      const aboutTitle = document.querySelector('#about h2');
      const projectsTitle = document.querySelector('#projects h2');
      const publicationsTitle = document.querySelector('#publications h2');
      const contactTitle = document.querySelector('#contact h2');
      const navLinks = document.querySelectorAll('nav a');
  
      let typingTimer = null;
  
      function typeWriter(text, element, speed = 100) {
          let index = 0;
          clearInterval(typingTimer);
          element.textContent = '';
          typingTimer = setInterval(() => {
              if (index < text.length) {
                  element.textContent += text.charAt(index);
                  index++;
              } else {
                  clearInterval(typingTimer);
              }
          }, speed);
      }
  
      function smoothToggleText(element, newText) {
          element.style.opacity = 0;
          setTimeout(() => {
              element.textContent = newText;
              element.style.opacity = 1;
          }, 300);
      }
  
      languageToggle.addEventListener('click', () => {
          if (languageToggle.textContent === 'English') {
              smoothToggleText(languageToggle, '中文');
              aboutTitle.textContent = 'About Me';
              projectsTitle.textContent = 'Projects';
              publicationsTitle.textContent = 'Publications';
              contactTitle.textContent = 'Contact Me';
              typeWriter('Xiang Zhang', typingName, 100);
  
              if (navLinks.length >= 3) {
                  navLinks[0].textContent = 'About';
                  navLinks[1].textContent = 'Projects';
                  navLinks[2].textContent = 'Contact';
              }
          } else {
              smoothToggleText(languageToggle, 'English');
              aboutTitle.textContent = '关于我';
              projectsTitle.textContent = '项目';
              publicationsTitle.textContent = '学术成果';
              contactTitle.textContent = '联系我';
              typeWriter('张翔', typingName, 150);
  
              if (navLinks.length >= 3) {
                  navLinks[0].textContent = '关于我';
                  navLinks[1].textContent = '项目';
                  navLinks[2].textContent = '联系我';
              }
          }
      });
  
      const backToTopButton = document.getElementById('backToTop');
  
      window.addEventListener('scroll', () => {
          if (window.scrollY > 300) {
              backToTopButton.style.display = 'flex';
          } else {
              backToTopButton.style.display = 'none';
          }
      });
  
      backToTopButton.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  
      window.addEventListener('load', () => {
          typeWriter('xx', typingName, 150);
      });
      const canvas = document.getElementById('particleCanvas');
      const ctx = canvas.getContext('2d');
      let particlesArray = [];
  
      function resizeCanvas() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      }
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
  
      class Particle {
          constructor() {
              this.reset();
          }
  
          reset() {
              this.x = Math.random() * canvas.width;
              this.y = Math.random() * canvas.height;
              this.size = Math.random() * 2 + 1; // 星星大小
              this.speedX = (Math.random() - 0.5) * 0.5;
              this.speedY = (Math.random() - 0.5) * 0.5;
              this.opacity = Math.random() * 0.5 + 0.5;
          }
  
          draw() {
              ctx.save();
              ctx.translate(this.x, this.y);
              ctx.scale(this.size, this.size);
              ctx.beginPath();
              for (let i = 0; i < 5; i++) {
                  ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * 5,
                             -Math.sin((18 + i * 72) / 180 * Math.PI) * 5);
                  ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * 2.5,
                             -Math.sin((54 + i * 72) / 180 * Math.PI) * 2.5);
              }
              ctx.closePath();
              ctx.fillStyle = `rgba(255, 223, 0, ${this.opacity})`; // 金黄色星星
              ctx.fill();
              ctx.restore();
          }
  
          update() {
              this.x += this.speedX;
              this.y += this.speedY;
  
              // 超出屏幕则重置
              if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                  this.reset();
              }
          }
      }
  
      function initParticles() {
          particlesArray = [];
          const numberOfParticles = 100; // 粒子数量
          for (let i = 0; i < numberOfParticles; i++) {
              particlesArray.push(new Particle());
          }
      }
  
      function animateParticles() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particlesArray.forEach(p => {
              p.update();
              p.draw();
          });
          requestAnimationFrame(animateParticles);
      }
  
      initParticles();
      animateParticles();