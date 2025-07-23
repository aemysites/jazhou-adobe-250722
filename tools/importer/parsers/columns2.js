/* global WebImporter */
export default function parse(element, { document }) {
  // First column (left): logo + flags + acknowledgment text
  const col1 = document.createDocumentFragment();
  const logo = element.querySelector('.footer__logo');
  if (logo) col1.appendChild(logo);
  const flags = element.querySelector('.footer__acknowledgments-flags');
  if (flags) col1.appendChild(flags);
  const ackText = element.querySelector('.footer__acknowledgments-content');
  if (ackText) col1.appendChild(ackText);

  // Second column (right): socials connect + nrs content
  const col2 = document.createDocumentFragment();
  const socials = element.querySelector('.footer__socials-connect');
  if (socials) col2.appendChild(socials);
  const nrs = element.querySelector('.footer__nrs-content');
  if (nrs) col2.appendChild(nrs);

  // Build table header row with two columns, both spanning the block name
  const cells = [
    ['Columns (columns2)', ''],
    [col1, col2]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set colspan=2 for the header row to match the two data columns
  const th = table.querySelector('tr:first-child th');
  if (th) th.setAttribute('colspan', '2');
  // Remove the extra empty th added in the header row
  const extraTh = th.nextElementSibling;
  if (extraTh) extraTh.remove();

  element.replaceWith(table);
}
