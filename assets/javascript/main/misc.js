function panes(new_lvl, specific) {
	$(".pane").removeClass("active faded");
	$(".pane[data-num='"+new_lvl+"']").addClass("active");
	
	$(".pane").each(function(){
		if($(this).attr("data-num") > new_lvl) $(this).addClass("faded");
	});

	if(specific) $(".pane:not('#"+specific+"')").removeClass("active");

	lvl = new_lvl;
}

function get_size() {
	ww = $(window).width();
	wh = $(window).height();

	$("#_wrapper, .pane").width(ww);
	$("#_wrapper, .pane").height(wh);
}

get_size();
var lvl = 3, ww,wh;
$(document).ready(function(){
	$(window).resize(function() {
		get_size();
	});

	$("#_wrapper").swipe({
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			dir = $(".pane[data-num='"+lvl+"']").attr("data-dir");
			if( dir == "d") panes(lvl-1) 
		},swipeLeft:function(event, direction, distance, duration, fingerCount) {
			dir = $(".pane[data-num='"+lvl+"']").attr("data-dir");
			if( dir != "d") panes(lvl+1) 
		}
	});

	$(".menu_item a").on("click", function(e){
		if($(this).attr("href") == "#"){
			e.preventDefault();
			specific = $(this).parent().attr("data-id");
			new_lvl = parseInt($("#"+specific).attr("data-num"));
			panes(new_lvl, specific);
		}
	});
});