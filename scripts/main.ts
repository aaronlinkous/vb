match(inferred_content_type()) {
	with(/html/) {
		replace(/fb:/, "fbn_")

		html("UTF-8") {
			@import device_detection.ts  
			@import html.ts
		}

		replace(/fbn_/, "fb:")
	}
	else() {
		log("Passing through " + $content_type + " unmodified.")
	}
}
