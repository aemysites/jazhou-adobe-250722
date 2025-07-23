/* global WebImporter */
export default function parse(element, { document }) {
  // Extract icon cell (.home-link), or empty if not present
  const iconCell = element.querySelector('.home-link') || '';

  // Extract text content: all of .grid-col except .home-link
  let textCell = '';
  const gridCol = element.querySelector('.grid-col');
  if (gridCol) {
    const homeLink = gridCol.querySelector('.home-link');
    if (homeLink) homeLink.remove();
    textCell = gridCol;
  }

  // Table cells: header is one cell, card rows are two cells
  const cells = [];
  cells.push(['Cards (cards9)']);
  if (iconCell || textCell) {
    cells.push([iconCell, textCell]);
  }

  // Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set header cell colspan to match card row column count
  const firstRow = table.querySelector('tr');
  if (firstRow && cells.length > 1 && cells[1].length > 1) {
    const th = firstRow.querySelector('th');
    if (th) th.setAttribute('colspan', cells[1].length);
  }

  element.replaceWith(table);
}
