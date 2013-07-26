$("./body") {
	insert_top("div", id: "_wrapper", class: "_keep") {
		insert("div", id: "_header") {
			move_here("//form[@action='login.php?do=login']") {
				wrap("div", id: "_login_form");
			}

			insert("button", id: "_nav_button", "nav");
		}

		insert("div", id: "_content");
		$content = "//div[@id='_content']";
	}

	@import nav.ts;
}