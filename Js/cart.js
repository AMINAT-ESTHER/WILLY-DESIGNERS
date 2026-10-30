(function() {
    let cartMemoryDatabase = JSON.parse(localStorage.getItem("willy_cart")) || [];

    function initializeWillyCart() {
        const cartDrawer = document.getElementById("shopping-cart-drawer");
        const cartToggle = document.getElementById("cart-toggle-btn");
        const cartClose = document.getElementById("cart-close-btn");
        const cartItemsWrapper = document.getElementById("cart-items-list-wrapper");
        const cartTotalDisplay = document.getElementById("cart-total-price-display");
        const cartBadgeCount = document.getElementById("cart-badge-count");

        function refreshCartUIElements() {
            if (!cartItemsWrapper || !cartTotalDisplay || !cartBadgeCount) return;
            
            cartItemsWrapper.innerHTML = "";
            let runningTotalCalculations = 0;
            let cumulativeItemCounter = 0;

            if (cartMemoryDatabase.length === 0) {
                cartItemsWrapper.innerHTML = '<p style="text-align:center; color:#777; margin:40px 0; font-size:18px;">Your shopping cart is currently empty.</p>';
            } else {
                cartMemoryDatabase.forEach((item, index) => {
                    runningTotalCalculations += (item.price * item.quantity);
                    cumulativeItemCounter += item.quantity;

                    const itemRowHTMLString = `
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding-bottom:20px; margin-bottom:10px;">
                            <div style="text-align:left;">
                                <h4 style="margin:0 0 5px 0; font-size:18px; color:#114c33; font-family:Georgia, serif;">${item.name}</h4>
                                <span style="font-size:14px; color:#666;">Unit Price: UGX ${item.price.toLocaleString()}</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:12px;">
                                <span style="font-size:16px; font-weight:bold; color:#114c33; margin-right:20px;">Subtotal: UGX ${(item.price * item.quantity).toLocaleString()}</span>
                                <button class="cart-qty-minus-btn" data-index="${index}" style="padding:6px 14px; background:#eee; border:none; font-weight:bold; cursor:pointer; border-radius:4px; font-size:16px;">-</button>
                                <span style="font-size:18px; font-weight:bold; min-width:30px; text-align:center;">${item.quantity}</span>
                                <button class="cart-qty-plus-btn" data-index="${index}" style="padding:6px 14px; background:#eee; border:none; font-weight:bold; cursor:pointer; border-radius:4px; font-size:16px;">+</button>
                                <button class="cart-item-delete-btn" data-index="${index}" style="border:none; background:none; color:#c05c23; margin-left:15px; cursor:pointer; font-size:18px;">🗑️ Remove</button>
                            </div>
                        </div>
                    `;
                    cartItemsWrapper.insertAdjacentHTML("beforeend", itemRowHTMLString);
                });
            }

            cartTotalDisplay.innerText = "UGX " + runningTotalCalculations.toLocaleString();
            cartBadgeCount.innerText = cumulativeItemCounter;
            localStorage.setItem("willy_cart", JSON.stringify(cartMemoryDatabase));
        }

        // Click on navbar Cart link opens the full page layout view
        if (cartToggle) {
            cartToggle.onclick = function(e) {
                e.preventDefault();
                if (cartDrawer) cartDrawer.style.display = "flex"; 
            };
        }
        
        // Close button hides the overlay screen completely
        if (cartClose) {
            cartClose.onclick = function() {
                if (cartDrawer) cartDrawer.style.display = "none";
            };
        }

        document.onclick = function(event) {
            const target = event.target;
            if (!target) return;

            // Handle: Add to Cart Button Click (Quiet update!)
            if (target.classList.contains("add-to-cart-btn")) {
                event.preventDefault();
                const productName = target.getAttribute("data-name") || "Stationery Item";
                
                let rawPriceString = target.getAttribute("data-price") || "0";
                let cleanedPriceNumbersOnly = rawPriceString.replace(/,/g, ''); 
                const productPrice = parseInt(cleanedPriceNumbersOnly, 10) || 0;

                const existingIndex = cartMemoryDatabase.findIndex(item => item.name === productName);
                if (existingIndex > -1) {
                    cartMemoryDatabase[existingIndex].quantity += 1;
                } else {
                    cartMemoryDatabase.push({ name: productName, price: productPrice, quantity: 1 });
                }

                refreshCartUIElements();
                
                // VISUAL FEEDBACK: Flash the navbar cart badge briefly to show it added quietly
                if(cartBadgeCount) {
                    cartBadgeCount.style.transform = "scale(1.3)";
                    setTimeout(() => { cartBadgeCount.style.transform = "scale(1)"; }, 200);
                }
                
                // NOT opening cartDrawer here anymore so it remains hidden until you tap the navbar!
            }

            // Handle: Minus Button Click inside Full Page
            if (target.classList.contains("cart-qty-minus-btn")) {
                const idx = parseInt(target.getAttribute("data-index"), 10);
                cartMemoryDatabase[idx].quantity -= 1;
                if (cartMemoryDatabase[idx].quantity <= 0) {
                    cartMemoryDatabase.splice(idx, 1);
                }
                refreshCartUIElements();
            }

            // Handle: Plus Button Click inside Full Page
            if (target.classList.contains("cart-qty-plus-btn")) {
                const idx = parseInt(target.getAttribute("data-index"), 10);
                cartMemoryDatabase[idx].quantity += 1;
                refreshCartUIElements();
            }

            // Handle: Trash Can Delete Click inside Full Page
            if (target.classList.contains("cart-item-delete-btn")) {
                const idx = parseInt(target.getAttribute("data-index"), 10);
                cartMemoryDatabase.splice(idx, 1);
                refreshCartUIElements();
            }
        };

        refreshCartUIElements();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeWillyCart);
    } else {
        initializeWillyCart();
    }
})();