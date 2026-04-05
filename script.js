/* ============================================================
   MindMate – script.js
   Frontend Mental Health Support Chatbot
   Features: Chat UI, Mood Detection, Motivation, Typing Anim,
   Tamil+English, Relaxation Tips, Voice Input, Dark/Light Mode,
   Chat History (localStorage), Emoji Responses, Mood Tracker
   ============================================================ */

// ─────────────────────────────────────────────
// 1. DOM REFERENCES
// ─────────────────────────────────────────────
const chatWindow    = document.getElementById('chatWindow');
const userInput     = document.getElementById('userInput');
const sendBtn       = document.getElementById('sendBtn');
const voiceBtn      = document.getElementById('voiceBtn');
const themeToggle   = document.getElementById('themeToggle');
const clearChatBtn  = document.getElementById('clearChat');
const motivationBtn = document.getElementById('motivationBtn');
const quoteBox      = document.getElementById('quoteBox');
const breathCircle  = document.getElementById('breathCircle');
const breathLabel   = document.getElementById('breathLabel');
const breathStart   = document.getElementById('breathStart');
const moodChart     = document.getElementById('moodChart');
const clearMoodsBtn = document.getElementById('clearMoods');
const tabBtns       = document.querySelectorAll('.tab-btn');
const moodBtns      = document.querySelectorAll('.mood-btn');
const chips         = document.querySelectorAll('.chip');

// ─────────────────────────────────────────────
// 2. MOTIVATIONAL QUOTES
// ─────────────────────────────────────────────
const quotes = [
  "🌱 Every day is a fresh start. You have the strength to begin again.",
  "💪 Difficult roads often lead to beautiful destinations. Keep going!",
  "☀️ You are braver than you believe, stronger than you seem.",
  "🌊 Like waves, emotions rise and fall. You will find calm again.",
  "🦋 Small steps still move you forward. Progress is progress.",
  "🌸 Be gentle with yourself — you are a human being, not a machine.",
  "✨ Your feelings are valid. Your presence matters. You are enough.",
  "🔥 Storms don't last forever. Your breakthrough is coming.",
  "🌟 One kind thought about yourself can change your whole day.",
  "🎯 Focus on what you can control. Let go of what you cannot.",
  "💫 நீ மிகவும் வலிமையானவன். உன்னால் சாதிக்க முடியும்! 🌟",
  "🌺 ஒவ்வொரு நாளும் ஒரு புதிய வாய்ப்பு. தொடர்ந்து முயற்சி செய்!",
  "🕊️ Healing is not linear. Be patient with your journey.",
  "🧠 Your mental health matters as much as your physical health.",
  "🌈 After every dark night, a bright morning follows.",
];

