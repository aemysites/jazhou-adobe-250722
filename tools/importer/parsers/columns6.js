/* global WebImporter */
export default function parse(element, { document }) {
  // --- COLLECT COLUMN CONTENTS ---
  // 1. Navigation (all .grid-col menu-item from .megafooter)
  const megafooter = element.querySelector('.megafooter');
  let navCols = [];
  if (megafooter) {
    const gridCols = megafooter.querySelectorAll('ul.desktop-grid-fixed > li.menu-item.grid-col');
    navCols = Array.from(gridCols);
  }

  // 2. Logo & acknowledgments/socials (from .footer__logo & .footer__acknowledgments-socials)
  const footerWrapper = element.querySelector('.footer__wrapper');
  let logoCol = null;
  if (footerWrapper) {
    const col = document.createElement('div');
    const logo = footerWrapper.querySelector('.footer__logo');
    if (logo) col.appendChild(logo);
    const ackSoc = footerWrapper.querySelector('.footer__acknowledgments-socials');
    if (ackSoc) col.appendChild(ackSoc);
    logoCol = col.childNodes.length ? col : null;
  }

  // 3. Utilities (from .footer__utilities)
  let utilCol = null;
  if (footerWrapper) {
    const col = document.createElement('div');
    const utils = footerWrapper.querySelector('.footer__utilities');
    if (utils) col.appendChild(utils);
    utilCol = col.childNodes.length ? col : null;
  }

  // --- ASSEMBLE COLUMNS ---
  // The table should have a header row with one cell, and a second row with as many columns as present (here: nav columns + logoCol + utilCol)
  const headerRow = ['Columns (columns6)'];
  const contentRow = [
    ...navCols,
    ...(logoCol ? [logoCol] : []),
    ...(utilCol ? [utilCol] : [])
  ];
  // Only add row if there's content
  if (contentRow.length === 0) return;
  const tableData = [headerRow, contentRow];

  // --- REPLACE ---
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
