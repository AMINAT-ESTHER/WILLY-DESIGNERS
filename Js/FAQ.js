document.addEventListener('DOMContentLoaded', () => {
  // Find all your FAQ question buttons
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Find the parent container wrapper (.faq-item) for this specific button
      const faqItem = button.parentElement;

      // OPTIONAL EXCLUSIVE OPEN: Closes other open questions if you click a new one
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('open');
        }
      });

      // Toggle the 'open' class on the clicked item
      faqItem.classList.toggle('open');
    });
  });
});