/* ════════════════════════════════════════════
   portal.js (ENHANCED)
   Covers:
     1. Star field
     2. Portal gate (entry / correct answer / heart)
     3. Music fade-in
     4. Love Journey progress bar
     5. ✨ ENHANCED Secret Memory easter egg ✨
════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   1. STAR FIELD
───────────────────────────────────────── */
(function buildStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top  = Math.random() * 100 + '%';
    s.style.setProperty('--dur',    (Math.random() * 4 + 2) + 's');
    s.style.setProperty('--delay',  (Math.random() * 6)     + 's');
    s.style.setProperty('--max-op', (Math.random() * 0.6 + 0.2).toFixed(2));
    container.appendChild(s);
  }
})();


/* ─────────────────────────────────────────
   2. PORTAL GATE
───────────────────────────────────────── */

// ── Accepted answers (case-insensitive, includes common variations) ──
const CORRECT_ANSWERS = [
  'purple', 'violet', 'lavender', 'lilac', 'mauve', 'indigo',
  'purp',   'purpur', 'purple💜',
  'i love purple', 'purple is my favourite', 'my favourite is purple',
  'purple colour', 'purple color'
];

function isCorrect(val) {
  const v = val.trim().toLowerCase();
  return v.includes('purple') || v.includes('violet') || v.includes('lavender') ||
         CORRECT_ANSWERS.includes(v);
}

// DOM refs
const colorInput  = document.getElementById('colorInput');
const enterBtn    = document.getElementById('enterBtn');
const hintText    = document.getElementById('hintText');
const portalInner = document.getElementById('portalInner');
const heartReveal = document.getElementById('heartReveal');
const heartGlyph  = document.getElementById('heartGlyph');
const portal      = document.getElementById('portal');
const siteContent = document.getElementById('siteContent');

let attempts = 0;

const HINTS = [
  "That doesn't feel right… try again 💜",
  'Hmm… think of the colour of royalty 👑',
  'It\'s the colour of lavender fields 🌸',
  'It\'s very close to violet ✨',
  'One more try — it rhymes with "turtle" 💜'
];

function wrongAnswer() {
  attempts++;
  colorInput.classList.add('wrong');
  hintText.textContent = HINTS[Math.min(attempts - 1, HINTS.length - 1)];
  hintText.classList.add('show');
  setTimeout(() => colorInput.classList.remove('wrong'), 600);
  colorInput.value = '';
  colorInput.focus();
}

function correctAnswer() {
  portalInner.style.transition  = 'opacity 0.7s ease';
  portalInner.style.opacity     = '0';
  portalInner.style.pointerEvents = 'none';

  setTimeout(() => {
    portalInner.style.display = 'none';
    heartReveal.classList.add('show');
    spawnPetals();
  }, 700);
}

// Burst of petals on correct entry
function spawnPetals() {
  const emojis = ['💜','💕','✨','🌸','💖','⭐','💫'];
  const container = document.getElementById('portal');  // append to portal, not heartReveal
  const revealRect = heartReveal.getBoundingClientRect();
  
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'petal-burst';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = (30 + Math.random() * 40) + '%';
    p.style.top  = (20 + Math.random() * 60) + '%';
    p.style.setProperty('--tx',  (Math.random() * 220 - 110) + 'px');
    p.style.setProperty('--ty',  -(Math.random() * 200 + 60) + 'px');
    p.style.setProperty('--rot', (Math.random() * 360)       + 'deg');
    p.style.setProperty('--dur', (Math.random() * 1.5 + 1.2) + 's');
    p.style.setProperty('--del', (Math.random() * 0.8)       + 's');
    p.style.zIndex = '2';          // below heart-glyph z-index
    container.appendChild(p);
  }
}

// Heart click → open site
heartGlyph.addEventListener('click', openSite);
heartGlyph.addEventListener('touchend', function(e) {
  e.preventDefault();
  openSite();
});

function openSite() {
  portal.classList.add('fade-out');

  setTimeout(() => {
    siteContent.classList.add('visible');
    portal.style.display = 'none';
    tryPlayMusic();
    window.scrollTo({ top: 0 });
    showJourneyAndSpark();
  }, 1800);
}

// Input events
function handleSubmit() {
  const val = colorInput.value;
  if (!val.trim()) { colorInput.focus(); return; }
  isCorrect(val) ? correctAnswer() : wrongAnswer();
}

enterBtn.addEventListener('click', handleSubmit);
colorInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') handleSubmit();
});

// Auto-focus input on load
window.addEventListener('load', () => {
  setTimeout(() => colorInput.focus(), 1500);
  initJourneyBar();
  initSecretSpark();
});


