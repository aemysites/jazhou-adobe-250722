/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to collect all content (elements and non-empty text from a container)
  function collectContent(container) {
    if (!container) return [];
    const nodes = [];
    for (const node of container.childNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) nodes.push(node);
      else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const s = document.createElement('span');
        s.textContent = node.textContent;
        nodes.push(s);
      }
    }
    return nodes;
  }

  // We want 2x2 grid (2 rows, 2 columns), plus single header row
  // Extract relevant divs inside .footer__wrapper > .footer__content and .footer__utilities
  const wrapper = element.querySelector('.footer__wrapper');
  if (!wrapper) return;
  const content = wrapper.querySelector('.footer__content');
  const utilities = wrapper.querySelector('.footer__utilities');

  // First row, left: logo + acknowledgments
  let cell00 = [];
  if (content) {
    const logo = content.querySelector('.footer__logo');
    if (logo) cell00.push(logo);
    const ack = content.querySelector('.footer__acknowledgments');
    if (ack) cell00.push(ack);
  }

  // First row, right: socials
  let cell01 = [];
  if (content) {
    const socials = content.querySelector('.footer__socials');
    if (socials) cell01 = collectContent(socials);
  }

  // Second row, left: utility links
  let cell10 = [];
  if (utilities) {
    const utility = utilities.querySelector('.footer__utility');
    if (utility) cell10 = collectContent(utility);
  }

  // Second row, right: copyright
  let cell11 = [];
  if (utilities) {
    const copyright = utilities.querySelector('.footer__copyright');
    if (copyright) cell11 = collectContent(copyright);
  }

  // Compose the final table cells as a 1-col header and two 2-col rows
  const cells = [
    ['Columns (columns20)'],
    [cell00, cell01],
    [cell10, cell11],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
