/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all cards (immediate <a> children)
  const cards = Array.from(element.querySelectorAll(':scope > a.box'));
  // Prepare the table rows with block name header
  const rows = [['Cards (cards3)']];

  cards.forEach(card => {
    // --- IMAGE ---
    // banner is always first child, has bg-image as style
    const bannerDiv = card.querySelector('.banner');
    let imgEl = null;
    if (bannerDiv && bannerDiv.style.backgroundImage) {
      // Matches background-image: url(...) possibly with single/double quotes
      const match = bannerDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (match && match[1]) {
        imgEl = document.createElement('img');
        imgEl.src = match[1];
        imgEl.alt = '';
      }
    }

    // --- TEXT CONTENT ---
    const contentDiv = card.querySelector('.box-content');
    let textContent = [];
    if (contentDiv) {
      // Use the existing heading and paragraph (reference, not clone)
      const h2 = contentDiv.querySelector('h2');
      if (h2) {
        textContent.push(h2); // preserve as heading
      }
      const p = contentDiv.querySelector('p');
      if (p) {
        textContent.push(p); // preserve as paragraph
      }
    }
    let textCell;
    if (textContent.length === 1) {
      textCell = textContent[0];
    } else if (textContent.length > 1) {
      // Group in a fragment
      const frag = document.createDocumentFragment();
      textContent.forEach(el => {
        frag.appendChild(el);
      });
      textCell = frag;
    } else {
      textCell = '';
    }

    rows.push([imgEl, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
