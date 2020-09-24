
// Bandsintown API Call
function searchArtists(artist) {
    $("#results").empty();
    $("#results2").empty();
    $("#upcomingEvents").empty();
    
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var upcomingEvents = $("<h1>").text(response.upcoming_event_count + " Upcoming Events");
        var gotoArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

        // Append the new artist content
        $("#upcomingEvents").append(upcomingEvents);
        $("#upcomingEvents").append(gotoArtist);

        var queryURLA = "https://tastedive.com/api/similar?q=" + artist + "&k=385684-CalebCha-ET3T33C0";
        $.ajax({
            url: queryURLA,
            dataType: "jsonp",
            method: "GET"
        }).then(function (response) {
            var count = 5
            for (var i = 0; i < count; i++) {
                console.log(response);
                var results = $("<ul>").text(response.Similar.Results[i].Name);
                $("#results2").append(results);
            };         
        });

        // Youtube API Call
        var youtubeApiKey = "AIzaSyD6PzTB02aTikpMqAbRqPEBntFyzr4h8AI";

        var queryURL2 = "https://www.googleapis.com/youtube/v3/search" + "?part=snippet&q=" + artist + "&type=video&videoCaption=closedCaption&key=" + youtubeApiKey;

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var videoid = response.items[0].id.videoId
            console.log(videoid)
            var iframe = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoid}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

            // Empty the contents, append the new video
            $("#results").append(iframe);
        });
    });
};


$("#searchButton").on("click", function () {
    event.preventDefault();
    var inputArtist = $("#findtext").val().trim();

    searchArtists(inputArtist);
});
