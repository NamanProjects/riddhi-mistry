// Initialize EmailJS
(function () {
    emailjs.init("FN8UqiAnA7IXgo_uM");
})();

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const alertContainer = document.getElementById('alert-container');

    // Helper function to show alerts
    function showAlert(message, type) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '</div>'
        ].join('');

        alertContainer.append(wrapper);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            wrapper.remove();
        }, 5000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Clear previous alerts
            alertContainer.innerHTML = '';

            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const templateParams = {
                from_name: nameInput.value,
                reply_to: emailInput.value,
                message: messageInput.value,
                to_name: 'Riddhi Mistri'
            };

            const serviceID = 'service_u78nuxt';
            const templateID = 'template_q1ibew3';

            emailjs.send(serviceID, templateID, templateParams)
                .then(function () {
                    showAlert('Message sent successfully! We will get back to you soon.', 'success');
                    contactForm.reset();
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }, function (error) {
                    console.error('FAILED...', error);
                    showAlert('Failed to send message. Please try again later.', 'danger');
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});
