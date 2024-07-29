document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    function updateStars(rating) {
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'));
            if (value <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // Initialize stars based on saved rating
    updateStars(selectedRating);

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const value = parseInt(star.getAttribute('data-value'));
            updateStars(value);
            stars.forEach(s => s.classList.add('hover'));
        });

        star.addEventListener('mouseout', () => {
            updateStars(selectedRating);
            stars.forEach(s => s.classList.remove('hover'));
        });

        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-value'));
            localStorage.setItem('selectedRating', selectedRating);
            updateStars(selectedRating);
            stars.forEach(s => s.classList.remove('hover'));
        });
    });
});