/* ─────────────────────────────────────────
   3. MUSIC — soft fade-in
      Replace the <source> in index.html with
      your actual audio file for this to work.
───────────────────────────────────────── */
function tryPlayMusic() {
  const audio = document.getElementById('backgroundMusic');
  if (!audio) return;

  audio.volume = 0;
  const play = audio.play();

  if (play !== undefined) {
    play.then(() => {
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol = Math.min(vol + 0.02, 0.45);
        audio.volume = vol;
        if (vol >= 0.45) clearInterval(fadeIn);
      }, 120);
    }).catch(() => {
      // Autoplay blocked by browser — manual music toggle still works
    });
  }
}


/* ─────────────────────────────────────────
   4. LOVE JOURNEY PROGRESS BAR
───────────────────────────────────────── */
const CHAPTERS = [
  { id: 'home',         name: 'Meeting',         tip: 'Where it all began…' },
  { id: 'story',        name: 'Our Story',        tip: 'CU → Embu → The Falls' },
  { id: 'memories',     name: 'Memories',         tip: 'Every moment we shared' },
  { id: 'appreciation', name: "You're Special",   tip: 'The reasons I love you' },
  { id: 'voice',        name: 'Voice',            tip: 'Recorded just for you' },
  { id: 'final',        name: 'Forever',          tip: 'Always & forever, Favour' }
];

