const travelSiteApi = "https://api.sygictravelapi.com/1.0/en/places/list";

function getDataFromApi(searchTerm, callback) {
  const apiCall = {
    url: travelSiteApi,
    data: {
      query: `${searchTerm}`,
      limit: 8,
    },
    headers: {
      "x-api-key": "lEoKPbust75vnILH1Ue5g34x301P6UK89wytadmk"
    },

    dataType: "json",
    type: "GET",
    success: callback
  };

  $.ajax(apiCall);
}

function getWeatherApi(searchTerm, callback) {
  const weatherApi = 'http://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + "&units=Imperial" + "&APPID=7b87148d8f8b76f5a6623a78f3de3152";
  const api2Call = {
    url: weatherApi,
    data: {
      query: `${searchTerm}`,
    },
    dataType: "json",
    type: "GET",
    success: callback
  };

  $.ajax(api2Call);
}

function getOutput(out) {
  var city = out.name;
  var country = out.name_suffix;
  var description = out.perex;
  var thumb = out.thumbnail_url;
  var url = "https://travel.sygic.com/#/?wizard&type=poi&end=2017-09-15&start=2017-09-15";
  // var temp = out.weather.main;
  var output =
    `<div class="col s3">
          <div class="card small">
       <div class="card-image waves-effect waves-block waves-light">
         <img class="activator" src=${thumb}>
       </div>
       <div class="card-content">
         <span class="card-title activator grey-darken-4"><h6>${city}, ${country}</h6><i class="material-icons right">more_vert</i></span>
       </div>
       <div class="card-reveal">
         <span class="card-title grey-text text-darken-4 flow-text">${city}, ${country}<i class="material-icons right">close</i></span>
         <p>${description}</p><br>
         <a href="${url}" target=_blank>Learn more</a>
       </div>
     </div>

        </div>`;

  return output;
}

function getWeather(item, value) {

  var outputWeather = `<div>${item}: ${value}</div>`;
  return outputWeather;
}

function displaySearchData(data) {
  const results = data.data.places.map((item, index) => getOutput(item));
  $('#js-results').html(results);
  console.log(results);
}

function displayWeatherData(data) {
  console.log(data);
  const weatherResult = Object.keys(data.main).map((item) => getWeather(item, data.main[item]));
  $('.tap-target-content').html(weatherResult);
  console.log(weatherResult);
}


$(function() {
  $('.parallax').parallax();
  $("#js-form").submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('#js-input');
    const query = queryTarget.val();
    $("#js-input").val("");
    getDataFromApi(query, function(data) {
      console.log(data);
      displaySearchData(data);
    });
    getWeatherApi(query, function(data) {
      console.log(data);
      displayWeatherData(data);
    });

  });
});