// ─────────────────────────────────────────────
// 3. BOT RESPONSE DATABASE
//    Each entry has keyword arrays + response arrays
//    Supports both English and Tamil patterns
// ─────────────────────────────────────────────
const responses = {

  /* ── English keywords ── */
  greet: {
    keywords: ['hello', 'hi ', 'hey', 'good morning', 'good evening', 'good afternoon', 'howdy'],
    replies: [
      "👋 Hello! I'm MindMate, your calm companion. How are you feeling today?",
      "🌸 Hi there! So glad you're here. What's on your mind?",
      "☀️ Hey! Welcome! This is a safe space. How can I support you today?",
    ]
  },
  sad: {
    keywords: ['sad', 'unhappy', 'depressed', 'depression', 'cry', 'crying', 'tears', 'hopeless', 'heartbroken', 'low', 'down', 'lonely', 'alone'],
    replies: [
      "💙 I'm so sorry you're feeling sad right now. It's okay to feel this way — emotions are part of being human. Would you like to talk about what's going on?",
      "🤗 Sending you a big virtual hug 💙. Sadness can feel heavy, but it's temporary. You don't have to carry it alone.",
      "🌧️ It's okay to have cloudy days. Take it one breath at a time. I'm here to listen whenever you need. 💙",
    ]
  },
  happy: {
    keywords: ['happy', 'great', 'awesome', 'wonderful', 'excited', 'joy', 'good ', 'amazing', 'fantastic', 'excellent', 'cheerful', 'positive'],
    replies: [
      "😄 That's absolutely wonderful to hear! Happiness looks great on you! 🎉 What made your day so special?",
      "🌟 Yay! That spark of joy you feel right now — hold on to it! Spread that energy around you! ✨",
      "🥳 So happy for you! On good days like these, it helps to write down what made you smile — it's great to look back on later! 📝",
    ]
  },
  stressed: {
    keywords: ['stress', 'stressed', 'stressed out', 'overwhelmed', 'pressure', 'burnout', 'too much', 'exhausted', 'cant cope', "can't cope", 'panic', 'panicking'],
    replies: [
      "😮‍💨 Stress can feel like carrying the world. Let's try this: breathe in for 4 seconds… hold for 4… out for 6. Repeat 3 times. You've got this 💪",
      "🌿 When everything feels too much, step back. You don't have to solve everything today. What's the ONE small thing you can do right now?",
      "💆 Take a moment. Close your eyes. Roll your shoulders back. Stress is real, but so is your ability to get through it. I believe in you! 🌟",
    ]
  },
  anxious: {
    keywords: ['anxious', 'anxiety', 'worried', 'worry', 'nervous', 'fear', 'scared', 'afraid', 'dread'],
    replies: [
      "💚 Anxiety can feel very real and overwhelming. Let's ground yourself: name 5 things you can see, 4 you can touch, 3 you hear. Breathe. 🌿",
      "🌱 Anxiety often means you care deeply. You're not broken — you're human. This feeling will pass. Focus on this present moment. 💚",
      "🕊️ You are safe right now. Breathe slowly. Your nervous system just needs a gentle reminder that you are okay. You're doing great. 💙",
    ]
  },
  tired: {
    keywords: ['tired', 'exhausted', 'sleepy', 'fatigued', 'drained', "can't sleep", 'insomnia', 'no energy', 'worn out'],
    replies: [
      "😴 Rest is not laziness — it's essential. Your body and mind are asking for care. Can you put aside just 20 minutes to rest today?",
      "💤 When you're exhausted, even small tasks feel huge. Be gentle with yourself. You're doing enough. You ARE enough. 🌙",
      "🛌 Try this before bed: dim the lights, put away screens, and take 5 slow breaths. Sleep is healing. You deserve deep rest tonight. 🌟",
    ]
  },
  angry: {
    keywords: ['angry', 'anger', 'mad', 'furious', 'frustrated', 'irritated', 'annoyed', 'rage', 'upset'],
    replies: [
      "🔥 It's okay to feel angry — anger is a valid emotion. Try to channel it: take a brisk walk, scribble hard on paper, or shout into a pillow. Let it out safely. 💪",
      "😤 I hear you. Anger often signals that something important to you was crossed. Once you've cooled down, reflect on what triggered it. 💡",
      "🌬️ Take a slow, deep breath through your nose… and let it all out through your mouth. Repeat 5 times. Anger has energy — let's transform it. 🌱",
    ]
  },
  motivation: {
    keywords: ['motivat', 'inspire', 'give up', 'hopeless', 'cant do', "can't do", 'failing', 'failed', 'useless', 'worthless', 'meaningless'],
    replies: [
      "🌟 You haven't come this far just to give up. Every single step you've taken matters. Keep going — your best chapter is still ahead! ✨",
      "💫 You are not defined by your struggles. You are defined by how you rise from them. And you WILL rise. I believe in you! 🔥",
      "🦅 Big things take time. The seed doesn't become a tree overnight. Trust your process. Growth is happening even when you can't see it. 🌱",
    ]
  },
  help: {
    keywords: ['help', 'support', 'need someone', 'talk to someone', 'therapist', 'counselor', 'professional'],
    replies: [
      "💙 Reaching out is the bravest thing you can do. I'm here to listen, but please also consider speaking to a professional therapist or counselor — they can truly help. 🤝",
      "🌸 You deserve real support. Consider reaching out to a trusted person in your life, or a mental health helpline. iCall India: 9152987821. You matter! 💙",
    ]
  },
  gratitude: {
    keywords: ['thank', 'thanks', 'grateful', 'appreciate', 'helpful', 'better now'],
    replies: [
      "🥰 It means so much that I could help, even a little. Remember, you can come back whenever you need. Take care of yourself! 🌸",
      "💙 You're very welcome! Remember: reaching out and talking about how you feel is already a huge act of courage. Proud of you! 🌟",
    ]
  },
  selfcare: {
    keywords: ['self care', 'self-care', 'relax', 'calm', 'peaceful', 'meditat', 'breathe', 'breathing'],
    replies: [
      "🧘 Self-care isn't selfish — it's survival. Try the breathing exercise in the Relaxation Corner to the right! Also: hydrate, rest, and be kind to yourself. 💚",
      "🌿 Wonderful that you're thinking about self-care! Some ideas: a warm bath, a short walk, journaling, or simply sitting quietly with a cup of tea. 🍵",
    ]
  },
  bye: {
    keywords: ['bye', 'goodbye', 'see you', 'take care', 'goodnight', 'good night', 'cya', 'later'],
    replies: [
      "🌙 Take good care of yourself! Remember, I'm always here whenever you need to talk. Goodnight and sweet dreams! 💙",
      "🌸 Goodbye for now! Carry that warmth in your heart. You've got this! See you soon! ✨",
    ]
  },

  /* ── Tamil keywords ── */
  tamil_sad: {
    keywords: ['சோகம்', 'வலிக்கிறது', 'அழுகிறேன்', 'மனசு சரியில்ல', 'மனம் வலிக்கிறது', 'கஷ்டமாக'],
    replies: [
      "💙 நீ தனியாக இல்லை. உன் வலியை புரிந்துகொள்கிறேன். கொஞ்சம் பேசு, நான் கேட்கிறேன். 🌸",
      "🤗 சோகம் ஒரு கடலில் அலை போல வரும், போகும். நீ வலிமையானவன். இந்த நேரம் கடந்து போகும். 💙",
    ]
  },
  tamil_happy: {
    keywords: ['மகிழ்ச்சி', 'சந்தோஷம்', 'நலமாக இருக்கிறேன்', 'நல்லா இருக்கேன்', 'குஷியா'],
    replies: [
      "🌟 அருமை! உன் மகிழ்ச்சி என்னையும் மகிழ்விக்கிறது! இன்று என்ன நல்லது நடந்தது? 😊",
      "🎉 வாழ்க்கையில் இப்படி சந்தோஷமான நேரங்களை கொண்டாடு! நீ தகுதியானவன்! ✨",
    ]
  },
  tamil_stressed: {
    keywords: ['மன அழுத்தம்', 'stress', 'கவலை', 'படபடப்பு', 'பயம்', 'கஷ்டம்', 'சோர்வு'],
    replies: [
      "🌿 மூச்சை மெல்ல உள்ளே இழு... 4 விநாடி பிடி... மெல்ல வெளியே விடு. மூன்று முறை செய். உன்னால் முடியும்! 💪",
      "💆 எல்லாவற்றையும் ஒரே நேரத்தில் சரிசெய்ய வேண்டாம். ஒரு நேரத்தில் ஒரு அடி மட்டும் போ. நான் உன்னோடு இருக்கேன். 🌸",
    ]
  },
  tamil_tired: {
    keywords: ['சோர்வாக', 'களைப்பாக', 'தூக்கம் வரல', 'உடல் சோர்வு', 'ஓய்வு வேணும்'],
    replies: [
      "😴 ஓய்வு எடுப்பது பலவீனம் இல்லை, அது வலிமையின் அடையாளம். இன்று சற்று ஓய்வெடு. 🌙",
      "🛌 உன் உடலும் மனமும் பராமரிப்பு கேட்கின்றன. கொஞ்சம் தூங்கு, நாளை புதிய சக்தியுடன் எழுந்திரி. 💙",
    ]
  },
  tamil_greet: {
    keywords: ['வணக்கம்', 'ஹலோ', 'நமஸ்தே', 'எப்படி இருக்கீங்க', 'என்ன செய்கிறீர்கள்'],
    replies: [
      "🌸 வணக்கம்! MindMate-க்கு வரவேற்கிறேன். இன்று எப்படி உணர்கிறீர்கள்?",
      "😊 ஹலோ! நீ பேசுவதற்கு நான் தயாராக இருக்கிறேன். என்ன மனசில் இருக்கு?",
    ]
  },

  /* ── Fallback ── */
  default: {
    keywords: [],
    replies: [
      "💙 I'm here and I'm listening. Can you tell me more about how you're feeling right now?",
      "🌿 Thank you for sharing. Remember, this is a safe space. Whatever you're going through, you don't have to face it alone.",
      "🤗 I hear you. Sometimes just putting feelings into words is a powerful first step. I'm right here with you.",
      "✨ Every feeling you have is valid. Would you like to try the breathing exercise, or talk more about what's on your mind?",
    ]
  }
};

