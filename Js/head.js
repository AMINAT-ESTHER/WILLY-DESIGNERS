 document.addEventListener('DOMContentLoaded', function () {
    // 1. Target the link using its href attribute to be absolutely certain we find it
    const dropdownLink = document.querySelector('a[href="about.html"]');

    if (dropdownLink) {
      // Find the parent list item (li) dynamically
      const parentItem = dropdownLink.parentElement;

      // 2. Listen for the tap/click
      dropdownLink.addEventListener('click', function (event) {
        // STOP the browser from changing pages to about.html/shop.html
        event.preventDefault(); 
        event.stopPropagation(); 
        
        // Toggle the open/close style
        parentItem.classList.toggle('show-dropdown');
      });
    }

    // 3. Close the menu automatically if the user clicks anywhere else on the screen
    document.addEventListener('click', function () {
      const openMenu = document.querySelector('.show-dropdown');
      if (openMenu) {
        openMenu.classList.remove('show-dropdown');
      }
    });
  });


  document.addEventListener("DOMContentLoaded", function () {
    // Find the main Services link inside your navigation bar
    const servicesLink = document.querySelector('.nav-link.dropdown-toggle[href="services.html"]');
    
    if (servicesLink) {
        servicesLink.addEventListener("click", function (event) {
            // Force the browser to bypass Bootstrap's lock and open the page
            window.location.href = this.getAttribute("href");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const servicesLink = document.querySelector('.nav-link.dropdown-toggle[href="services.html"]');
    
    if (servicesLink) {
        // Track clicks on mobile/touch screens
        servicesLink.addEventListener("click", function (event) {
            // Check if the dropdown menu is currently visible/expanded
            const parentLi = this.closest('.dropdown');
            const isMenuOpen = parentLi && parentLi.classList.contains('show');
            
            if (!isMenuOpen) {
                // First click/tap: Let Bootstrap do its job and open the dropdown menu
                return;
            } else {
                // Second click/tap (or menu was already open): Bypass and open the actual page!
                window.location.href = this.getAttribute("href");
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // 1. Core UI Element DOM Selectors
    const cartDrawer = document.getElementById("shopping-cart-drawer");
    const cartToggle = document.getElementById("cart-toggle-btn");
    const cartClose = document.getElementById("cart-close-btn");
    const cartItemsWrapper = document.getElementById("cart-items-list-wrapper");
    const cartTotalDisplay = document.getElementById("cart-total-price-display");
    const cartBadgeCount = document.getElementById("cart-badge-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    // Load saved cart list arrays from memory database database entries or initiate blank array values
    let cartMemoryDatabase = JSON.parse(localStorage.getItem("willy_cart")) || [];

    // 2. Open / Close Toggle Actions
    if(cartToggle) {
        cartToggle.addEventListener("click", function(e) {
            e.preventDefault();
            cartDrawer.style.right = "0px"; // Slides panel frame into perspective field view
        });
    }
    if(cartClose) {
        cartClose.addEventListener("click", function() {
            cartDrawer.style.right = "-400px"; // Hides panel back off right sidebar frame border area
        });
    }

    // 3. Render Cart Matrix List Layout Layout 
    function refreshCartUIElements() {
        cartItemsWrapper.innerHTML = "";
        let runningTotalCalculations = 0;
        let cumulativeItemCounter = 0;

        if (cartMemoryDatabase.length === 0) {
            cartItemsWrapper.innerHTML = '<p id="empty-cart-msg" style="text-align:center; color:#777; margin-top:30px;">Your cart is currently empty.</p>';
        } else {
            cartMemoryDatabase.forEach((item, index) => {
                runningTotalCalculations += (item.price * item.quantity);
                cumulativeItemCounter += item.quantity;

                const itemRowHTMLString = `
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding-bottom:10px;">
                        <div style="max-width:200px;">
                            <h5 style="margin:0; font-size:14px; color:#114c33;">${item.name}</h5>
                            <span style="font-size:12px; color:#666;">UGX ${item.price.toLocaleString()} each</span>
                        </div>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <button onclick="changeCartItemQuantity(${index}, -1)" style="padding:2px 6px; background:#eee; border:none; cursor:pointer; font-weight:bold;">-</button>
                            <span style="font-size:14px; font-weight:bold;">${item.quantity}</span>
                            <button onclick="changeCartItemQuantity(${index}, 1)" style="padding:2px 6px; background:#eee; border:none; cursor:pointer; font-weight:bold;">+</button>
                            <button onclick="removeCartItemEntirely(${index})" style="border:none; background:none; color:#c05c23; margin-left:5px; cursor:pointer; font-size:14px;">🗑️</button>
                        </div>
                    </div>
                `;
                cartItemsWrapper.insertAdjacentHTML("beforeend", itemRowHTMLString);
            });
        }

        // Apply visual updates to UI dynamic counters
        cartTotalDisplay.innerText = "UGX " + runningTotalCalculations.toLocaleString();
        cartBadgeCount.innerText = cumulativeItemCounter;
        localStorage.setItem("willy_cart", JSON.stringify(cartMemoryDatabase));
    }

    // 4. Global Action Controller Handlers
    window.changeCartItemQuantity = function(index, quantityModifierDelta) {
        cartMemoryDatabase[index].quantity += quantityModifierDelta;
        if(cartMemoryDatabase[index].quantity <= 0) {
            cartMemoryDatabase.splice(index, 1);
        }
        refreshCartUIElements();
    };

    window.removeCartItemEntirely = function(index) {
        cartMemoryDatabase.splice(index, 1);
        refreshCartUIElements();
    };

    // 5. Add to Cart Interception Logic Loop Setup
    // REPLACE SECTION 5 IN YOUR SCRIPT WITH THIS GLOBAL CLICK CATCHER:
document.addEventListener("click", function (event) {
    // 1. Check if the clicked element has our add-to-cart class
    if (event.target && event.target.classList.contains("add-to-cart-btn")) {
        event.preventDefault();
        
        const button = event.target;
        const productName = button.getAttribute("data-name") || "Stationery Item";
        const productPrice = parseInt(button.getAttribute("data-price"), 10) || 0;

        // 2. Locate or insert item inside our saved cart array matrix
        const matchingExistingIndexItem = cartMemoryDatabase.findIndex(item => item.name === productName);

        if (matchingExistingIndexItem > -1) {
            cartMemoryDatabase[matchingExistingIndexItem].quantity += 1;
        } else {
            cartMemoryDatabase.push({ name: productName, price: productPrice, quantity: 1 });
        }

        // 3. Update the cart interface and pull out the drawer panel
        refreshCartUIElements();
        
        const drawer = document.getElementById("shopping-cart-drawer");
        if (drawer) {
            drawer.style.right = "0px" !important; // Force slide open panel display frame
        }
    }
});

    // Run initial data render sweep on bootup processing configurations
    refreshCartUIElements();
});