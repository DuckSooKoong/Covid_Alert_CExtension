// 서버와 상호작용하기 위한 객체 (WebAPI Interface - Reload 없이 웹서버로부터 데이터를 가져옴)
var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1741000/DisasterMsg2/getDisasterMsgList'; /*URL*/
var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'G%2Fz6rXDzz1kTBimW6vvnHvnSLCw3H3aAwUs345r%2BuljC5cz6%2FBax6HTj2mgUct%2F2bAZh04XH6U0ie18ZXKNuYQ%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('JSON'); /**/
queryParams += '&' + encodeURIComponent('flag') + '=' + encodeURIComponent('Y'); /**/
let json_description;
let base_description = "<div class=\"description\">"
                        + "<h1>알림</h1>"
                        + "<div id=\"num_of_result\">"
                        + "</div>"

function showSelectRegion() {
    var obj = {
      강원도: [
        "강원도 전체",
        "강원도 강릉시",
        "강원도 고성군",
        "강원도 동해시",
        "강원도 삼척시",
        "강원도 속초시",
        "강원도 양구군",
        "강원도 양양군",
        "강원도 영월군",
        "강원도 원주시",
        "강원도 인제군",
        "강원도 정선군",
        "강원도 철원군",
        "강원도 춘천시",
        "강원도 태백시",
        "강원도 평창군",
        "강원도 홍천군",
        "강원도 화천군",
        "강원도 횡성군",
      ],
      경기도: [
        "경기도 전체",
        "경기도 고양시",
        "경기도 과천시",
        "경기도 광명시",
        "경기도 광주시",
        "경기도 구리시",
        "경기도 군포시",
        "경기도 김포시",
        "경기도 남양주시",
        "경기도 동두천시",
        "경기도 부천시",
        "경기도 성남시",
        "경기도 수원시",
        "경기도 시흥시",
        "경기도 안산시",
        "경기도 안성시",
        "경기도 안양시",
        "경기도 양주시",
        "경기도 양평군",
        "경기도 여주시",
        "경기도 연천군",
        "경기도 오산시",
        "경기도 용인시",
        "경기도 의왕시",
        "경기도 의정부시",
        "경기도 이천시",
        "경기도 파주시",
        "경기도 평택시",
        "경기도 포천시",
        "경기도 하남시",
        "경기도 화성시",
      ],
      경상남도: [
        "경상남도 전체",
        "경상남도 거제시",
        "경상남도 거창군",
        "경상남도 고성군",
        "경상남도 김해시",
        "경상남도 남해군",
        "경상남도 밀양시",
        "경상남도 사천시",
        "경상남도 산청군",
        "경상남도 양산시",
        "경상남도 의령군",
        "경상남도 진주시",
        "경상남도 창녕군",
        "경상남도 창원시",
        "경상남도 통영시",
        "경상남도 하동군",
        "경상남도 함안군",
        "경상남도 함양군",
        "경상남도 합천군",
      ],
      경상북도: [
        "경상븍도 전체",
        "경상븍도 경산시",
        "경상븍도 경주시",
        "경상븍도 고령군",
        "경상븍도 구미시",
        "경상븍도 군위군",
        "경상븍도 김천시",
        "경상븍도 문경시",
        "경상븍도 봉화군",
        "경상븍도 상주시",
        "경상븍도 성주군",
        "경상븍도 안동시",
        "경상븍도 영덕군",
        "경상븍도 영양군",
        "경상븍도 영주시",
        "경상븍도 영천시",
        "경상븍도 예천군",
        "경상븍도 울릉군",
        "경상븍도 울진군",
        "경상븍도 의성군",
        "경상븍도 청도군",
        "경상븍도 청송군",
        "경상븍도 칠곡군",
        "경상븍도 포항시",
      ],
      광주광역시: [
        "광주광역시 전체",
        "광주광역시 광산구",
        "광주광역시 남구",
        "광주광역시 동구",
        "광주광역시 북구",
        "광주광역시 서구",
      ],
      대구광역시: [
        "대구광역시 전체",
        "대구광역시 남구",
        "대구광역시 달서구",
        "대구광역시 달성군",
        "대구광역시 동구",
        "대구광역시 북구",
        "대구광역시 서구",
        "대구광역시 수성구",
        "대구광역시 중구",
      ],
      대전광역시: [
        "대전광역시 전체",
        "대전광역시 대덕구",
        "대전광역시 동구",
        "대전광역시 서구",
        "대전광역시 유성구",
        "대전광역시 중구",
      ],
      부산광역시: [
        "부산광역시 전체",
        "부산광역시 강서구",
        "부산광역시 금정구",
        "부산광역시 기장군",
        "부산광역시 남구",
        "부산광역시 동구",
        "부산광역시 동래구",
        "부산광역시 부산진구",
        "부산광역시 북구",
        "부산광역시 사상구",
        "부산광역시 사하구",
        "부산광역시 서구",
        "부산광역시 수영구",
        "부산광역시 연제구",
        "부산광역시 영도구",
        "부산광역시 중구",
        "부산광역시 해운대구",
      ],
      서울특별시: [
        "서울특별시 전체",
        "서울특별시 강남구",
        "서울특별시 강동구",
        "서울특별시 강북구",
        "서울특별시 강서구",
        "서울특별시 관악구",
        "서울특별시 광진구",
        "서울특별시 구로구",
        "서울특별시 금천구",
        "서울특별시 노원구",
        "서울특별시 도봉구",
        "서울특별시 동대문구",
        "서울특별시 동작구",
        "서울특별시 마포구",
        "서울특별시 서대문구",
        "서울특별시 서초구",
        "서울특별시 성동구",
        "서울특별시 성북구",
        "서울특별시 송파구",
        "서울특별시 양천구",
        "서울특별시 영등포구",
        "서울특별시 용산구",
        "서울특별시 은평구",
        "서울특별시 종로구",
        "서울특별시 중구",
        "서울특별시 중랑구",
      ],
      울산광역시: [
        "울산광역시 전체",
        "울산광역시 남구",
        "울산광역시 동구",
        "울산광역시 북구",
        "울산광역시 울주군",
        "울산광역시 중구",
      ],
      인천광역시: [
        "인천광역시 전체",
        "인천광역시 강화군",
        "인천광역시 계양구",
        "인천광역시 미추홀구",
        "인천광역시 남동구",
        "인천광역시 동구",
        "인천광역시 부평구",
        "인천광역시 서구",
        "인천광역시 연수구",
        "인천광역시 옹진군",
        "인천광역시 중구",
      ],
      전라남도: [
        "전라남도 전체",
        "전라남도 강진군",
        "전라남도 고흥군",
        "전라남도 곡성군",
        "전라남도 광양시",
        "전라남도 구례군",
        "전라남도 나주시",
        "전라남도 담양군",
        "전라남도 목포시",
        "전라남도 무안군",
        "전라남도 보성군",
        "전라남도 순천시",
        "전라남도 신안군",
        "전라남도 여수시",
        "전라남도 영광군",
        "전라남도 영암군",
        "전라남도 완도군",
        "전라남도 장성군",
        "전라남도 장흥군",
        "전라남도 진도군",
        "전라남도 함평군",
        "전라남도 해남군",
        "전라남도 화순군",
      ],
      전라북도: [
        "전라북도 전체",
        "전라북도 고창군",
        "전라북도 군산시",
        "전라북도 김제시",
        "전라북도 남원시",
        "전라북도 무주군",
        "전라북도 부안군",
        "전라북도 순창군",
        "전라북도 완주군",
        "전라북도 익산시",
        "전라북도 임실군",
        "전라북도 장수군",
        "전라북도 전주시",
        "전라북도 정읍시",
        "전라북도 진안군",
      ],
      제주특별자치도: [
        "제주특별자치도 전체",
        "제주특별자치도 서귀포시",
        "제주특별자치도 제주시",
      ],
      충청남도: [
        "충청남도 전체",
        "충청남도 공주시",
        "충청남도 금산군",
        "충청남도 논산시",
        "충청남도 당진시",
        "충청남도 보령시",
        "충청남도 부여군",
        "충청남도 서산시",
        "충청남도 서천군",
        "충청남도 아산시",
        "충청남도 예산군",
        "충청남도 천안시",
        "충청남도 청양군",
        "충청남도 태안군",
        "충청남도 홍성군",
      ],
      충청북도: [
        "충청북도 전체",
        "충청북도 괴산군",
        "충청북도 단양군",
        "충청북도 보은군",
        "충청북도 영동군",
        "충청북도 옥천군",
        "충청북도 음성군",
        "충청북도 제천시",
        "충청북도 진천군",
        "충청북도 청주시",
        "충청북도 충주시",
        "충청북도 계룡시",
        "충청북도 증평군",
      ],
      세종특별자치시: ["세종특별자치시 전체", "세종특별자치시"],
      "임진강 수계지역(경기도 연천군,파주시)": ["경기도 파주시", "경기도 연천군"],
    };
    let opt_spec = 
          "<button id=\"select_all\">돌아가기</button>"
        + "</a><legend>지역 리스트</legend>"
        + "<h4>다중 선택을 위해 Ctrl+클릭을 해주세요</h4>"
        + "<div id=\"region_form\">"
        + "<select id=\"selectbox\" name=\"지역\" multiple=\"multiple\">"
        
    for (let key in obj) {
        opt_spec += "<optgroup label="
      opt_spec += obj[key] + ">";
      for (let tmp in obj[key]) {
        const value = obj[key][tmp];
        opt_spec += "<option>" + value + "</option>";
      }
      opt_spec += "</optgroup>"
    }
    opt_spec += "</select><input type=\"submit\" value=\"선택하자!\"></form>";
    document.getElementById("descriptions").innerHTML = opt_spec;
  }

