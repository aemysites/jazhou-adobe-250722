/* global WebImporter */
export default function parse(element, { document }) {
  // Header row (must match the example exactly)
  const headerRow = ['Cards (cards8)'];

  // Find the image grid containing card items
  const grid = element.querySelector('.image-grid');
  if (!grid) return;

  // Build rows for each card
  const rows = Array.from(grid.children).map(item => {
    // Each .image-grid__item contains an <a> and within it an <img>
    const link = item.querySelector('a');
    const img = link && link.querySelector('img');

    // First cell: the <img> element itself (referenced, not cloned)
    const imgCell = img || '';

    // Second cell: Title from img.alt (as <strong>), and the CTA link (the original <a> from the DOM)
    const textCellContent = [];
    // Title (from img.alt, as <strong>, matching heading styling from example)
    if (img && img.alt) {
      const strong = document.createElement('strong');
      strong.textContent = img.alt;
      textCellContent.push(strong);
    }
    // (No other text nodes in the card per source HTML, but if this changed, we would add them here)
    // CTA link (use the original <a> element, but with text 'Visit website')
    if (link) {
      // Add <br> if title exists
      if (textCellContent.length) {
        textCellContent.push(document.createElement('br'));
      }
      // Use the reference to the actual <a> from the DOM, but change its text
      const cta = link;
      cta.textContent = 'Visit website';
      textCellContent.push(cta);
    }
    return [imgCell, textCellContent];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
