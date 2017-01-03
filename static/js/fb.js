        window.fbAsyncInit = function() {
            FB.init({
                appId: '718202321664492',
                xfbml: true,
                version: 'v2.8'
            });
            
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });
        };

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function getPhotos(url) {
    $.getJSON(url, function(data) {
        var imgs = data.data;
        var l = imgs.length;
        for(var i=0; i<l; i++){
            document.getElementById('list').innerHTML += '<img class="display rounded mx-auto d-block" draggable="true" ondragstart="dragImage(event)" src="'+ imgs[i]['images'][1].source + '"height="200">';
        }
        if (data.paging.next){
            getPhotos(data.paging.next)
        }
    });
}
function testAPI(response) {
    console.log('Welcome!  Fetching your information.... ');
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.acce;
    var user_name = "xx";
    var img_url = "oo";
    FB.api('/' + uid, function(response) {
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });

    FB.api('/' + uid, function(response) {
        var user_name = response.name;
        var user_id = response.id;
        document.getElementById('user_name').innerHTML = user_name;
    });
    FB.api('/' + uid + '/picture', function(response) {
        var img_url = response.data['url'];
        document.getElementById('user_photo').src = img_url;
    });
    FB.api('/me?fields=photos{images}', function(response){
        var imgs = response.photos.data;
        var l = imgs.length;
        for(var i=0; i<l; i++){
            document.getElementById('list').innerHTML += '<img class="display rounded mx-auto d-block" draggable="true" ondragstart="dragImage(event)" src="'+ imgs[i]['images'][1].source + '"height="200">';
        }
        var url = response.photos.paging.next;
        getPhotos(url)
    });
}
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        testAPI(response);
    } else if (response.status === 'not_authorized') {
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    } else {
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
    }
}
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

        /*function checkLoginState() {
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });



        }*/