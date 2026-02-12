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
     3. MEMORY CARD MODALS
  ───────────────────────────────────────── */
  const MEMORY_DATA = {
    'Your Voice': {
      icon: '<i class="fas fa-microphone-alt"></i>',
      title: 'Your Voice',
      text: "That melodic voice when you sing, the gentle way you laugh, the warmth in every word you speak to me — pure magic. When you sing, it's like the universe stops to listen. Your voice carries emotion that touches my soul in ways words could never explain."
    },
    'Your Laughter': {
      icon: '<i class="fas fa-face-smile"></i>',
      title: 'Your Laughter',
      text: "The way your whole face lights up when you genuinely laugh — it's the most beautiful sound and sight in the world. Your laughter is contagious, authentic, and it's become my favourite melody. Every time you laugh, I fall in love with you all over again."
    },
    'Your Mind': {
      icon: '<i class="fas fa-brain"></i>',
      title: 'Your Mind',
      text: "Your journalism brilliance, your thoughtful perspectives, the way you see the world with such clarity and compassion. The way you analyse stories, the depth of your understanding, how you articulate truths that matter — you inspire me to be a better thinker, a better observer of the world."
    },
    'Your Beauty': {
      icon: '<i class="fas fa-star"></i>',
      title: 'Your Beauty',
      text: "Beyond your physical beauty that takes my breath away, it's the radiance that comes from your pure, loving soul. Your eyes are windows to the most beautiful heart, your smile could light up the darkest room, but what makes you truly beautiful is the goodness within you."
    },
    'Your Support': {
      icon: '<i class="fas fa-shield"></i>',
      title: 'Your Support',
      text: "How you believe in me, encourage me, and stand by my side through every season — you're my greatest blessing. You lift me up when I'm down, celebrate my wins as if they're your own, and believe in my dreams even when I doubt myself. That's the kind of love that changes lives."
    },
    'Your Faith': {
      icon: '<i class="fas fa-cross"></i>',
      title: 'Your Faith',
      text: "The beautiful way your devotion to God shapes everything you do — it inspires me to be better, kinder, stronger. Your faith is real, lived out daily in how you treat others, how you carry your burdens, and how you trust in something greater. You've made me want to know God the way you do."
    }
  };
  
  function openMemoryModal(card) {
    const title = card.querySelector('h3').textContent;
    const data  = MEMORY_DATA[title];
    if (!data) return;
  
    document.getElementById('modalMemoryIcon').innerHTML = data.icon;
    document.getElementById('modalMemoryTitle').textContent = data.title;
    document.getElementById('modalMemoryText').textContent  = data.text;
    document.getElementById('memoryModal').classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    document.getElementById('memoryModal').classList.remove('show');
    document.body.style.overflow = 'auto';
  }
  
  
  /* ─────────────────────────────────────────
     4. APPRECIATION MESSAGES
  ───────────────────────────────────────── */
  const APPRECIATION_DATA = [
    {
      icon:  'fas fa-music',
      title: 'Your Voice & Gift of Song',
      text:  "Favour, when you sing, the world becomes more beautiful. Your voice carries a piece of your soul — warm, genuine, and deeply moving. The way you express yourself through music shows the tenderness of your heart. Every note you sing is a prayer that touches heaven. I'm eternally blessed to witness your gift. Your singing brings me peace in ways nothing else can. It's like listening to an angel."
    },
    {
      icon:  'fas fa-pen-fancy',
      title: 'Your Passion for Journalism',
      text:  "Your mind is brilliant and awakens something profound in me. The way you observe stories, uncover hidden truths, and tell them with such compassion — it's extraordinary. Your journalism isn't just a career; it's your calling, your purpose. You see the world's pain and respond with empathy and precision. That's the mark of a true journalist and an exceptionally beautiful soul. You make the world better."
    },
    {
      icon:  'fas fa-cross',
      title: 'Your Devotion to God',
      text:  "The way your faith shapes everything about you — it's the most attractive thing I've ever seen. Your devotion to God isn't superficial words; it's woven into every decision, every kindness, every moment of forgiveness you show others. You've shown me what real, living faith looks like. You inspire me daily to know God deeper, to love better, and to be stronger in my own faith. You're my spiritual anchor."
    },
    {
      icon:  'fas fa-eye',
      title: 'Your Eyes — Windows to Your Soul',
      text:  "Those eyes… they tell every story your heart is feeling in that moment. They sparkle with joy when you're genuinely happy, they soften with tenderness when you show compassion, they burn with passionate intensity when you care deeply about something. Looking into your eyes, I see kindness, profound intelligence, depth of character, and an endless ocean of love. They're the most beautiful thing I've ever laid eyes upon."
    },
    {
      icon:  'fas fa-face-smile-wink',
      title: 'Your Beauty — Every Detail',
      text:  "Every single detail of you is perfection to me. Your nose, your cheekbones, the way your face comes completely alive when you smile or laugh — it's breathtakingly beautiful. But here's the truth: your physical beauty is just the wrapping around a soul that's infinitely more radiant. You're beautiful not just because of what you look like, but because of who you are. That's true beauty."
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
    'letter': 0.30,
    'appreciation': 0.35,
    'voice': 0.15,
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

    const particles = ['💜', '💕', '✨', '🌸', '💖', '⭐', '💫', '🌟', '🌹'];
    
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
        text: 'Click the floating flowers to see which ones hide <span class="highlight">secret memories</span>. There are <span class="highlight">8 Memories to unlock</span>.',
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
     MODAL CLOSE
  ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const memoryModal = document.getElementById('memoryModal');
    if (memoryModal) {
      memoryModal.addEventListener('click', e => { if (e.target === memoryModal) closeModal(); });
    }
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  });
  
  
  /* ─────────────────────────────────────────
     ✨ INITIALISE ALL ✨
  ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    populateAppreciationMessages();
    createFloatingHearts();
    initScrollReveal();
    initVoicePlayer();
    initVoiceSpotlight();
    initMusicPlayer();
    initMusicTransitions();
    initTypewriter();
    initLetterWriting();        // 💌 NEW
    initInteractiveBloom();     // 🫀 Enhanced with heartbeat
    initReplayButton();         // 💜 NEW
    initCinematicExperience();
    initEmotionalPauses();
  });