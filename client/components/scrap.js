// ../static/bookmark.js

document.addEventListener('DOMContentLoaded', () => {
    const bookmarkButton = document.getElementById('bookmark-button');

    // 찜 상태를 localStorage에서 로드
    const isBookmarked = localStorage.getItem('isBookmarked') === 'true';

    // 초기 버튼 상태 설정
    updateButtonState(isBookmarked);

    // 찜하기 버튼 클릭 이벤트 핸들러
    bookmarkButton.addEventListener('click', () => {
        const currentState = localStorage.getItem('isBookmarked') === 'true';
        const newState = !currentState;

        // 상태를 localStorage에 저장
        localStorage.setItem('isBookmarked', newState);

        // 버튼 상태 업데이트
        updateButtonState(newState);
    });

    /**
     * 버튼 상태 업데이트 함수
     * @param {boolean} isBookmarked - 찜 상태
     */
    function updateButtonState(isBookmarked) {
        if (isBookmarked) {
            bookmarkButton.textContent = '스크랩 취소';
            bookmarkButton.classList.add('bookmarked');
        } else {
            bookmarkButton.textContent = '스크랩';
            bookmarkButton.classList.remove('bookmarked');
        }
    }
});
