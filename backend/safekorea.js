// 서버와 상호작용하기 위한 객체 (WebAPI Interface - Reload 없이 웹서버로부터 데이터를 가져옴)
var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1741000/DisasterMsg2/getDisasterMsgList'; /*URL*/
var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'G%2Fz6rXDzz1kTBimW6vvnHvnSLCw3H3aAwUs345r%2BuljC5cz6%2FBax6HTj2mgUct%2F2bAZh04XH6U0ie18ZXKNuYQ%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('JSON'); /**/
queryParams += '&' + encodeURIComponent('flag') + '=' + encodeURIComponent('Y'); /**/
let json_description;
let base_description = "<form id =\"keyword_form\" onsubmit=\"controller()\"><div class=\"description\"><input type=\"text\" name=\"keyword\"></form><input type=\"submit\" value=\"검색\"><div id=\"num_of_result\"></div>"

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
    if(localStorage.length == 0) {
        update();
    }
    else {
        json_description = JSON.parse(localStorage.getItem('json'));
        var count = 0;
        for (var i = 0; i < 1000; i++) {
            for (var j = 0; j < keyword.length; j++) {
                if ((json_description.row[i].msg).indexOf(keyword[j].value) != -1) {
                    count++;
                    description += "<p>" + json_description.row[i].create_date + "</p><p>" + json_description.row[i].location_name + "</p><p>" + json_description.row[i].msg + "</p></div>";
                }
            }
        }
        document.getElementById("descriptions").innerHTML = description;
        document.getElementById("num_of_result").innerHTML = "<p>총 " + count + "건의 검색 결과가 있습니다.</p>";
    }
}

function update() {
    localStorage.clear();
    xhr.open('GET', url + queryParams);     // 요청 초기화
    
    document.write("<p>loading...</p>");
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
function controller() {
    var keyword_form = document.getElementById("keyword_form").elements;
    var keywords = [];
    for (var i = 0; i < keyword_form.length; i++) {
        keywords.push(keyword_form[i]);
    }
    getKeywordData(keywords);
}

// window.onload = update();
// window.onload = getAllData();
// window.onload = getRegionData(['충청북도 음성군', '경상북도 경주시', '부산광역시 전체']);
// window.onload = getKeywordData(['호텔']);