var httpRequest;

function spin() {
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  httpRequest.onreadystatechange = processResponse;
  httpRequest.open('GET', 'http://localhost:3000/spin');
  httpRequest.send();
}


/* Utility Functions */
function processResponse() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      applyResult(httpRequest.responseText);
    } else {
      alert('There was a problem with the request.');
    }
  }
}

function applyResult(json){
  let spingObj = JSON.parse(json);
  //Set Response Text
  document.getElementById('smResult').innerHTML = spingObj.result;
  //Set Slots
  document.getElementById("smSlotOne").src = "Assets/Symbol_"+ spingObj.spin1 + ".png";
  document.getElementById("smSlotTwo").src = "Assets/Symbol_"+ spingObj.spin2 + ".png";
  document.getElementById("smSlotThree").src = "Assets/Symbol_"+ spingObj.spin3 + ".png";
  //Check to trigger bonus
  if(spingObj.bonus){
      activateBonus()
  }

}

function activateBonus() {
  //Show Message
  let smBonusMsg = document.getElementById("smBonusMsg");
  smBonusMsg.style.display = "block";
  smBonusMsg.className += " smActiveBonus";

  setTimeout(function(){
    smBonusMsg.className = "";
    smBonusMsg.style.display = "none";

  }, 1000)
  //Automatically Send Bonus
  let bonusRequest = new XMLHttpRequest();

  bonusRequest.onreadystatechange = processActivateBonusRequest;
  bonusRequest.open('GET', 'http://localhost:3000/bonus');
  bonusRequest.send();

  }

function processActivateBonusRequest() {

  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      //Do something with response
    } else {
      alert('There was a problem with the request.');
    }
  }
}
