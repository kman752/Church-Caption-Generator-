/**
 * Frontend JavaScript for Caption Generator
 * Handles form interaction, file uploads, and UI updates
 */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("captionForm");
  const transcriptInput = document.getElementById("transcript");
  const fileUpload = document.getElementById("fileUpload");
  const generateBtn = document.getElementById("generateBtn");
  const resultSection = document.getElementById("resultSection");
  const captionOutput = document.getElementById("captionOutput");
  const copyBtn = document.getElementById("copyBtn");
  const checklistContainer = document.getElementById("checklistContainer");
  const errorMessage = document.getElementById("errorMessage");

  // Track whether a caption has been generated
  let hasGeneratedCaption = false;

  // Initialize caption generator
  const generator = new CaptionGenerator();

  // File upload handler
  if (fileUpload) {
    fileUpload.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        transcriptInput.value = event.target.result;
      };
      reader.readAsText(file);
    });
  }

  // Form submission
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const title = document.getElementById("title").value.trim();
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const transcript = transcriptInput.value.trim();

      // Clear previous errors
      errorMessage.textContent = "";
      errorMessage.style.display = "none";

      // Generate caption
      const result = generator.generateCaption(
        title,
        firstName,
        lastName,
        transcript
      );

      if (!result.success) {
        // Show errors
        errorMessage.textContent = "⚠️ " + result.errors.join("\n");
        errorMessage.style.display = "block";
        resultSection.style.display = "none";
        return;
      }

      // Mark that a caption has been generated
      hasGeneratedCaption = true;
      updateButtonText();

      // Display caption
      displayCaption(result);
      displayChecklist(result.checklist);
      resultSection.style.display = "block";
    });
  }

  // Copy to clipboard
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      const caption = captionOutput.textContent;
      navigator.clipboard.writeText(caption).then(() => {
        copyBtn.textContent = "✓ Copied!";
        setTimeout(() => {
          copyBtn.textContent = "📋 Copy Caption";
        }, 2000);
      });
    });
  }

  /**
   * Update button text based on generation state
   */
  function updateButtonText() {
    if (generateBtn) {
      if (hasGeneratedCaption) {
        generateBtn.textContent = "🔄 Regenerate Caption";
      } else {
        generateBtn.textContent = "✨ Generate Caption";
      }
    }
  }

  /**
   * Display the generated caption
   */
  function displayCaption(result) {
    captionOutput.textContent = result.caption;
    captionOutput.style.display = "block";
  }

  /**
   * Display the pre-post checklist
   */
  function displayChecklist(checklist) {
    const items = [
      {
        label: "Opening quote is verbatim from the transcript and in quotation marks",
        value: checklist.quoteIsVerbatim
      },
      {
        label: "Speaker hashtag is CamelCase, no spaces, matches the preacher's name and title",
        value: checklist.speakerHashtagFormatted
      },
      {
        label: "Summary is 1–2 sentences, references the preacher by name and title, and is encouraging",
        value: checklist.summaryLength >= 1 && checklist.summaryLength <= 2
      },
      {
        label: "Call to Action copied exactly — not paraphrased",
        value: checklist.callToActionExact
      },
      {
        label: "Service info (address and times) copied exactly",
        value: checklist.serviceInfoExact
      },
      {
        label: "Closing motto copied exactly",
        value: checklist.closingMottoExact
      },
      {
        label: "All 13 fixed core hashtags are present",
        value: checklist.coreHashtagsIncluded
      },
      {
        label: "Speaker hashtag appears in the hashtag block",
        value: checklist.speakerHashtagInBlock
      },
      {
        label: "Total hashtags do not exceed 30",
        value: checklist.totalHashtagsValid
      }
    ];

    checklistContainer.innerHTML = "";

    items.forEach((item) => {
      const checkItem = document.createElement("div");
      checkItem.className = "checklist-item";
      const checkbox = item.value ? "☑" : "☐";
      checkItem.textContent = `${checkbox} ${item.label}`;
      checklistContainer.appendChild(checkItem);
    });
  }
});
