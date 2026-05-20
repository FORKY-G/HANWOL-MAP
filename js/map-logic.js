// [설정값 및 초기화]
const mapCenterPoint = [-128, 128];
const mapBounds = L.latLngBounds([-256, 0], [0, 256]);

const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 1,
    maxZoom: 7,
    attributionControl: false,
    dragging: true,
    maxBounds: mapBounds,
    maxBoundsViscosity: 1.0,
    zoomControl: false // ★ 1. 기존 줌 컨트롤 제거
});

// ★ 2. 줌 컨트롤을 새로 생성하여 오른쪽 하단으로 배치
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// [UI 구성] 로고 및 타일 설정
const customAttribution = L.control.attribution({ position: 'bottomright', prefix: false });
customAttribution.addAttribution(`<div class="forky-attribution"><img src="forky.png"><span>FORKY_G</span></div>`).addTo(map);
L.control.attribution({
    prefix: '<img src="forky.png" style="width:15px; vertical-align:middle; margin-right:3px;"> FORKY_G'
}).addTo(map);

L.TileLayer.include({
    getTileUrl: function (coords) {
        let z = coords.z, x = coords.x, y = coords.y;
        if (z > 5) {
            let scale = Math.pow(2, z - 5);
            x = Math.floor(x / scale); y = Math.floor(y / scale); z = 5;
        }
        return L.Util.template(this._url, { z: z, x: x, customY: Math.pow(2, z) - 1 - y });
    }
});

new L.TileLayer('tiles/{z}/{x}/{customY}.png', {
    tileSize: 256, noWrap: true, minZoom: 1, maxZoom: 7, maxNativeZoom: 5
}).addTo(map);

// [초기 뷰 설정]
map.setView(mapCenterPoint, 1);

// [공통 이벤트 처리] 크기 변경 및 중심점 복구
function resetView() {
    map.invalidateSize();
    if (map.getZoom() === map.getMinZoom()) {
        map.panTo(mapCenterPoint, { animate: false });
    }
}

// 이벤트 리스너 통합 (resize 및 동작 제어)
window.addEventListener("resize", resetView);
map.on('zoomend moveend', resetView);
