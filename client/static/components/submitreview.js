// components/submitreview.js
document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitreview');
    const spotId = document.getElementById('spot-id').value;
    const reviewerId = document.getElementById('reviewer-id').value; // 사용자 ID
    const reviewerName = document.getElementById('reviewer-name').value; // 사용자 이름
    const stars = document.querySelectorAll('.starrating .star');

    let selectedRating = 0;
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = this.getAttribute('data-value');
            stars.forEach(star => {
                star.classList.toggle('active', star.getAttribute('data-value') <= selectedRating);
            });
        });
    });

    submitButton.addEventListener('click', function() {
        const reviewInput = document.getElementById('reviewinput');
        const reviewText = reviewInput.value;

        fetch('/add_review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                spot_id: spotId,
                rating: selectedRating,
                review: reviewText,
                reviewer_id: reviewerId,
                reviewer_name: reviewerName
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Review added successfully!');
                location.reload(); // 페이지 새로고침
            } else {
                alert('Error adding review.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