// ─────────────────────────────────────────────
// 4. STATE
// ─────────────────────────────────────────────
let chatHistory  = JSON.parse(localStorage.getItem('mindmate_chat'))  || [];
let moodLog      = JSON.parse(localStorage.getItem('mindmate_moods')) || {};
let isDark       = localStorage.getItem('mindmate_theme') === 'dark';
let isListening  = false;
let breathTimer  = null;
let breathPhase  = 'idle'; // idle | inhale | hold | exhale

// ─────────────────────────────────────────────
// 5. THEME MANAGEMENT
// ─────────────────────────────────────────────
function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('mindmate_theme', isDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  applyTheme();
});

applyTheme();

// ─────────────────────────────────────────────
// 6. CHAT RENDERING & PERSISTENCE
// ─────────────────────────────────────────────

/** Render a single message object into the chat window */
function renderMessage({ role, text, time }) {
  const row = document.createElement('div');
  row.className = `msg-row ${role}`;

  const avatar = document.createElement('div');
  avatar.className = `avatar ${role}`;
  avatar.textContent = role === 'bot' ? '🧠' : '🧑';

  const bubble = document.createElement('div');
  bubble.className = `bubble ${role}`;
  bubble.innerHTML = text; // allow emojis & <br>

  const timeEl = document.createElement('div');
  timeEl.className = 'msg-time';
  timeEl.textContent = time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (role === 'user') {
    row.append(bubble, timeEl, avatar);
  } else {
    row.append(avatar, bubble, timeEl);
  }

  chatWindow.appendChild(row);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/** Save full chat history to localStorage */
function saveChat() {
  localStorage.setItem('mindmate_chat', JSON.stringify(chatHistory));
}

/** Load and render saved chat on page load */
function loadChat() {
  if (chatHistory.length === 0) {
    // Welcome message on first visit
    const welcome = {
      role: 'bot',
      text: "🌸 Hi there! I'm <strong>MindMate</strong>, your mental health companion.<br>Feel free to share how you're feeling — in English or தமிழ்.<br>I'm here to listen, support, and uplift you! 💙",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    chatHistory.push(welcome);
    saveChat();
  }
  chatHistory.forEach(renderMessage);
}

/** Clear chat history */
clearChatBtn.addEventListener('click', () => {
  if (!confirm('Clear all chat history?')) return;
  chatHistory = [];
  saveChat();
  chatWindow.innerHTML = '';
  const welcome = {
    role: 'bot',
    text: "🌸 Chat cleared! Fresh start. How are you feeling today? 💙",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  chatHistory.push(welcome);
  saveChat();
  renderMessage(welcome);
});

// ─────────────────────────────────────────────
// 7. KEYWORD DETECTION & BOT RESPONSE LOGIC
// ─────────────────────────────────────────────

/** Find the best matching response category for the user's message */
function detectResponse(msg) {
  const lower = msg.toLowerCase();

  for (const [key, data] of Object.entries(responses)) {
    if (key === 'default') continue;
    if (data.keywords.some(kw => lower.includes(kw))) {
      const arr = data.replies;
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }

  // Fallback
  const fallbacks = responses.default.replies;
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

/** Show typing indicator then post bot response */
function botReply(text) {
  // Show typing animation
  const typingRow = document.createElement('div');
  typingRow.className = 'msg-row bot';
  typingRow.id = 'typing-indicator';

  const avatar = document.createElement('div');
  avatar.className = 'avatar bot';
  avatar.textContent = '🧠';

  const typingBubble = document.createElement('div');
  typingBubble.className = 'bubble bot typing-bubble';
  typingBubble.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';

  typingRow.append(avatar, typingBubble);
  chatWindow.appendChild(typingRow);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Realistic delay (1.2 – 1.8 seconds)
  const delay = 1200 + Math.random() * 600;

  setTimeout(() => {
    // Remove typing indicator
    document.getElementById('typing-indicator')?.remove();

    // Render bot message
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msg = { role: 'bot', text, time };
    renderMessage(msg);
    chatHistory.push(msg);
    saveChat();
  }, delay);
}

// ─────────────────────────────────────────────
// 8. SEND MESSAGE HANDLER
// ─────────────────────────────────────────────
function sendMessage(messageText) {
  const text = (messageText || userInput.value).trim();
  if (!text) return;

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Render user message
  const userMsg = { role: 'user', text, time };
  renderMessage(userMsg);
  chatHistory.push(userMsg);
  saveChat();

  // Clear input
  userInput.value = '';

  // Bot response
  const reply = detectResponse(text);
  botReply(reply);
}

sendBtn.addEventListener('click', () => sendMessage());

userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// ─────────────────────────────────────────────
// 9. VOICE INPUT (Web Speech API)
// ─────────────────────────────────────────────
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang       = 'ta-IN'; // Tamil — also accepts English
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceBtn.addEventListener('click', () => {
    if (isListening) {
      recognition.stop();
      return;
    }
    recognition.start();
  });

  recognition.onstart = () => {
    isListening = true;
    voiceBtn.classList.add('listening');
    voiceBtn.title = 'Listening… Click to stop';
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    sendMessage(transcript);
  };

  recognition.onerror = (e) => {
    console.warn('Speech recognition error:', e.error);
    voiceBtn.classList.remove('listening');
    isListening = false;
  };

  recognition.onend = () => {
    isListening = false;
    voiceBtn.classList.remove('listening');
    voiceBtn.title = 'Voice Input';
  };
} else {
  // Hide mic button if browser doesn't support it
  voiceBtn.style.display = 'none';
}

// ─────────────────────────────────────────────
// 10. MOTIVATIONAL QUOTES
// ─────────────────────────────────────────────
motivationBtn.addEventListener('click', () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.textContent = quote;
  quoteBox.classList.remove('hidden');
  // Also send quote to chat
  botReply("Here's a little boost for you 🌟<br><em>" + quote + "</em>");
});

// ─────────────────────────────────────────────
// 11. MOOD TRACKER
// ─────────────────────────────────────────────
const moodEmojis = {
  happy: '😊', sad: '😢', stressed: '😤', relaxed: '😌', tired: '😴', angry: '😠'
};
const moodColors = {
  happy: '#f5c842', sad: '#6fafd4', stressed: '#e07a5f',
  relaxed: '#7cb99a', tired: '#a89cc8', angry: '#e05f5f'
};

/** Log a mood click and update the chart */
function logMood(mood) {
  moodLog[mood] = (moodLog[mood] || 0) + 1;
  localStorage.setItem('mindmate_moods', JSON.stringify(moodLog));
  renderMoodChart();
}

/** Render the emoji bar chart */
function renderMoodChart() {
  if (Object.keys(moodLog).length === 0) {
    moodChart.innerHTML = '<p class="chart-empty">Log your moods to see your chart!</p>';
    return;
  }

  const maxVal = Math.max(...Object.values(moodLog));
  moodChart.innerHTML = '';

  for (const [mood, count] of Object.entries(moodLog)) {
    const heightPct = Math.round((count / maxVal) * 60) + 10; // 10–70 px
    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.innerHTML = `
      <div class="bar-fill bar-${mood}" style="height:${heightPct}px;background:${moodColors[mood]};"></div>
      <div class="bar-label">${moodEmojis[mood]}</div>
      <div class="bar-label" style="font-size:0.65rem;font-weight:800;color:var(--text-primary);">${count}</div>
    `;
    moodChart.appendChild(bar);
  }
}

moodBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const mood = btn.dataset.mood;

    // Visual feedback — active state
    moodBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    logMood(mood);

    // Bot reaction to logged mood
    const moodReplies = {
      happy:    `😊 So glad you're feeling happy! That positive energy is wonderful! 🌟`,
      sad:      `💙 I'm sorry you're feeling sad. I'm here if you want to talk. You're not alone.`,
      stressed: `🌿 Stress is tough. Try the breathing exercise in the Relaxation Corner — it really helps! 💪`,
      relaxed:  `😌 Beautiful! Feeling relaxed is a gift. Enjoy this calm moment. 🌸`,
      tired:    `😴 Your body is asking for rest. Be gentle with yourself today. 🌙`,
      angry:    `🔥 Anger is valid. Take a few deep breaths and let some of that energy out safely. 💚`,
    };

    botReply(moodReplies[mood] || `Thanks for sharing how you feel! 💙`);
  });
});