function buildJourneyBar() {
  const container = document.getElementById('journeyChapters');
  if (!container) return;

  CHAPTERS.forEach((ch, i) => {
    const div = document.createElement('div');
    div.className = 'journey-chapter';
    div.dataset.index = i;
    div.innerHTML = `
      <div class="chapter-dot">
        <div class="chapter-dot-inner"></div>
      </div>
      <span class="chapter-name">${ch.name}</span>
      <div class="chapter-tooltip">${ch.tip}</div>
    `;
    div.addEventListener('click', () => {
      const target = document.getElementById(ch.id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    container.appendChild(div);
  });
}

function updateJourney() {
  const fill  = document.getElementById('journeyFill');
  const chEls = document.querySelectorAll('.journey-chapter');
  if (!fill || !chEls.length) return;

  const vh = window.innerHeight;
  let activeIndex = 0;

  CHAPTERS.forEach((ch, i) => {
    const section = document.getElementById(ch.id);
    if (section && section.getBoundingClientRect().top < vh * 0.6) {
      activeIndex = i;
    }
  });

  chEls.forEach((el, i) => {
    el.classList.remove('active', 'passed');
    if (i < activeIndex)  el.classList.add('passed');
    if (i === activeIndex) el.classList.add('active');
  });

  const pct = (activeIndex / (CHAPTERS.length - 1)) * 100;
  fill.style.width = pct + '%';
}

function initJourneyBar() {
  buildJourneyBar();
}

window.addEventListener('scroll', updateJourney, { passive: true });


/* ─────────────────────────────────────────
   5. ✨ ENHANCED SECRET MEMORY EASTER EGG ✨
───────────────────────────────────────── */
const SECRET_MEMORIES = [
  {
    emoji: '🌊',
    body: `I've never told you this, but when you slipped and landed in the mud and just <strong>laughed</strong> — completely unbothered, completely yourself — that was the exact second I stopped wondering and just <em>knew.</em> Not hoped. Not wished. <strong>Knew.</strong> You were it for me.`
  },
  {
    emoji: '📱',
    body: `Every morning before I got out of bed. Every break between lectures. Every quiet moment — I was always checking the group, just in case you'd posted something. <em>Not because I needed to. Because you made ordinary moments feel like waiting for something wonderful.</em>`
  },
  {
    emoji: '🌅',
    body: `Christian Union. First year. I don't even remember what was being said at the front. I just remember noticing you and thinking, in the quietest, most certain way: <em>"She's different."</em> I didn't know your name yet. <strong>But somehow I already knew you mattered.</strong>`
  },
  {
    emoji: '🚶',
    body: `Walking past Embu, you moved through the world like you belonged in it completely. While everyone else was rushing, you were <strong>present.</strong> That afternoon I realised I didn't just like being around you — I wanted to be a person <em>worthy</em> of walking beside you.`
  },
  {
    emoji: '💌',
    body: `I wrote you something once — in my notes app at 11pm when I couldn't sleep. Never sent it. It just said: <em>"I don't know what we are yet. But I know I don't want to find out what life looks like without you in it."</em> <strong>That was the truest thing I'd ever written.</strong>`
  },
  {
    emoji: '☕',
    body: `That time we talked for hours and I completely lost track of time. When I finally looked at my phone, three hours had passed like three minutes. That's when I realized — <strong>being with you makes time irrelevant.</strong> <em>I could talk to you forever and it would never be enough.</em>`
  },
  {
    emoji: '🌙',
    body: `I remember lying awake one night, just thinking about you. And I realized something: <em>You're not just someone I love. You're someone who makes me believe in love</em> — the real kind, the deep kind, <strong>the kind that changes everything.</strong>`
  },
  {
    emoji: '✨',
    body: `There was this moment — you probably don't even remember it — when you smiled at me and the whole world just… <strong>stopped.</strong> Everything became quiet. Everything became simple. <em>In that moment, I knew what "home" meant. It meant you.</em>`
  }
];

let secretsFound  = 0;
const secretsSeen = new Set();
let sparkActive   = false;
let sparkMoveInterval = null;

function getNextSecret() {
  const unseen = SECRET_MEMORIES.filter((_, i) => !secretsSeen.has(i));
  if (!unseen.length) {
    // All seen — clear and start over
    secretsSeen.clear();
    return SECRET_MEMORIES[Math.floor(Math.random() * SECRET_MEMORIES.length)];
  }

  const pool = SECRET_MEMORIES.filter((_, i) => !secretsSeen.has(i));
  const selected = pool[Math.floor(Math.random() * pool.length)];
  const idx = SECRET_MEMORIES.indexOf(selected);
  secretsSeen.add(idx);
  return selected;
}

function positionSpark() {
  const spark = document.getElementById('secretSpark');
  if (!spark) return;
  
  const margin = 100;
  const maxX = window.innerWidth - margin * 2;
  const maxY = window.innerHeight - margin * 2 - 120; // Account for journey bar
  
  spark.style.left = (margin + Math.random() * maxX) + 'px';
  spark.style.top = (margin + Math.random() * maxY) + 'px';
}

function createSparkParticles(x, y) {
  // Create small particle burst when spark is found
  const particles = ['✨', '💫', '⭐', '🌟'];
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = '14px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(particle);
    
    // Animate outward
    setTimeout(() => {
      const angle = (Math.PI * 2 / 8) * i;
      const distance = 80 + Math.random() * 40;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      particle.style.transform = `translate(${tx}px, ${ty}px) scale(1.5)`;
      particle.style.opacity = '0';
    }, 50);
    
    // Remove
    setTimeout(() => particle.remove(), 1100);
  }
}

function initSecretSpark() {
  const spark    = document.getElementById('secretSpark');
  const overlay  = document.getElementById('secretOverlay');
  const closeBtn = document.getElementById('secretClose');
  if (!spark) return;

  spark.style.setProperty('--spark-dur', (10 + Math.random() * 7) + 's');
  spark.style.setProperty('--spark-del', (Math.random() * 3)       + 's');
  positionSpark();

  // Reposition every 15s when not active (more frequent for better discovery)
  sparkMoveInterval = setInterval(() => { 
    if (!sparkActive) {
      positionSpark();
      // Add subtle notification effect
      spark.style.transform = 'scale(1.3)';
      setTimeout(() => { spark.style.transform = 'scale(1)'; }, 300);
    }
  }, 15000);

  // Click → show secret
  spark.addEventListener('click', function(e) {
    e.stopPropagation();
    
    // Ripple burst at click point
    const ripple = document.createElement('div');
    ripple.className = 'spark-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top  = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
    
    // Particle burst
    createSparkParticles(e.clientX, e.clientY);

    const secret = getNextSecret();
    secretsFound++;
    document.getElementById('secretEmoji').textContent   = secret.emoji;
    document.getElementById('secretBody').innerHTML      = secret.body;
    document.getElementById('secretCounter').textContent =
      `${secretsFound} of ${SECRET_MEMORIES.length} hidden memories discovered`;

    overlay.classList.add('open');
    sparkActive = true;
    
    // Hide spark while overlay is open
    spark.style.opacity = '0';
    spark.style.pointerEvents = 'none';
  });

  // Close handlers
  closeBtn.addEventListener('click', closeSecret);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSecret(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSecret(); });

  function closeSecret() {
    overlay.classList.remove('open');
    sparkActive = false;
    
    // Reposition and show spark again after a moment
    setTimeout(() => {
      positionSpark();
      spark.style.opacity = '1';
      spark.style.pointerEvents = 'auto';
    }, 1500);
  }
}

// Called from openSite()
function showJourneyAndSpark() {
  const bar   = document.getElementById('journeyBar');
  const spark = document.getElementById('secretSpark');

  // Journey bar: 1s delay after site fades in
  setTimeout(() => {
    if (bar) { bar.classList.add('visible'); updateJourney(); }
  }, 1000);

  // Spark: 12s delay — gives her time to be absorbed in the site
  // Then show with subtle entrance animation
  setTimeout(() => {
    if (spark) {
      spark.style.display = 'block';
      spark.style.opacity = '0';
      spark.style.transform = 'scale(0.5)';
      
      setTimeout(() => {
        spark.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        spark.style.opacity = '1';
        spark.style.transform = 'scale(1)';
      }, 100);
    }
  }, 12000);
}