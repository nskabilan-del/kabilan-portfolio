// ============================================================
// Project data
// Add future projects here — each card renders itself from this
// array, so no HTML edits are needed to add a new project.
// Leave github/demo empty ('') to hide that button automatically.
// ============================================================
const PROJECTS = [
   {
    title: "Synchronous_FIFO",
    subtitle: "Verilog",
    description: "A Verilog project implementing a 16×8 synchronous FIFO with read/write control, pointer-based data management, toggle-bit Full/Empty detection, and error handling. Developed and verified using ModelSim, with source code version-controlled on GitHub.",
    tech: ["Verilog"],
    role: "RTL Design &amp; Verification",
    outcomes: [],
    github: "https://github.com/nskabilan-del/Synchronous-_FIFO.git",
    demo: ""
  },
  {
    title: "SR_FF_graycode",
    subtitle: "Verilog",
    description: "Designed and implemented an SR flip-flop-based sequencer in Verilog using Gray-code state transitions, ensuring only one bit changes between consecutive states for an efficient, glitch-resistant scheme.",
    tech: ["Verilog"],
    role: "RTL Design",
    outcomes: [],
    github: "https://github.com/nskabilan-del/SR_FF_graycode",
    demo: ""
  },
  {
    title: "D-flip-flop-counter",
    subtitle: "Verilog",
    description: "Built a counter using D flip-flops in Verilog to reinforce fundamentals of sequential circuit design and clocked logic.",
    tech: ["Verilog"],
    role: "RTL Design",
    outcomes: [],
    github: "https://github.com/nskabilan-del/D-flip-flop-counter",
    demo: ""
  },
  {
    title: "memory_code",
    subtitle: "Verilog",
    description: "Designed a memory module in Verilog covering addressing, read/write operations, and data storage; verified functionality with a dedicated testbench and simulation waveforms.",
    tech: ["Verilog"],
    role: "RTL Design",
    outcomes: [],
    github: "https://github.com/nskabilan-del/memory_code",
    demo: ""
  },
  {
    title: "testcase_memory",
    subtitle: "Verilog",
    description: "Targeted memory test cases used to verify the memory module\u2019s read/write and addressing behavior against expected simulation results.",
    tech: ["Verilog"],
    role: "Digital Verification",
    outcomes: [],
    github: "https://github.com/nskabilan-del/testcase_memory",
    demo: ""
  },
  {
    title: "Low Power UART for SoC Communication using ESP32",
    subtitle: "",
    description: "Designed a low-power UART communication system on ESP32 for efficient serial data transmission and reception between SoC peripherals, integrating low-power sleep modes to reduce idle-state power consumption. Validated reliable end-to-end data transfer using Arduino IDE and Serial Monitor.",
    tech: ["ESP32", "UART", "Arduino IDE", "Serial Monitor", "Low Power Communication"],
    role: "Embedded / Communication Design",
    outcomes: [],
    github: "",
    demo: ""
  },
  {
    title: "Garbage Segregator and Bin Level Indicator",
    subtitle: "",
    description: "Developed an Arduino-based smart waste bin featuring automatic lid opening upon approach. The system efficiently segregates wet and dry waste and provides real-time fill-level updates to streamline waste management and disposal.",
    tech: ["Arduino", "Sensors", "Embedded Systems", "Automation"],
    role: "Embedded Systems Developer",
    outcomes: [],
    github: "",
    demo: ""
  },
  {
    title: "Home Automation",
    subtitle: "ESP32 Microcontroller and IoT Cloud",
    description: "Designed a smart home automation system using the ESP32 microcontroller. Enabled remote control of appliances through IoT-based connectivity and implemented sensor integration for monitoring and automation.",
    tech: ["ESP32", "IoT Cloud", "Sensors", "Wireless Communication"],
    role: "IoT / Embedded Developer",
    outcomes: [],
    github: "",
    demo: ""
  }
];

// ============================================================
// TO ADD A FUTURE PROJECT:
// Copy the object shape above and push a new entry into PROJECTS,
// e.g. PROJECTS.push({ title: "...", subtitle: "", description: "...",
// tech: ["..."], role: "...", outcomes: [], github: "", demo: "" });
// The card renders automatically — no HTML or CSS changes needed.
// ============================================================

// ============================================================
// Render project cards
// ============================================================
function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((project, index) => {
    const techTags = project.tech
      .map(t => `<li class="tag tag-mono tag-sm">${escapeHtml(t)}</li>`)
      .join("");

    const outcomeList = project.outcomes && project.outcomes.length
      ? `<ul class="project-outcomes">${project.outcomes.map(o => `<li>${escapeHtml(o)}</li>`).join("")}</ul>`
      : "";

    const links = [];
    if (project.github) {
      links.push(`<a href="${project.github}" class="btn btn-ghost" target="_blank" rel="noopener">GitHub ↗</a>`);
    }
    if (project.demo) {
      links.push(`<a href="${project.demo}" class="btn btn-ghost" target="_blank" rel="noopener">Live Demo ↗</a>`);
    }
    const linksBlock = links.length ? `<div class="project-links">${links.join("")}</div>` : "";

    return `
      <article class="project-card skeleton-card" style="--d:${index % 4}">
        <p class="project-role">${escapeHtml(project.role)}</p>
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        ${project.subtitle ? `<p class="project-subtitle">${escapeHtml(project.subtitle)}</p>` : ""}
        <p class="project-desc">${escapeHtml(project.description)}</p>
        ${outcomeList}
        <ul class="project-tech">${techTags}</ul>
        ${linksBlock}
      </article>
    `;
  }).join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ============================================================
// Mobile nav toggle
// ============================================================
function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ============================================================
// Footer year
// ============================================================
function initFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// ============================================================
// Scroll-reveal for elements marked .reveal or .skeleton-card
// ============================================================
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal, .skeleton-card");
  if (!targets.length) return;

  const activate = (el) => {
    el.classList.add(el.classList.contains("skeleton-card") ? "loaded" : "in-view");
  };

  if (!("IntersectionObserver" in window)) {
    targets.forEach(activate);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(el => observer.observe(el));
}

// ============================================================
// Highlight the current section's nav link while scrolling
// ============================================================
function initActiveNav() {
  const sections = document.querySelectorAll("main section[id], .hero[id]");
  const navLinks = document.querySelectorAll(".primary-nav a");
  if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

  const setActive = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id === "hero" ? "top" : entry.target.id;
        setActive(id);
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

// ============================================================
// Floating scroll-to-top button
// ============================================================
function initScrollTopFab() {
  const fab = document.getElementById("scroll-top");
  if (!fab) return;

  const toggleVisibility = () => {
    fab.classList.toggle("visible", window.scrollY > 480);
  };
  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });

  fab.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initNav();
  initFooterYear();
  initScrollReveal();
  initActiveNav();
  initScrollTopFab();
});
