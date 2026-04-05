# 🧠 MindMate – Your Mental Health Companion

A beautiful, fully frontend mental health support chatbot built with pure **HTML, CSS, and JavaScript**.  
No backend. No dependencies. Just open `index.html` and it works.

---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 **Chat UI** | Clean chat bubbles with timestamps, user & bot avatars |
| 😊 **Mood Detection** | Detects sad, happy, stressed, tired, angry, anxious from text |
| 🌟 **Daily Motivation** | Random motivational quotes (English + Tamil) |
| ⏳ **Typing Animation** | Realistic 1–2s dot-bounce typing indicator |
| 🌍 **Tamil + English** | Understands and responds to Tamil and English messages |
| 🧘 **Relaxation Corner** | Breathing exercise, stress tips, and activities |
| 🎤 **Voice Input** | Speak your message using the Web Speech API (Chrome) |
| 🌙 **Dark / Light Mode** | Smooth toggle with calming colour palettes |
| 💾 **Chat History** | All messages saved in localStorage — persists on refresh |
| 😊 **Emoji Responses** | Friendly, emoji-rich bot replies |
| 📊 **Mood Tracker** | Log your daily mood, visualised as an emoji bar chart |
| 📱 **Responsive** | Works on desktop, tablet, and mobile |

---

## 🗂️ Project Structure

```
MindMate/
├── index.html    ← App structure & layout
├── style.css     ← All styling, themes, animations
├── script.js     ← All logic: chat, moods, voice, storage
└── README.md     ← This file
```

---

## 🚀 How to Run

### Option 1 – Just Open the File
1. Download or unzip the project folder
2. Double-click `index.html`
3. It opens in your browser — done! ✅

### Option 2 – VS Code + Live Server (Recommended)

1. **Install VS Code**: https://code.visualstudio.com/
2. **Open the folder**: File → Open Folder → select `MindMate/`
3. **Install Live Server extension**:
   - Press `Ctrl+Shift+X` (Extensions panel)
   - Search "Live Server" by Ritwick Dey → Install
4. **Right-click `index.html`** → "Open with Live Server"
5. App opens at `http://127.0.0.1:5500` with auto-reload 🎉

---

## 🎤 Voice Input Notes

- Voice Input uses the **Web Speech API** (built into Chrome/Edge)
- Click the 🎤 button and speak in English or Tamil
- Firefox and Safari have limited support — use Chrome for best results
- The mic button hides automatically if the browser doesn't support it

---

## 🌙 Dark Mode

- Click the 🌙 / ☀️ button in the top-right corner
- Your preference is saved in localStorage

---

## 💾 Data Storage

All data is saved locally in your browser:
- `mindmate_chat` — full chat history
- `mindmate_moods` — mood tracker counts
- `mindmate_theme` — dark/light preference

No data is ever sent to any server.

---

## 🌍 Tamil Support Keywords

The bot understands Tamil keywords including:
- வணக்கம், ஹலோ (Greetings)
- சோகம், வலிக்கிறது (Sadness)
- மகிழ்ச்சி, சந்தோஷம் (Happiness)
- மன அழுத்தம், கவலை (Stress/Worry)
- சோர்வு, களைப்பு (Tiredness)

---

## 🎨 Design

- **Fonts**: Nunito (UI) + Lora (quotes)
- **Colours (Light)**: Sage green `#7c9e8f`, warm gold `#c9a97a`, linen `#f0ede8`
- **Colours (Dark)**: Deep charcoal `#1a1917`, muted sage `#8eb5a4`
- Smooth CSS transitions on all theme changes
- Responsive 3-column grid (collapses to single column on mobile)

---

## 📋 Browser Compatibility

| Browser | Chat | Voice Input |
|---|---|---|
| Chrome | ✅ | ✅ |
| Edge | ✅ | ✅ |
| Firefox | ✅ | ⚠️ Limited |
| Safari | ✅ | ⚠️ Limited |

---

## 💡 Extending the Bot

To add more responses, open `script.js` and add a new entry to the `responses` object:

```javascript
your_category: {
  keywords: ['keyword1', 'keyword2'],
  replies: [
    "Your bot reply here 😊",
    "Another reply variant! 🌟",
  ]
},
```

---

*Built with 💙 for mental wellness. Remember: you are not alone.*

