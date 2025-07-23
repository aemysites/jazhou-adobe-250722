/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate column divs
  const columns = Array.from(element.querySelectorAll(':scope > .grid-col'));
  
  // Table header as exactly specified
  const headerRow = ['Columns (columns14)'];

  // Each column cell will include all its meaningfully non-empty content nodes
  const cells = columns.map((col) => {
    // Only include non-empty meaningful nodes (skip empty paragraphs)
    const colContent = Array.from(col.childNodes).filter((node) => {
      if (node.nodeType === 1 && node.tagName === 'P' && node.textContent.trim() === '') {
        return false;
      }
      return true;
    }).map((node) => {
      // For DIVs that are video wrappers, convert iframe to a link
      if (node.nodeType === 1 && node.tagName === 'DIV') {
        const iframe = node.querySelector('iframe');
        if (iframe && iframe.src) {
          const a = document.createElement('a');
          a.href = iframe.src;
          a.textContent = iframe.title || iframe.src;
          return a;
        }
      }
      return node;
    });
    return colContent;
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells
  ], document);
  
  element.replaceWith(table);
}
