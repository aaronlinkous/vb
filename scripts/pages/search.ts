$($content) {
	insert("ul", id: "_forums") {
		$forums = path();
	}

	$("//div[contains(@id,'threadbits_forum')]/div/div[3]") {
		name("li");
		remove("@*");
		move_here("following-sibling::div[1]");
		move_to($forums, "bottom");
	}
}