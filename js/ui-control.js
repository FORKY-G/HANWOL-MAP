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
        map.invalidateSize();
    }, 300);
}

// 2. 하위 메뉴 토글
function toggleSub(id) {
    document.getElementById(id).classList.toggle('hidden');
}

// 3. 통합된 리스트 생성 함수 (중앙 정렬 스타일 포함)
function createListItems(containerId, dataArray, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    dataArray.forEach(item => {
        let p = document.createElement('p');
        p.innerText = item.name;
        
        // 스타일 적용
        p.style.cursor = "pointer";
        p.style.padding = "10px 5px";
        p.style.margin = "2px 5px";
        p.style.textAlign = "center"; // 중앙 정렬
        p.style.background = "#3d352d";
        p.style.border = "1px solid #554";
        p.style.color = "#e3d2b0"; // 글자색 유지
        
        p.onmouseover = (e) => e.target.style.background = "#554a3d";
        p.onmouseout = (e) => e.target.style.background = "#3d352d";
        p.onclick = () => callback(item.coords);
        
        container.appendChild(p);
    });
}

// 4. 페이지 로드 시 데이터 연동
document.addEventListener('DOMContentLoaded', () => {
    if (typeof mapData !== 'undefined') {
        createListItems('mines', mapData.mines, (coords) => map.setView(coords, 5));
        createListItems('hunt', mapData.hunting, (coords) => map.setView(coords, 5));
        createListItems('herbs', mapData.herbs, (coords) => map.setView(coords, 5));
    }
});
