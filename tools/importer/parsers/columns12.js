/* global WebImporter */
export default function parse(element, { document }) {
  // Get the column divs (children of the main element)
  const columns = element.querySelectorAll(':scope > div');
  // Build the columns (2nd row)
  const tableRow = Array.from(columns).map(col => {
    if (!col.textContent.trim() && !col.querySelector('*')) {
      return '';
    }
    return col;
  });
  // The first row should be a single cell (header), even if there are multiple columns in data rows
  const headerRow = ['Columns (columns12)'];
  const cells = [
    headerRow,
    tableRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set the header's colspan AFTER creation so it matches the column count
  const th = table.querySelector('th');
  if (th && tableRow.length > 1) {
    th.setAttribute('colspan', tableRow.length);
  }
  element.replaceWith(table);
}
