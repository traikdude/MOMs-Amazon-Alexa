![Paper phrase cards showing a TV play button, a crescent moon and a heart bookmark on an indigo shelf.](assets/banner/banner.png)

# 👵 MOM's Amazon Alexa

A browsable phrasebook for Alexa and Fire TV. Start with what you want to do, such as turning on captions or dimming the lights. Open a command to compare ways to say it, check which phrases need a custom routine, and save favorites for next time.

## 📑 Contents

[Features](#-features) · [Command categories](#-command-categories) · [How it works](#-how-it-works) · [Run locally](#-run-locally) · [Project layout](#-project-layout) · [Contributing](#-contributing) · [License](#-license)

## 🚀 Features

| In the app | What you can do |
|---|---|
| Browse | Choose a category and expand a command to see alternative phrases and usage notes. [Command browser](src/App.tsx) |
| Search | Match words in a phrase, command name, description or note. Try `captions` to find wording for subtitles. [Search implementation](src/App.tsx) |
| Choose familiar wording | Browse by native command or custom routine and use the senior-friendly filter to pick out conversational alternatives. [Phrase annotations](src/constants.ts) · [Filters and badges](src/App.tsx) |
| Keep favorites | Tap the heart beside a phrase to bring it onto the overview. Favorites persist in this browser's local storage. [Favorites implementation](src/App.tsx) |
| Draft a custom command | Walk through the trigger, action and target, then review the details together. The final button clears the draft. [Four-step wizard](src/App.tsx) |

## 🎙️ Command categories

The [phrase catalog](src/constants.ts) groups commands by what the speaker wants to do.

| Category | What to look for |
|---|---|
| 📺 TV General Controls | Power, playback and volume |
| 🎬 Streaming App Launchers | Phrases for opening a streaming app |
| 🔠 Captions & Navigation | Subtitles and moving around the TV interface |
| 💡 Lighting Controls | Switching lights and adjusting brightness |
| 🎵 Audio & Music | Music playback and ambient sounds |
| 💜 Daily Life & Wellbeing | Everyday prompts and reminders |
| 🏠 House-Wide Controls | Commands that bring multiple devices into a routine |

## 🏗️ How it works

The [React entry point](src/main.tsx) mounts a single-page interface. The [catalog](src/constants.ts) supplies the phrases, and the [app](src/App.tsx) builds the overview, browse and search views from them. React and TypeScript power the interface, with Tailwind CSS for styling, Lucide for icons, Motion for transitions and Vite for the build. [Package manifest](package.json) · [Vite configuration](vite.config.ts)

**Current scope.** The app is a reference you read while speaking to your Alexa device. Custom routine setup happens separately in Alexa. The wizard stops at review, and device execution, microphone input and a dedicated print layout are outside the current implementation.

## ⚡ Run locally

From the repository root with Node.js and npm installed:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. The [development script](package.json) requests port 3000.

To type-check, create the static build in `dist/`, and preview that build locally:

```powershell
npm run lint
npm run build
npm run preview
```

The build output can be served by a static web host. The repository supplies the build and local preview commands.

## 🗂️ Project layout

| Path | Responsibility |
|---|---|
| [src/constants.ts](src/constants.ts) | Category definitions, phrase text, routine labels and usage notes |
| [src/App.tsx](src/App.tsx) | Browsing, filtering, favorites and the custom command wizard |
| [src/index.css](src/index.css) | Shared styles and typography |
| [index.html](index.html) · [src/main.tsx](src/main.tsx) | Browser entry and React mounting point |
| [assets/banner](assets/banner) | README artwork, editable vector alternative and social preview |

## 🤝 Contributing

To suggest another way to say a command, edit its phrase list in [the catalog](src/constants.ts). Mark whether it needs a routine, add a note explaining when to use it, then run the type check and build above before opening a pull request.

## 📄 License

Distributed under the [MIT License](LICENSE).
