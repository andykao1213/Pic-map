function mouseInPhoto(){
	var icon = this.icon;
	icon.size.height = 90;
	icon.size.width = 120;
	this.setIcon(icon);
	
}
function mouseOutPhoto(){
	var icon = this.icon;
	icon.size.height = 60;
	icon.size.width = 80;
	this.setIcon(icon);
}
function dblclickOnPhoto(){
	this.setDraggable(!this.draggable);
	if(!this.draggable){
		var icon = this.icon;
		icon.size.height = 60;
		icon.size.width = 80;
		this.setIcon(icon);
		this.setOptions({'opacity': 1})
	} else {
		this.setOptions({'opacity': 0.5})
	}
}