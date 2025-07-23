/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell per the example
  const cells = [['Cards (cards15)']];

  // Get the accordion content div
  const contentDiv = element.querySelector('.single-accordion-box-content');
  if (!contentDiv) return;

  const children = Array.from(contentDiv.children);
  let introDone = false;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    // If first paragraph and it's not followed by a <ul>, treat as intro and add as card
    if (!introDone && child.tagName === 'P' && (i+1 === children.length || children[i+1].tagName !== 'UL')) {
      // This is the intro, add as a card row with text only, in text cell (second cell)
      cells.push(['', child]);
      introDone = true;
      continue;
    }
    // For all other cards: <p> is the category/title, <ul> is the list
    if (child.tagName === 'P' && i+1 < children.length && children[i+1].tagName === 'UL') {
      // Compose card text content: title (bold/heading style) and list
      const titleDiv = document.createElement('div');
      const strong = document.createElement('strong');
      strong.textContent = child.textContent;
      titleDiv.appendChild(strong);
      const ul = children[i+1];
      cells.push(['', [titleDiv, ul]]);
      i++; // skip the <ul>
    }
  }
  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
