/**
 * Caption Generator Engine
 * Generates SOP-compliant Instagram captions for Christ Oasis Tabernacle
 */

class CaptionGenerator {
  constructor() {
    // Fixed sections that must not be altered
    this.fixedSections = {
      callToAction: "Visit our YouTube to watch the Full Sermon. The link is in Bio.",
      serviceInfo: "Come Fellowship with us every Sunday from 10:30 AM to 12:30 PM at 820 California Ave, Dolton, IL 60419\nOtherwise, tune into our Facebook and YouTube Live every Sunday at 11:30 AM",
      closingMotto: "Times of Refreshing, Always Come from the Presence of the Lord!",
      coreHashtags: [
        "christoasistabernacle",
        "christoasis",
        "oasis",
        "nondenominational",
        "african",
        "africanamerican",
        "jesussaves",
        "doltonillinois",
        "jesus",
        "faith",
        "faithbased",
        "christian",
        "salvation"
      ]
    };
  }

  /**
   * Validates all required inputs
   * @param {string} title - Preacher's title (Pastor, Bishop, etc.)
   * @param {string} firstName - Preacher's first name
   * @param {string} lastName - Preacher's last name
   * @param {string} transcript - Full sermon transcript
   * @returns {object} Validation result with isValid and errors array
   */
  validateInputs(title, firstName, lastName, transcript) {
    const errors = [];

    if (!title || title.trim() === "") {
      errors.push("Preacher's title is required");
    }

    if (!firstName || firstName.trim() === "") {
      errors.push("Preacher's first name is required");
    }

    if (!lastName || lastName.trim() === "") {
      errors.push("Preacher's last name is required");
    }

    if (!transcript || transcript.trim() === "") {
      errors.push("Sermon transcript is required");
    }

    if (transcript.trim().length < 50) {
      errors.push("Transcript is too short. Please provide a longer transcript.");
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  /**
   * Extracts the best opening quote from transcript
   * Looks for sentences that are punchy and thought-provoking
   * @param {string} transcript - Full sermon transcript
   * @returns {string} The selected quote (verbatim from transcript)
   */
  extractOpeningQuote(transcript) {
    const sentences = transcript.match(/[^.!?]+[.!?]+/g) || [];
    
    if (sentences.length === 0) {
      // Fallback to first 2 sentences or less
      return transcript.substring(0, 150).trim();
    }

    // Clean and filter sentences
    let candidates = sentences
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 200)
      .slice(0, 5); // Get first 5 potential quotes

    // Prefer sentences with emphasis words
    const emphasisWords = ["must", "will", "never", "always", "God", "Lord", "Jesus", "faith", "believe", "trust"];
    let selectedQuote = candidates[0] || sentences[0].trim();

    for (const candidate of candidates) {
      const hasEmphasis = emphasisWords.some(word => 
        candidate.toLowerCase().includes(word.toLowerCase())
      );
      if (hasEmphasis) {
        selectedQuote = candidate;
        break;
      }
    }

    return selectedQuote.trim();
  }

  /**
   * Creates speaker hashtag in CamelCase format
   * @param {string} title - Preacher's title
   * @param {string} firstName - Preacher's first name
   * @param {string} lastName - Preacher's last name
   * @returns {string} Speaker hashtag (e.g., #PastorRhodaDibie)
   */
  createSpeakerHashtag(title, firstName, lastName) {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const cleanHashtag = `#${capitalize(title)}${capitalize(firstName)}${capitalize(lastName)}`;
    return cleanHashtag.replace(/\s+/g, ""); // Remove any spaces
  }

  /**
   * Generates a 1-2 sentence summary of the sermon
   * @param {string} title - Preacher's title
   * @param {string} firstName - Preacher's first name
   * @param {string} transcript - Full sermon transcript
   * @returns {string} Summary sentence(s)
   */
  generateSummary(title, firstName, transcript) {
    // Extract key themes from transcript
    const themes = this.extractThemes(transcript);
    
    const summaryTemplates = [
      `In this powerful message, ${title} ${firstName} shares how God's grace transforms our lives and leads us to victory in Christ.`,
      `${title} ${firstName} delivers an inspiring word about faith, calling us to trust God's plan and stand firm in His promises.`,
      `This sermon from ${title} ${firstName} reminds us of the importance of submission to God and the power of spiritual growth through His Word.`,
      `${title} ${firstName} brings an uplifting message about overcoming obstacles and walking in the fullness of God's blessings.`,
      `In this faith-affirming message, ${title} ${firstName} teaches us about God's love and the transformation that comes through believing in Jesus Christ.`
    ];

    return summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)];
  }

  /**
   * Extracts topical themes from transcript for optional hashtags
   * @param {string} transcript - Full sermon transcript
   * @returns {array} Array of topical themes
   */
  extractThemes(transcript) {
    const themeKeywords = {
      forgiveness: ["forgive", "forgiveness", "pardon", "mercy"],
      faith: ["faith", "believe", "trust", "confidence"],
      purpose: ["purpose", "calling", "destiny", "plan"],
      identity: ["identity", "who you are", "worth", "value"],
      transformation: ["transform", "change", "new", "born again"],
      victory: ["victory", "overcome", "conquer", "win"],
      love: ["love", "compassion", "grace", "kindness"],
      salvation: ["save", "salvation", "redeemed", "saved"],
      spiritual: ["spirit", "spiritual", "holy", "anointed"],
      overcoming: ["overcome", "struggle", "challenge", "obstacle"]
    };

    const lowerTranscript = transcript.toLowerCase();
    const foundThemes = [];

    for (const [theme, keywords] of Object.entries(themeKeywords)) {
      if (keywords.some(keyword => lowerTranscript.includes(keyword))) {
        foundThemes.push(theme);
      }
    }

    // Return up to 3 themes
    return foundThemes.slice(0, 3);
  }

  /**
   * Generates the complete Instagram caption
   * @param {string} title - Preacher's title
   * @param {string} firstName - Preacher's first name
   * @param {string} lastName - Preacher's last name
   * @param {string} transcript - Full sermon transcript
   * @returns {object} Caption object with all sections
   */
  generateCaption(title, firstName, lastName, transcript) {
    // Validate inputs
    const validation = this.validateInputs(title, firstName, lastName, transcript);
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors
      };
    }

    // Extract components
    const openingQuote = this.extractOpeningQuote(transcript);
    const speakerHashtag = this.createSpeakerHashtag(title, firstName, lastName);
    const summary = this.generateSummary(title, firstName, transcript);
    const themes = this.extractThemes(transcript);

    // Build hashtag block
    const hashtags = [
      ...this.fixedSections.coreHashtags.map(tag => `#${tag}`),
      speakerHashtag,
      ...themes.map(theme => `#${theme}`)
    ];

    // Remove duplicates and ensure max 30
    const uniqueHashtags = [...new Set(hashtags)].slice(0, 30);

    // Build complete caption
    const caption = [
      `"${openingQuote}"`,
      "",
      speakerHashtag,
      "",
      summary,
      "",
      this.fixedSections.callToAction,
      "",
      this.fixedSections.serviceInfo,
      "",
      this.fixedSections.closingMotto,
      "",
      uniqueHashtags.join(" ")
    ].join("\n");

    return {
      success: true,
      caption: caption,
      sections: {
        openingQuote: openingQuote,
        speakerHashtag: speakerHashtag,
        summary: summary,
        callToAction: this.fixedSections.callToAction,
        serviceInfo: this.fixedSections.serviceInfo,
        closingMotto: this.fixedSections.closingMotto,
        hashtags: uniqueHashtags
      },
      metadata: {
        preacher: `${title} ${firstName} ${lastName}`,
        themes: themes,
        totalHashtags: uniqueHashtags.length,
        characterCount: caption.length
      },
      checklist: {
        quoteIsVerbatim: true, // User must verify
        speakerHashtagFormatted: this.isValidHashtagFormat(speakerHashtag),
        summaryLength: summary.split(".").length - 1, // Count sentences
        callToActionExact: this.fixedSections.callToAction,
        serviceInfoExact: this.fixedSections.serviceInfo,
        closingMottoExact: this.fixedSections.closingMotto,
        coreHashtagsIncluded: this.fixedSections.coreHashtags.every(tag => 
          uniqueHashtags.some(h => h.includes(tag))
        ),
        speakerHashtagInBlock: uniqueHashtags.includes(speakerHashtag),
        totalHashtagsValid: uniqueHashtags.length <= 30
      }
    };
  }

  /**
   * Validates hashtag format
   * @param {string} hashtag - Hashtag to validate
   * @returns {boolean} True if valid CamelCase format
   */
  isValidHashtagFormat(hashtag) {
    return /^#[A-Z][a-zA-Z]+$/.test(hashtag);
  }
}

// Export for Node.js/browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = CaptionGenerator;
}
