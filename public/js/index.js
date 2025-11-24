
    const cartForm = document.getElementById("cartForm");
    cartForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const cartId = document.getElementById("cartIdInput").value.trim();
        if (cartId) {
            location.href = `/cart/${cartId}`;
        }
    });

