document.addEventListener('DOMContentLoaded', function() {
    var stars = document.querySelectorAll('.star');
    var reviewInput = document.getElementById('reviewinput');
    
    stars.forEach(function(star) {
        star.addEventListener('mouseover', function() {
            var value = parseInt(star.getAttribute('data-value'));
            updateStars(value);
        });
        
        star.addEventListener('mouseout', function() {
            resetStars();
        });
        
        star.addEventListener('click', function() {
            var value = parseInt(star.getAttribute('data-value'));
            reviewInput.setAttribute('data-rating', value);
            updateStars(value);
        });
    });
    
    function updateStars(value) {
        stars.forEach(function(star) {
            if (parseInt(star.getAttribute('data-value')) <= value) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    function resetStars() {
        var rating = reviewInput.getAttribute('data-rating');
        stars.forEach(function(star) {
            if (parseInt(star.getAttribute('data-value')) <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
});
