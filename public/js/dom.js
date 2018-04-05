const input = document.querySelector('#searchQuery');
const wordList = document.querySelector('#wordList');
const translateBtn = document.getElementById('send');
const results = document.getElementById('result');

input.addEventListener('keyup', () => {
  fetch('POST', '/search', input.value.toLowerCase(), render);
});

// generic fetch function
function fetch(method, url, payload, cb) {
  const xhr = new XMLHttpRequest;
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      cb(data);
    }
  }
  xhr.open(method, url);
  xhr.send(payload);
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

// Getting the info form the API
translateBtn.addEventListener('click', function (e) {
  const myUrl1 = 'https://cors-anywhere.herokuapp.com/http://api.wordnik.com/v4/word.json/' + input.value + '/definitions?limit=1&partOfSpeech=noun&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
  const myUrl2 = 'https://cors-anywhere.herokuapp.com/http://api.wordnik.com:80/v4/word.json/' + input.value + '/audio?useCanonical=false&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

  // e.preventDefault();
  fetch('GET', myUrl1, null, function (res) {
    if(res[0].text.length === 0) {
      alert('Unavailable Translation');
      return;
    }
    const data = res[0].text;    
    const newData = document.createElement('p');
    newData.textContent = data;
    newData.setAttribute('class', 'p1');
    results.appendChild(newData)

    fetch('GET', myUrl2, null, function (res2) {
      const mySoundUrl = res2[0].fileUrl;
      const audio = document.createElement('audio');
      audio.setAttribute('class', 'myDiv');
      const sound = document.createElement('source');
      sound.setAttribute('src', mySoundUrl);
      audio.setAttribute('controls', 'controls');
      audio.appendChild(sound);
      results.appendChild(audio);
    });
  });
  document.getElementById("result").textContent = " ";
  input.value = '';
})