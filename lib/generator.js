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
    const emphasisWords = ["must", "will", "never", "always", "God", "Lord", "Jesus", "faith", "believe", "trust", "worse", "change", "mercy"];
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
   * Extracts a significant key phrase from the transcript
   * Looks for impactful statements that summarize the sermon's core message
   * @param {string} transcript - Full sermon transcript
   * @returns {string} A key phrase from the sermon or empty string
   */
  extractKeyPhrase(transcript) {
    // Extract sentences that contain multiple emphasis keywords
    const sentences = transcript.match(/[^.!?]+[.!?]+/g) || [];
    const emphasisWords = ["God", "Lord", "Jesus", "believe", "faith", "transform", "victory", "promise", "power", "anointed", "blessed", "world", "worse", "mercy", "change"];
    
    let bestPhrase = "";
    let bestScore = 0;
    
    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (trimmed.length > 30 && trimmed.length < 160) {
        const score = emphasisWords.filter(word => 
          trimmed.toLowerCase().includes(word.toLowerCase())
        ).length;
        
        if (score > bestScore) {
          bestScore = score;
          bestPhrase = trimmed;
        }
      }
    }
    
    // Return phrase in a way that flows naturally in summary context
    return bestPhrase ? bestPhrase.substring(0, 120).trim() : "";
  }

  /**
   * Generates a 1-2 sentence summary of the sermon
   * Extracts specific themes and key phrases from transcript for accuracy
   * @param {string} title - Preacher's title
   * @param {string} firstName - Preacher's first name
   * @param {string} transcript - Full sermon transcript
   * @returns {string} Summary sentence(s) grounded in transcript content
   */
  generateSummary(title, firstName, transcript) {
    // Extract key themes and primary message
    const themes = this.extractThemes(transcript);
    const keyPhrase = this.extractKeyPhrase(transcript);
    
    // Build a more specific summary based on actual sermon content
    let summary = `${title} ${firstName} `;
    
    if (themes.length > 0) {
      // Use detected themes to build summary
      if (themes.length === 1) {
        summary += `addresses the critical reality of ${themes[0]} in our world today, calling believers to spiritual awareness and righteous action in response to these troubling times.`;
      } else if (themes.length === 2) {
        summary += `exposes how ${themes[0]} and ${themes[1]} have infiltrated our society, reminding us that God's mercy and protection remain our only hope in a deteriorating world. "${keyPhrase}"`;
      } else {
        summary += `delivers a sobering yet prophetic word about ${themes[0]}, ${themes[1]}, and ${themes[2]}, urging the Body of Christ to awaken to the spiritual crisis before us and stand firm in God's truth.`;
      }
    } else {
      // Fallback with high-impact messaging
      summary += `brings a timely and unflinching message about the state of our world, challenging believers to recognize the times we're living in and lean deeper into God's Kingdom.`;
    }
    
    return summary;
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
      overcoming: ["overcome", "struggle", "challenge", "obstacle"],
      discernment: ["discern", "aware", "understand", "recognize", "reality"],
      darkness: ["darkness", "evil", "wicked", "trafficking", "dismember"],
      worldly: ["world", "getting worse", "changed", "times"],
      protection: ["protect", "safe", "guard", "mercy"]
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
