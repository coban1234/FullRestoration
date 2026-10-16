/* Stonecroft drafts — shared behaviour. Vanilla, no libraries (§4.1, §9.3). */
(function () {
  document.documentElement.classList.remove("no-js");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => innerWidth < 900;

  /*
   * INT-1. root = the scroll track ([data-seq-track]); it must contain [data-seq-stack].
   * Pips: [data-seq-pip="0..4"]; live region: [data-seq-live]; static grid target: [data-seq-static].
   * Mobile (§4.1 v1.1): paint before / services / complete first; demolition + close-in only once services is reached.
   */
  window.initSequence = function (root, opts = {}) {
    const stack = root.querySelector("[data-seq-stack]");
    const pips = [...root.querySelectorAll("[data-seq-pip]")];
    const live = root.querySelector("[data-seq-live]");
    const uid = opts.uid || "s";
    const slots = [0, 1, 2, 3, 4].map((i) => {
      const d = document.createElement("div");
      d.className = "stage-img"; d.dataset.seqImg = i;
      stack.appendChild(d);
      return d;
    });
    const painted = new Set();
    const paint = (i) => { if (painted.has(i)) return; slots[i].innerHTML = kitchenSVG(i, { uid: uid + i }); painted.add(i); };
    (isMobile() ? [0, 2, 4] : [0, 1, 2, 3, 4]).forEach(paint);

    const staticMode = reduce || innerHeight < 380;
    const grid = root.querySelector("[data-seq-static]");
    if (staticMode) {
      root.classList.add("is-static");
      if (grid) grid.innerHTML = KITCHEN_STAGES.map((s, i) => `<figure class="sg"><div class="sg-ph" data-kitchen="${i}"></div><figcaption><span class="label">${s.name}</span> <span class="num">WK ${s.wk}</span><span class="sg-cap">${s.cap}</span></figcaption></figure>`).join("");
      paintKitchens(grid);
      opts.onStage && opts.onStage(4, true);
      return { set() {} };
    }

    let current = -1, liveTimer;
    function set(n) {
      if (n === current) return;
      current = n;
      if (n >= 2) [1, 3].forEach(paint);
      let shown = n; while (!painted.has(shown)) shown--;
      slots.forEach((el, i) => el.classList.toggle("is-active", i === shown));
      pips.forEach((p) => {
        const k = +p.dataset.seqPip, on = k === n;
        p.classList.toggle("is-active", on); p.classList.toggle("is-done", k < n);
        on ? p.setAttribute("aria-current", "true") : p.removeAttribute("aria-current");
        if (on && isMobile() && p.closest("[data-rail-scroll]")) p.scrollIntoView({ block: "nearest", inline: "center", behavior: "auto" });
      });
      root.dataset.stage = n;
      opts.onStage && opts.onStage(n);
      if (live) { clearTimeout(liveTimer); liveTimer = setTimeout(() => (live.textContent = `Stage ${n + 1} of 5: ${KITCHEN_STAGES[n].name}, week ${KITCHEN_STAGES[n].wk}`), 500); }
    }
    const pinH = () => (opts.pinHeight ? opts.pinHeight() : innerHeight);
    const pinTop = () => innerHeight - pinH();
    function progress() {
      const r = root.getBoundingClientRect(), span = r.height - pinH();
      return span <= 0 ? 0 : Math.min(1, Math.max(0, (pinTop() - r.top) / span));
    }
    let ticking = false;
    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const p = progress();
        root.style.setProperty("--seq-p", p.toFixed(4));
        opts.onProgress && opts.onProgress(p);
        set(Math.min(4, Math.floor(p * 5)));
      });
    }
    function jump(n) {
      const r = root.getBoundingClientRect(), span = r.height - pinH();
      if (span > 0) scrollTo({ top: scrollY + r.top - pinTop() + span * ((n + 0.5) / 5), behavior: reduce ? "auto" : "smooth" });
      set(n);
    }
    pips.forEach((p) => p.addEventListener("click", () => jump(+p.dataset.seqPip)));
    root.addEventListener("keydown", (e) => {
      if (!e.target.matches("[data-seq-pip]") || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      e.preventDefault();
      const n = Math.max(0, Math.min(4, current + (e.key === "ArrowRight" ? 1 : -1)));
      pips.find((p) => +p.dataset.seqPip === n)?.focus(); jump(n);
    });
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    set(0); onScroll();
    return { set, jump };
  };

  window.initReveals = function () {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || reduce) return els.forEach((e) => e.classList.add("is-in"));
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("is-in"); io.unobserve(x.target); } }), { threshold: 0.15 });
    els.forEach((e) => io.observe(e));
  };

  // §6.2 / §7.0.4 — hide the action bar while any field has focus.
  window.initActionBar = function () {
    const bar = document.querySelector(".mbar");
    if (!bar) return;
    const sel = "input, select, textarea";
    document.addEventListener("focusin", (e) => e.target.matches(sel) && bar.classList.add("is-hidden"));
    document.addEventListener("focusout", (e) => e.target.matches(sel) && bar.classList.remove("is-hidden"));
    // The hero already carries BTN-01 as its primary; one primary per 360×640 screen (§7.0.6) means the bar waits until the hero has gone.
    const hero = document.querySelector("[data-seq-track]");
    if (hero && "IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => bar.classList.toggle("is-hero", en.isIntersecting), { rootMargin: "0px 0px -60% 0px" }).observe(hero);
    }
  };

  // BTN-23 — drawer. Focus trapped, Esc closes, focus returns.
  window.initDrawer = function () {
    const btn = document.querySelector("[data-drawer-btn]"), dr = document.getElementById(btn?.getAttribute("aria-controls"));
    if (!btn || !dr) return;
    const close = () => { dr.hidden = true; btn.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; btn.focus(); };
    btn.addEventListener("click", () => { dr.hidden = false; btn.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; dr.querySelector("a, button")?.focus(); });
    dr.querySelectorAll("[data-drawer-close], a").forEach((el) => el.addEventListener("click", close));
    dr.addEventListener("keydown", (e) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab") return;
      const f = [...dr.querySelectorAll("a, button")]; const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  };

  window.initCommon = function () { paintKitchens(); initReveals(); initActionBar(); initDrawer(); };
})();
