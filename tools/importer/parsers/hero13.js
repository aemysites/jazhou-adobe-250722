/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row (per specification)
  const headerRow = ['Hero (hero13)'];

  // --- Background Image Extraction ---
  // The .homepage-banner__image is present but does not have an <img>, nor background-image inline,
  // but we must still include it to preserve intent and structure for later renderers.
  // If there is no .homepage-banner__image, imageCell is left blank (edge case handled).
  const imageDiv = element.querySelector('.homepage-banner__image');
  const imageCell = imageDiv || '';

  // --- Textual Content Extraction ---
  // All headline, sub, CTA, etc. are within .homepage-banner__text-area.
  // For structure resilience, reference this container directly if present.
  const textArea = element.querySelector('.homepage-banner__text-area');
  const textCell = textArea || '';

  // --- Compose Table Rows ---
  const rows = [
    headerRow,
    [imageCell],
    [textCell],
  ];

  // --- Create and Replace Block Table ---
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
