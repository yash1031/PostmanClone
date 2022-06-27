let paramsBox = document.getElementById("parametersBox");
paramsBox.style.display = "none";

let postRequestType = "JSON";

let requestJsonBox = document.getElementById("requestJsonBox");

let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", (e) => {
  postRequestType = "JSON";
  paramsBox.style.display = "none";
  jsonRequestBox.style.display = "block";
});

let parameterRadio = document.getElementById("parameterRadio");
parameterRadio.addEventListener("click", (e) => {
  postRequestType = "Parameters";
  paramsBox.style.display = "block";
  jsonRequestBox.style.display = "none";
});

let addedParamCount = 0;
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", (e) => {
  let params = document.getElementById("params");
  let string = `<div class="parameter form-group row my-2">
        <div class="col-sm-2 col-form-label">Parameter ${
          addedParamCount + 2
        }</div>
        <div class="col-md-4">
          <input type="text" class="form-control" id="paramKey${
            addedParamCount + 2
          }" placeholder="Enter Parameter ${addedParamCount + 2} Key">
        </div>
        <div class="col-md-4">
          <input type="text" class="form-control" id="paramValue${
            addedParamCount + 2
          }" placeholder="Enter Parameter ${addedParamCount + 2} Value">
        </div>
        <div class="col-sm-2">
          <button id="addParam${
            addedParamCount + 2
          }" class="deleteParam btn btn-primary ">-</button>
        </div>
      </div>`;
  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);

  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();
    });
  }
  addedParamCount++;
});

let submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  let url = document.getElementById("url");
  let urlValue = url.value;
  let requestType = document.querySelector("input[name='requestType']:checked")
    .value;
  if (requestType == "GET") {
    getData(urlValue);
  } else postData(urlValue);
  e.preventDefault();
});

function getData(urlValue) {
  fetch(urlValue)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      let response = document.getElementById("response");
      response.innerHTML = data;
    });
}

function postData(urlValue) {
  if (postRequestType == "JSON") {
    let jsonRequest = document.getElementById("jsonRequest");
    jsonRequestValue = jsonRequest.value;
  } else {
    jsonRequestValue = {};
    for (let i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("paramKey" + (i + 1)) != undefined) {
        let key = document.getElementById("paramKey" + (i + 1)).value;
        let value = document.getElementById("paramValue" + (i + 1)).value;
        jsonRequestValue[key] = value;
      }
    }
    jsonRequestValue = JSON.stringify(jsonRequestValue);
  }
  let params = {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: jsonRequestValue
  };
  fetch(urlValue, params)
    .then((response) => response.text())
    .then((data) => {
      let response = document.getElementById("response");
      response.innerHTML = data;
    });
}
