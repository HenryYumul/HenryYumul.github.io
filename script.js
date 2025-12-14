document.addEventListener('DOMContentLoaded', function(){
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', () => nav.classList.toggle('show'));

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav
        if(nav.classList.contains('show')) nav.classList.remove('show');
      }
    })
  });

  // Simple form handling (no backend) — validate & give feedback
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !message){
      feedback.textContent = 'Please fill required fields.';
      return;
    }
    // Basic email check
    if(!/^\S+@\S+\.\S+$/.test(email)){ feedback.textContent = 'Enter a valid email.'; return; }

    // Simulate success
    feedback.textContent = 'Thanks — your message has been queued. I will reply soon.';
    form.reset();
  });

  // Fade-in animations on scroll
  const fadeObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    })
  },{threshold:0.1, rootMargin: '0px 0px -50px 0px'});

  // Observe all animatable elements
  document.querySelectorAll('.stat, .timeline-item, .project-card, .skill-category, .languages-section, .contact-item').forEach(el=>{
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  // Typing animation for hero title
  const heroTitle = document.querySelector('.hero h1');
  if(heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      }
    }

    setTimeout(typeWriter, 300);
  }

  // Animate stats numbers on scroll
  const statsObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) {
        const statNumber = entry.target;
        const target = statNumber.textContent.replace('+', '');
        const isPlus = statNumber.textContent.includes('+');

        // Check if it's a number (not like "2025")
        if(!isNaN(target) && target < 100) {
          statNumber.textContent = '0';
          let current = 0;
          const increment = target / 30;

          const updateNumber = () => {
            current += increment;
            if(current < target) {
              statNumber.textContent = Math.ceil(current) + (isPlus ? '+' : '');
              requestAnimationFrame(updateNumber);
            } else {
              statNumber.textContent = target + (isPlus ? '+' : '');
            }
          };

          updateNumber();
        }
        statsObserver.unobserve(statNumber);
      }
    })
  },{threshold:0.5});

  document.querySelectorAll('.stat-number').forEach(el=>statsObserver.observe(el));

  // Parallax effect for hero image
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if(heroImage && scrolled < window.innerHeight) {
      heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if(pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav a').forEach(a => {
      a.classList.remove('active');
      if(a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });
  });
});
