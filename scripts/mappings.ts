match($status) {
	with(/302/) {
		log("--> STATUS: 302") # redirect: just let it go through
	}

	with(/200/) {
		log("--> STATUS: 200")
		match($path) {
			with(/^\/$|^\/\?/) {
				$pagetype = "home";
				@import pages/home.ts;
			}
			with(/\/forum\/?$/) {
				$pagetype = "index";
				@import pages/index.ts;
			}
			with(/\/search\.php/) {
				$pagetype = "search";
				@import pages/search.ts;
			}
			with(/\/forumdisplay\.php/) {
				$pagetype = "sub_section";
				@import pages/sub_section.ts;
			}
			with(/\/showthread\.php/) {
				$pagetype = "thread";
				@import pages/thread.ts;
			}
			else() {
				log("--> No page match in mappings.ts")
			}
		}
	}

	else() {
		log("--> STATUS: " + $status + " assuming its an error code pages/error.ts")
		@import pages/error.ts;
		$pagetype = "error";
	}
}

log("@@@@@@@@@@@@@@"+$pagetype);
$("//body") {
	add_class("_"+$pagetype);
}