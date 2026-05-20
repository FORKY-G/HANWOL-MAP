// 1. 요소 선택
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');
const openBtn = document.getElementById('open-btn');
const searchInput = document.getElementById('search-input');

/**
 * [기능] 사이드바 토글 함수
 * @param {boolean} open - true면 열기, false면 닫기
 */
function toggleSidebar(open) {
    if (open) {
        // 사이드바 열기
        sidebar.style.width = '300px';
        openBtn.style.display = 'none'; // ▶ 버튼 숨김
    } else {
        // 사이드바 닫기
        sidebar.style.width = '0px';
        openBtn.style.display = 'block'; // ▶ 버튼 표시
    }
    
    // 지도 크기 최적화
    setTimeout(() => {
        if (typeof map !== 'undefined') map.invalidateSize();
    }, 300);
}

// 2. 이벤트 리스너 등록
// 닫기(◀) 버튼
toggleBtn.addEventListener('click', () => toggleSidebar(false));

// 열기(▶) 버튼
openBtn.addEventListener('click', () => toggleSidebar(true));

// 검색 로직
searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    document.querySelectorAll('.filter-item').forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(keyword) ? 'block' : 'none';
    });
});
