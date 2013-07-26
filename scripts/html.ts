# HTML Transformations go here

$("/html") {
	rewrite_links()
	absolutize_srcs()
	clean_mobile_meta_tags()
	remove_all_styles()
	remove_html_comments()
	
	add_assets()

	$("//table") {
		table_dump(".");
	}
	
	@import sections/header.ts
	@import sections/footer.ts
	
	@import mappings.ts

	@import remove.ts
}