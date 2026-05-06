# Church Caption Generator
AI-powered Instagram caption generator for Christ Oasis Tabernacle with Claude API integration.

## ✨ Features
- **Claude AI Integration**: Generates precise, transcript-grounded summaries
- **Sermon-Specific Captions**: Summaries reflect actual sermon content, not generic templates
- **SOP Compliance**: Maintains all church branding and fixed messaging
- **Pre-Post Checklist**: Quality assurance before posting to social media
- **File Upload Support**: Upload .txt sermon transcripts

## 🚀 Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Claude API key from [Anthropic](https://console.anthropic.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kman752/Church-Caption-Generator-.git
   cd Church-Caption-Generator-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Copy `.env.example` to `.env`
   - Add your Anthropic API key:
     ```
     ANTHROPIC_API_KEY=your_api_key_here
     PORT=3000
     ```

4. **Start the server**
   ```bash
   npm start
   ```
   The application will run on `http://localhost:3000`

5. **Open in browser**
   Navigate to `http://localhost:3000` and start generating captions!

## 📋 How It Works

1. **Input**: Enter preacher information and paste/upload sermon transcript
2. **Claude Processing**: Backend sends transcript to Claude API with specific constraints
3. **Smart Summary**: Claude generates a precise, 1-2 sentence summary grounded in the sermon
4. **Caption Assembly**: Frontend combines Claude summary with opening quote, hashtags, and fixed sections
5. **Quality Check**: Pre-post checklist verifies all SOP requirements are met
6. **Copy & Post**: Copy the final caption and paste directly to Instagram

## 🎯 Claude Constraints

The Claude integration enforces:
- ✅ Summaries are **specific** to the actual sermon content
- ✅ **NOT generic** or clichéd spiritual language
- ✅ **Grounded in the transcript** with concrete references
- ✅ **Engaging** and compelling for social media
- ✅ Exactly **1-2 sentences**
- ✅ References the **preacher by title and name**

## 📁 Project Structure

```
.
├── index.html                 # Main HTML interface
├── css/styles.css             # Styling
├── js/caption-generator.js    # Frontend logic with Claude API calls
├── lib/generator.js           # Caption assembly utilities
├── server.js                  # Node.js backend with Claude integration
├── package.json               # Dependencies
├── .env.example               # Environment template
└── README.md                  # This file
```

## 📝 Caption Structure (7 Sections)

1. **Opening Quote** — Verbatim from transcript (1–2 sentences)
2. **Speaker Hashtag** — #TitleFirstLast in CamelCase
3. **Summary** — 1–2 sentences referencing preacher by title and name (Claude-generated)
4. **Call to Action** — Fixed: "Visit our YouTube to watch the Full Sermon..."
5. **Service Info** — Fixed: Address, times, and live stream info
6. **Closing Motto** — Fixed: "Times of Refreshing, Always Come from the Presence of the Lord!"
7. **Hashtags** — 13 core tags + speaker hashtag + 0–3 optional topical tags (max 30 total)

## 🌐 Deployment

To deploy on your own server or cloud platform:

### Option 1: Heroku (Free Tier Available)
```bash
heroku create your-app-name
git push heroku main
```

### Option 2: Vercel
```bash
npm install -g vercel
vercel
```

### Option 3: Railway.app
1. Connect your GitHub repo to Railway
2. Add `ANTHROPIC_API_KEY` environment variable
3. Deploy!

### Option 4: GitHub Pages + External Backend
- Keep frontend on GitHub Pages
- Deploy backend to your chosen service
- Update API endpoint in `js/caption-generator.js`

## 📖 API Endpoint

**POST** `/api/generate-caption`

Request:
```json
{
  "title": "Pastor",
  "firstName": "John",
  "lastName": "Smith",
  "transcript": "Full sermon text..."
}
```

Response:
```json
{
  "success": true,
  "summary": "Pastor John Smith brings a powerful message about..."
}
```

## 🛠 Technology Stack
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js, Express
- **AI**: Claude 3.5 Sonnet (Anthropic)
- **Hosting**: Your choice (GitHub Pages for frontend + Node.js hosting for backend)

## ⚙️ Environment Variables

Required in `.env`:
```
ANTHROPIC_API_KEY=sk-ant-xxx...
PORT=3000
```

## 📝 License

Created for **Christ Oasis Tabernacle** — *Times of Refreshing, Always Come from the Presence of the Lord!*

**Address**: 820 California Ave, Dolton, IL 60419
**Services**: Every Sunday 10:30 AM – 12:30 PM
**Live Stream**: Sunday at 11:30 AM on Facebook & YouTube
