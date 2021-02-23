// 서버와 상호작용하기 위한 객체 (WebAPI Interface - Reload 없이 웹서버로부터 데이터를 가져옴)
var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1741000/DisasterMsg2/getDisasterMsgList'; /*URL*/
var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'G%2Fz6rXDzz1kTBimW6vvnHvnSLCw3H3aAwUs345r%2BuljC5cz6%2FBax6HTj2mgUct%2F2bAZh04XH6U0ie18ZXKNuYQ%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('JSON'); /**/
queryParams += '&' + encodeURIComponent('flag') + '=' + encodeURIComponent('Y'); /**/
let json;

function getAllData() {
    if (localStorage.length == 0) {
        update();
    }
    json = JSON.parse(localStorage.getItem('json'));
    for (var i = 0; i < 1000; i++) {
        document.write("<div>");
        document.write("<p>"+ json.DisasterMsg[1].row[i].create_date + "</p>");
        document.write("<p>"+ json.DisasterMsg[1].row[i].location_name + "</p>");
        document.write("<p>"+ json.DisasterMsg[1].row[i].msg + "</p>");
        document.write("</div>");
    }
}

function getRegionData(region) {
    if (localStorage.length == 0) {
        update();
    }
    json = JSON.parse(localStorage.getItem('json'));
    for (var i = 0; i < 1000; i++) {
        for (var j = 0; j < region.length; j++) {
            if (json.DisasterMsg[1].row[i].location_name == region[j]) {
                document.write("<p>" + json.DisasterMsg[1].row[i].create_date + "</p>");
                document.write("<p>" + json.DisasterMsg[1].row[i].location_name + "</p>")
                document.write("<p>" + json.DisasterMsg[1].row[i].msg + "</p>");
            }
        }
    }
}

function update() {
    xhr.open('GET', url + queryParams);     // 요청 초기화
    
    // document.getElementById('data').innerHTML = "Loading..."
    
    xhr.onreadystatechange = function () {  // readyState 속성이 변경될 때마나 호출
        if (this.readyState == 4) {
            localStorage.setItem('json', this.responseText);
        }
    };
    xhr.send();
}

window.onload = getAllData();
// window.onload = getRegionData(['충청북도 음성군', '경상북도 경주시', '부산광역시 전체']);