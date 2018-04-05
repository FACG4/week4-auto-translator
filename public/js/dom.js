const input = document.querySelector('#searchQuery');

const wordList = document.querySelector('#wordList');
var send1 = document.getElementById('send');
var results  = document.getElementById('result');

input.addEventListener('keyup', () => {
  fetch(input.value.toLowerCase(), render);
});





function fetch(str, cb) {
  const xhr = new XMLHttpRequest;
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      cb(data);
    }
  }
  xhr.open('POST', "/search");
  xhr.send(str);
}







function render(arr) {
  const autoList = document.createElement('datalist');
  autoList.id = 'list';
  autoList.classList.add('auto-list');
  arr.map((word) => {
    const option = document.createElement('option');
    option.textContent = word;
    autoList.appendChild(option);
  })
  const oldList = document.querySelector('datalist');
  wordList.replaceChild(autoList, oldList);
}


function fetch100(url, callback) {
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
if (xhr.readyState == 4 && xhr.status == 200) {
 response = JSON.parse(xhr.responseText)[0];
callback(response);
}
}
xhr.open('GET', url)
xhr.send();
}





//t htis is the new function ......
send1.addEventListener('click',function(e){
  var inputer = document.getElementById('searchQuery').value.length;
  var myUrl1 = 'http://api.wordnik.com/v4/word.json/'+ input.value +'/definitions?limit=1&partOfSpeech=noun&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
  var myUrl2 = 'http://api.wordnik.com:80/v4/word.json/'+ input.value+'/audio?useCanonical=false&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

  e.preventDefault();

  if(inputer === 0){

     alert('Enter some text!');
  }
  else{
fetch100(myUrl1, function(res){

  if (res === undefined) {
             document.getElementById('result').innerHTML = '';
             alert('No results for the word you entered!');
             document.getElementById('searchQuery').value = '';

         }




else {
  document.getElementById('searchQuery').value = '';
         var data = res.text;

  var newData = document.createElement('p');
  newData.textContent = data;
  newData.setAttribute('class','p1');
  results.appendChild(newData)

  fetch100(myUrl2, function(res2){
    var mySoundUrl = res2.fileUrl;
    var audio = document.createElement('audio');
    audio.setAttribute('class', 'mysound');
    audio.setAttribute('class','myDiv');
    var sound = document.createElement('source');
    sound.setAttribute('src',mySoundUrl);
    audio.setAttribute('controls','controls');
    audio.appendChild(sound);
    results.appendChild(audio);
  });}
});
}
document.getElementById("result").textContent = " ";
})
