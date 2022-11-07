// var apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=1436029892,1436029902&units=miles'
// function fetchSatellites(){
//     fetch(apiurl)
//     .then(function(res){
//         return res.json();
//     })
//     .then(function(data){
//         console.log(data)
//     })

//     // .then(function(data){
//     //     if(!data[0]){
//     //       alert('Location not found!') ;
//     //     }else {
//     //         fetchSatellites(data[0]);
//     //     }
//     // })
//     .catch(function(err){
//         console.error(err);
//     });
// }

// console.log(fetchSatellites());


// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '50cc2d0454msh791cfc507cb9edcp1bb448jsn9d24f68a8d93',
//         'X-RapidAPI-Host': 'moon-api1.p.rapidapi.com'
//     }
// };

// fetch('https://moon-api1.p.rapidapi.com/eliptic-position?', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '2759920b31msh08d8d088f8ba9a9p1da747jsnd9c3fd556b03',
//         'X-RapidAPI-Host': 'space-news.p.rapidapi.com'
//     }
// };

// fetch('https://space-news.p.rapidapi.com/news', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
    

var newsArticles = document.querySelector("#newsArticles")

var sadURL = 'https://api.wheretheiss.at/v1/satellites/25544'
function fetchSatellites() {
    fetch(sadURL)
        .then(function (res) {
            console.log(res)
            return res.json();
        })
        .then(function (data) {
            console.log(data)
            var lat = data.latitude
            var long = data.longitude
            console.log(lat)
            console.log(long)

            function fetchCoordinates() {
                var coordURL = "https://api.wheretheiss.at/v1/coordinates/" + lat + "," + long
                fetch(coordURL)
                    .then(function (resCoord) {
                        console.log(resCoord)
                        return resCoord.json();
                    })
                    .then(function (dataCoord) {
                        console.log(dataCoord)
                        var search = dataCoord.timezone_id
                        console.log(search)
                        //get news from iss coordinates api
                        function fetchNews() {
                            const options = {
                                method: 'GET',
                                headers: {
                                    'X-BingApis-SDK': 'true',
                                    'X-RapidAPI-Key': '50cc2d0454msh791cfc507cb9edcp1bb448jsn9d24f68a8d93',
                                    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                                }
                            };
                            fetch('https://bing-news-search1.p.rapidapi.com/news/search?q=' + search + '&safeSearch=Off&textFormat=Raw&freshness=Day', options)
                                .then(function (resNews) {
                                    console.log(resNews)
                                    return resNews.json();
                                })
                                .then(function (newsData) {
                                    console.log(newsData)
                                    //for loop i=0, i > newsData.value.length, i++ (or something)
                                    console.log(newsData.value[0].name)
                                    var title = newsData.value[0].name;
                                    dispTitle = document.createElement('li')
                                    dispTitle.textContent = title
                                    var link = newsData.value[0].url
                                    var dispLink = document.createElement('a')
                                    dispLink.setAttribute('href', link)
                                    dispLink.appendChild(dispTitle)
                                    newsArticles.appendChild(dispLink)
                                })
                        }
                        // fetchNews()
                    })
                
            }
            fetchCoordinates();
        })
        .catch(function (err) {
            console.error(err);
        });
}

fetchSatellites();

