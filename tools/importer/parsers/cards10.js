/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];
  // Table header as in the example
  rows.push(['Cards (cards10)']);
  // Get cards: featured + all recent
  const grid = element.querySelector('.homepage-featured__grid');
  if (!grid) return;
  // The cards are ordered as: 1 featured, then 3 recent
  const allCards = [];
  const featured = grid.querySelector('.news-card-featured');
  if (featured) allCards.push(featured);
  const recents = grid.querySelectorAll('.news-card-recent');
  recents.forEach(card => allCards.push(card));
  allCards.forEach(card => {
    // Image: always present in .image-wrapper > img
    let img = card.querySelector('.news-card-featured__image-wrapper img, .news-card-recent__image-wrapper img');
    // Text cell construction
    const textParts = [];
    // Tag (optional)
    const content = card.querySelector('.news-card-featured__content, .news-card-recent__content');
    if (content) {
      const tag = content.querySelector('.news-card__tag');
      if (tag) textParts.push(tag);
      // Title (h3 inside a link)
      const titleLink = content.querySelector('.news-card__link.news-card__heading-link');
      if (titleLink) textParts.push(titleLink);
      // Description (p)
      const desc = content.querySelector('.news-card-featured__description, .news-card-recent__description');
      if (desc) textParts.push(desc);
      // Read more CTA (link), remove svg if present
      const cta = content.querySelector('.news-card__read-more');
      if (cta) {
        // Reference the original element, but remove any SVGs directly from it
        const svgs = cta.querySelectorAll('svg');
        svgs.forEach(svg => svg.parentNode && svg.parentNode.removeChild(svg));
        textParts.push(cta);
      }
    }
    rows.push([img, textParts]);
  });
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
