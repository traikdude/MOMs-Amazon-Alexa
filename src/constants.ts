export interface Phrase {
  text: string;
  type: "native" | "routine";
  note: string;
  senior?: boolean;
}

export interface Command {
  name: string;
  desc: string;
  phrases: Phrase[];
}

export interface Section {
  id: number;
  title: string;
  icon: string;
  color: string;
  description: string;
  nativeCount: number;
  routineCount: number;
  commands: Command[];
}

export const SECTIONS: Section[] = [
  {
    id: 1, title: "TV General Controls", icon: "📺", color: "#6366f1",
    description: "Power, playback, volume, and mute controls for Fire TV",
    nativeCount: 21, routineCount: 50,
    commands: [
      { name: "Turn TV ON", desc: "Powers the Fire TV display on from standby", phrases: [
        { text: "Alexa, turn on the TV", type: "native", note: "Most reliable — say this first" },
        { text: "Alexa, TV on", type: "routine", note: "Short and natural for elderly users" },
        { text: "Alexa, switch on the TV", type: "routine", note: "British-phrasing friendly" },
        { text: "Alexa, turn my TV on", type: "routine", note: "Very conversational phrasing" },
        { text: "Alexa, wake up the TV", type: "routine", note: "Intuitive and memorable", senior: true },
        { text: "Alexa, start the TV", type: "routine", note: "Simple and direct" },
        { text: "Alexa, power on the TV", type: "routine", note: "Slight variation of core phrase" },
      ]},
      { name: "Turn TV OFF", desc: "Powers down/puts the Fire TV into standby mode", phrases: [
        { text: "Alexa, turn off the TV", type: "native", note: "Most reliable — primary phrase" },
        { text: "Alexa, TV off", type: "routine", note: "Quickest to say" },
        { text: "Alexa, shut off the TV", type: "routine", note: "Very natural, everyday phrasing" },
        { text: "Alexa, turn the TV off", type: "routine", note: "Word-order variation" },
        { text: "Alexa, switch off the TV", type: "routine", note: "Common alternative phrasing" },
        { text: "Alexa, power off the TV", type: "routine", note: "Tech-intuitive variation" },
        { text: "Alexa, kill the TV", type: "routine", note: "Casual, fun phrasing" },
        { text: "Alexa, stop the TV", type: "routine", note: "Mom may say this instinctively", senior: true },
      ]},
      { name: "Pause", desc: "Freezes the show mid-screen. Perfect for bathroom breaks or phone calls", phrases: [
        { text: "Alexa, pause", type: "native", note: "Single-word, instant response" },
        { text: "Alexa, pause the TV", type: "native", note: "Slightly more specific" },
        { text: "Alexa, freeze the TV", type: "routine", note: "Very visual, easy to remember" },
        { text: "Alexa, hold on", type: "routine", note: "Natural conversational reflex", senior: true },
        { text: "Alexa, wait a minute", type: "routine", note: "Very natural elder speech pattern", senior: true },
        { text: "Alexa, stop for a moment", type: "routine", note: "Gentle, conversational" },
        { text: "Alexa, hold the TV", type: "routine", note: "Short and punchy" },
        { text: "Alexa, TV pause", type: "routine", note: "Reversed word order variation" },
      ]},
      { name: "Resume / Play", desc: "Continues playing whatever was paused", phrases: [
        { text: "Alexa, resume", type: "native", note: "Clean, single word" },
        { text: "Alexa, play", type: "native", note: "Most intuitive" },
        { text: "Alexa, continue", type: "native", note: "Natural after a pause" },
        { text: "Alexa, keep playing", type: "routine", note: "Conversational continuation", senior: true },
        { text: "Alexa, unpause the TV", type: "routine", note: "Direct reversal of pause" },
        { text: "Alexa, start the TV again", type: "routine", note: "Great for returning to paused show" },
        { text: "Alexa, go ahead", type: "routine", note: "Very natural — like talking to a person", senior: true },
        { text: "Alexa, TV play", type: "routine", note: "Short reversed-order phrase" },
      ]},
      { name: "Stop / End Playback", desc: "Completely stops content (exits, different from pause)", phrases: [
        { text: "Alexa, stop", type: "native", note: "Single-word universal stop" },
        { text: "Alexa, stop the TV", type: "native", note: "More specific to TV" },
        { text: "Alexa, end the show", type: "routine", note: "Intuitive finish command" },
        { text: "Alexa, I'm done watching", type: "routine", note: "Conversational, natural exit", senior: true },
        { text: "Alexa, exit the movie", type: "routine", note: "Good for movies specifically" },
        { text: "Alexa, close the show", type: "routine", note: "Simple and clear" },
      ]},
      { name: "Volume Up", desc: "Raises the TV audio volume", phrases: [
        { text: "Alexa, volume up", type: "native", note: "Standard native command" },
        { text: "Alexa, turn it up", type: "native", note: "Very casual and natural" },
        { text: "Alexa, louder", type: "native", note: "Single word — great for elders" },
        { text: "Alexa, make it louder", type: "routine", note: "Conversational phrasing" },
        { text: "Alexa, turn up the TV", type: "routine", note: "Specific to TV context" },
        { text: "Alexa, raise the volume", type: "routine", note: "Natural phrasing" },
        { text: "Alexa, I can't hear it", type: "routine", note: "🌟 Intuitive elder trigger — maps to volume boost", senior: true },
        { text: "Alexa, boost the volume", type: "routine", note: "Slightly different phrasing" },
      ]},
      { name: "Volume Down", desc: "Lowers the TV audio volume", phrases: [
        { text: "Alexa, volume down", type: "native", note: "Standard native command" },
        { text: "Alexa, turn it down", type: "native", note: "Very casual and natural" },
        { text: "Alexa, quieter", type: "native", note: "Single word — great shorthand" },
        { text: "Alexa, make it quieter", type: "routine", note: "Conversational" },
        { text: "Alexa, lower the volume", type: "routine", note: "Natural phrasing" },
        { text: "Alexa, turn down the TV", type: "routine", note: "TV-specific variation" },
        { text: "Alexa, it's too loud", type: "routine", note: "🌟 Intuitive elder trigger", senior: true },
        { text: "Alexa, soften the volume", type: "routine", note: "Gentle, descriptive phrase" },
      ]},
      { name: "Mute", desc: "Silences the TV completely without pausing it", phrases: [
        { text: "Alexa, mute", type: "native", note: "Single word — fastest command" },
        { text: "Alexa, mute the TV", type: "native", note: "Slightly more specific" },
        { text: "Alexa, silence the TV", type: "routine", note: "Natural phrasing" },
        { text: "Alexa, shush the TV", type: "routine", note: "Fun, casual, memorable" },
        { text: "Alexa, quiet the TV", type: "routine", note: "Simple verb-based command" },
        { text: "Alexa, go quiet", type: "routine", note: "Very short and easy to recall" },
      ]},
      { name: "Unmute", desc: "Restores the TV audio after muting", phrases: [
        { text: "Alexa, unmute", type: "native", note: "Single word — direct reversal" },
        { text: "Alexa, unmute the TV", type: "native", note: "Slightly more specific" },
        { text: "Alexa, bring the sound back", type: "routine", note: "Very conversational, natural", senior: true },
        { text: "Alexa, restore the sound", type: "routine", note: "Clear descriptive command" },
        { text: "Alexa, unsilence the TV", type: "routine", note: "Direct reversal of silence" },
        { text: "Alexa, I can hear now", type: "routine", note: "Intuitive context-based phrase", senior: true },
      ]},
      { name: "Set Volume Level", desc: "Jumps volume to a specific preset level", phrases: [
        { text: "Alexa, set volume to 5", type: "native", note: "Native — 1–10 scale" },
        { text: "Alexa, set volume to 50%", type: "native", note: "Percentage-based" },
        { text: "Alexa, TV comfortable volume", type: "routine", note: "🌟 Maps to Mom's preferred comfort level", senior: true },
        { text: "Alexa, set my volume", type: "routine", note: "Personalized feel" },
        { text: "Alexa, normal volume", type: "routine", note: "Great default reset command", senior: true },
        { text: "Alexa, my usual volume", type: "routine", note: "Very personal, easy to remember", senior: true },
      ]},
    ]
  },
  {
    id: 2, title: "Streaming App Launchers", icon: "🎬", color: "#ec4899",
    description: "Netflix, YouTube, Hulu, Prime Video, and more Fire TV app launchers",
    nativeCount: 20, routineCount: 60,
    commands: [
      { name: "Netflix", desc: "Opens Netflix on Fire TV", phrases: [
        { text: "Alexa, open Netflix", type: "native", note: "The gold-standard phrase" },
        { text: "Alexa, Netflix", type: "native", note: "Single word — often works natively" },
        { text: "Alexa, launch Netflix", type: "native", note: "Alternative launch verb" },
        { text: "Alexa, go to Netflix", type: "routine", note: "Directional, very natural" },
        { text: "Alexa, Netflix time", type: "routine", note: "Casual, fun — mirrors Mom's style", senior: true },
        { text: "Alexa, turn on Netflix", type: "routine", note: "Elderly-intuitive phrasing", senior: true },
        { text: "Alexa, put on Netflix", type: "routine", note: "Very natural elder speech pattern", senior: true },
        { text: "Alexa, I want Netflix", type: "routine", note: "Conversational — she just says what she wants", senior: true },
      ]},
      { name: "YouTube", desc: "Opens YouTube on Fire TV", phrases: [
        { text: "Alexa, open YouTube", type: "native", note: "Standard native command" },
        { text: "Alexa, YouTube", type: "native", note: "Single-word shorthand" },
        { text: "Alexa, launch YouTube", type: "native", note: "Clean alternative" },
        { text: "Alexa, put on YouTube", type: "routine", note: "Natural elder phrase", senior: true },
        { text: "Alexa, YouTube time", type: "routine", note: "Matches Mom's casual style" },
        { text: "Alexa, I want YouTube", type: "routine", note: "Intent-based, very intuitive", senior: true },
      ]},
      { name: "Amazon Prime Video", desc: "Opens Amazon Prime Video on Fire TV", phrases: [
        { text: "Alexa, open Prime Video", type: "native", note: "Most reliable phrase" },
        { text: "Alexa, open Amazon Video", type: "native", note: "Alternative native name" },
        { text: "Alexa, Prime Video", type: "native", note: "Short shorthand" },
        { text: "Alexa, Amazon movies", type: "routine", note: "Descriptive and natural" },
        { text: "Alexa, open my Amazon shows", type: "routine", note: "Personal, conversational", senior: true },
        { text: "Alexa, put on Prime", type: "routine", note: "Short and punchy" },
      ]},
      { name: "Hulu", desc: "Opens the Hulu app on Fire TV", phrases: [
        { text: "Alexa, open Hulu", type: "native", note: "Standard native command" },
        { text: "Alexa, Hulu", type: "native", note: "Single-word shorthand" },
        { text: "Alexa, put on Hulu", type: "routine", note: "Natural elder phrase", senior: true },
        { text: "Alexa, I want to watch Hulu", type: "routine", note: "Full intent phrase — very natural", senior: true },
      ]},
      { name: "Investigation Discovery", desc: "Opens Investigation Discovery streaming app", phrases: [
        { text: "Alexa, open Investigation Discovery", type: "native", note: "Full native name" },
        { text: "Alexa, Investigation ID", type: "routine", note: "Mirrors Mom's original Google shortcut" },
        { text: "Alexa, murder shows", type: "routine", note: "🌟 Extremely memorable and natural", senior: true },
        { text: "Alexa, crime channel", type: "routine", note: "Common description for ID content", senior: true },
        { text: "Alexa, detective shows", type: "routine", note: "Content-based trigger" },
      ]},
      { name: "Univision", desc: "Opens the Univision streaming app on Fire TV", phrases: [
        { text: "Alexa, open Univision", type: "native", note: "Standard native command" },
        { text: "Alexa, Spanish channel", type: "routine", note: "Extremely intuitive — genre-based", senior: true },
        { text: "Alexa, Spanish TV", type: "routine", note: "Natural phrasing", senior: true },
        { text: "Alexa, mis novelas", type: "routine", note: "🌟 Bilingual phrase — beautifully personal", senior: true },
        { text: "Alexa, put on Univision", type: "routine", note: "Familiar action verb" },
      ]},
      { name: "WOW Presents Plus", desc: "Opens WOW Presents Plus (RuPaul's Drag Race content)", phrases: [
        { text: "Alexa, open WOW Presents Plus", type: "native", note: "Full official name" },
        { text: "Alexa, Drag Race", type: "routine", note: "Most memorable — content-based", senior: true },
        { text: "Alexa, Drag Race time", type: "routine", note: "Mirrors Mom's Google shortcut" },
        { text: "Alexa, RuPaul", type: "routine", note: "Icon-based — she'll never forget this", senior: true },
        { text: "Alexa, Sashay away", type: "routine", note: "🌟 Iconic catchphrase trigger — unforgettable", senior: true },
      ]},
      { name: "Xfinity", desc: "Opens the Xfinity Stream app for cable content", phrases: [
        { text: "Alexa, open Xfinity", type: "native", note: "Standard native command" },
        { text: "Alexa, cable TV", type: "routine", note: "Generic, intuitive for all ages", senior: true },
        { text: "Alexa, live TV", type: "routine", note: "Content-context phrase" },
        { text: "Alexa, regular TV", type: "routine", note: "🌟 This is how seniors actually talk about cable", senior: true },
        { text: "Alexa, my channels", type: "routine", note: "Short possessive phrase" },
      ]},
      { name: "Home Screen", desc: "Returns Fire TV to the main home screen", phrases: [
        { text: "Alexa, go home", type: "native", note: "Standard Fire TV home command" },
        { text: "Alexa, home screen", type: "native", note: "Direct screen reference" },
        { text: "Alexa, take me home", type: "routine", note: "Warm and intuitive", senior: true },
        { text: "Alexa, start over", type: "routine", note: "What she'll say when lost", senior: true },
        { text: "Alexa, I'm lost", type: "routine", note: "🔥 THE most important senior-friendly trigger", senior: true },
      ]},
      { name: "Go Back", desc: "Navigates back one screen on Fire TV", phrases: [
        { text: "Alexa, go back", type: "native", note: "Standard Fire TV back command" },
        { text: "Alexa, back", type: "native", note: "Single-word version" },
        { text: "Alexa, take me back", type: "routine", note: "Natural elder phrasing" },
        { text: "Alexa, undo that", type: "routine", note: "Very conversational recovery phrase", senior: true },
      ]},
    ]
  },
  {
    id: 3, title: "Captions & Navigation", icon: "🔠", color: "#14b8a6",
    description: "Closed captions, TV guide, skip, rewind, and replay controls",
    nativeCount: 21, routineCount: 70,
    commands: [
      { name: "Captions ON", desc: "Activates subtitles on current content", phrases: [
        { text: "Alexa, turn on captions", type: "native", note: "Most reliable Fire TV command" },
        { text: "Alexa, captions on", type: "native", note: "Short and direct" },
        { text: "Alexa, turn on subtitles", type: "routine", note: "Many elders say subtitles not captions", senior: true },
        { text: "Alexa, show the words", type: "routine", note: "♿ Simple, plain-language command", senior: true },
        { text: "Alexa, put the words on", type: "routine", note: "Extremely natural elder phrasing", senior: true },
        { text: "Alexa, I can't read the screen", type: "routine", note: "♿ Instinctive elder request", senior: true },
      ]},
      { name: "Captions OFF", desc: "Hides the caption text from the screen", phrases: [
        { text: "Alexa, turn off captions", type: "native", note: "Standard native command" },
        { text: "Alexa, captions off", type: "native", note: "Short and punchy" },
        { text: "Alexa, hide the words", type: "routine", note: "Perfect mirror of show the words", senior: true },
        { text: "Alexa, take the words off", type: "routine", note: "Natural reversal phrase", senior: true },
      ]},
      { name: "Skip Forward", desc: "Jumps ahead in content — skipping commercials", phrases: [
        { text: "Alexa, fast forward", type: "native", note: "Standard Fire TV command" },
        { text: "Alexa, skip ahead", type: "native", note: "Natural action phrase" },
        { text: "Alexa, skip forward 30 seconds", type: "native", note: "Precise timed skip" },
        { text: "Alexa, skip the commercial", type: "routine", note: "🔥 THE most natural elder skip command", senior: true },
        { text: "Alexa, skip this part", type: "routine", note: "Simple and direct", senior: true },
        { text: "Alexa, past the commercial", type: "routine", note: "Very specific elder context", senior: true },
      ]},
      { name: "Rewind", desc: "Goes backward in content to re-watch something missed", phrases: [
        { text: "Alexa, rewind", type: "native", note: "Standard Fire TV command" },
        { text: "Alexa, skip back 30 seconds", type: "native", note: "Precise timed rewind" },
        { text: "Alexa, I missed that", type: "routine", note: "♿ Most natural elder trigger", senior: true },
        { text: "Alexa, what did they say", type: "routine", note: "♿ Rewinds + turns on captions combo", senior: true },
      ]},
      { name: "Show TV Guide", desc: "Opens the on-screen TV guide", phrases: [
        { text: "Alexa, TV guide", type: "native", note: "Standard Fire TV command" },
        { text: "Alexa, what's on TV", type: "routine", note: "🌟 The most natural elder question", senior: true },
        { text: "Alexa, show me what's on", type: "routine", note: "Very natural elder phrasing", senior: true },
        { text: "Alexa, what can I watch", type: "routine", note: "Intent-based, conversational", senior: true },
      ]},
      { name: "Replay / Restart", desc: "Restarts current episode or movie from beginning", phrases: [
        { text: "Alexa, restart", type: "native", note: "Standard Fire TV restart" },
        { text: "Alexa, start over", type: "native", note: "Natural phrasing" },
        { text: "Alexa, play it again", type: "routine", note: "Classic, timeless phrase", senior: true },
        { text: "Alexa, watch it again", type: "routine", note: "Conversational, natural", senior: true },
      ]},
    ]
  },
  {
    id: 4, title: "Lighting Controls", icon: "💡", color: "#f59e0b",
    description: "3 master controls + 12 mood presets (Candlelight, Sunset, Twilight, etc.)",
    nativeCount: 14, routineCount: 113,
    commands: [
      { name: "LUMOS — All Lights ON", desc: "Turns ON all lights instantly (Harry Potter spell!)", phrases: [
        { text: "Alexa, Lumos", type: "routine", note: "🌟 Her original magical command — keep it!", senior: true },
        { text: "Alexa, lights on", type: "native", note: "Simplest possible phrase" },
        { text: "Alexa, turn on the lights", type: "native", note: "Standard native command" },
        { text: "Alexa, it's too dark", type: "routine", note: "Natural complaint-to-action trigger", senior: true },
        { text: "Alexa, let there be light", type: "routine", note: "Classic and memorable" },
        { text: "Alexa, I need light", type: "routine", note: "Instinctive elder phrase", senior: true },
      ]},
      { name: "KNOX — All Lights OFF", desc: "Turns OFF all lights instantly — total darkness", phrases: [
        { text: "Alexa, Knox", type: "routine", note: "🌟 Her original command — preserve it!", senior: true },
        { text: "Alexa, lights off", type: "native", note: "Simplest possible phrase" },
        { text: "Alexa, turn off the lights", type: "native", note: "Standard native command" },
        { text: "Alexa, I'm going to sleep", type: "routine", note: "Intent-based — ultra natural", senior: true },
        { text: "Alexa, good night lights", type: "routine", note: "Sweet bedtime trigger" },
      ]},
      { name: "LUMOS MAXIMA — Max Brightness", desc: "Sets ALL lights to full 100% brightness", phrases: [
        { text: "Alexa, Lumos Maxima", type: "routine", note: "🌟 Her original Harry Potter command!", senior: true },
        { text: "Alexa, full brightness", type: "native", note: "Direct brightness command" },
        { text: "Alexa, lights all the way up", type: "routine", note: "Very natural elder phrasing", senior: true },
        { text: "Alexa, I really need to see", type: "routine", note: "♿ Accessibility-driven phrase", senior: true },
      ]},
      { name: "🕯️ Candlelight", desc: "Warm, flickering amber glow — cozy & soft", phrases: [
        { text: "Alexa, candlelight", type: "routine", note: "Her preset name", senior: true },
        { text: "Alexa, cozy lighting", type: "routine", note: "Descriptive mood phrase", senior: true },
        { text: "Alexa, soft light", type: "routine", note: "Simple and natural", senior: true },
      ]},
      { name: "☀️ Daylight", desc: "Natural, neutral white mimicking outdoor daylight", phrases: [
        { text: "Alexa, daylight", type: "routine", note: "Preset name", senior: true },
        { text: "Alexa, normal light", type: "routine", note: "Instinctive phrasing", senior: true },
        { text: "Alexa, regular light", type: "routine", note: "How she'll ask for it naturally", senior: true },
      ]},
      { name: "🌅 Sunset", desc: "Warm orange-amber glow — perfect for winding down", phrases: [
        { text: "Alexa, sunset", type: "routine", note: "Preset name", senior: true },
        { text: "Alexa, evening colors", type: "routine", note: "Descriptive alternative", senior: true },
        { text: "Alexa, it's getting late", type: "routine", note: "Natural time-based trigger", senior: true },
      ]},
      { name: "🌌 Twilight", desc: "Deep, dim, cool-blue — perfect for movie watching", phrases: [
        { text: "Alexa, twilight", type: "routine", note: "Preset name", senior: true },
        { text: "Alexa, movie light", type: "routine", note: "Activity-based trigger", senior: true },
        { text: "Alexa, TV watching light", type: "routine", note: "Context-specific", senior: true },
      ]},
      { name: "🌄 Sunrise", desc: "Soft morning light — gentle wake-up lighting", phrases: [
        { text: "Alexa, sunrise", type: "routine", note: "Preset name", senior: true },
        { text: "Alexa, morning light", type: "routine", note: "Time-based trigger", senior: true },
        { text: "Alexa, good morning light", type: "routine", note: "Greeting-style trigger", senior: true },
      ]},
      { name: "Other Presets", desc: "Cool White, Incandescent, Ivory, Warm White, Eclipse, Pluto, Uranus", phrases: [
        { text: "Alexa, cool white", type: "routine", note: "Bright crisp white for reading" },
        { text: "Alexa, reading light", type: "routine", note: "Activity-based alias for Cool White", senior: true },
        { text: "Alexa, warm white", type: "routine", note: "Gentle, cozy warm light" },
        { text: "Alexa, my usual light", type: "routine", note: "Personal daily reset phrase", senior: true },
        { text: "Alexa, nightlight", type: "routine", note: "Sets to 10% warm glow for nighttime", senior: true },
        { text: "Alexa, a little dimmer", type: "routine", note: "Gradual adjustment — she'll love this", senior: true },
        { text: "Alexa, a little brighter", type: "routine", note: "Gradual adjustment up", senior: true },
      ]},
    ]
  },
  {
    id: 5, title: "Audio & Music", icon: "🎵", color: "#8b5cf6",
    description: "Volume, playback, 15+ music genres, ambient sounds, and daily music schedule",
    nativeCount: 49, routineCount: 133,
    commands: [
      { name: "Volume Up (Speaker)", desc: "Raises volume on Mom's Echo speaker", phrases: [
        { text: "Alexa, volume up", type: "native", note: "Standard command" },
        { text: "Alexa, louder", type: "native", note: "Single word — fastest" },
        { text: "Alexa, I can't hear the music", type: "routine", note: "Elder instinct phrase", senior: true },
        { text: "Alexa, speak up", type: "routine", note: "Elder classic phrase", senior: true },
      ]},
      { name: "Volume Down (Speaker)", desc: "Lowers volume on Mom's Echo speaker", phrases: [
        { text: "Alexa, volume down", type: "native", note: "Standard command" },
        { text: "Alexa, quieter", type: "native", note: "Single word" },
        { text: "Alexa, not so loud", type: "routine", note: "Classic elder phrase", senior: true },
        { text: "Alexa, a little softer", type: "routine", note: "Gentle, natural phrasing", senior: true },
      ]},
      { name: "Play Music", desc: "Starts playing music on her Echo speaker", phrases: [
        { text: "Alexa, play music", type: "native", note: "Standard play command" },
        { text: "Alexa, put some music on", type: "routine", note: "Classic elder phrasing", senior: true },
        { text: "Alexa, I want music", type: "routine", note: "Intent-based phrase", senior: true },
        { text: "Alexa, play something nice", type: "routine", note: "Subjective but charming" },
      ]},
      { name: "Pause / Stop Music", desc: "Pauses or fully stops music playback", phrases: [
        { text: "Alexa, pause", type: "native", note: "Universal single-word pause" },
        { text: "Alexa, stop the music", type: "native", note: "Music-specific stop" },
        { text: "Alexa, that's enough music", type: "routine", note: "Conversational finish", senior: true },
        { text: "Alexa, I'm done", type: "routine", note: "Simplest possible exit phrase", senior: true },
      ]},
      { name: "Next / Previous / Replay Song", desc: "Navigate between tracks", phrases: [
        { text: "Alexa, next song", type: "native", note: "Standard command" },
        { text: "Alexa, I don't like this one", type: "routine", note: "Instinctive elder reaction", senior: true },
        { text: "Alexa, previous song", type: "native", note: "Standard command" },
        { text: "Alexa, I liked that one", type: "routine", note: "Natural preference expression", senior: true },
        { text: "Alexa, play it again", type: "routine", note: "Timeless, beautiful phrase", senior: true },
        { text: "Alexa, that was beautiful", type: "routine", note: "Reaction-to-replay phrase", senior: true },
      ]},
      { name: "🎼 Music Genres", desc: "15+ genres: Classical, Latino, Pop, Rock, R&B, and more", phrases: [
        { text: "Alexa, play classical music", type: "native", note: "Classical / orchestral" },
        { text: "Alexa, música latina", type: "native", note: "Latino music — bilingual trigger", senior: true },
        { text: "Alexa, play relaxing music", type: "native", note: "Chill / easy listening" },
        { text: "Alexa, no words music", type: "routine", note: "🌟 Perfect plain-language for instrumental", senior: true },
        { text: "Alexa, old school music", type: "routine", note: "60s/70s/80s classics", senior: true },
        { text: "Alexa, church music", type: "routine", note: "Gospel/hymns playlist", senior: true },
        { text: "Alexa, something happy", type: "routine", note: "Mood-lifting playlist", senior: true },
        { text: "Alexa, love songs please", type: "routine", note: "Romantic ballads", senior: true },
      ]},
      { name: "🌿 Ambient & Sleep Sounds", desc: "White noise, rain, ocean, and sleep Routines", phrases: [
        { text: "Alexa, play rain sounds", type: "native", note: "Gentle rainfall — calming" },
        { text: "Alexa, play ocean sounds", type: "native", note: "Waves on the beach — soothing" },
        { text: "Alexa, I can't sleep", type: "routine", note: "💜 Sleep sounds + dim lights combo", senior: true },
        { text: "Alexa, help me sleep", type: "routine", note: "Soft ambient + dim lights combo", senior: true },
        { text: "Alexa, play white noise", type: "native", note: "Steady background static for sleep" },
      ]},
    ]
  },
  {
    id: 6, title: "Daily Life & Wellbeing", icon: "💜", color: "#e11d48",
    description: "Morning/night mega-routines, calls, safety, medication, joy & companionship",
    nativeCount: 32, routineCount: 73,
    commands: [
      { name: "⭐ Good Morning Mega-Routine", desc: "Full morning sequence: lights, weather, calendar, music", phrases: [
        { text: "Alexa, good morning", type: "routine", note: "🌟 Primary daily morning phrase", senior: true },
        { text: "Alexa, I'm up", type: "routine", note: "Natural wake signal", senior: true },
        { text: "Alexa, I'm awake", type: "routine", note: "Conversational waking phrase", senior: true },
        { text: "Alexa, rise and shine", type: "routine", note: "Fun and energetic" },
      ]},
      { name: "🌙 Good Night Mega-Routine", desc: "Full bedtime: TV off, lights dim, rain sounds, love message", phrases: [
        { text: "Alexa, good night", type: "routine", note: "🌟 Primary bedtime phrase", senior: true },
        { text: "Alexa, bedtime", type: "routine", note: "Short and direct", senior: true },
        { text: "Alexa, I'm tired", type: "routine", note: "💜 Emotional state-based trigger", senior: true },
        { text: "Alexa, night night", type: "routine", note: "Warm, affectionate phrasing", senior: true },
        { text: "Alexa, turn everything off", type: "routine", note: "Complete shutdown command", senior: true },
      ]},
      { name: "💜 Goodnight Mom Connection", desc: "Your command to send Mom a bedtime message from anywhere", phrases: [
        { text: "Alexa, goodnight Mom", type: "routine", note: "💜 Erik → Mom's Echo: Goodnight message" },
        { text: "Alexa, tell Mom good morning", type: "routine", note: "💜 Morning message to Mom" },
        { text: "Alexa, tell Mom I love her", type: "routine", note: "💜 Message: I love you, Mom. Always." },
        { text: "Alexa, check on Mom", type: "routine", note: "💜 Ask her to call you" },
      ]},
      { name: "☎️ Calling & Connection", desc: "Direct calling, Drop In, and messaging", phrases: [
        { text: "Alexa, call Erik", type: "native", note: "Direct Alexa-to-Alexa call" },
        { text: "Alexa, call my son", type: "routine", note: "Maps 'my son' → Erik's contact", senior: true },
        { text: "Alexa, I need Erik", type: "routine", note: "💜 Urgent but natural call trigger", senior: true },
        { text: "Alexa, drop in on Erik", type: "native", note: "Instant two-way audio connection" },
        { text: "Alexa, tell Erik I'm okay", type: "routine", note: "💜 Peace-of-mind check-in", senior: true },
      ]},
      { name: "🚨 Safety & Emergency", desc: "Critical safety commands — Drop In, 911, fall detection", phrases: [
        { text: "Alexa, call 911", type: "native", note: "🚨 Dials emergency services" },
        { text: "Alexa, I need help", type: "routine", note: "🚨 Drop In to Erik's device instantly", senior: true },
        { text: "Alexa, I fell", type: "routine", note: "🚨 Lights 100% + Drop In + calm announce", senior: true },
        { text: "Alexa, something's wrong", type: "routine", note: "🚨 Drop In to Erik immediately", senior: true },
        { text: "Alexa, I'm scared", type: "routine", note: "💜🚨 Lights full + Drop In to Erik", senior: true },
        { text: "Alexa, it's an emergency", type: "routine", note: "🚨 Lights + Drop In + notification" },
      ]},
      { name: "🌤️ Weather & Time", desc: "Weather forecasts, temperature, time, and date", phrases: [
        { text: "Alexa, what's the weather?", type: "native", note: "Current conditions", senior: true },
        { text: "Alexa, do I need an umbrella?", type: "native", note: "🌟 Rain advisory — intuitive", senior: true },
        { text: "Alexa, should I wear a jacket?", type: "routine", note: "Clothing advisory", senior: true },
        { text: "Alexa, what time is it?", type: "native", note: "Current time", senior: true },
        { text: "Alexa, what day is it?", type: "native", note: "Current day and date", senior: true },
      ]},
      { name: "💊 Medication & Health", desc: "Medication reminders, hydration, and health check-ins", phrases: [
        { text: "Alexa, medicine time", type: "routine", note: "💜 Triggers medication reminder", senior: true },
        { text: "Alexa, did I take my medicine?", type: "routine", note: "💜 Confirmation check", senior: true },
        { text: "Alexa, remind me to drink water every 2 hours", type: "native", note: "💜 Hydration reminder" },
      ]},
      { name: "😊 Joy & Companionship", desc: "Jokes, stories, compliments, and daily companion commands", phrases: [
        { text: "Alexa, tell me a joke", type: "native", note: "Tells a clean, funny joke", senior: true },
        { text: "Alexa, tell me something good", type: "native", note: "Shares a positive news story", senior: true },
        { text: "Alexa, I'm lonely", type: "routine", note: "💜 Warm response + music + Drop In alert to Erik", senior: true },
        { text: "Alexa, make me smile", type: "routine", note: "💜 Joke + compliment combo Routine" },
        { text: "Alexa, how are you?", type: "native", note: "She talks TO Alexa — companionship", senior: true },
        { text: "Alexa, sing me a song", type: "native", note: "Alexa sings!" },
      ]},
    ]
  },
  {
    id: 7, title: "House-Wide Controls", icon: "🏠", color: "#059669",
    description: "Whole-home lighting, room-by-room, climate, security, and mega scene modes",
    nativeCount: 41, routineCount: 70,
    commands: [
      { name: "All Lights ON/OFF (House)", desc: "Every light in every room simultaneously", phrases: [
        { text: "Alexa, turn on all the lights", type: "native", note: "Standard native command" },
        { text: "Alexa, all lights off", type: "routine", note: "Emphatic whole-home off" },
        { text: "Alexa, it's too dark in here", type: "routine", note: "Natural complaint-to-action", senior: true },
        { text: "Alexa, everything off", type: "routine", note: "Total shutdown phrase", senior: true },
      ]},
      { name: "Room-by-Room Controls", desc: "Living Room, Bedroom, Kitchen, Bathroom, Hallway", phrases: [
        { text: "Alexa, living room lights on", type: "native", note: "Living room ON" },
        { text: "Alexa, bedroom lights off", type: "native", note: "Bedroom OFF" },
        { text: "Alexa, kitchen lights on", type: "native", note: "Kitchen ON" },
        { text: "Alexa, bathroom please", type: "routine", note: "♿ 15% warm — 3AM bathroom trips", senior: true },
        { text: "Alexa, I'm cooking", type: "routine", note: "Kitchen full bright + cooking music", senior: true },
        { text: "Alexa, bedside light", type: "routine", note: "💜 Dims to 20% warm — reading in bed" },
      ]},
      { name: "🌡️ Climate & Fan Controls", desc: "Thermostat, fan speed, and comfort phrases", phrases: [
        { text: "Alexa, I'm cold", type: "routine", note: "🌟 Raises thermostat by 3°", senior: true },
        { text: "Alexa, I'm hot", type: "routine", note: "🌟 Lowers thermostat by 3°", senior: true },
        { text: "Alexa, bedtime temperature", type: "routine", note: "💜 Sets to 68° — optimal sleep temp" },
        { text: "Alexa, turn on the fan", type: "native", note: "Fan ON at current speed" },
        { text: "Alexa, I need a breeze", type: "routine", note: "Fan ON medium speed", senior: true },
      ]},
      { name: "🏡 I'm Home / I'm Leaving", desc: "Arrival and departure mega-routines", phrases: [
        { text: "Alexa, I'm home", type: "routine", note: "🌟 Lights ON, welcome music, warm greeting", senior: true },
        { text: "Alexa, I'm leaving", type: "routine", note: "🌟 All OFF, thermostat eco, locks secured", senior: true },
        { text: "Alexa, bye bye house", type: "routine", note: "Charming, elder-natural phrase", senior: true },
        { text: "Alexa, lock it up", type: "routine", note: "Security-focused phrase" },
      ]},
      { name: "🎭 Whole Home Scene Modes", desc: "Day, Night, Movie, Party, Relax, Alert, Away, Morning", phrases: [
        { text: "Alexa, day mode", type: "routine", note: "All rooms daylight 75%, 72°, soft music" },
        { text: "Alexa, night mode", type: "routine", note: "Hallway 5%, bath 10%, 68°, rain sounds" },
        { text: "Alexa, movie mode", type: "routine", note: "Living room 10%, others off, 71°" },
        { text: "Alexa, relax mode", type: "routine", note: "All rooms 30% warm, 72°, chill music" },
        { text: "Alexa, alert mode", type: "routine", note: "🚨 ALL rooms 100% bright — emergency" },
        { text: "Alexa, away mode", type: "routine", note: "All OFF, eco temp, secured" },
      ]},
      { name: "📢 Remote Monitoring", desc: "Erik's commands to check on Mom's home from anywhere", phrases: [
        { text: "Alexa, drop in on Mom's room", type: "native", note: "🔥 Instant two-way audio" },
        { text: "Alexa, turn on Mom's lights", type: "native", note: "🔥 Safety check remotely" },
        { text: "Alexa, announce checking on Mom", type: "native", note: "🔥 She knows you're thinking of her" },
        { text: "Alexa, set Mom's thermostat to 72", type: "native", note: "🔥 Comfort care from a distance" },
      ]},
    ]
  }
];
