var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1741000/DisasterMsg2/getDisasterMsgList'; /*URL*/
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'G%2Fz6rXDzz1kTBimW6vvnHvnSLCw3H3aAwUs345r%2BuljC5cz6%2FBax6HTj2mgUct%2F2bAZh04XH6U0ie18ZXKNuYQ%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('JSON'); /**/
queryParams += '&' + encodeURIComponent('flag') + '=' + encodeURIComponent('Y'); /**/

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
    console.log("update!")
}

while(true) {
    var time = 1000;
    setInterval(update(), time);
}