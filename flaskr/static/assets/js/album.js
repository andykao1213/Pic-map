function getAlbum(){
	var i;
	for(i=0; i<3; i++)
		document.getElementById('album').innerHTML += '<div class="album"><div class="sibling"></div><img class="pic" src="https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/15578688_1354536817899336_491483226609685568_n.jpg?oh=e0566742c7d5a95387291d8ed7a2250d&amp;oe=58E67847"/><div class="albumTitle">My album</div></div>';
}