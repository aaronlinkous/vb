insert("ul", id: "_nav") {
	remove("//a[@id='navbar_search']/..");
	move_here("//div[contains(@class, 'vbmenu_control')]/a", "bottom") {
		$sub_menu_id = fetch("@id")+"_menu";
		wrap("li", class: "_main_link") {
			$("./a") {
				match_not(fetch("@id"), "") {
					remove("@*");
					add_class("_has_sub");

					insert("ul", class: "_sub_nav") {
						move_here("//div[@id='"+$sub_menu_id+"']//a", "bottom") {
							wrap("li", class: "_sub_link");
						}
					}
				}

				match(fetch("@name"), "PageNav") {
 					remove("..");
				}
			}
		}
	}
}