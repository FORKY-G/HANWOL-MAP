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

// 3. 통합 리스트 생성 함수 (중앙 정렬 및 스타일 최적화)
function createListItems(containerId, dataArray, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; // 초기화
    
    dataArray.forEach(item => {
        let p = document.createElement('p');
        p.innerText = item.name;
        
        // 스타일 적용 (사이드바의 row 스타일과 이질감 없도록 설정)
        p.style.cursor = "pointer";
        p.style.padding = "10px 5px";
        p.style.margin = "2px 5px";
        p.style.textAlign = "center"; 
        p.style.background = "#3d352d";
        p.style.border = "1px solid #554";
        p.style.color = "#e3d2b0";
        p.style.borderRadius = "2px";
        
        // 마우스 호버 효과
        p.onmouseover = (e) => e.target.style.background = "#554a3d";
        p.onmouseout = (e) => e.target.style.background = "#3d352d";
        
        // 클릭 시 지도 이동
        p.onclick = () => {
            if (item.coords) {
                // mapData에서 [x, y, z] 순서라면 [z, x]로 Leaflet 매핑
                // coords가 [x, y, z]라면 [z, x] 순서로 setView 호출
                const latLng = [item.coords[2], item.coords[0]]; 
                map.setView(latLng, 5);
                console.log(item.name + " 이동:", latLng);
            }
        };
        
        container.appendChild(p);
    });
}

// 4. 페이지 로드 시 데이터 연동
document.addEventListener('DOMContentLoaded', () => {
    if (typeof mapData !== 'undefined') {
        // 사냥터 목록 (data.js에 정의된 mapData.hunting 사용)
        createListItems('hunt', mapData.hunting, (coords) => {
             const latLng = [coords[2], coords[0]];
             map.setView(latLng, 5);
        });
        
        // 약초와 광산도 필요 시 여기에 추가
        // createListItems('herbs', mapData.herbs, ...);
        // createListItems('mines', mapData.mines, ...);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. 사냥터 목록 생성 (mapData.hunt 사용)
    if (typeof mapData !== 'undefined' && mapData.hunt) {
        createListItems('hunt', mapData.hunt, (coords) => {
            // Leaflet 맵은 [위도, 경도]를 사용하므로 마크 좌표 [x, z]를 [z, x]로 변환
            const latLng = [coords[2], coords[0]]; 
            map.setView(latLng, 5);
            
            // 필요 시 여기서 해당 위치에 마커를 생성하는 로직 추가 가능
            console.log("이동 좌표:", latLng);
        });
    }
    
    // 2. 십이지신 (추후 필요시)
    // createListItems('zodiac', animals, ...);
});
