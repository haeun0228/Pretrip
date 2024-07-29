document.addEventListener('DOMContentLoaded', function() {
    const pages = Array.from(document.querySelectorAll('.pagination .page'));
    const prevButton = document.querySelector('.pagination .prev');
    const nextButton = document.querySelector('.pagination .next');

    let currentPage = 1;
    const totalPages = pages.length; // 페이지 버튼의 수를 전체 페이지 수로 설정

    function updatePagination() {
        pages.forEach(page => {
            page.classList.remove('active');
            if (parseInt(page.dataset.page) === currentPage) {
                page.classList.add('active');
            }
        });

        prevButton.style.visibility = currentPage === 1 ? 'hidden' : 'visible';
        nextButton.style.visibility = currentPage === totalPages ? 'hidden' : 'visible';
    }

    function changePage(newPage) {
        if (newPage < 1 || newPage > totalPages) return;
        currentPage = newPage;
        updatePagination();
        loadPageContent(currentPage);
    }

    function loadPageContent(page) {
        console.log(`Load content for page ${page}`);
        // 실제 콘텐츠 로딩 로직을 여기에 추가
    }

    pages.forEach(page => {
        page.addEventListener('click', function(e) {
            e.preventDefault();
            changePage(parseInt(page.dataset.page));
        });
    });

    prevButton.addEventListener('click', function(e) {
        e.preventDefault();
        changePage(currentPage - 1);
    });

    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        changePage(currentPage + 1);
    });

    updatePagination(); // 초기 상태 설정
});