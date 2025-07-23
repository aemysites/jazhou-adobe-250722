/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Accordion'];
  // Title: get the text from the button inside h3 (or just h3 text)
  let title = '';
  const h3 = element.querySelector('h3');
  if (h3) {
    const btn = h3.querySelector('button');
    if (btn) {
      title = btn.textContent.trim();
    } else {
      title = h3.textContent.trim();
    }
  }
  // Accordion content: all children of .single-accordion-box-content
  let contentCell = '';
  const contentDiv = element.querySelector('.single-accordion-box-content');
  if (contentDiv) {
    // Gather all children nodes (Elements or text nodes with content)
    const nodes = Array.from(contentDiv.childNodes).filter(node => (node.nodeType !== Node.TEXT_NODE || node.textContent.trim().length > 0));
    if (nodes.length === 1) {
      contentCell = nodes[0];
    } else if (nodes.length > 1) {
      contentCell = nodes;
    } else {
      contentCell = '';
    }
  }
  // Build the rows for the block table
  const cells = [
    headerRow,
    [title, contentCell]
  ];
  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
