$("./body") {
	insert_top("div", id: "_wrapper", class: "_keep") {
		insert("div", id: "_header") {
			move_here("//form[@action='login.php?do=login']") {
				wrap("div", id: "_login_form");
			}

			@import nav.ts;
		}

		insert("div", id: "_content");
		$content = "//div[@id='_content']";
	}
}