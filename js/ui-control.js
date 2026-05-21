// 1. 사이드바 토글
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const mapDiv = document.getElementById('map');
    
    sidebar.classList.toggle('closed');
    toggleBtn.classList.toggle('closed');
    mapDiv.classList.toggle('shifted');
    
    toggleBtn.innerText = sidebar.classList.contains('closed') ? '▶' : '◀';
    
    setTimeout(() => {
        if (typeof map !== 'undefined') map.invalidateSize();
    }, 300);
}

// 2. 하위 메뉴 토글
function toggleSub(id) {
    document.getElementById(id).classList.toggle('hidden');
}

// 3. 리스트 생성 함수 (CSS 클래스 활용으로 최적화)
function createListItems(containerId, dataArray) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; 
    dataArray.forEach(item => {
        let p = document.createElement('p');
        p.innerText = item.name;
        // CSS에 정의된 스타일과 호버 효과를 위해 클래스 부여
        p.className = "mine-full-btn"; 
        
        p.onclick = () => {
            const [x, y, z] = item.coords;
            // 맵 이동 (마인크래프트 z, x 좌표를 맵의 lat, lng으로 사용)
            if (typeof map !== 'undefined') {
                map.setView([z, x], 5);
            }
        };
        
        container.appendChild(p);
    });
}

// 4. 페이지 로드 시 모든 데이터 연동
document.addEventListener('DOMContentLoaded', () => {
    if (typeof mapData !== 'undefined') {
        // 사냥터
        if (mapData.hunt) createListItems('hunt', mapData.hunt);
        // 약초 (data.js에 정의되어 있다면)
        if (mapData.herbs) createListItems('herbs', mapData.herbs);
        // 광산
        if (mapData.mines) createListItems('mines', mapData.mines);
    }
});
