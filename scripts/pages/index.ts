$($content) {
	insert("ul", id: "_forums") {
		$forums = path();
	}

	$("//div[contains(@id, 'collapseobj_forumbit')]") {
		$("preceding-sibling::div[1]//a[2]") {
			wrap("li", class: "_sub_section_header") {
				move_to($forums, "bottom");
			}
		}

		insert_top("ul", class: "_sub_sections") {
			move_here("../div[@class='mw_was_tr']/div[2]/div[1]/a") {
				$txt = text();
				text($txt);

				wrap("li", class:"_sub_section");
			}
			move_to($forums, "bottom");
		}
	}

	$("//ul[@class='_sub_sections']") {
		move_to("preceding-sibling::li[1]")
	}
}