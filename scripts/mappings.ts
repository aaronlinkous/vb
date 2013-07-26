match($status) {
	with(/302/) {
		log("--> STATUS: 302") # redirect: just let it go through
	}

	with(/200/) {
		log("--> STATUS: 200")
	
		match($path) {
			with(/forum/) {
				$pagetype = "home";
				@import pages/home.ts;
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

$("//body") {
	add_class("_"+$pagetype);
}