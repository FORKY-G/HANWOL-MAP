// [설정값 및 초기화]
const mapCenterPoint = [-128, 128];
const mapBounds = L.latLngBounds([-256, 0], [0, 256]);

const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 1,
    maxZoom: 7,
    attributionControl: false, // ★ 여기서 확실히 끔
    dragging: true,
    maxBounds: mapBounds,
    maxBoundsViscosity: 1.0,
    zoomControl: false 
});

// 줌 컨트롤 생성
L.control.zoom({ position: 'bottomright' }).addTo(map);

// [타일 설정]
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

map.setView(mapCenterPoint, 1);

// [이벤트 처리 최적화]
function resetView() {
    map.invalidateSize();
}

window.addEventListener("resize", resetView);
// ★ map.on('zoomend moveend', resetView) 제거
// 지도가 움직일 때마다 강제로 중심점을 panTo 하면 사용자가 지도를 조작할 때 튀는 현상이 발생합니다.
