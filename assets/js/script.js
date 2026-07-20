// script.js

// Replace feather icons
window.addEventListener('DOMContentLoaded', () => {
  if (window.feather) { feather.replace(); }
});

// Sticky mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Close nav on link click (mobile)
  document.querySelectorAll('#site-nav a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
// Close nav on link click (mobile)
document.querySelectorAll('#site-nav a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Portfolio filter
const buttons = document.querySelectorAll('.pf-btn');
const items = document.querySelectorAll('.pf-item');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    items.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});


// Dynamic copyright year
document.addEventListener("DOMContentLoaded", function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Hero Section - Rotating job titles
const titles = [
  "Project Manager",
  "Product Manager",
  "Business Analyst",
  "Fintech Specialist"
];

let titleIndex = 0;
const titleElement = document.querySelector(".rotating-title");

if (titleElement) {
  setInterval(() => {
    // Fade out
    titleElement.style.opacity = 0;

    // Wait for fade-out to complete before changing text
    setTimeout(() => {
      titleIndex = (titleIndex + 1) % titles.length;
      titleElement.textContent = titles[titleIndex];

      // Fade in
      titleElement.style.opacity = 1;
    }, 500); // match this to CSS transition duration
  }, 3000); // total interval (can be adjusted)
}

document.addEventListener("DOMContentLoaded", function () {
  const filters = document.querySelectorAll(".pf-btn");
  const posts = document.querySelectorAll(".blog-post-link");

  filters.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active state from all buttons
      filters.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const selectedTag = button.dataset.tag;

      posts.forEach(post => {
        const tagElement = post.querySelector(".tag");
        const postTag = tagElement ? tagElement.textContent.trim() : "";

        if (selectedTag === "all" || postTag === selectedTag) {
          post.style.display = "block";
        } else {
          post.style.display = "none";
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
    function getOrdinal(n) {
        if (n > 3 && n < 21) return "th";

        switch (n % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    function formatDate(date) {
        const weekdays = [
            "Sunday", "Monday", "Tuesday",
            "Wednesday", "Thursday", "Friday", "Saturday"
        ];
        const months = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];
        return `Published on ${
            weekdays[date.getDay()]
        }, ${
            date.getDate()
        }${
            getOrdinal(date.getDate())
        } of ${
            months[date.getMonth()]
        } ${
            date.getFullYear()
        }`;
    }

    document.querySelectorAll("[data-offset]").forEach(element => {
        const offset = parseInt(element.dataset.offset);
        const date = new Date();
        date.setDate(date.getDate() - offset);
        const formattedDate = formatDate(date);
        // Blog listing support
        const listDate = element.querySelector(".date");
        if (listDate) {
            listDate.textContent = formattedDate;
        }
        // Article page support
        const articleDate = element.querySelector(".article-date");
        if (articleDate) {
            articleDate.textContent = formattedDate;
        }
    });
});