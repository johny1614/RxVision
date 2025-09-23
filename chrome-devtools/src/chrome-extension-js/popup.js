chrome.storage.sync.get('userSelector', function(result) {
  console.log('Selector currently is:', result.userSelector);
  if (result.userSelector) {
    document.getElementById('selectorInput').value = result.userSelector;
  }
});


document.getElementById('saveButton').addEventListener('click', function() {
  var selector = document.getElementById('selectorInput').value;
  if (selector) {
    chrome.storage.sync.set({ userSelector: selector }, function() {
      console.log('Selector saved:', selector);
      var statusMessage = document.getElementById('statusMessage');
      statusMessage.style.display = 'block';
      var clearMessage = document.getElementById('clearMessage');
      clearMessage.style.display = 'none';
    });
  } else {
    alert('Please enter a valid selector!');
  }
});

document.getElementById('clearButton').addEventListener('click', function() {
  chrome.storage.sync.remove('userSelector', function() {
    console.log('Selector cleared');
    var clearMessage = document.getElementById('clearMessage');
    clearMessage.style.display = 'block';
    var statusMessage = document.getElementById('statusMessage');
    statusMessage.style.display = 'none';
  });
});

document.getElementById('bpButton').addEventListener('click', function() {
  document.getElementById('selectorInput').value = 'iframe[src*="softwareplant"]';
});
