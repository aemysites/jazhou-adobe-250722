/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table rows per instructions
  const rows = [];
  // Row 1: Header row
  rows.push(['Hero (hero5)']);
  // Row 2: Background Image (right column image)
  let backgroundImg = '';
  const cols = element.querySelectorAll(':scope > div');
  if (cols.length > 1) {
    const col2 = cols[1];
    const img = col2.querySelector('img');
    if (img) backgroundImg = img;
  }
  rows.push([backgroundImg]);
  // Row 3: Title, subheading, call-to-action (none in HTML), but logo is present (left column)
  // Place the entire column with logo/link as the content - as per guidance
  let content = '';
  if (cols.length > 0) {
    const col1 = cols[0];
    // Use the entire left column, which contains the logo/link
    content = col1;
  }
  rows.push([content]);
  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
