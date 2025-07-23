/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in example
  const headerRow = ['Cards (cards16)'];
  const rows = [headerRow];

  // Each card is a direct child <a> of the block element
  const cards = element.querySelectorAll(':scope > a.box.grid-col');
  cards.forEach(card => {
    // First cell: image (if present)
    let img = null;
    const banner = card.querySelector('.banner');
    if (banner) {
      img = banner.querySelector('img');
    }
    // Second cell: everything else in a vertical stack
    // Heading: h2.pad-x
    const heading = card.querySelector('h2.pad-x');
    // Description: div.pad-x > p (could be just div.pad-x if no <p>)
    const descWrapper = card.querySelector('div.pad-x:last-of-type');
    let desc = null;
    if (descWrapper) {
      desc = descWrapper.querySelector('p') || descWrapper;
    }
    // Build text block (keep reference to existing elements)
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (desc) cellContent.push(desc);
    rows.push([
      img,
      cellContent.length === 1 ? cellContent[0] : cellContent
    ]);
  });
  // Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
