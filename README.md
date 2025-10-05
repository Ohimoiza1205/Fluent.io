# Fluent.io

Real-time multilingual video communication platform enabling seamless conversations across language barriers.

## Overview

Fluent.io is a web-based video calling application that provides real-time speech-to-speech translation, allowing participants to communicate naturally in their preferred languages. Built for HackUTA 7, this platform leverages cutting-edge AI and web technologies to create a universal communication experience.

## Features

- **Real-time Translation**: Automatic speech recognition and translation across 29+ languages
- **Natural Voice Synthesis**: AI-powered voice generation that preserves speaker emotion and tone
- **Low-latency Communication**: WebRTC-based peer-to-peer connections for minimal delay
- **Live Subtitles**: Real-time captioning for accessibility and clarity
- **Secure Rooms**: Private conversation spaces with authentication
- **Browser-based**: No installation required - runs entirely in modern web browsers

## Technology Stack

### Frontend
- React 18
- Tailwind CSS
- Three.js
- Vite

### Backend
- Node.js
- TypeScript
- Socket.IO

### Real-time Communication
- WebRTC
- Socket.IO (signaling)

### AI/ML Services
- Web Speech API (Speech-to-Text)
- Google Translate API
- ElevenLabs API (Text-to-Speech)

### Infrastructure
- Supabase (Authentication & Database)
- Vercel (Frontend deployment)
- Railway (Backend deployment)

## Architecture

```
┌─────────────┐     WebRTC      ┌─────────────┐
│   User A    │◄───────────────►│   User B    │
│  (Spanish)  │                 │  (English)  │
└──────┬──────┘                 └──────┬──────┘
       │                               │
       ▼                               ▼
   ┌───────┐                       ┌───────┐
   │  STT  │                       │  STT  │
   └───┬───┘                       └───┬───┘
       │                               │
       ▼                               ▼
┌─────────────┐                 ┌─────────────┐
│ Translation │                 │ Translation │
└──────┬──────┘                 └──────┬──────┘
       │                               │
       ▼                               ▼
   ┌───────┐                       ┌───────┐
   │  TTS  │                       │  TTS  │
   └───┬───┘                       └───┬───┘
       │                               │
       └───────────────┬───────────────┘
                       │
                  ┌────▼────┐
                  │ Socket  │
                  │ Server  │
                  └─────────┘
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Modern web browser with WebRTC support

### Installation

1. Clone the repository
```bash
git clone https://github.com/ohinoyi/fluent-io.git
cd fluent-io
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

Add the following to your `.env` file:
```
VITE_ELEVENLABS_API_KEY=your_elevenlabs_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SOCKET_SERVER_URL=http://localhost:3001
```

4. Start the development server
```bash
npm run dev
```

5. Start the signaling server (in a separate terminal)
```bash
cd video-server
npm install
npm start
```

6. Open http://localhost:5173 in your browser

## Usage

1. **Create or Join Room**: Enter a unique room identifier or generate one automatically
2. **Select Language**: Choose your preferred language from the dropdown menu
3. **Grant Permissions**: Allow browser access to camera and microphone
4. **Start Communication**: Begin speaking in your language - translations happen automatically

## API Configuration

### ElevenLabs
1. Sign up at https://elevenlabs.io
2. Navigate to Profile Settings
3. Copy your API key
4. Add to `.env` as `VITE_ELEVENLABS_API_KEY`

### Supabase
1. Create project at https://supabase.com
2. Copy project URL and anon key from Settings > API
3. Add to `.env` file

## Project Structure

```
fluent-io/
├── src/
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # API clients and utilities
│   ├── pages/           # Route components
│   └── utils/           # Helper functions
├── video-server/        # Socket.IO signaling server
├── public/              # Static assets
├── tests/               # Test suites
└── docs/                # Documentation
```

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Backend (Railway)

1. Create new project in Railway
2. Connect GitHub repository
3. Configure environment variables
4. Deploy video-server directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Performance Considerations

- WebRTC connections are peer-to-peer for optimal latency
- Translation pipeline optimized for sub-300ms processing
- Voice synthesis uses streaming for reduced perceived delay
- Automatic quality adjustment based on network conditions

## Known Limitations

- Maximum 4 participants per room (P2P constraint)
- ElevenLabs API rate limits apply
- Some language pairs may have reduced translation quality
- Browser compatibility: Chrome/Edge recommended

## Future Roadmap

- Selective Forwarding Unit (SFU) for larger meetings
- Mobile application development
- Offline translation caching
- Custom voice training
- Meeting recording and transcription

## License

MIT License - see LICENSE file for details

## Authors

- **Ohinoyi Moiza** - Full Stack Development
- **Peace Enesi** - Frontend & UI/UX Design

## Acknowledgments

- HackUTA 7 organizers and mentors
- ElevenLabs for voice synthesis technology
- Supabase for authentication infrastructure
- The WebRTC community for real-time communication standards

---

Built at HackUTA 7 - October 2025