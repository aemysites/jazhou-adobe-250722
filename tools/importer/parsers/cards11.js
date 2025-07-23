/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row exactly as required
  const headerRow = ['Cards (cards11)'];

  // For the source HTML, every <a.inner> is a card (even if just a heading inside a link)
  // Since there are no images, it's a one-cell card -- retain the entire content
  const cards = Array.from(element.querySelectorAll(':scope > a.inner'));

  // Each card row: use the full <a> element as content (includes both heading and link)
  const rows = cards.map(card => [card]);

  // Compose block table
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
