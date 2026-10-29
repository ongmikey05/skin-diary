# Skin Diary

A private, offline-first iPhone app for tracking skin progress day by day, with a built-in AI assistant that reads your diary and compares your photos over time.

**Live app:** https://ongmikey05.github.io/skin-diary/ (open in Safari on iPhone, then Share → Add to Home Screen)

![Skin Diary screenshots](screenshots.png)

*Screenshots use generated placeholder images, not real photos.*

## Why I built it

I was repairing my skin barrier and wanted to reintroduce a cleanser gradually, while tracking how my skin responded. I wanted a tracker that supported that kind of schedule, kept my photos on my phone, and could tell me honestly whether things were improving, so I used AI to build my own.

## Features

- **Calendar:** every day shows a photo thumbnail and markers for products used, due days and notes.
- **3 photos a day:** front, left side and right side.
- **Morning and night checklists:** each product belongs to a morning, night or as-needed routine.
- **Reintroduction planner:** tracked products follow a schedule (every 4th, 3rd or 2nd day, or daily) with a contact-time goal and a built-in timer.
- **Ask (AI chatbot):** chat with Claude about your progress. It reads the whole diary (products, routines, notes, plans) and uses a tool to fetch the specific photos it needs, for example day 1 against today, or before and after starting an active.
- **Photo timeline and compare, streak counter, backup and restore.**
- **Private by design:** no accounts or server. Data stays on the phone; only an Ask question sends the diary and the photos Claude asks for to Anthropic's API.
- **Works offline:** everything except Ask runs with no internet.

## How it works

| Area | Approach |
| --- | --- |
| Platform | Progressive Web App built for iPhone: standalone display, safe-area insets, dark mode, haptics |
| Front end | Plain HTML, CSS and JavaScript, with no frameworks or dependencies |
| Storage | IndexedDB (days, products, photos and thumbnails as blobs, chats). Photos are resized on the device |
| AI | Claude API called directly from the device with the user's own key: streamed responses, adaptive thinking, and a `get_photos` tool the model calls to request specific days and angles. Sonnet 5.5 by default, Opus 5.5 optional |
| Offline | A service worker caches every file, with a content-hash version so updates install automatically |
| Security | A strict Content Security Policy: only the app's own script can run, and network access is limited to the Claude API |

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Credits

Designed and product-managed by Mikey Ong. Built with AI assistance (Claude by Anthropic).
