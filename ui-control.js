// 1. 사냥터 정보창 표시 함수
function showHuntingInfo(info) {
    var panel = document.getElementById('hunting-info-panel');
    panel.innerHTML = `
        <h4 id="panel-name" style="margin: 0;"></h4>
        <div id="panel-lv"></div>
        <button onclick="document.getElementById('hunting-info-panel').style.display='none'" 
                style="margin-top: 15px; cursor: pointer; width: 100%; padding: 8px; background: #C6C6C6; border: 2px solid #000; box-shadow: inset -2px -2px 0px #555555, inset 2px 2px 0px #ffffff; color: #3F3F3F; font-weight: bold;">
            닫기
        </button>
    `;

    document.getElementById('panel-name').innerHTML = `
        <span style="font-size: 24px;"><b>${info.name}</b></span> 
        <span style="font-size: 16px; color: #666;">(${info.lv})</span>
    `;
    document.getElementById('panel-lv').innerHTML = `
        <div style="margin-top: 8px; font-size: 16px; color: #444;">${info.monsters}</div>
    `;
    panel.style.display = 'block';
}

// 2. 약초 전용 정보 표시 함수
window.moveAndShowHerb = function(name, mcX, mcZ, color) {
    if (!map.hasLayer(herbLayers[name])) {
        map.addLayer(herbLayers[name]);
        updateLayerCheckbox(name, true);
    }

    var allLocations = herbData.filter(h => h.name === name);
    var coordsHtml = allLocations.map(h => `
        <div style="margin-bottom:5px;">
            <span style="background:#444; color:#fff; padding:2px 5px; border-radius:3px; font-size:11px; margin-right:5px;">좌표</span>
            <b style="color:#e74c3c;">X: ${h.mcX} / Z: ${h.mcZ}</b>
        </div>
    `).join('');

    var rareHerbs = ["월계엽", "철목영지", "금향과", "빙백설화"];
    var isRare = rareHerbs.includes(name);
    var titleExtra = isRare ? ` <span style="color:#e74c3c; font-size:14px;">(희귀)</span>` : "";
    var descExtra = isRare ? `<div style="font-size:9px; color:#555; margin-top:2px;">희귀 약초는 광범위하게 스폰됩니다.</div>`
                           : `<div style="font-size:9px; color:#e74c3c; margin-top:2px; font-weight:bold;">위 좌표들은 명확하지 않을 수 있습니다.</div>`;

    var panel = document.getElementById('hunting-info-panel');
    panel.style.display = 'block';
    panel.innerHTML = `
        <div style="border-bottom:3px solid ${color}; padding-bottom:8px; margin-bottom:12px; position:relative;">
            <b style="font-size:18px; color:#3F3F3F; text-shadow:1px 1px 0px #fff;">${name}</b>${titleExtra}
            ${descExtra}
            <span style="position:absolute; right:0; top:0; cursor:pointer; font-weight:bold; padding:5px;" onclick="document.getElementById('hunting-info-panel').style.display='none'">X</span>
        </div>
        <div style="font-size:14px; line-height:1.6; background:rgba(255,255,255,0.5); padding:10px; border:1px solid #888; max-height:150px; overflow-y:auto;">
            ${coordsHtml}
        </div>
        <button onclick="document.getElementById('hunting-info-panel').style.display='none'" 
                style="margin-top:12px; width:100%; cursor:pointer; background:#C6C6C6; border:2px solid #000; box-shadow: inset -2px -2px 0px #555555, inset 2px 2px 0px #ffffff; font-weight:bold; padding:5px;">
            닫기
        </button>
    `;
};

// 3. 검색 실행 함수
window.executeSearch = function() {
    var input = document.getElementById('search-input');
    var query = input.value.trim();
    if (!query) return;

    var found = false;
    var target = null;
    var targetMarker = null;

    // 사냥터 검색
    huntingInfo.forEach(info => {
        if (info.name.includes(query)) {
            target = info.center; found = true;
            if (!map.hasLayer(huntingLayers[info.name])) { 
                map.addLayer(huntingLayers[info.name]); 
                updateLayerCheckbox(info.name, true); 
            }
            setTimeout(() => showHuntingInfo(info), 100);
        }
    });

    // 약초 검색
    if (!found) {
        herbData.forEach(herb => {
            if (!found && herb.name.includes(query)) {
                target = herb.coords; found = true;
                window.moveAndShowHerb(herb.name, herb.mcX, herb.mcZ, herbColors[herb.name] || '#8e44ad');
            }
        });
    }

    if (found && target) { 
        map.setView(target, -1); 
        input.value = ""; 
    } else { 
        alert("검색 결과가 없습니다."); 
    }
};

// 4. 기타 UI 관리 함수들
window.updateLayerCheckbox = function(name, isAdd) {
    document.querySelectorAll('.leaflet-control-layers-overlays label').forEach(label => {
        if (label.innerText.trim().includes(name)) {
            var cb = label.querySelector('input');
            if (cb) cb.checked = isAdd;
        }
    });
};

window.generateHuntingList = function() {
    const listElement = document.getElementById('hunting-list');
    huntingInfo.forEach(info => {
        const li = document.createElement('li');
        li.style.margin = "5px 0"; li.style.padding = "5px"; li.style.borderBottom = "1px solid #888";
        li.innerHTML = `<span class="hunt-name-clickable" style="font-size: 14px; display: block;" onclick="moveAndShowHunt('${info.name}')">${info.name} <small style="color:#666;">(${info.lv})</small></span>`;
        listElement.appendChild(li);
    });
};

window.moveAndShowHunt = function(name) {
    var info = huntingInfo.find(h => h.name === name);
    if (!info) return;
    if (!map.hasLayer(huntingLayers[name])) {
        map.addLayer(huntingLayers[name]);
        updateLayerCheckbox(name, true);
    }
    map.setView(info.center, -1);
    setTimeout(() => showHuntingInfo(info), 100); 
};
