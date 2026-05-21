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

// 3. 리스트 생성 및 지도 이동 함수
function createListItems(containerId, dataArray, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; 
    dataArray.forEach(item => {
        let p = document.createElement('p');
        p.innerText = item.name;
        
        // 스타일 (중앙 정렬 유지)
        p.style.cursor = "pointer";
        p.style.padding = "10px 5px";
        p.style.margin = "2px 5px";
        p.style.textAlign = "center";
        p.style.background = "#3d352d";
        p.style.border = "1px solid #554";
        p.style.color = "#e3d2b0";
        
        p.onmouseover = (e) => e.target.style.background = "#554a3d";
        p.onmouseout = (e) => e.target.style.background = "#3d352d";
        
        // 클릭 시 지도 이동 (z를 lat으로, x를 lng으로 변환)
        p.onclick = () => {
            const [x, y, z] = item.coords;
            map.setView([z, x], 5);
        };
        
        container.appendChild(p);
    });
}

// 4. 페이지 로드 시 적용
document.addEventListener('DOMContentLoaded', () => {
    if (typeof mapData !== 'undefined') {
        createListItems('hunt', mapData.hunt, (coords) => {});
    }
});
