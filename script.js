const contactLink = document.querySelector(".contact a");
const contactBar = document.querySelector(".contact:hover");

contactLink.addEventListener('mouseenter', () => {
  const linkWidth = contactLink.offsetWidth;
  const linkLeft = contactLink.offsetLeft;
  contactBar.style.setProperty('--width', linkWidth + 'px');
  contactBar.style.setProperty('--left', linkLeft + 'px');
});

contactLink.addEventListener('mouseleave', () => {
  contactBar.style.setProperty('--width', '10%');
  contactBar.style.setProperty('--left', '0px'); 
});



// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav ul li a');

  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      const target = document.querySelector(link.getAttribute('href'));
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
});

// Scroll to top button functionality
document.addEventListener('DOMContentLoaded', function () {
  const scrollToTopBtn = document.querySelector('.scroll-to-top');

  scrollToTopBtn.addEventListener('click', function (event) {
    event.preventDefault();

    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 100) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
});
