function mouseInPhoto(){
	var icon = this.icon;
	icon.size.height *= 1.5;
	icon.size.width *= 1.5;
	this.setIcon(icon);
	
}
function mouseOutPhoto(){
	var icon = this.icon;
	icon.size.height /= 1.5;
	icon.size.width /= 1.5;
	this.setIcon(icon);
}
function dblclickOnPhoto(){
	this.setDraggable(!this.draggable);
	if(!this.draggable){
		var icon = this.icon;
		icon.size.height /= 1.5;
		icon.size.width /= 1.5;
		this.setIcon(icon);
		this.setOptions({'opacity': 1})
	} else {
		this.setOptions({'opacity': 0.5})
	}
}