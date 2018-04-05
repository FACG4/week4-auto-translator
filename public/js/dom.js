const input = document.querySelector('#searchQuery');
const wordList = document.querySelector('#wordList');




input.addEventListener('keyup', () => {  
  fetch(input.value.toLowerCase(), render);
});

function fetch(str, cb) {
  const xhr = new XMLHttpRequest;
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      
      const data = JSON.parse(xhr.responseText);
      console.log(data);
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