$("./head"){
	# Rewrite redirect script
	$("script[contains(text(), 'window.location.href')]") {
		text(){
			replace($source_host, $host)
		}
	}
}

$("./body") {	
	insert_bottom("div", id:"_script", class:"_keep"){
		inject('<link rel="stylesheet" href="http://use.typekit.net/c/794252/proxima-nova:n1:n3:n4:n7.Vmv:N:2,Vmx:N:2,W0V:N:2,W0Y:N:2/d?3bb2a6e53c9684ffdc9a9bf51d5b2a62c96de82d85c740a9a6cf00238e567561af388d04025f46f917993d622156ea8b34eeb8d5935eef81c82711cd997d48d17de63fd138af84ea0f1e11cafef9423feaf405aabf07e32d1179bb6ee77e27b07b891121025c036e73b33d5ada51c16083eecf37c08070ffdb7122cc752a5488688a2b79bcebcaa8a6">');
		inject('<script type="text/javascript">try{Typekit.load();}catch(e){}</script>');

		move_here("//script","bottom");
		remove("./script[contains(@src,'tapatalkdetect')]");
	}

	$("./*[not(contains(@class,'_keep'))]") {
		remove();
	}
}