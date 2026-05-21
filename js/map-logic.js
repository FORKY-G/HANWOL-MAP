const MAP_CENTER = [-128, 128];
const MAP_BOUNDS = [[-256, 0], [0, 256]];

const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 1, maxZoom: 7,
    attributionControl: false,
    zoomControl: false, // 줌 컨트롤러 완전 삭제
    maxBounds: MAP_BOUNDS,
    maxBoundsViscosity: 1.0
});

L.TileLayer.include({
    getTileUrl: function (coords) {
        let z = coords.z, x = coords.x, y = coords.y;
        if (z > 5) {
            let scale = Math.pow(2, z - 5);
            x = Math.floor(x / scale); y = Math.floor(y / scale); z = 5;
        }
        let customY = Math.pow(2, z) - 1 - y;
        return L.Util.template(this._url, { z: z, x: x, customY: customY });
    }
});

new L.TileLayer('tiles/{z}/{x}/{customY}.png', {
    tileSize: 256, noWrap: true, minZoom: 1, maxZoom: 7, maxNativeZoom: 5
}).addTo(map);

map.setView(MAP_CENTER, 1);

window.addEventListener("resize", () => map.invalidateSize());
