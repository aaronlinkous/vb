$("./head"){
	# Rewrite redirect script
	$("script[contains(text(), 'window.location.href')]") {
		text(){
			replace($source_host, $host)
		}
	}
}

$("./body") {	
	insert_bottom("div", id:"_script", class:"_keep"){
		move_here("//script","bottom");
		remove("./script[contains(@src,'tapatalkdetect')]");
	}

	$("./*[not(contains(@class,'_keep'))]") {
		#remove();
	}
}