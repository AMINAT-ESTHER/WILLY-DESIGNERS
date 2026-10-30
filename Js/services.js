document.addEventListener("DOMContentLoaded", function () {
    const modalOverlay = document.getElementById("quote-modal-overlay");
    const closeBtn = document.getElementById("close-quote-modal-btn");
    const serviceLabelDisplay = document.getElementById("modal-selected-service-name");
    const quoteForm = document.getElementById("quote-whatsapp-redirect-form");

    // 1. Intercept Global Clicks for Quote Request Trigger Elements
    document.addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains("trigger-quote-modal-btn")) {
            event.preventDefault();
            const selectedServiceName = event.target.getAttribute("data-service") || "Branding Service";
            
            // Set heading label and slide modal container wrapper into view
            if (serviceLabelDisplay) serviceLabelDisplay.innerText = selectedServiceName;
            if (modalOverlay) modalOverlay.style.display = "flex";
        }
    });

    // 2. Window Dismissal Event Triggers
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            if (modalOverlay) modalOverlay.style.display = "none";
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", function (e) {
            if (e.target === modalOverlay) {
                modalOverlay.style.display = "none";
            }
        });
    }

    // 3. Submit Handling: Formats values cleanly and triggers Uganda WhatsApp API routing
    if (quoteForm) {
        quoteForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const serviceName = serviceLabelDisplay.innerText;
            const clientName = document.getElementById("quote-user-name").value;
            const clientEmail = document.getElementById("quote-user-email").value;
            const clientPhone = document.getElementById("quote-user-phone").value;
            const details = document.getElementById("quote-user-requirements").value;

            // Clean text formatting layout string for messaging applications
            const whatsappTextString = `Hello Willy Designers, I would like to request a quote.\n\n` +
                                       `*Service:* ${serviceName}\n` +
                                       `*Name:* ${clientName}\n` +
                                       `*Email:* ${clientEmail}\n` +
                                       `*Phone:* ${clientPhone}\n` +
                                       `*Requirements:* ${details}`;

            const encodedMessage = encodeURIComponent(whatsappTextString);
            
            // Replace with your business number link reference
            const businessWhatsAppNumber = "256782569259"; 
            
            window.open(`https://wa.me{businessWhatsAppNumber}?text=${encodedMessage}`, "_blank");
            
            // Reset input values and drop overlay focus
            quoteForm.reset();
            modalOverlay.style.display = "none";
        });
    }
});