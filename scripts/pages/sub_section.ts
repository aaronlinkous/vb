$($content) {
	insert("ul", class: "threads") {
		$forums = path();
	}

	$("//div[contains(@id,'threadbits_forum')]/div/div[3]") {
		name("li");
		remove("@*");
		add_class("thread");
		move_here("following-sibling::div[1]");

		$thread = path();
		insert("div", class: "top _keep");
		insert("div", class: "last _keep") {
			insert("span", "Last post by ")
		}
		insert("div", class: "started _keep");

		$sticky = 0;
		$subscribed = 0;
		$new = 0;
		$(".//a[contains(@id,'thread_title_')]") {
			$title = text();

			$("../span/img[contains(@src, 'subscribed')]") {
				$subscribed = 1;
			}

			$("../span/img[contains(@src, 'sticky')]") {
				$sticky = 1;
			}

			$("../a[contains(@id, 'thread_gottonew')]") {
				$new = 1;
			}
		}

		$(".//img[@alt='Go to last post']/..") {
			$last_post = fetch("@href");
			remove();
		}

		$(".//span[contains(@onclick, 'member.php')]") {
			add_class("started_by");
		}

		$(".//span[@class='time']") {
			$("..") {
				add_class("old_time");
			}

			$("../a") {
				move_to($thread+"/div[contains(@class, 'last')]");
			}

			move_to($thread+"/div[contains(@class, 'last')]")
		}

		$(".//div[contains(@class, 'old_time')]") {
			remove("br");
			text(normalize(fetch("text()")));

			
			text() {
				replace(/by/) {
					set("");
				}
			}
			$date = text();
		}

		$("./*[not(contains(@class, '_keep'))]") {
			remove();
		}

		$(".//span[@class='time']") {
			match($date){
				with(/[0-9]{2}/){
					insert_top("span", " on "+ $date+" @ ");
				}
				else() {
					insert_top("span", " " +$date+" @ ");
				}
			}
		}
		move_to($forums, "bottom");
	}
}