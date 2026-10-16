/*
 * Stonecroft drafts — one kitchen, one fixed camera position, five construction stages.
 * Stands in for the marked-tripod photography in §12.1 (SVG fallback permitted by §4.1 until photos exist).
 * kitchenSVG(stage 0–4, { uid }) → SVG string, viewBox 1600×1000.
 */
(function () {
  const W = { x0: 200, x1: 1400, y0: 120, y1: 760 };
  const rect = (x, y, w, h, fill, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
  const poly = (pts, fill, extra = "") => `<polygon points="${pts}" fill="${fill}" ${extra}/>`;
  const line = (x1, y1, x2, y2, stroke, sw = 2, extra = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;

  function defs(u) {
    return `<defs>
      <pattern id="${u}wp" width="56" height="56" patternUnits="userSpaceOnUse">
        <rect width="56" height="56" fill="#C9A85A"/>
        <circle cx="14" cy="14" r="7" fill="none" stroke="#A3803A" stroke-width="3"/><circle cx="42" cy="42" r="7" fill="none" stroke="#A3803A" stroke-width="3"/>
        <circle cx="14" cy="14" r="2.5" fill="#7E5A22"/><circle cx="42" cy="42" r="2.5" fill="#7E5A22"/>
        <path d="M28 0 V56 M0 28 H56" stroke="#BC9A4E" stroke-width="1"/>
      </pattern>
      <pattern id="${u}lino" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="#D9C9A6"/><rect width="40" height="40" fill="#8E6E45"/><rect x="40" y="40" width="40" height="40" fill="#8E6E45"/>
      </pattern>
      <pattern id="${u}ging" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="#E9DCC0"/><rect width="10" height="20" fill="#C77B4A" opacity=".55"/><rect width="20" height="10" fill="#C77B4A" opacity=".55"/>
      </pattern>
      <pattern id="${u}ply" width="240" height="120" patternUnits="userSpaceOnUse">
        <rect width="240" height="120" fill="#C9A576"/>
        <path d="M0 30 C60 24 120 38 240 30 M0 70 C80 64 150 80 240 72 M0 98 C70 94 170 104 240 99" stroke="#B48F5E" stroke-width="2" fill="none"/>
        <path d="M0 0 H240 M0 0 V120" stroke="#9C7A4C" stroke-width="2"/>
      </pattern>
      <pattern id="${u}osb" width="60" height="40" patternUnits="userSpaceOnUse">
        <rect width="60" height="40" fill="#A8865B"/>
        <rect x="6" y="5" width="18" height="6" fill="#B99766" transform="rotate(12 15 8)"/><rect x="32" y="20" width="20" height="5" fill="#8F6F45" transform="rotate(-18 42 22)"/>
        <rect x="10" y="26" width="14" height="5" fill="#C4A372" transform="rotate(-6 17 28)"/><rect x="40" y="4" width="12" height="5" fill="#977650" transform="rotate(30 46 6)"/>
      </pattern>
      <pattern id="${u}tile" width="44" height="88" patternUnits="userSpaceOnUse">
        <rect width="44" height="88" fill="#ECE7DE"/><path d="M0 0 H44 M0 0 V88" stroke="#CFC6B8" stroke-width="2"/>
      </pattern>
      <linearGradient id="${u}win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DCE3E3"/><stop offset=".6" stop-color="#C6D0CC"/><stop offset="1" stop-color="#9FAF9E"/></linearGradient>
      <radialGradient id="${u}light" cx=".6" cy=".35" r=".75"><stop offset="0" stop-color="#FFF6E4" stop-opacity=".38"/><stop offset="1" stop-color="#1C1A18" stop-opacity="0"/></radialGradient>
      <linearGradient id="${u}vig" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1C1A18" stop-opacity=".28"/><stop offset=".3" stop-color="#1C1A18" stop-opacity="0"/>
        <stop offset=".8" stop-color="#1C1A18" stop-opacity="0"/><stop offset="1" stop-color="#1C1A18" stop-opacity=".32"/>
      </linearGradient>
      <filter id="${u}grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7"/><feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer><feFuncA type="table" tableValues="0 .09"/></feComponentTransfer><feComposite in2="SourceGraphic" operator="in"/>
      </filter>
      <clipPath id="${u}back"><rect x="${W.x0}" y="${W.y0}" width="${W.x1 - W.x0}" height="${W.y1 - W.y0}"/></clipPath>
    </defs>`;
  }

  function shell(u, s) {
    const ceil = ["#DCD5CA", "#B9B1A5", "#9C948A", "#E6E1D8", "#F1EDE6"][s];
    const left = ["#B9984E", "#B8AF9E", "#8D6B43", "#D7D2C9", "#E9E4DB"][s];
    const right = ["#AD8C46", "#AAA190", "#83633D", "#CDC7BD", "#E2DCD2"][s];
    const floorFill = [`url(#${u}lino)`, `url(#${u}ply)`, `url(#${u}ply)`, `url(#${u}ply)`, "#C9A06A"][s];
    let o = poly(`0,0 1600,0 1600,13 1400,120 200,120 0,13`, ceil);
    o += poly(`0,13 200,120 200,760 0,867`, left) + poly(`1600,13 1400,120 1400,760 1600,867`, right);
    o += poly(`0,867 200,760 1400,760 1600,867 1600,1000 0,1000`, floorFill);
    if (s === 4) {
      for (let x = 200; x <= 1400; x += 100) o += line(x, 760, 800 + (x - 800) * 1.75, 1000, "#A97F4C", 2);
      for (const y of [800, 852, 918]) o += line(0, y, 1600, y, "#B98D57", 1, 'opacity=".5"');
    }
    if (s === 3) {
      o += poly(`120,1000 330,790 1240,790 1460,1000`, "#C9BBA2", 'opacity=".85"');
      o += line(560, 790, 470, 1000, "#A8997F", 2) + line(930, 790, 980, 1000, "#A8997F", 2);
      o += `<rect x="600" y="880" width="220" height="10" fill="#7DA0B4" opacity=".7" transform="rotate(-3 700 885)"/>`;
    }
    o += line(200, 120, 200, 760, "#1C1A18", 2, 'opacity=".18"') + line(1400, 120, 1400, 760, "#1C1A18", 2, 'opacity=".18"');
    return o;
  }

  function windowFrame(u, s) {
    const x = 830, y = 230, w = 300, h = 270;
    let o = "";
    if (s === 2) {
      o += rect(x - 30, y - 70, w + 60, 40, "#D8B98A") + rect(x - 30, y - 30, w + 60, 14, "#C9A576");
      o += rect(x - 16, y - 16, 16, h + 32, "#D8B98A") + rect(x + w, y - 16, 16, h + 32, "#D8B98A") + rect(x - 16, y + h, w + 32, 18, "#D8B98A");
    }
    o += rect(x, y, w, h, `url(#${u}win)`);
    o += poly(`${x},${y + 190} ${x + 120},${y + 140} ${x + 240},${y + 190} ${x + 240},${y + h} ${x},${y + h}`, "#8C8A80", 'opacity=".55"');
    o += poly(`${x + 250},${y + h} ${x + 275},${y + 60} ${x + 300},${y + h}`, "#4E6150", 'opacity=".8"');
    const frame = s === 0 ? "#8A6738" : s === 4 ? "#2A2724" : s === 3 ? "#EDEAE4" : "#E8E3DA";
    o += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${frame}" stroke-width="14"/>` + line(x + w / 2, y, x + w / 2, y + h, frame, 10);
    if (s === 0) {
      o += rect(x - 40, y - 30, w + 80, 46, `url(#${u}ging)`);
      o += `<path d="M${x - 30} ${y + 14} q 30 120 -6 ${h - 10} h 60 q -40 -100 -8 ${-(h - 10)} z" fill="url(#${u}ging)"/>`;
      o += `<path d="M${x + w + 30} ${y + 14} q -30 120 6 ${h - 10} h -60 q 40 -100 8 ${-(h - 10)} z" fill="url(#${u}ging)"/>`;
    }
    if (s === 2) {
      o += `<g transform="rotate(-2 ${x + 70} ${y + 90})">
        <rect x="${x + 22}" y="${y + 40}" width="100" height="130" fill="#F4F1EC"/><rect x="${x + 22}" y="${y + 40}" width="100" height="22" fill="#B5512E"/>
        <rect x="${x + 34}" y="${y + 74}" width="76" height="5" fill="#6B645C"/><rect x="${x + 34}" y="${y + 86}" width="60" height="5" fill="#6B645C"/>
        <rect x="${x + 34}" y="${y + 98}" width="70" height="5" fill="#6B645C"/><rect x="${x + 34}" y="${y + 126}" width="44" height="28" fill="none" stroke="#1C1A18" stroke-width="2"/>
        <rect x="${x + 50}" y="${y + 32}" width="40" height="14" fill="#E8DFA8" opacity=".85"/></g>`;
    }
    if (s === 1) o += line(x + 10, y + 10, x + w - 10, y + h - 10, "#3C6FA0", 6, 'opacity=".55"') + line(x + w - 10, y + 10, x + 10, y + h - 10, "#3C6FA0", 6, 'opacity=".55"');
    return o;
  }

  function backWall(u, s) {
    const bw = W.x1 - W.x0, bh = W.y1 - W.y0;
    let o = `<g clip-path="url(#${u}back)">`;
    if (s === 0) o += rect(W.x0, W.y0, bw, bh, `url(#${u}wp)`);
    else if (s === 1) {
      o += rect(W.x0, W.y0, bw, bh, "#CFC6B6") + rect(210, 200, 560, 230, "#DCD4C5") + rect(1160, 200, 230, 230, "#DCD4C5") + rect(200, 548, 1200, 212, "#BDB3A2");
      o += `<path d="M200 120 h380 l-30 60 l40 40 l-70 30 l20 70 l-90 -10 l-40 80 l-210 10 z" fill="url(#${u}wp)"/>`;
      o += `<path d="M1400 120 h-180 l20 40 l-50 30 l60 50 l-30 40 l60 30 l120 -20 z" fill="url(#${u}wp)"/>`;
      o += `<path d="M640 470 l120 -16 l60 40 l-40 50 l-130 8 z" fill="url(#${u}wp)" opacity=".9"/>`;
      o += rect(1220, 600, 34, 52, "#3A4D63") + `<path d="M1237 652 q 10 60 -20 90" stroke="#E5D24A" stroke-width="5" fill="none"/>` + rect(470, 600, 34, 52, "#3A4D63");
    } else if (s === 2) {
      o += rect(W.x0, W.y0, bw, bh, `url(#${u}osb)`);
      for (let x = 200; x <= 1400; x += 82) { if (x > 812 && x < 1150) continue; o += rect(x, 120, 22, 640, "#DDBE8E") + line(x + 1, 120, x + 1, 760, "#B8986A", 2); }
      o += rect(812, 120, 22, 640, "#DDBE8E") + rect(1134, 120, 22, 640, "#DDBE8E");
      for (const x of [890, 980, 1060]) o += rect(x, 120, 22, 40, "#DDBE8E") + rect(x, 518, 22, 242, "#DDBE8E");
      o += rect(200, 120, 1200, 22, "#D3B282") + rect(200, 738, 1200, 22, "#D3B282");
      for (let x = 222; x < 790; x += 82) o += rect(x, 430, 60, 18, "#CFAE7F");
      o += `<path d="M200 640 H 790 M 1156 640 H 1400" stroke="#E8D44D" stroke-width="7" fill="none"/><path d="M200 300 H 790" stroke="#F2EFE8" stroke-width="7" fill="none"/><path d="M 1160 300 H 1400" stroke="#E8D44D" stroke-width="7" fill="none"/>`;
      for (const x of [300, 520, 700, 1230, 1330]) o += rect(x, 616, 34, 50, "#2F6FB0");
      o += rect(420, 280, 34, 50, "#2F6FB0") + rect(1270, 280, 34, 50, "#2F6FB0");
      o += `<path d="M437 330 q 0 40 -40 70 M1287 330 q 0 50 30 90" stroke="#E8D44D" stroke-width="5" fill="none"/>`;
      o += `<path d="M950 760 V 600 q 0 -14 14 -14 h 26" stroke="#C0392B" stroke-width="9" fill="none"/><path d="M1010 760 V 610 q 0 -14 -14 -14 h -10" stroke="#2C6FB7" stroke-width="9" fill="none"/>`;
      o += rect(1060, 470, 26, 290, "#262422") + rect(1048, 600, 50, 20, "#262422");
      o += rect(560, 120, 120, 140, "#A8AEB2") + line(560, 165, 680, 165, "#8A9094", 3) + line(560, 215, 680, 215, "#8A9094", 3);
      o += `<g transform="rotate(4 375 470)"><rect x="350" y="450" width="54" height="80" fill="#B5512E"/><circle cx="377" cy="462" r="5" fill="#F4F1EC"/><rect x="358" y="480" width="38" height="4" fill="#F4F1EC"/><rect x="358" y="492" width="30" height="4" fill="#F4F1EC"/></g>`;
      // Old knob-and-tube left in the ceiling bay.
      o += `<path d="M260 150 H 760" stroke="#2A2724" stroke-width="3" stroke-dasharray="2 22" fill="none"/>`;
      for (let x = 270; x < 760; x += 82) o += `<rect x="${x}" y="142" width="10" height="16" fill="#EDE6D6"/>`;
    } else if (s === 3) {
      o += rect(W.x0, W.y0, bw, bh, "#D9D6D0") + rect(200, 120, 560, 640, "#ECEAE5");
      for (const x of [440, 680, 1160]) o += rect(x - 12, 120, 24, 640, "#F3F1EC") + line(x, 120, x, 760, "#E2DED6", 2);
      o += rect(200, 428, 1200, 22, "#F3F1EC");
      for (let x = 260; x < 1400; x += 120) for (let y = 160; y < 760; y += 96) if (!(x > 810 && x < 1150 && y > 210 && y < 520)) o += `<circle cx="${x}" cy="${y}" r="5" fill="#F7F5F1"/>`;
      for (const x of [300, 520, 700, 1230, 1330]) o += rect(x, 616, 34, 50, "#3B3632");
      o += rect(420, 280, 34, 50, "#3B3632") + rect(1270, 280, 34, 50, "#3B3632");
      o += rect(946, 640, 10, 26, "#B9B6B0") + rect(1006, 640, 10, 26, "#B9B6B0") + `<circle cx="1072" cy="660" r="14" fill="#262422"/>` + rect(560, 120, 120, 30, "#A8AEB2");
    } else {
      o += rect(W.x0, W.y0, bw, bh, "#EFEBE3") + rect(200, 410, 1200, 140, `url(#${u}tile)`) + rect(812, 230, 336, 320, "#EFEBE3") + rect(830, 410, 300, 140, `url(#${u}tile)`);
    }
    return o + `</g>`;
  }

  function cabinetsBefore() {
    const oak = "#6E4A27", oakLt = "#82592F", knob = "#C9A24B";
    let o = "";
    for (const [x, w] of [[210, 140], [350, 140], [490, 140], [630, 140], [1160, 120], [1280, 112]]) {
      o += rect(x, 200, w - 6, 210, oak) + rect(x + 14, 214, w - 34, 182, oakLt) + rect(x + 24, 224, w - 54, 162, oak, 'opacity=".55"') + `<circle cx="${x + w - 26}" cy="390" r="5" fill="${knob}"/>`;
    }
    o += `<rect x="210" y="420" width="160" height="340" rx="16" fill="#8A8F45"/>` + rect(222, 560, 136, 4, "#6E7234") + rect(346, 450, 8, 90, "#C8C9B5") + rect(346, 590, 8, 120, "#C8C9B5");
    o += rect(370, 548, 1030, 16, "#D27A3F") + rect(370, 564, 1030, 8, "#A85A2C");
    for (let x = 380; x < 1390; x += 112) { if (x > 590 && x < 760) continue; o += rect(x, 576, 104, 168, oak) + rect(x + 12, 588, 80, 144, oakLt) + `<circle cx="${x + 84}" cy="604" r="5" fill="${knob}"/>`; }
    o += rect(600, 500, 150, 48, "#C9A24B") + rect(600, 548, 150, 196, "#D9B65A") + rect(620, 600, 110, 110, "#3A332B");
    for (let i = 0; i < 4; i++) o += `<circle cx="${620 + i * 36}" cy="524" r="8" fill="#3A332B"/>`;
    o += rect(370, 744, 1030, 16, "#2C2118");
    o += rect(900, 540, 160, 12, "#B9BDBE") + `<path d="M980 540 v-34 h22" stroke="#B9BDBE" stroke-width="7" fill="none"/>`;
    o += rect(1080, 500, 70, 48, "#D8D9D2", 'opacity=".9"') + line(1090, 500, 1090, 548, "#9AA0A0", 2) + line(1110, 500, 1110, 548, "#9AA0A0", 2) + line(1130, 500, 1130, 548, "#9AA0A0", 2);
    o += `<path d="M450 548 v-34 q 0 -12 12 -12 h 36 q 12 0 12 12 v34z" fill="#C0392B"/>` + rect(470, 494, 20, 8, "#2C2118");
    o += `<polygon points="560,40 1040,40 1000,78 600,78" fill="#F1EDDF"/><polygon points="600,78 1000,78 1000,86 600,86" fill="#B9B29F"/>`;
    return o;
  }

  function demoProps() {
    let o = `<polygon points="40,40 175,110 175,760 40,840" fill="#FFFFFF" opacity=".5"/>`;
    for (let i = 0; i < 7; i++) { const x = 52 + i * 18; o += `<path d="M${x} ${46 + i * 9} C ${x + 12} 300, ${x - 10} 520, ${x + 6} ${830 - i * 10}" stroke="#FFFFFF" stroke-width="3" fill="none" opacity=".75"/>`; }
    o += line(40, 40, 175, 110, "#2F6FB0", 8, 'opacity=".8"');
    o += `<path d="M420 860 l40 -50 l30 20 l40 -40 l60 30 l30 -20 l50 60 z" fill="#8B7B66"/><path d="M450 860 l90 -30 l-60 -20 z" fill="#C9A85A"/>`;
    o += rect(500, 800, 120, 10, "#6E4A27", 'transform="rotate(-14 560 805)"') + rect(470, 830, 140, 9, "#82592F", 'transform="rotate(8 540 835)"');
    o += `<path d="M1040 870 q -40 -10 -36 -80 q 10 -46 50 -50 l 10 -12 l 10 12 q 46 6 50 56 q 4 70 -40 74 z" fill="#232120"/><path d="M1060 790 q 20 20 10 60" stroke="#3B3836" stroke-width="3" fill="none"/>`;
    o += `<path d="M1200 880 l -10 -110 h 90 l -10 110 z" fill="#D06A2C"/>` + rect(1186, 760, 98, 14, "#B5512E") + `<path d="M1192 772 q 43 -50 86 0" stroke="#1C1A18" stroke-width="3" fill="none"/>`;
    o += line(1360, 560, 1330, 820, "#2A2A2A", 6) + line(1360, 560, 1400, 820, "#2A2A2A", 6) + line(1360, 560, 1365, 830, "#2A2A2A", 6);
    o += rect(1320, 500, 84, 60, "#E3B53A") + rect(1328, 508, 68, 44, "#FFF4CF") + `<polygon points="1320,500 1100,380 1100,760 1320,560" fill="#FFF2C6" opacity=".12"/>`;
    o += line(800, 0, 800, 74, "#2A2A2A", 3) + `<circle cx="800" cy="86" r="14" fill="#FFF3CC"/>`;
    return o;
  }

  function servicesProps() {
    let o = line(320, 960, 380, 600, "#C79A3A", 10) + line(460, 960, 400, 600, "#C79A3A", 10);
    for (const y of [680, 760, 840, 920]) { const t = (y - 600) / 360; o += line(380 - 60 * t + 4, y, 400 + 60 * t - 4, y, "#B5872E", 8); }
    o += rect(372, 586, 40, 20, "#B5872E");
    o += `<circle cx="1180" cy="900" r="46" fill="#2E2A26"/><circle cx="1180" cy="900" r="30" fill="#E8D44D"/><circle cx="1180" cy="900" r="10" fill="#2E2A26"/>`;
    return o + line(800, 0, 800, 74, "#2A2A2A", 3) + `<circle cx="800" cy="86" r="14" fill="#FFF3CC"/>`;
  }

  function closeInProps() {
    let o = `<polygon points="1430,190 1520,150 1540,900 1450,860" fill="#E3E0DA"/><polygon points="1455,200 1545,160 1560,905 1470,870" fill="#D6D3CC"/>`;
    o += `<path d="M560 900 l -8 -80 h 76 l -8 80 z" fill="#F1EEE8"/>` + rect(548, 812, 84, 12, "#2F6FB0") + rect(650, 880, 90, 14, "#9AA0A4", 'transform="rotate(-6 695 887)"');
    o += line(980, 960, 1040, 520, "#9AA4AC", 9) + line(1120, 960, 1060, 520, "#9AA4AC", 9);
    for (const y of [640, 740, 840]) { const t = (y - 520) / 440; o += line(1040 - 60 * t + 4, y, 1060 + 60 * t - 4, y, "#7F8A92", 7); }
    return o + rect(1030, 506, 40, 18, "#B5512E") + line(800, 0, 800, 60, "#2A2A2A", 3) + rect(740, 60, 120, 16, "#F7F4E8");
  }

  function cabinetsAfter() {
    const body = "#4E5B53", bodyLt = "#59675E", oak = "#B98A52", quartz = "#F3F0EA";
    let o = rect(210, 150, 180, 610, body) + line(300, 150, 300, 760, "#3E4A43", 2) + rect(282, 380, 6, 120, "#C9C3B6") + rect(312, 380, 6, 120, "#C9C3B6");
    o += rect(400, 250, 400, 14, oak) + rect(400, 340, 400, 14, oak);
    o += rect(430, 214, 34, 36, "#E8E2D6") + rect(474, 222, 26, 28, "#BFB6A6") + rect(520, 300, 70, 40, "#D7CFC1") + rect(620, 310, 40, 30, "#E8E2D6");
    o += rect(1160, 200, 230, 210, oak) + rect(1160, 404, 230, 6, "#9C7240") + line(1275, 200, 1275, 410, "#9C7240", 3) + rect(1252, 380, 18, 5, "#2A2724") + rect(1280, 380, 18, 5, "#2A2724");
    o += `<polygon points="620,120 700,120 700,300 760,380 560,380 620,300" fill="#E6E2DA"/>` + rect(560, 380, 200, 12, "#D3CEC4");
    o += rect(390, 540, 1010, 18, quartz) + rect(390, 558, 1010, 4, "#D8D3CA");
    for (let x = 400; x < 1390; x += 124) {
      o += rect(x, 568, 118, 176, body) + rect(x + 2, 570, 114, 172, bodyLt, 'opacity=".25"') + rect(x + 30, 584, 58, 5, "#C9C3B6");
      if (x < 790) o += line(x, 640, x + 118, 640, "#3E4A43", 2);
    }
    o += rect(580, 568, 160, 176, "#2A2724") + rect(596, 610, 128, 96, "#1C1A18") + rect(596, 582, 128, 12, "#9B9690");
    for (let i = 0; i < 5; i++) o += `<circle cx="${602 + i * 28}" cy="560" r="5" fill="#1C1A18"/>`;
    o += rect(390, 744, 1010, 16, "#2E3631");
    o += rect(900, 536, 170, 8, "#C2C0BB") + `<path d="M990 536 v-60 q 0 -18 18 -18 h 18 v 14" stroke="#2A2724" stroke-width="7" fill="none"/>`;
    for (const x of [960, 1240]) o += line(x, 0, x, 260, "#2A2724", 3) + `<path d="M${x - 36} 300 a36 36 0 0 1 72 0 z" fill="#2A2724"/><circle cx="${x}" cy="302" r="10" fill="#FFF0C8"/>`;
    o += `<polygon points="924,300 996,300 1050,560 870,560" fill="#FFF0C8" opacity=".08"/><polygon points="1204,300 1276,300 1330,560 1150,560" fill="#FFF0C8" opacity=".08"/>`;
    o += rect(1180, 760, 90, 14, "#2A2724") + line(1190, 774, 1172, 940, "#2A2724", 6) + line(1260, 774, 1278, 940, "#2A2724", 6) + line(1182, 870, 1268, 870, "#2A2724", 4);
    return o;
  }

  const STAGES = [
    { name: "Before", wk: "00", alt: "Original 1968 kitchen: dark oak cabinets, avocado fridge, harvest-gold range, patterned wallpaper and checkered linoleum.", cap: "The original kitchen. Lived in, honestly." },
    { name: "Demolition", wk: "01", alt: "Kitchen at demolition: cabinets removed, plywood subfloor exposed, wallpaper fragments, plastic sheeting over the doorway, debris on the floor.", cap: "Cabinets out, subfloor sound, sheeting up." },
    { name: "Services", wk: "03", alt: "Kitchen at services rough-in: open stud walls, new electrical cable and boxes, red and blue PEX supply, black ABS drain, permit card taped in the window.", cap: "Walls open. Knob-and-tube found in the ceiling." },
    { name: "Close-in", wk: "06", alt: "Kitchen at close-in: drywall hung, seams taped and mudded, left half primed, floor protected, ladder in place.", cap: "Drywall up, taped, primed. No finishes." },
    { name: "Complete", wk: "13", alt: "Completed kitchen from the same camera position: sage-green flat-panel cabinets, white quartz counter, tile backsplash, oak floor, two pendant lights.", cap: "Same tripod mark. Week 13 of a planned 11." },
  ];
  window.KITCHEN_STAGES = STAGES;

  window.kitchenSVG = function (stage, opts = {}) {
    const s = Math.max(0, Math.min(4, stage | 0));
    const u = (opts.uid || "k") + s + "_";
    let b = defs(u) + shell(u, s) + backWall(u, s) + windowFrame(u, s);
    b += [cabinetsBefore, demoProps, servicesProps, closeInProps, cabinetsAfter][s]();
    b += rect(0, 0, 1600, 1000, `url(#${u}light)`) + rect(0, 0, 1600, 1000, `url(#${u}vig)`);
    b += rect(0, 0, 1600, 1000, "#C89A5E", 'opacity=".06" style="mix-blend-mode:soft-light"') + rect(0, 0, 1600, 1000, "#888", `filter="url(#${u}grain)"`);
    const alt = (opts.alt || STAGES[s].alt).replace(/"/g, "&quot;");
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="${opts.fit || "xMidYMid slice"}" role="img" aria-label="${alt}">${b}</svg>`;
  };

  window.paintKitchens = function (root = document) {
    root.querySelectorAll("[data-kitchen]").forEach((el, i) => {
      if (el.dataset.painted) return;
      el.innerHTML = window.kitchenSVG(+el.dataset.kitchen, { uid: "kx" + i + "_", fit: el.dataset.fit, alt: el.dataset.alt });
      el.dataset.painted = "1";
    });
  };
})();