function getAllData() {
    var description = base_description;
    var count = 0;
    if (localStorage.length == 0) {
        update();
    }
    else {
        json_description = JSON.parse(localStorage.getItem('json'));
        for (var i = 0; i < 1000; i++) {
            count++;
            description += "<div class=\"description\"><p>" + json_description.row[i].create_date + "</p><p>" + json_description.row[i].location_name + "</p><p>" + json_description.row[i].msg + "</p></div>";
        }
        document.getElementById("descriptions").innerHTML = description;
        document.getElementById("num_of_result").innerHTML = "<p>총 " + count + "건의 검색 결과가 있습니다.</p>";
    }
}

function getRegionData(region) {
    var description = base_description;
    var count = 0;
    if (localStorage.length == 0) {
        update();
    }
    else {
        json_description = JSON.parse(localStorage.getItem('json'));
        for (var i = 0; i < 1000; i++) {
            for (var j = 0; j < region.length; j++) {
                if (json_description.row[i].location_name == region[j]) {
                    count++;
                    description += "<div class=\"description\"><p>" + json_description.row[i].create_date + "</p><p>" + json_description.row[i].location_name + "</p><p>" + json_description.row[i].msg + "</p></div>";
                }
            }
        }
        document.getElementById("descriptions").innerHTML = description;
        document.getElementById("num_of_result").innerHTML = "<p>총 " + count + "건의 검색 결과가 있습니다.</p>";
    }
}

