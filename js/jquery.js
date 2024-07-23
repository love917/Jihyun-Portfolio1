function autoType(elementClass, typingSpeed){
  var thhis2 = $(elementClass);
  thhis2.css({
    "position": "relative",
    "display": "inline-block"
  });
  
  thhis2 = thhis2.find(".text-jss");
  var text = thhis2.text().trim().split('');
  var amntOfChars = text.length;
  var newString = "";
  
  function typeText() {
    thhis2.text("|");
    setTimeout(function(){
      thhis2.css("opacity", 1);
      thhis2.prev().removeAttr("style");
      thhis2.text("");
      newString = "";  // 새로운 문자열 초기화
      for (var i = 0; i < amntOfChars; i++) {
        (function(i, char) {
          setTimeout(function() {        
            newString += char;
            thhis2.text(newString);
            // 모든 문자가 출력되었을 때 무한 반복을 위해 typeText 함수를 재귀 호출
            if (i === amntOfChars - 1) {
              setTimeout(typeText, 1500); // 텍스트가 끝난 후 1.5초 대기 후 다시 시작
            }
          }, i * typingSpeed);
        })(i + 1, text[i]);
      }
    }, 1500); // 초기 대기 시간
  }
  
  typeText();
}

$(document).ready(function(){
  autoType(".type-jss", 100);
});

