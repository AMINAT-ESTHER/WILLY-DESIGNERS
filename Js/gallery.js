document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Shift the 'active' solid colored class to the clicked button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 2. Grab selected filter keyword value
      const targetCategory = button.getAttribute('data-category');

      // 3. Filter items matching selection targets
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-item');

        if (targetCategory === 'all' || itemCategory === targetCategory) {
          item.classList.remove('hidden'); // Reveals matched items
        } else {
          item.classList.add('hidden');    // Conceals unmatched items
        }
      });
    });
  });
});




document.addEventListener('DOMContentLoaded', () => {
      // Instantly turns on the fullscreen expansion and carousel scrolling feature
      const lightbox = GLightbox({
        selector: '.glightbox',
        loop: true,               /* Allows users to keep scrolling continuously past the last photo */
        openEffect: 'zoom',       /* Gives it a clean pop-open visual effect */
        closeEffect: 'zoom'
      });
});
