const inputTextEle = document.querySelector(".input");
const outputTextEle = document.querySelector(".output");

document.getElementById("translate-button").addEventListener("click", translate);

function translate() {
  const inputText = inputTextEle.value;
  const sourceLanguage = document.querySelector("#source-languages").value;
  const targetLanguage = document.querySelector("#target-languages").value;

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${encodeURI(inputText)}`;

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200)
    {
        const responseReturned = JSON.parse(this.responseText);
        const translations = responseReturned[0].map((text) => text[0]);
        const outputText = translations.join(" ");

        outputTextEle.textContent = outputText;
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

document.getElementById("clear-button").addEventListener("click",clear);

function clear(){
    inputTextEle.value= "";
    outputTextEle.textContent = "";
}

document.querySelector(".switch-button").addEventListener("click",switchLang);

function switchLang(){
    let sourceLanguage = document.getElementById("source-languages");
    let targetLanguage = document.getElementById("target-languages");

    const sourceValue = sourceLanguage.value;
    const targetValue = targetLanguage.value;

    sourceLanguage.value = targetValue;
    targetLanguage.value = sourceValue;

    inputTextEle.value = outputTextEle.textContent;
    outputTextEle.textContent = "";

    translate();
}