function getKeywordData(keyword) {
    var description = base_description;
    if (localStorage.length == 0) {
        update();
    }
    else {
        json_description = JSON.parse(localStorage.getItem('json'));
        var count = 0;
        for (var i = 0; i < 1000; i++) {
            if ((json_description.row[i].msg).indexOf(keyword) != -1) {
                count++;
                description += "<p>" + json_description.row[i].create_date 
                            + "</p><p>" 
                            + json_description.row[i].location_name 
                            + "</p><p>" + json_description.row[i].msg 
                            + "</p></div>";
            }
        }

        document.getElementById("descriptions").innerHTML = description;
        document.getElementById("num_of_result").innerHTML = "<p>총 " + count + "건의 검색 결과가 있습니다.</p>";
    }
}

function update() {
    localStorage.clear();
    xhr.open('GET', url + queryParams);     // 요청 초기화
    
    // document.write("<p>loading...</p>");
    xhr.onreadystatechange = function () {  // readyState 속성이 변경될 때마나 호출
        if (this.readyState == 4) {
            let tmp_json = JSON.parse(this.responseText);
            let tmp_str = JSON.stringify(tmp_json.DisasterMsg[1]);
            localStorage.setItem('json', tmp_str);
            // document.write("<p>finished!</p>");
        }
    };
    xhr.send();
}

// window.onload = function() {
function keyword_controller() {
    var keyword = document.getElementById("keyword").value;
    getKeywordData(keyword);
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("all_data").onclick = getAllData;
    document.getElementById("select_region").onclick = showSelectRegion;
    document.getElementById("select_keyword").onclick = keyword_controller;
});

// document.addEventListener("DOMContentLoaded", function () {
//     // document.getElementById("keyword_form").onclick = keyword_controller();
//     // document.getElementById("select_region").onclick = showSelectRegion();
// });


// window.onload = update();
// window.onload = getAllData();
// window.onload = getRegionData(['충청북도 음성군', '경상북도 경주시', '부산광역시 전체']);
// window.onload = getKeywordData(['호텔']);