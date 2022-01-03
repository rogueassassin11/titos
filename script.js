$(document).ready(function () {
  //Get the current year for the copyright
  $("#year").text(new Date().getFullYear());

  //Slick Slider init
  $(".slider").slick({
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
    //responsive 733px
    responsive: [
      {
        breakpoint: 733,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  });

  //making mobile nav work
  const btnNavEl = document.querySelector(".btn-mobile-nav");
  const headerEl = document.querySelector(".header");

  btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
  });

  //smooth scrolling
  const allLinks = document.querySelectorAll("a:link");
  allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = link.getAttribute("href");

      // scroll back to top
      if (href === "#")
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      // scroll to other links
      if ((href !== "#") & href.startsWith("#")) {
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }

      // close mobile navigation
      if (link.classList.contains("main-nav-link"))
        headerEl.classList.toggle("nav-open");
    });
  });

  //Sticky navigation
  const sectionHeroEl = document.querySelector(".section-hero");

  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];

      if (ent.isIntersecting === false) {
        document.querySelector("body").classList.add("sticky");
      }

      if (ent.isIntersecting === true) {
        document.querySelector("body").classList.remove("sticky");
      }
    },
    {
      //in the viewport
      root: null,
      threshold: 0, //fires as soon as hero section moves out of viewport
    }
  );
  obs.observe(sectionHeroEl);

  /////////////////////////////////////////////////////////
  //To fix flexbox gap property missing in Safari versions
  function checkFlexGap() {
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    console.log(isSupported);

    if (!isSupported) document.body.classList.add("no-flexbox-gap");
  }
  checkFlexGap();
});
