// ../static/script.js

document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const reviewInput = document.getElementById('reviewinput');
    const submitButton = document.getElementById('submitreview');
    const reviewsList = document.getElementById('reviews-list');

    let selectedRating = parseInt(localStorage.getItem('selectedRating')) || 0;

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

    function addReview(reviewText, rating) {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <div class="sentence">${reviewText}</div>
            <div class="rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
        `;
        reviewsList.appendChild(reviewElement);
    }

    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.forEach(review => {
            addReview(review.text, review.rating);
        });
    }

    function saveReview(reviewText, rating) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push({ text: reviewText, rating: rating });
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // 페이지 로드 시 저장된 별점으로 초기화
    updateStars(selectedRating);
    loadReviews();

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

    submitButton.addEventListener('click', () => {
        const reviewText = reviewInput.value.trim();
        if (reviewText === '') {
            alert('리뷰를 입력하세요.');
            return;
        }
        if (selectedRating === 0) {
            alert('별점을 선택하세요.');
            return;
        }

        addReview(reviewText, selectedRating);
        saveReview(reviewText, selectedRating);
        reviewInput.value = '';
        selectedRating = 0;
        updateStars(selectedRating);
    });
});
