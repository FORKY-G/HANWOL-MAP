//1. 스폰
const spawnData = { name: "스폰 지점", mcX: -969, mcZ: -965 };

//2. 십이지신
const animals = [
    { order: 1, name: "쥐", coords: -2900, 127, -4600, file: "zodiac1.png" },
    { order: 2, name: "소", coords: -616, 116, 3889, file: "zodiac2.png" },
    { order: 3, name: "호랑이", coords: -5500, 152, -1600, file: "zodiac3.png" },
    { order: 4, name: "토끼", coords: 4590, 122, -3397, file: "zodiac4.png" },
    { order: 5, name: "용",coords: -891, 106, -536, file: "zodiac5.png" },
    { order: 6, name: "뱀",coords: 2685, 145, -4051, file: "zodiac6.png" },
    { order: 7, name: "말", coords: -2365, 282, 3968, file: "zodiac7.png" },
    { order: 8, name: "양", coords: 5093, 135, 2092, file: "zodiac8.png" },
    { order: 9, name: "원숭이", coords: 3280,  162,  2952, file: "zodiac9.png" },
    { order: 10, name: "닭", coords: 5075,  106,  -344, file: "zodiac10.png" },
    { order: 11, name: "개", coords: -4455,  171,  -2376, file: "zodiac11.png" },
    { order: 12, name: "돼지", coords: -3657,  212,  1112, file: "zodiac12.png" }
];

//3. 사냥터
const mapData = {
    hunt: [
        { name: "혈교도", level: "100", monster: "혈교도인(lv.100)", quest: "혈교(척후병)", coords: [-3980, 80, 2496], elite: "", boss: "", memo: "혈교 상자 찾기 (상자1(정적주) : -3939 -13 2045, 상자2(정적주) : -4097 13 2168, 상자3(빙백설화) : -3880 -30 2303)" },
        { name: "화검문", level: "90", monster: "봉원숭이(lv.90), 곤봉원숭이(lv.90)", quest: "[히든] 심마니", coords: [-3297, 116, -1696], elite: "", boss: "", memo: "사냥터 꼭대기 화검문 포탈( 화검문 열쇠 제작 필요)" },
        { name: "흑운회", level: "90", monster: "흑운회무인(lv.90)", quest: "몰락한 소가주", coords: [2461, 88, -1879], elite: "적운", boss: "", memo: "흑운회 중앙에 있는 비석에 깃발로 적운 소환" },
        { name: "경작지", level: "0~5", monster: "참새(lv.0), 허수아비(lv.5)", quest: "", coords: [-960, 67, -670], elite: "", boss: "", memo: "" },
        { name: "화수원", level: "10~20", monster: "다람쥐(lv.10), 흙토끼(lv.15), 백토끼(lv.20)", quest: "", coords: [-586, 90, 443], elite: "", boss: "", memo: "" },
        { name: "괴암곡", level: "25~35", monster: "하급쥐(lv.25), 중급쥐(lv30), 상급쥐(lv.35)", quest: "", coords: [1310, 176, -1592], elite: "정예쥐", boss: "장로쥐", memo: "" },
        { name: "멸문", level: "40~50", monster: "뱀(lv.40), 청사(lv.45), 적사(lv.50)", quest: "[히든] 호리병을 찾아서(수상한포탈)", coords: [3858, 131, -2642], elite: "구렁이", boss: "", memo: "수상한 포탈로 들어간 후 위치 찾기 - 수상한포탈 : x: 3730, y: 129, z: -2591, 뱀의 기운 얻는 곳 x:1200, y:-40, z: 300" },
        { name: "신선원", level: "55~65", monster: "새싹삼(lv.55), 진삼(lv.60), 대장삼(lv.65)", quest: "", coords: [-3616, 244, -3096], elite: "거대삼", boss: "농장주인", memo: "" },
        { name: "천웅성", level: "70~80", monster: "새싹삼(lv.55), 진삼(lv.60), 대장삼(lv.65)", quest: "", coords: [5706, 160, 5178], elite: "", boss: "", memo: "" },
        { name: "매화곡", level: "85~95", monster: "천도원숭이(lv.85), 황도원숭이(lv.90), 매화호(lv.95)", quest: "[히든] 심마니", coords: [4288, 141, 408], elite: "거대 매화호", boss: "오공", memo: "" },
        { name: "이매궁", level: "100~110", monster: "도깨비(lv.100), 청깨비(lv.105), 진깨비(lv.110)", quest: "", coords: [1634, 72, 331], elite: "", boss: "", memo: "" },
        { name: "검성지묘", level: "115~125", monster: "강암수호(Lv.115), 새끼암갑수(Lv.120), 암갑수(Lv.125)", quest: "", coords: [-5428, 121, -808], elite: "", boss: "", memo: "" },
        { name: "마교주둔지", level: "120~140", monster: "마교도(Lv.120), 마단주(Lv.140)", quest: "", coords: [4704, 89, 3086], elite: "", boss: "", memo: "" },
        { name: "빙설곡", level: "130~140", monster: "백랑(Lv.130), 적호(Lv.135), 백호(Lv.140)", quest: "", coords: [6796, 87, -2515], elite: "", boss: "", memo: "" },
        { name: "빙궁", level: "145~155", monster: "빙궁조(Lv.145), 빙궁병(Lv.150), 북해신녀(Lv.155)", quest: "", coords: [6566, 83, 952], elite: "", boss: "", memo: "" },
        { name: "협사곡", level: "160~170", monster: "산적(Lv.160), 산적궁수(Lv.165), 멧돼지산적(Lv.170)", quest: "", coords: [-242, 107, 4305], elite: "", boss: "", memo: "" },
        { name: "마교궁", level: "160~180", monster: "마군(Lv.160), 호법(Lv.180)", quest: "", coords: [7213, 54, 6232], elite: "", boss: "", memo: "" },
        { name: "황야성", level: "175~185", monster: "토석병(Lv.175), 토석군(Lv.180), 토석궁사(Lv.185)", quest: "", coords: [-1985, 22, 2001], elite: "", boss: "", memo: "" }
    ]
};