clearMoodsBtn.addEventListener('click', () => {
  if (!confirm('Reset mood tracker?')) return;
  moodLog = {};
  localStorage.removeItem('mindmate_moods');
  moodBtns.forEach(b => b.classList.remove('active'));
  renderMoodChart();
});

// ─────────────────────────────────────────────
// 12. RELAXATION TABS
// ─────────────────────────────────────────────
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    // Update active tab button
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide tab content
    document.querySelectorAll('.tab-content').forEach(el => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });

    const targetTab = document.getElementById(`tab-${tab}`);
    targetTab.classList.remove('hidden');
    targetTab.classList.add('active');
  });
});

// ─────────────────────────────────────────────
// 13. BREATHING EXERCISE ANIMATION
//     Pattern: Inhale 4s → Hold 4s → Exhale 6s → Repeat
// ─────────────────────────────────────────────
const breathSequence = [
  { phase: 'inhale',  label: '🌬️ Inhale…',    duration: 4000, cssClass: 'inhale' },
  { phase: 'hold',    label: '⏸️ Hold…',       duration: 4000, cssClass: 'hold'   },
  { phase: 'exhale',  label: '💨 Exhale…',     duration: 6000, cssClass: 'exhale' },
];

let breathRunning = false;
let breathStep    = 0;
let breathTimeout = null;

function runBreath() {
  if (!breathRunning) return;

  const step = breathSequence[breathStep % breathSequence.length];
  breathCircle.className = `breath-circle ${step.cssClass}`;
  breathLabel.textContent = step.label;

  breathTimeout = setTimeout(() => {
    breathStep++;
    runBreath();
  }, step.duration);
}

breathStart.addEventListener('click', () => {
  if (breathRunning) {
    // Stop
    breathRunning = false;
    clearTimeout(breathTimeout);
    breathStep = 0;
    breathCircle.className = 'breath-circle';
    breathLabel.textContent = 'Press Start';
    breathStart.textContent = '▶ Start Exercise';
  } else {
    // Start
    breathRunning = true;
    breathStep    = 0;
    breathStart.textContent = '⏹ Stop Exercise';
    runBreath();
  }
});

// ─────────────────────────────────────────────
// 14. QUICK PHRASE CHIPS
// ─────────────────────────────────────────────
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    const msg = chip.dataset.msg;
    userInput.value = msg;
    sendMessage(msg);
  });
});

// ─────────────────────────────────────────────
// 15. INITIALISE
// ─────────────────────────────────────────────
loadChat();
renderMoodChart();
