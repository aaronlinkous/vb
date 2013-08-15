$("./body") {
	insert("div", id: "_header", class: "_keep") {
		move_here("//form[@action='login.php?do=login']") {
			wrap("div", id: "_login_form");
		}
	}
	insert("div", id: "_wrapper", class: "_keep") {
		insert("div", id: "_search", class: "pane", data-num: "1") {
			insert("div", class:"blocker");
			move_here("//input[@name='query']/../..");
		}
	
		insert("div", id: "_help", class: "pane", data-num: "1") {
			insert("div", class:"blocker");
			text("help pane")
		}
	
		insert("div", id: "_menu", class: "pane", data-num: "2") {
			insert("div", class:"blocker");
			insert("ul", class:"menu") {
				insert("li", class: "menu_item") {
					insert("a", href: "search.php?do=getnew", "Find New Posts");
				}
	
				insert("li", class: "menu_item") {
					insert("a", href: "/forum", "Forums");
				}
	
				insert("li", class: "menu_item", data-id: "_search") {
					insert("a", href: "#", "Search");
				}
	
				insert("li", class: "menu_item") {
					move_here("//div[contains(@class, 'vbmenu_control')]//a[contains(@href, 'login.php?do=logout')]") {
						text("Logout");
					}
				}
	
				insert("li", class: "menu_item", data-id: "_help") {
					insert("a", href: "#", "Help");
				}
	
			}
		}
	
		insert("div", id: "_main", class: "pane active", data-num: "3", data-dir: "d") {
			insert("div", class:"blocker");
			$content = path();
		}
	}
}