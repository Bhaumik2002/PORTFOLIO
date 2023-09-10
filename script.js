function locoAndScroll () {

  gsap.registerPlugin(ScrollTrigger);
  
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  
  }
  locoAndScroll();
  
  
  function revealToSpan() {
    document.querySelectorAll(".reveal").forEach(function (elem) {
      // create tow spans
      var parent = document.createElement("span");
      var child = document.createElement("span");
  
      // parent and child both sets their respective classes
      parent.classList.add("parent");
      child.classList.add("child");
  
      // span parent gets child and child gets elem detail
      child.innerHTML = elem.innerHTML;
      parent.appendChild(child);
  
      // elem replaces its value with parent span
      elem.innerHTML = "";
      elem.appendChild(parent);
    });
  }
  revealToSpan();
  
  
  function loader() {
  
  var tl = gsap.timeline();
  
  tl.from(".child span", {
    x: 100,
    duration: 2,
    stagger: 0.2,
    ease: Power3.easeInOut,
  })
  
  tl.to(".parent .child", {
    y: "-100%",
    duration: 1,
    ease: Circ.easeInOut,
  })
  
  tl.to("#loader", {
    height: 0,
    duration: 1,
    ease: Expo.easeInOut,
  });
  
  tl.to("#green", {
    height: "100%",
    top: 0,
    duration: 1,
    delay: -1.5,
    ease: Circ.easeInOut,
  });
  
  tl.to("#green", {
    height: 0,
    duration: 1,
    delay: -1,
    ease: Circ.easeInOut,
  });
  }
  loader();
  
  
  function circle() {
    gsap.to("#page1 .glowing-circle", {
      z: 15,
      y: -15,
      duration: 1,
      yoyo: true,
      repeat: -1,
    })
  }
  circle();
  
  
  function skill() {
  
  // Select elements
  const aboutSection = document.querySelector("#page3");
  const aboutLink = document.querySelector('a[href="#page3"]');
  
  // Scroll handler
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !aboutSection.parentElement.classList.contains("animated")) {
      startAnimation();
    }
  });
  
  observer.observe(aboutSection);
  
  // Click handler
  aboutLink.addEventListener("click", () => {
    startAnimation();
  });
  
  // Load handler
  document.addEventListener("DOMContentLoaded", () => {
    if (isInView(aboutSection)) {
      startAnimation();
    }
  });
  
  // Animation function
  function startAnimation() {
    // Progress bar
    const ratings = document.querySelectorAll(".rating");
    ratings.forEach((rating) => {
      const blocks = rating.getElementsByClassName("block");
      const target = +rating
        .querySelector(".counter")
        .getAttribute("data-target");
      for (let i = 0; i < 100; i++) {
        rating.innerHTML += "<div class='block'></div>";
        blocks[i].style.transform = "rotate(" + i * 3.6 + "deg)";
        if (i >= target) {
          blocks[i].style.backgroundColor = "#8739F9";
          blocks[i].classList.add("black-shadow");
        }
        blocks[i].style.animationDelay = i / 40 + "s";
      }
    });
  
    // Animation for numbers
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      counter.innerText = 0;
      const target = +counter.getAttribute("data-target");
      const NumberCounter = () => {
        const value = +counter.innerText;
        if (value < target) {
          counter.innerText = Math.min(Math.ceil(value + 1), target);
          setTimeout(NumberCounter, 25);
        }
      };
      NumberCounter();
    });
  
    aboutSection.parentElement.classList.add("animated");
  }
  }
  skill();
  
  
  gsap.to("#page1", {
    height: "100%",
    duration: 2,
    delay: -1.8,
    ease: Expo.easeInOut,
  });
  
  
  var tl2 = gsap.timeline({
    scrollTrigger:{
      trigger:"#page1 h1",
      scroller:"#main",
      markers:true,
      start:"top -115%",
      end:"top -130%",
      scrub:3,
    }
  })
  tl2.to("#main", {
    backgroundColor: "#111"
  })