/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Cards (cards17)'];

  // Find the cards container
  const cardsContainer = element.querySelector('.wwd__cards');
  if (!cardsContainer) return;

  // Get all card elements
  const cardEls = Array.from(cardsContainer.children);
  const rows = cardEls.map(cardEl => {
    // Image
    const img = cardEl.querySelector('img.wwd__image');
    // Title (linked)
    const titleDiv = cardEl.querySelector('.wwd__title');
    let textCellContent = [];
    if (titleDiv) {
      const link = titleDiv.querySelector('a');
      if (link) {
        const h3 = document.createElement('h3');
        h3.appendChild(link);
        textCellContent.push(h3);
      }
    }
    // Description (if present)
    // Try to find a description below the title within .wwd__contents
    const contentsDiv = cardEl.querySelector('.wwd__contents');
    if (contentsDiv) {
      // Look for a p or any text node after the title div
      let foundTitle = false;
      Array.from(contentsDiv.childNodes).forEach(node => {
        if (!foundTitle && node === titleDiv) {
          foundTitle = true;
        } else if (foundTitle) {
          // Skip .wwd__arrow, look only for text or elements that could be description
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (
              node.tagName.toLowerCase() === 'p' ||
              (!node.classList.contains('wwd__arrow') && node.textContent.trim())
            ) {
              textCellContent.push(node);
            }
          } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            // Add text node as a paragraph
            const p = document.createElement('p');
            p.textContent = node.textContent.trim();
            textCellContent.push(p);
          }
        }
      });
    }
    return [img, textCellContent];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  element.replaceWith(table);
}
