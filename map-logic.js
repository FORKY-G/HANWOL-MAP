// 1. 지도 기본 설정
var imgW = 7300, imgH = 6494;
var imageBounds = [[-imgH, 0], [0, imgW]];
var map = new L.Map('map', { 
    maxZoom: 12, minZoom: -5, crs: L.CRS.Simple, noWrap: true, zoomSnap: 0.25 
});

L.imageOverlay('map.jpg', imageBounds).addTo(map);
map.fitBounds(imageBounds);

// 2. 아이콘 생성 함수
function createHtmlIcon(color) {
    return L.divIcon({ className: 'mine-clickable-area', html: `<div class="mine-dot" style="background:${color};"></div>`, iconSize: [30, 30], iconAnchor: [15, 15] });
}
function createSteleIcon() {
    return L.divIcon({ className: 'stele-icon-container', html: `<div class="stele-body"></div>`, iconSize: [24, 34], iconAnchor: [12, 34] });
}

// 3. 레이어 그룹 준비
var poiLayers = { '스폰': L.layerGroup(), '십이간지': L.layerGroup(), '녹색광산': L.layerGroup(), '청색광산': L.layerGroup(), '황색광산': L.layerGroup(), '적색광산': L.layerGroup() };
var herbLayers = {};
var huntingLayers = {};
var mountainLayers = L.layerGroup();

// 4. 마커 생성 로직 (데이터 기반)

// 산(비석) 마커
mountainData.forEach(m => {
    L.marker(mcToPx(m.x, m.z), { icon: createSteleIcon() }).addTo(mountainLayers)
     .bindTooltip(`<b style="font-size:16px;">${m.name}</b><br>X: ${m.x}, Z: ${m.z}`, { direction: 'top', className: 'custom-tooltip' });
});

// 광산 마커
poiData.forEach(poi => {
    var key = (poi.type === '스폰') ? '스폰' : (poi.type === '녹') ? '녹색광산' : (poi.type === '청') ? '청색광산' : (poi.type === '황') ? '황색광산' : (poi.type === '적') ? '적색광산' : null;
    if(key) {
        L.marker(poi.coords, {icon: createHtmlIcon(poi.color)}).addTo(poiLayers[key])
         .bindPopup(`<b>${poi.name === "스폰" ? "스폰 지점" : poi.name + " 광산"}</b><br>[ ${poi.mcX}, ${poi.mcZ} ]`);
    }
});

// 약초 마커 및 레이어
herbData.forEach(herb => {
    var hCol = herbColors[herb.name] || '#8e44ad';
    var imgOverlay = L.imageOverlay(herb.file, imageBounds, { opacity: 0.6, interactive: false });
    var dotMarker = L.circleMarker(herb.coords, { radius: 3, color: "#000", weight: 1, fillColor: hCol, fillOpacity: 1 });
    dotMarker.bindPopup(`<b style="color:${hCol}; font-size:14px;">${herb.name}</b><br><span style="color:#555; font-size:12px;">[ ${herb.mcX}, ${herb.mcZ} ]</span>`);
    
    if (!herbLayers[herb.name]) herbLayers[herb.name] = L.layerGroup();
    herbLayers[herb.name].addLayer(imgOverlay).addLayer(dotMarker);
});

// 십이간지 마커
zodiacData.forEach(z => {
    L.marker(mcToPx(z.x, z.z), { icon: L.divIcon({ className: 'zodiac-icon', html: `<div style="width:60px; height:60px;"></div>`, iconSize: [60, 60], iconAnchor: [30, 30] }) }).addTo(poiLayers['십이간지'])
     .bindTooltip(`<b style="font-size:22px; color:#e67e22;">${z.name}</b><br>MC: ${z.x}, ${z.z}`, { direction: 'top', className: 'custom-tooltip', opacity: 0.95 });
});

// 사냥터 레이어 및 이벤트 연동
huntingInfo.forEach(info => {
    var imgOverlay = L.imageOverlay(info.file, imageBounds, { opacity: 0.6, interactive: false });
    var clickMarker = L.circleMarker(info.center, { radius: 35, color: '#e74c3c', weight: 1, fillOpacity: 0.1 });
    
    imgOverlay.on('add', () => showHuntingInfo(info));
    clickMarker.on('click', () => showHuntingInfo(info));
    imgOverlay.on('remove', () => {
        document.getElementById('hunting-info-panel').style.display = 'none';
    });

    huntingLayers[info.name] = L.layerGroup([imgOverlay, clickMarker]);
});
