function updatestatus() {
    //Show number of loaded items
    var totalItems = $('#gallery figure').length;
    $('#status').text('Loaded ' + totalItems + ' Items');
}
function ajaxProcess() {

    var searchTerm = $("#term").val();
    var URL2 = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0add6d8735ce8a222aa2ed59b5615a4f&';
    var tags = "&tags=" + searchTerm;
    var jsonFormat = "&format=json";
    var ajaxURL = URL2 + "per_page=" + perpage + "&page=" + currentPage + tags + jsonFormat;

    $.ajax({
        url: ajaxURL,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function (data) {
            if (data.stat !== "fail") {
                console.log(data);
                $.each(data.photos.photo, function (i, photo) {
                    var photoHTML = "";
                    photoHTML += "<figure> <img src='";
                    photoHTML += "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_n.jpg'";
                    photoHTML += " title='" + photo.title + "'";
                    photoHTML += " class='img-responsive'>";
                    photoHTML+=  photo.title+"</figure>";
                    $("#gallery").append(photoHTML).fadeIn(200);
                });

            } else {
                $("#gallery").empty();
                console.log("Error code " + data.stat);
                photoHTML = "Error !! Error !! " + data.stat;
                $("#gallery").append(photoHTML).fadeIn(200);

            }

        }
    });


}

var perpage = 30;
var currentPage = 1;

$(document).ready(function () {
    $("input#submit").on('click keypress', function (e) {
        var key = e.keyCode || e.which || null;
        var event = e.type;
        console.log($(this).text());
        console.log("e.which " + e.which);
        console.log("e.type " + e.type);

        if (key === 13 || event === 'click') {
            if ($("#term").val() !== "") {
                
                updatestatus();
                ajaxProcess();
                
            } else {
                alert("Please enter a word to search");
            }
        }
    });
    $("input#term").on("keypress", function (e) {
        if (e.which === 13) {
            $("#submit").trigger('click');
        }
    });

    $("input#clear").click(function () {
        $("#gallery").empty();
    });


    $("#gallery").scroll(function () {
        // check if we're at the bottom of the scrollcontainer
        if ($(this)[0].scrollHeight - $(this).scrollTop() === $(this).outerHeight())
        {
            // If we're at the bottom, retrieve the next page
            currentPage++;
            $("#submit").click();
            updatestatus();
        }

    });
    
});