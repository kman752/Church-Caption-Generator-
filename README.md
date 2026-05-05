# Christ Oasis Tabernacle — Media Caption Generator

A web application that generates SOP-compliant Instagram captions for Christ Oasis Tabernacle sermon posts.

## 📋 Features

- Collects preacher title, full name, and sermon transcript
- Automatically generates all 7 caption sections per official SOP
- Outputs formatted caption ready for Instagram posting
- Validates all required inputs before generating caption
- Pre-post checklist verification

## 📁 Project Structure

```
Church-Caption-Generator-/
├── index.html              # Main web interface
├── css/
│   └── styles.css         # Styling for the web form
├── js/
│   └── caption-generator.js  # Frontend logic
├── lib/
│   └── generator.js       # Core caption generation engine
├── README.md              # This file
└── .gitignore            # Git ignore rules
```

## 🚀 How to Use

1. Open `index.html` in your browser
2. Enter the preacher's title (Pastor, Bishop, Evangelist, etc.)
3. Enter the preacher's full name (first and last)
4. Upload a sermon transcript file or paste the text directly
5. Click "Generate Caption"
6. Review the caption and complete the pre-post checklist
7. Copy the caption to Instagram

## 📝 Caption Structure (7 Sections)

1. **Opening Quote** — Verbatim from transcript (1–2 sentences)
2. **Speaker Hashtag** — #TitleFirstLast in CamelCase
3. **Summary** — 1–2 sentences referencing preacher by title and name
4. **Call to Action** — Fixed: "Visit our YouTube to watch the Full Sermon..."
5. **Service Info** — Fixed: Address, times, and live stream info
6. **Closing Motto** — Fixed: "Times of Refreshing, Always Come from the Presence of the Lord!"
7. **Hashtags** — 13 core tags + speaker hashtag + 0–3 optional topical tags (max 30 total)

## ✅ Requirements

- No external dependencies required for basic functionality
- Pure HTML/CSS/JavaScript frontend
- Node.js optional for extended features

## 📄 License

Created for Christ Oasis Tabernacle
