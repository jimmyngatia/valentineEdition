/* ════════════════════════════════════════════
   script.js (FINAL PERFECTED VERSION)
   NOW WITH:
   - Letter writing scene with live typing
   - Heartbeat audio moment
   - Replay memory button
   - Improved bloom prompt
   - Fixed voice section readability
════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   1. PARTICLE BACKGROUND
───────────────────────────────────────── */
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
function initializeParticles() {
    const particleBg = document.querySelector('.particle-bg');
    if (!particleBg) return;
  
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left            = Math.random() * 100 + '%';
      particle.style.top             = Math.random() * 100 + '%';
      particle.style.animationDelay    = (Math.random() * 6)       + 's';
      particle.style.animationDuration = (Math.random() * 3 + 4)   + 's';
      particleBg.appendChild(particle);
    }
  }
  
  
  /* ─────────────────────────────────────────
     2. FLOATING HEARTS
  ───────────────────────────────────────── */
  function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts-container');
    if (!container) return;
  
    const HEART_EMOJIS = ['💜','💕','💖','💗','💝','✨'];
  
    const HEART_MESSAGES = [
      'You make my heart skip a beat',
      'Forever is not long enough with you',
      'My love for you grows every single day',
      "You're my greatest blessing",
      'Together is my favourite place to be',
      "You're my greatest love story",
      'You complete me in every way',
      'My heart chose you, completely',
      'Every moment with you is precious',
      "You're my favourite person",
      'I love you more than words can say',
      'You make life more beautiful'
    ];
  
    function spawnHeart() {
      const heart = document.createElement('div');
      heart.className   = 'floating-heart';
      heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
      heart.style.left  = Math.random() * window.innerWidth + 'px';
      heart.style.top   = window.innerHeight + 'px';
  
      const dur = Math.random() * 4 + 6;
      heart.style.animationDuration = dur + 's';
  
      const tooltip = document.createElement('div');
      tooltip.className   = 'heart-tooltip';
      tooltip.textContent = HEART_MESSAGES[Math.floor(Math.random() * HEART_MESSAGES.length)];
      heart.appendChild(tooltip);
  
      heart.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        setTimeout(() => this.classList.remove('active'), 3000);
      });
  
      container.appendChild(heart);
      setTimeout(() => heart.remove(), dur * 1000);
    }
  
    for (let i = 0; i < 3; i++) setTimeout(spawnHeart, i * 600);
    setInterval(spawnHeart, 2500);
  }
  
  
  /* ─────────────────────────────────────────
     3. CINEMATIC MEMORY MUSEUM
  ───────────────────────────────────────── */

  // Each memory has:
  //   tag       — short label shown in cards & modal
  //   title     — italic heading in modal
  //   poetic    — one italicised emotional line
  //   text      — full paragraph story
  //   image     — main card bg  (path to your photo, e.g. 'img/voice.jpg')
  //   images[]  — thumbnail strip (can repeat or add more shots)
  //
  // 📸 TO ADD PHOTOS: replace the 'image' and 'images' paths with your real files.
  //    The cards look great even without photos — a rich gradient placeholder shows.

  const CINEMATIC_MEMORIES = {
    voice: {
      tag:    '<i class="fas fa-music"></i> Singing',
      title:  'Your Voice',
      poetic: '"When you sing, heaven stops to listen."',
      text:   "That melodic voice when you sing — the gentleness of it, the way it carries so much soul. It's like every note you release is a prayer. When you sing, the world genuinely becomes more beautiful. I've caught myself holding my breath just to hear you better, terrified of missing even a second. Your voice carries emotion that no words could ever replicate. It's a gift, Favour — and I get to be the one who hears it up close.",
      image:  'img/sing.jpg',
      images: ['img/sing.jpg', 'img/worshipper.jpg', 'img/voice3.jpg']
    },
    laughter: {
      tag:    '<i class="fas fa-face-smile"></i> Joy',
      title:  'Your Laughter',
      poetic: '"The laugh I fell in love with — before I even knew I was falling."',
      text:   "The way your whole face lights up when you genuinely laugh — eyes squinting just a little, head tilting back — it's the most beautiful thing I've ever been lucky enough to witness. Your laughter is honest and contagious. It doesn't perform, it just is. Every time I hear it, I fall in love with you all over again. It is its own kind of medicine. It is my favourite sound in the world.",
      image:  'img/laughter.jpeg',
      images: ['img/laughter.jpeg', 'img/walking.jpeg', 'img/laughter3.jpg']
    },
    mind: {
      tag:    '<i class="fas fa-pen-nib"></i> Cook',
      title:  'Your Cooking skills',
      poetic: '"She cooks irresistable food every other day. One I\'ve never tasted."',
      text:   "Your cooking skills always attracts me closer to you. Creates a space for more talks and reconciliation in case needed. Its a gift i wouldnt love to loose.",
      image:  'img/cook.jpg',
      images: ['img/cook.jpg', 'img/studying.jpeg', 'img/mind3.jpg']
    },
    beauty: {
      tag:    '<i class="fas fa-eye"></i> Beauty',
      title:  'Your Beauty',
      poetic: '"Eyes that hold entire oceans. A face I could study for a lifetime."',
      text:   "Your beauty takes my breath away — but not just in the way people usually mean. Yes, your eyes are extraordinary — expressive in ways that feel almost unfair. Yes, that nose, those cheekbones — they frame a face I could look at for eternity. But beyond the physical, it's the radiance that pours out of you. The kindness that lives in your expression even when you don't notice it. The way you glow when you talk about something you love. That's the beauty that gets me every time.",
      image:  'img/beauty.jpeg',
      images: ['img/beauty.jpeg', 'img/eyes.jpg', 'img/beauty3.jpg']
    },
    support: {
      tag:    '<i class="fas fa-heart"></i> Together',
      title:  'Your Support',
      poetic: '"You believed in me before I remembered how to believe in myself."',
      text:   "How you believe in me. AS A DRUMMER and AS A PROGRAMMER.— your encouragement, your patience, the way you stand by my side through every season. You lift me up when I'm down and celebrate my wins as if they're your own. You believe in my dreams even when I doubt myself. That's the kind of love that changes lives. You have changed mine, Favour. Deeply and permanently. I don't think you always know how much you carry me simply by choosing to stay.",
      image:  'img/drummer.jpg',
      images: ['img/travel.jpg', 'img/drummer.jpg', 'img/support3.jpg']
    },
    faith: {
      tag:    '<i class="fas fa-cross"></i> Faith',
      title:  'Your Faith',
      poetic: '"Her devotion to God makes everything around her feel sacred."',
      text:   "The beautiful way your devotion to God shapes everything you do — it inspires me to be better, kinder, stronger. Your faith isn't performance or noise. It's quiet and real, lived out daily in how you treat people, how you carry your burdens with grace, how you trust in something greater even when circumstances say otherwise. You've made me want to know God the way you do. You've made faith feel like something you live, not just something you say.",
      image:  'img/worshipper.jpg',
      images: ['img/sing.jpg', 'img/training.jpg', 'img/faith3.jpg']
    }
  };

  const MEMORY_KEYS   = Object.keys(CINEMATIC_MEMORIES);
  let   currentMemIdx = 0;

  function openCinematicModal(key) {
    const data  = CINEMATIC_MEMORIES[key];
    if (!data) return;

    currentMemIdx = MEMORY_KEYS.indexOf(key);

    // Populate fields
    document.getElementById('cinematicTag').innerHTML        = data.tag;
    document.getElementById('cinematicStoryTitle').textContent = data.title;
    document.getElementById('cinematicPoetic').textContent   = data.poetic;
    document.getElementById('cinematicStoryText').textContent = data.text;
    document.getElementById('cinematicCounter').textContent  =
      `${currentMemIdx + 1} of ${MEMORY_KEYS.length} memories`;

    // Main photo
    const mainPhoto = document.getElementById('cinematicMainPhoto');
    if (data.image) {
      mainPhoto.style.backgroundImage = `url('${data.image}')`;
    } else {
      mainPhoto.style.backgroundImage = 'none';
    }

    // Photo strip thumbnails
    const strip = document.getElementById('cinematicPhotoStrip');
    strip.innerHTML = '';
    (data.images || [data.image]).forEach((src, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'cinematic-thumb' + (i === 0 ? ' active' : '');
      if (src) thumb.style.backgroundImage = `url('${src}')`;
      thumb.addEventListener('click', () => {
        mainPhoto.style.backgroundImage = `url('${src}')`;
        strip.querySelectorAll('.cinematic-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
      strip.appendChild(thumb);
    });

    document.getElementById('cinematicModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCinematicModal(e) {
    // Only close when clicking the dark backdrop directly
    if (e && e.target !== document.getElementById('cinematicModal')) return;
    _doCloseCinematic();
  }

  function closeCinematicModalBtn() {
    _doCloseCinematic();
  }

  function _doCloseCinematic() {
    document.getElementById('cinematicModal').classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  // Keyboard close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') _doCloseCinematic();
  });

  // Keep old closeModal() alive for any other references
  function closeModal() { _doCloseCinematic(); }

  // Scroll-reveal for museum cards
  function initMuseumReveal() {
    const cards = document.querySelectorAll('.museum-card');
    if (!cards.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach(card => io.observe(card));
  }


  /* ─────────────────────────────────────────
     3b. LOVE GALLERY + MEMORY LIGHTBOX
  ───────────────────────────────────────── */

  // ── Gallery photo data ──
  // 📸 Fill in your captions, stories, dates, locations.
  //    Drop photos into a gallery/ folder: gallery/photo1.jpg … photo12.jpg
  //    voiceNote: 'audio/memory1.mp3'  — path to voice note for that photo
  const GALLERY_DATA = [
    {
      src:      'gallery/photo1.jpg',
      caption:  'Us at the beginning 💜',
      story:    "Every great love story has a beginning. Ours started with a feeling I couldn't explain — just a certainty that you were someone extraordinary.",
      date:     '2022', location: '', voiceNote: null
    },
    {
      src:      'gallery/photo2.jpg',
      caption:  'That smile that gets me every time',
      story:    "You smiled and I forgot everything I was thinking about. That's the effect you have on me, and I hope it never stops.",
      date:     '', location: '', voiceNote: null
    },
    {
      src:      'gallery/photo3.jpg',
      caption:  'You, just being you',
      story:    "Unposed. Unguarded. Just you — and you are the most beautiful thing I've ever seen.",
      date:     '', location: 'Embu', voiceNote: null
    },
    {
      src:      'gallery/photo4.jpg',
      caption:  'My favourite person 🌸',
      story:    "Out of everyone in the world, I am so grateful my favourite person is also my person.",
      date:     '', location: '', voiceNote: null
    },
    {
      src:      'gallery/photo5.jpg',
      caption:  "A day I'll never forget",
      story:    "Some days are made of pure gold. This was one of them. Because you were there.",
      date:     '', location: '', voiceNote: null
    },
    {
      src:      'gallery/photo6.jpg',
      caption:  'The eyes that caught my soul',
      story:    "I looked at you and I didn't look away. Those eyes hold something the rest of the world is still searching for.",
      date:     '', location: '', voiceNote: null
    },
    {
      src:      'gallery/photo7.jpg',
      caption:  'Your light ✨',
      story:    "You don't just walk into a room. You illuminate it. I have watched you do it over and over, and it never gets old.",
      date:     '', location: '', voiceNote: null
    },
    {
      src:      'gallery/photo8.jpg',
      caption:  'Together is my favourite place 💕',
      story:    "Anywhere becomes my favourite place when you're the reason I'm there.",
      date:     '', location: '', voiceNote: null
    },
    {
      src:      'gallery/photo9.jpg',
      caption:  'The laugh I fell in love with',
      story:    "This laugh. I could live inside this laugh. It is the most joyful, authentic, beautiful sound in the world to me.",
      date:     '', location: '', voiceNote: null
    },
    {
      src:      'gallery/photo10.jpg',
      caption:  'Walking into forever with you',
      story:    "I don't know what the future looks like. But I know I want every version of it to have you in it.",
      date:     '', location: '', voiceNote: null
    },
    {
      src:      'gallery/photo11.jpg',
      caption:  'The real you — my favourite you',
      story:    "People show you pieces of themselves over time. You showed me all of you — and every piece made me love you more.",
      date:     '', location: '', voiceNote: null
    },
    {
      src:      'gallery/photo12.jpg',
      caption:  'My forever person 💜',
      story:    "One year and five months of loving you. Two years and four months of knowing you. A lifetime of wanting more.",
      date:     'February 2026', location: 'Our Story', voiceNote: null
    }
  ];

  let lightboxIndex = 0;

  // ── Gallery scroll reveal + tilt + floating hearts ──
  function initGallery() {
    const photos = document.querySelectorAll('.gallery-photo');
    if (!photos.length) return;

    // Apply tilt from data-tilt attribute
    photos.forEach(photo => {
      const tilt = photo.dataset.tilt || '0';
      photo.style.setProperty('--tilt', tilt + 'deg');
    });

    // Scroll reveal with staggered delay
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    photos.forEach(p => io.observe(p));

    // Floating hearts on hover (desktop)
    photos.forEach(photo => {
      photo.addEventListener('mouseenter', () => spawnGalleryHearts(photo));
    });
  }

  function spawnGalleryHearts(photo) {
    const container = photo.querySelector('.gallery-photo-hearts');
    if (!container) return;
    const emojis = ['💜','💕','✨','💖','🌸'];
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        const h = document.createElement('div');
        h.className = 'gallery-heart-float';
        h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        h.style.left = (15 + Math.random() * 65) + '%';
        h.style.bottom = '10%';
        container.appendChild(h);
        setTimeout(() => h.remove(), 1700);
      }, i * 160);
    }
  }

  // ── Lightbox ──
  function buildLightboxStars() {
    const container = document.getElementById('lightboxStars');
    if (!container || container.children.length > 0) return;
    for (let i = 0; i < 80; i++) {
      const s = document.createElement('div');
      s.className = 'lb-star';
      const size = (Math.random() * 2 + 1) + 'px';
      s.style.width = size; s.style.height = size;
      s.style.left = Math.random() * 100 + '%';
      s.style.top  = Math.random() * 100 + '%';
      s.style.setProperty('--dur', (Math.random() * 4 + 2) + 's');
      s.style.setProperty('--del', (Math.random() * 6) + 's');
      s.style.setProperty('--op',  (Math.random() * 0.5 + 0.2).toFixed(2));
      container.appendChild(s);
    }
  }

  function openLightbox(index) {
    lightboxIndex = index;
    buildLightboxStars();
    renderLightbox();
    document.getElementById('lightboxPortal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function renderLightbox() {
    const data  = GALLERY_DATA[lightboxIndex];
    const total = GALLERY_DATA.length;
    if (!data) return;

    // Photo
    const img = document.getElementById('lightboxPhotoImg');
    img.style.backgroundImage = data.src ? `url('${data.src}')` : 'none';

    // Text
    document.getElementById('lightboxCaption').textContent = data.caption || '';
    document.getElementById('lightboxStory').textContent   = data.story   || '';

    // Date / location
    const dateEl = document.getElementById('lightboxDate');
    const locEl  = document.getElementById('lightboxLocation');
    if (data.date) {
      dateEl.innerHTML = `<i class="fas fa-calendar-heart" style="font-size:0.6rem"></i>&nbsp;${data.date}`;
      dateEl.style.display = 'flex';
    } else { dateEl.style.display = 'none'; }

    if (data.location) {
      locEl.innerHTML = `<i class="fas fa-location-dot" style="font-size:0.6rem"></i>&nbsp;${data.location}`;
      locEl.style.display = 'flex';
    } else { locEl.style.display = 'none'; }

    // Voice note button
    const voiceBtn = document.getElementById('lightboxVoiceBtn');
    voiceBtn.style.display = data.voiceNote ? 'inline-flex' : 'none';

    // Counter
    document.getElementById('lightboxCounter').textContent =
      `${lightboxIndex + 1} of ${total} memories`;

    // Dots navigation
    const dotsEl = document.getElementById('lightboxDots');
    dotsEl.innerHTML = '';
    const show = Math.min(total, 12);
    for (let i = 0; i < show; i++) {
      const dot = document.createElement('div');
      dot.className = 'lightbox-dot' + (i === lightboxIndex ? ' active' : '');
      const idx = i;
      dot.addEventListener('click', e => {
        e.stopPropagation();
        lightboxIndex = idx;
        renderLightbox();
      });
      dotsEl.appendChild(dot);
    }

    // Arrow visibility
    document.getElementById('lightboxPrev').style.opacity = lightboxIndex === 0         ? '0.3' : '1';
    document.getElementById('lightboxNext').style.opacity = lightboxIndex === total - 1 ? '0.3' : '1';
  }

  function lightboxNavigate(dir) {
    const newIdx = lightboxIndex + dir;
    if (newIdx < 0 || newIdx >= GALLERY_DATA.length) return;
    lightboxIndex = newIdx;
    renderLightbox();
  }

  function closeLightbox() {
    document.getElementById('lightboxPortal').classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  function closeLightboxBackdrop(e) {
    if (e.target === document.getElementById('lightboxPortal')) closeLightbox();
  }

  // Keyboard: arrow nav + escape
  document.addEventListener('keydown', e => {
    const portal = document.getElementById('lightboxPortal');
    if (!portal || !portal.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); lightboxNavigate(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); lightboxNavigate(1);  }
    if (e.key === 'Escape')     closeLightbox();
  });


  /* ─────────────────────────────────────────
     4. APPRECIATION MESSAGES
  ───────────────────────────────────────── */
  const APPRECIATION_DATA = [
  
    {
      icon:  'fas fa-pen-fancy',
      title: 'Your Quiet Gentle spirit',
      text:  "Your quiet, gentle spirit is a rare sanctuary that heals the world simply by being present within it. You dont need to shout to be profound; your stillness carries a strength that transforms everything it touches."
    },
    {
      icon:  'fas fa-music',
      title: 'Your Voice & Gift of Song',
      text:  "Favour, when you sing, the world becomes more beautiful. Your voice carries a piece of your soul — warm, genuine, and deeply moving. The way you express yourself through music shows the tenderness of your heart. Every note you sing is a prayer that touches heaven. I'm eternally blessed to witness your gift. Your singing brings me peace in ways nothing else can. It's like listening to an angel."
    },
    {
      icon:  'fas fa-cross',
      title: 'Your Devotion to God',
      text:  "The way your faith shapes everything about you — it's the most attractive thing I've ever seen. Your devotion to God isn't superficial words; it's woven into every decision, every kindness, every moment of forgiveness you show others. You've shown me what real, living faith looks like. You inspire me daily to know God deeper, to love better, and to be stronger in my own faith. You're my spiritual anchor."
    },
    {
      icon:  'fas fa-eye',
      title: 'Your Cheerful Presence',
      text:  "Your laughter is a sudden light that turns ordinary moments into memories, warming every room with the effortless grace of your joy. You have a rare gift for making the world feel brighter and more alive just by being happy within it."
    },
    {
      icon:  'fas fa-face-smile-wink',
      title: 'Your Beauty — Every Detail',
      text:  "Every single detail of you is perfection to me. It was God taking his time.The way your face comes completely alive when you smile or laugh — it's breathtakingly beautiful. But here's the truth: your physical beauty is just the wrapping around a soul that's infinitely more radiant. You're beautiful not just because of what you look like, but because of who you are. That's true beauty."
    }
  ];
  
  function populateAppreciationMessages() {
    const container = document.getElementById('appreciationMessages');
    if (!container) return;
  
    container.innerHTML = '';
    APPRECIATION_DATA.forEach((msg, i) => {
      const el = document.createElement('div');
      el.className = `appreciation-message sequential-${i}`;
      el.innerHTML = `
        <div class="appreciation-message-icon"><i class="${msg.icon}"></i></div>
        <h3>${msg.title}</h3>
        <p>${msg.text}</p>
      `;
      container.appendChild(el);
    });
  }
  
  
  /* ─────────────────────────────────────────
     5. SCROLL REVEAL
  ───────────────────────────────────────── */
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  }
  
  
  /* ─────────────────────────────────────────
     6. ACTIVE NAV HIGHLIGHTING
  ───────────────────────────────────────── */
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    let current = '';
  
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 200) {
        current = section.getAttribute('id');
      }
    });
  
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${current}`;
      link.style.color      = isActive ? 'var(--white)'          : 'var(--primary-purple)';
      link.style.background = isActive ? 'var(--primary-purple)' : 'transparent';
      link.style.fontWeight = isActive ? '700' : '600';
    });
  }, { passive: true });
  
  
  /* ─────────────────────────────────────────
     7. 🎤 VOICE SECTION DRAMATIC BUILD-UP (FIXED)
  ───────────────────────────────────────── */
  let voiceDimOverlay = null;
  let isVoiceSectionActive = false;

  function createVoiceDimOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'voice-dim-overlay';
    document.body.appendChild(overlay);
    return overlay;
  }

  function initVoiceSpotlight() {
    const voiceSection = document.getElementById('voice');
    if (!voiceSection) return;

    voiceDimOverlay = createVoiceDimOverlay();
    const particleBg = document.querySelector('.particle-bg');
    const nav = document.querySelector('nav');
    const voicePlayer = document.querySelector('.voice-player');
    const voiceContent = document.querySelector('.voice-content');
    const backgroundMusic = document.getElementById('backgroundMusic');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVoiceSectionActive) {
            isVoiceSectionActive = true;
            
            voiceDimOverlay.classList.add('active');
            if (particleBg) particleBg.classList.add('slowed');
            if (nav) nav.classList.add('dimmed');
            if (voicePlayer) voicePlayer.classList.add('spotlight');
            if (voiceContent) voiceContent.classList.add('spotlight');
            
            if (backgroundMusic && !backgroundMusic.paused) {
              fadeVolume(backgroundMusic, backgroundMusic.volume, 0, 2000);
            }
            
          } else if (!entry.isIntersecting && isVoiceSectionActive) {
            isVoiceSectionActive = false;
            
            voiceDimOverlay.classList.remove('active');
            if (particleBg) particleBg.classList.remove('slowed');
            if (nav) nav.classList.remove('dimmed');
            if (voicePlayer) voicePlayer.classList.remove('spotlight');
            if (voiceContent) voiceContent.classList.remove('spotlight');
            
            if (backgroundMusic && !backgroundMusic.paused) {
              const currentSection = getCurrentSection();
              const targetVolume = SECTION_MUSIC_VOLUMES[currentSection] || 0.45;
              fadeVolume(backgroundMusic, backgroundMusic.volume, targetVolume, 1500);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(voiceSection);
  }

  function initVoicePlayer() {
    const playBtn = document.getElementById('voicePlayBtn');
    const audio   = document.getElementById('voiceMessage');
    if (!playBtn || !audio) return;
  
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playBtn.classList.add('playing');
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        audio.pause();
        playBtn.classList.remove('playing');
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  
    audio.addEventListener('ended', () => {
      playBtn.classList.remove('playing');
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
  }
  
  
  /* ─────────────────────────────────────────
     8. 🎶 MUSIC EMOTION TRANSITIONS
  ───────────────────────────────────────── */
  
  const SECTION_MUSIC_VOLUMES = {
    'home': 0.35,
    'story': 0.25,
    'memories': 0.40,
    'gallery': 0.45,
    'letter': 0.30,
    'appreciation': 0.35,
    'voice': 0,
    'final': 0.50
  };

  let currentMusicSection = 'home';

  function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let current = 'home';
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
        current = section.getAttribute('id');
      }
    });
    
    return current;
  }

  function fadeVolume(audio, startVol, endVol, duration) {
    const steps = 30;
    const stepTime = duration / steps;
    const volChange = (endVol - startVol) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      audio.volume = Math.max(0, Math.min(1, startVol + (volChange * currentStep)));
      
      if (currentStep >= steps) {
        clearInterval(interval);
        audio.volume = endVol;
      }
    }, stepTime);
  }

  function initMusicTransitions() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (!backgroundMusic) return;

    window.addEventListener('scroll', () => {
      if (backgroundMusic.paused) return;
      
      const newSection = getCurrentSection();
      
      if (newSection !== currentMusicSection && newSection !== 'voice') {
        currentMusicSection = newSection;
        const targetVolume = SECTION_MUSIC_VOLUMES[newSection] || 0.45;
        fadeVolume(backgroundMusic, backgroundMusic.volume, targetVolume, 2000);
      }
    }, { passive: true });
  }

  function initMusicPlayer() {
    const toggle = document.getElementById('musicToggle');
    const audio  = document.getElementById('backgroundMusic');
    if (!toggle || !audio) return;
  
    let isPlaying = false;
  
    toggle.addEventListener('click', () => {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        toggle.classList.remove('playing');
      } else {
        const currentSection = getCurrentSection();
        const targetVolume = SECTION_MUSIC_VOLUMES[currentSection] || 0.45;
        audio.volume = 0;
        audio.play().then(() => {
          fadeVolume(audio, 0, targetVolume, 1500);
        }).catch(() => {});
        isPlaying = true;
        toggle.classList.add('playing');
      }
    });
  }
  
  
  /* ─────────────────────────────────────────
     9. TYPEWRITER EFFECT
  ───────────────────────────────────────── */
  function initTypewriter() {
    const el = document.querySelector('.typewriter');
    if (!el) return;
  
    const text = 'Favour, My Love';
    let i = 0;
  
    function typeNext() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(typeNext, 100);
      }
    }
  
    setTimeout(typeNext, 600);
  }
  
  
  /* ─────────────────────────────────────────
     10. 💌 LETTER WRITING SCENE (NEW!)
  ───────────────────────────────────────── */
  
  const LETTER_TEXT = [
    "My Dearest Favour,",
    "",
    "There are moments in life when words feel inadequate, when the depth of what you feel can't possibly be captured by language alone.",
    "",
    "But I'm going to try anyway.",
    "",
    "Because you deserve to know that you've changed everything. Not dramatically, not suddenly — but gently, beautifully, like watching the sunrise. One moment it's dark, and then slowly, imperceptibly, the world is filled with light.",
    "",
    "That's what loving you has been like.",
    "",
    "You walk into a room and suddenly I'm aware of every detail — the way you move, the sound of your voice, the specific way you laugh when something truly delights you.",
    "",
    "You've taught me what it means to be chosen, not just loved.",
    "",
    "Every day I choose you. And every day, that choice feels like the easiest and most important decision I'll ever make.",
    "",
    "Forever grateful for you,",
    "Your Forever Love 💜"
  ];

  let letterTypingInProgress = false;

  function initLetterWriting() {
    const letterSection = document.getElementById('letter');
    if (!letterSection) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !letterTypingInProgress) {
            letterTypingInProgress = true;
            setTimeout(() => typeLetterText(), 800);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(letterSection);
  }

  function typeLetterText() {
    const contentEl = document.querySelector('.letter-content');
    const signatureEl = document.querySelector('.letter-signature');
    if (!contentEl) return;

    let lineIndex = 0;
    let charIndex = 0;
    let currentLineEl = null;
    let cursorEl = null;

    function typeNextChar() {
      // If we've finished all lines
      if (lineIndex >= LETTER_TEXT.length) {
        if (cursorEl) cursorEl.remove();
        if (signatureEl) {
          setTimeout(() => signatureEl.classList.add('visible'), 500);
        }
        return;
      }

      const currentLine = LETTER_TEXT[lineIndex];

      // Start new line
      if (charIndex === 0) {
        if (currentLineEl && cursorEl) {
          currentLineEl.removeChild(cursorEl);
        }

        currentLineEl = document.createElement('span');
        currentLineEl.className = 'letter-line typing';
        contentEl.appendChild(currentLineEl);

        cursorEl = document.createElement('span');
        cursorEl.className = 'letter-cursor';
        currentLineEl.appendChild(cursorEl);

        // Empty line (paragraph break)
        if (currentLine === "") {
          contentEl.appendChild(document.createElement('br'));
          lineIndex++;
          charIndex = 0;
          setTimeout(typeNextChar, 300);
          return;
        }
      }

      // Type character
      if (charIndex < currentLine.length) {
        const textNode = document.createTextNode(currentLine[charIndex]);
        currentLineEl.insertBefore(textNode, cursorEl);
        charIndex++;
        
        // Typing speed variation for natural feel
        const delay = [',', '.', '!', '?'].includes(currentLine[charIndex - 1]) ? 400 : 30;
        setTimeout(typeNextChar, delay);
      } else {
        // Line complete
        lineIndex++;
        charIndex = 0;
        setTimeout(typeNextChar, 600);
      }
    }

    typeNextChar();
  }
  
  
  /* ─────────────────────────────────────────
     11. 🌹 INTERACTIVE BLOOM SIGNATURE MOMENT
  ───────────────────────────────────────── */
  
  let heartbeatAudio = null;

  function createHeartbeatAudio() {
    // Create AudioContext for heartbeat sound
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      
      return {
        context: audioContext,
        play: async function(volume = 0.3) {

  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 60;

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.05);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

      };
    } catch (e) {
      return null;
    }
  }

  function startHeartbeat() {
    if (!heartbeatAudio) {
      heartbeatAudio = createHeartbeatAudio();
    }
    
    if (!heartbeatAudio) return;

    let volume = 0.05;
    const maxVolume = 0.25;
    const volumeIncrement = 0.02;

    function beat() {
      if (heartbeatAudio && volume <= maxVolume) {
        heartbeatAudio.play(volume);
        volume += volumeIncrement;
        
        // Double beat (lub-dub)
        setTimeout(() => {
          if (heartbeatAudio) heartbeatAudio.play(volume * 0.8);
        }, 300);
        
        setTimeout(beat, 1000); // Next heartbeat in 1 second
      }
    }

    beat();
  }

  function initInteractiveBloom() {
    const finaleSection = document.getElementById('final');
    const bloomWrapper = document.querySelector('.finale-bloom-wrapper');
    const messageWrapper = document.querySelector('.finale-message-wrapper');
    
    if (!finaleSection || !bloomWrapper || !messageWrapper) return;

    let bloomActivated = false;
    let bloomTapped = false;

    // Add improved tap prompt
    const tapPrompt = document.createElement('div');
    tapPrompt.className = 'bloom-tap-prompt';
    tapPrompt.innerHTML = '✨ Open the flower to reveal my final letter ✨';
    bloomWrapper.appendChild(tapPrompt);

    // Observe when finale section enters viewport
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !bloomActivated) {
            bloomActivated = true;
            finaleSection.classList.add('bloom-active');
            
            // 🫀 Start heartbeat after bloom completes
            setTimeout(() => {
              startHeartbeat();
            }, 2000);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(finaleSection);

    // Handle bloom tap/click
    bloomWrapper.addEventListener('click', function() {
      if (bloomTapped) return;
      bloomTapped = true;

      this.classList.add('tapped');
      createBloomBurst(this);

      setTimeout(() => {
        messageWrapper.classList.add('revealed');
      }, 600);
    });
  }

  function createBloomBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const particles = ['💜', '💕', '🎁','✨', '🌸', '💖', '⭐', '🎁', '🌟', '🌹'];
    
    for (let i = 0; i < 16; i++) {
      const particle = document.createElement('div');
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      particle.style.position = 'fixed';
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      particle.style.fontSize = '20px';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      particle.style.transition = 'all 1.5s ease-out';
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        const angle = (Math.PI * 2 / 16) * i;
        const distance = 100 + Math.random() * 60;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.transform = `translate(${tx}px, ${ty}px) scale(1.5) rotate(${Math.random() * 360}deg)`;
        particle.style.opacity = '0';
      }, 50);
      
      setTimeout(() => particle.remove(), 1600);
    }
  }


  /* ─────────────────────────────────────────
     12. 💜 REPLAY MEMORY BUTTON (NEW!)
  ───────────────────────────────────────── */
  
  function initReplayButton() {
    const replayBtn = document.getElementById('replayBtn');
    if (!replayBtn) return;

    replayBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Optional: Restart music from beginning
      const backgroundMusic = document.getElementById('backgroundMusic');
      if (backgroundMusic && !backgroundMusic.paused) {
        backgroundMusic.currentTime = 0;
      }
    });
  }
  
  
  /* ─────────────────────────────────────────
     13. CINEMATIC ENHANCEMENTS
  ───────────────────────────────────────── */
  function initCinematicExperience() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  
    window.addEventListener('scroll', () => {
      const bloomGlow = document.querySelector('.bloom-glow');
      if (bloomGlow) {
        bloomGlow.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.05}px))`;
      }
    }, { passive: true });
  
    window.addEventListener('scroll', () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      document.querySelectorAll('.particle').forEach(p => {
        p.style.opacity = 0.2 + Math.min(1, pct / 100 * 2) * 0.4;
      });
    }, { passive: true });
  
    const finaleSection = document.getElementById('final');
    if (finaleSection) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('finale-active');
            createFinaleParticles();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      observer.observe(finaleSection);
    }
  }
  
  function createFinaleParticles() {
    const particleBg = document.querySelector('.particle-bg');
    if (!particleBg) return;
  
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle finale-particle';
      p.style.left             = Math.random() * 100 + '%';
      p.style.top              = Math.random() * 100 + '%';
      const size               = (Math.random() * 6 + 2) + 'px';
      p.style.width            = size;
      p.style.height           = size;
      p.style.background       = Math.random() > 0.5 ? 'var(--pink)' : 'var(--primary-purple)';
      p.style.animationDelay   = (Math.random() * 6) + 's';
      p.style.animationDuration= (Math.random() * 4 + 5) + 's';
      particleBg.appendChild(p);
    }
  }
  
  
  /* ─────────────────────────────────────────
     14. EMOTIONAL PAUSE SCENES
  ───────────────────────────────────────── */
  
  const PAUSE_MESSAGES = [
    {
        text: 'Click the floating Gift boxes to see which ones hide <span class="highlight">secret memories</span>. There are <span class="highlight">8 Memories to unlock</span>.',
        afterSection: 'home'
    },
    {
        text: 'You changed my life in ways <span class="highlight">you don\'t even realize</span>.',
        afterSection: 'story'
    },
    {
      text: 'Every single memory with you is a <span class="highlight">treasure I hold forever</span>.',
      afterSection: 'memories'
    },
    {
      text: 'Your presence in my life is the <span class="highlight">greatest gift</span> I could ever receive.',
      afterSection: 'appreciation'
    },
    {
      text: 'I want to spend <span class="highlight">every moment of forever</span> choosing you.',
      afterSection: 'voice'
    }
  ];

  let pauseActive = false;
  let pauseShown = new Set();

  function createPauseScene() {
    const pauseOverlay = document.createElement('div');
    pauseOverlay.className = 'emotional-pause';
    pauseOverlay.id = 'emotionalPause';

    const starsContainer = document.createElement('div');
    starsContainer.className = 'pause-stars';
    
    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div');
      star.className = 'pause-star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.setProperty('--twinkle-dur', (Math.random() * 4 + 2) + 's');
      star.style.setProperty('--twinkle-delay', (Math.random() * 6) + 's');
      star.style.setProperty('--star-opacity', (Math.random() * 0.6 + 0.3).toFixed(2));
      starsContainer.appendChild(star);
    }

    const glow = document.createElement('div');
    glow.className = 'pause-glow';

    const messageContainer = document.createElement('div');
    messageContainer.className = 'pause-message';
    
    const messageText = document.createElement('p');
    messageText.className = 'pause-text';
    messageContainer.appendChild(messageText);

    const progressContainer = document.createElement('div');
    progressContainer.className = 'pause-progress';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'pause-progress-bar';
    progressContainer.appendChild(progressBar);

    const skipHint = document.createElement('div');
    skipHint.className = 'pause-skip-hint';
    skipHint.textContent = 'Click anywhere to continue';

    pauseOverlay.appendChild(starsContainer);
    pauseOverlay.appendChild(glow);
    pauseOverlay.appendChild(messageContainer);
    pauseOverlay.appendChild(progressContainer);
    pauseOverlay.appendChild(skipHint);

    document.body.appendChild(pauseOverlay);

    return pauseOverlay;
  }

  function showPauseScene(messageData) {
    if (pauseActive || pauseShown.has(messageData.afterSection)) return;
    
    pauseActive = true;
    pauseShown.add(messageData.afterSection);

    let pauseOverlay = document.getElementById('emotionalPause');
    if (!pauseOverlay) {
      pauseOverlay = createPauseScene();
    }

    const messageEl = pauseOverlay.querySelector('.pause-text');
    messageEl.innerHTML = messageData.text;

    pauseOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    const autoHideTimer = setTimeout(() => {
      hidePauseScene();
    }, 8000);

    const skipHandler = () => {
      clearTimeout(autoHideTimer);
      hidePauseScene();
      pauseOverlay.removeEventListener('click', skipHandler);
    };

    pauseOverlay.addEventListener('click', skipHandler);
  }

  function hidePauseScene() {
    const pauseOverlay = document.getElementById('emotionalPause');
    if (!pauseOverlay) return;

    pauseOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
      pauseActive = false;
    }, 1200);
  }

  function initEmotionalPauses() {
    const sections = {
      'home': document.getElementById('home'),
      'story': document.getElementById('story'),
      'memories': document.getElementById('memories'),
      'appreciation': document.getElementById('appreciation'),
      'voice': document.getElementById('voice')
    };

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      if (pauseActive) return;

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      if (!scrollingDown) return;

      PAUSE_MESSAGES.forEach(pause => {
        const section = sections[pause.afterSection];
        if (!section || pauseShown.has(pause.afterSection)) return;

        const sectionBottom = section.offsetTop + section.offsetHeight;
        const viewportBottom = currentScrollY + window.innerHeight;

        if (viewportBottom > sectionBottom - (section.offsetHeight * 0.1)) {
          setTimeout(() => {
            showPauseScene(pause);
          }, 800);
        }
      });
    }, { passive: true });
  }
  
  
  
  /* ─────────────────────────────────────────
     ✨ INITIALISE ALL ✨
  ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    populateAppreciationMessages();
    createFloatingHearts();
    initScrollReveal();
    initMuseumReveal();          // 🖼️ Living Love Museum
    initGallery();               // 📸 Love Gallery + Lightbox
    initVoicePlayer();
    initVoiceSpotlight();
    initMusicPlayer();
    initMusicTransitions();
    initTypewriter();
    initLetterWriting();         // 💌
    initInteractiveBloom();      // 🫀
    initReplayButton();          // 💜
    initCinematicExperience();
    initEmotionalPauses();
  });