// Checkout functionality
const checkoutForm = document.getElementById('checkoutForm');

checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const orderData = {
        customer: {
            firstName: this.querySelector('input[placeholder="Имя"]').value,
            lastName: this.querySelector('input[placeholder="Фамилия"]').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value
        },
        address: {
            city: this.querySelector('input[placeholder="Город"]').value,
            street: this.querySelector('input[placeholder="Улица, дом, квартира"]').value,
            zip: this.querySelector('input[placeholder="Индекс"]').value
        },
        delivery: this.querySelector('input[name="delivery"]:checked').value,
        payment: this.querySelector('input[name="payment"]:checked').value,
        cart: cart,
        total: getCartTotal(),
        orderDate: new Date().toISOString(),
        orderId: 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };
    
    // In a real application, you would send this data to your server
    console.log('Order submitted:', orderData);
    
    // Simulate order processing
    processOrder(orderData);
});

function processOrder(orderData) {
    // Show loading state
    const submitBtn = checkoutForm.querySelector('.submit-order');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Обработка...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Success
        showOrderSuccess(orderData.orderId);
        
        // Clear cart
        cart = [];
        updateCart();
        
        // Reset form
        checkoutForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Close checkout modal
        checkoutModal.classList.remove('active');
        
    }, 2000);
}

function showOrderSuccess(orderId) {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Заказ успешно оформлен!</h3>
            <p>Номер вашего заказа: <strong>${orderId}</strong></p>
            <p>Мы отправили подтверждение на ваш email.</p>
            <p>С вами свяжется наш менеджер для уточнения деталей доставки.</p>
            <button class="btn btn-primary close-success">Понятно</button>
        </div>
    `;
    
    // Add styles
    successModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1003;
        animation: fadeIn 0.3s ease;
    `;
    
    const successContent = successModal.querySelector('.success-content');
    successContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 12px;
        text-align: center;
        max-width: 500px;
        width: 90%;
    `;
    
    const successIcon = successModal.querySelector('.success-icon');
    successIcon.style.cssText = `
        font-size: 4rem;
        color: #2ecc71;
        margin-bottom: 1.5rem;
    `;
    
    document.body.appendChild(successModal);
    
    // Close success modal
    successModal.querySelector('.close-success').addEventListener('click', () => {
        successModal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successModal);
        }, 300);
    });
    
    // Add CSS for animations
    if (!document.querySelector('#success-animations')) {
        const style = document.createElement('style');
        style.id = 'success-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize delivery cost calculation
function updateDeliveryCost() {
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(option => {
        option.addEventListener('change', () => {
            // In a real app, you would recalculate total with delivery cost
            console.log('Delivery method changed to:', option.value);
        });
    });
}

// Initialize payment method change
function initializePaymentMethods() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', () => {
            console.log('Payment method changed to:', option.value);
            
            // Show/hide additional fields based on payment method
            if (option.value === 'installment') {
                // Show installment terms
                showInstallmentTerms();
            }
        });
    });
}

function showInstallmentTerms() {
    // In a real app, you would show installment terms
    console.log('Showing installment terms for Tinkoff');
}

// Initialize checkout functionality
document.addEventListener('DOMContentLoaded', () => {
    updateDeliveryCost();
    initializePaymentMethods();
});