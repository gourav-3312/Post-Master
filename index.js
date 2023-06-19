console.log("This Is My Project...");

function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

let addedParamsCount = 0;

// hide the parametersBox initially
let parametersBox = document.getElementById("parameterBox");
parametersBox.style.display = "none";

// if the user clicks on parametersBox then hide the jsonBox
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parameterBox").style.display = "block";
});
// if the user clicks on jsonBox then hide the paramBox
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "block";
  document.getElementById("parametersBox").style.display = "none";
});

// if user clicks on + button add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");

  let string = `<div class="form-row my-2">
    <label for ="url" class="col-sm-2 col-form-label">Parameter ${
      addedParamsCount + 2
    }</label>
    <div class="col-md-4">
      <input
        type="text"
        class="form-control"
        id="parameterKey ${addedParamsCount + 2}"
        placeholder="Enter Parameter ${addedParamsCount + 2} Key">

    </div>
    <div class="col-md-4">
      <input
        type="text"
        class="form-control"
        id="parameterValue ${addedParamsCount + 2}"
        placeholder="Enter Parameter  ${addedParamsCount + 2} Value">
    </div>

    <button class="btn btn-primary deleteParam"> - </button>
  </div>`;

  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);

  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
  addedParamsCount++;
});

// submit button action
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  // document.getElementById('responseJsonText').value = "PLEASE WAIT...FETCHING RESPONSE...";
  document.getElementById('responsePrism').innerHTML = "PLEASE WAIT...FETCHING RESPONSE...";

  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;

  // for debugging purposes
  console.log("URL is", url);
  console.log("Request Type is", requestType);
  console.log("Content Type is", contentType);

  if ((contentType = "params")) {
    data = {};
    for (i = 0; i < addedParamsCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }

  // for debugging purposes
  console.log("URL is", url);
  console.log("Request Type is", requestType);
  console.log("Content Type is", contentType);
  console.log("Data is", data);

  // fetch api
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/json; charset= UTF-8" },
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById("responseJsonText").value = text;
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  }
});
