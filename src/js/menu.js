//var wtwu_nav = "wtwu;fn;extend;length;ul;children;<span class='indicator'>+</span>;append;each;li;find;.wtwu_menu;<li class='showhide'><span class='title'>Menu</span><span class='icon'><em></em><em></em><em></em><em></em></span></li>;prepend;resize;unbind;li, a;hide;innerWidth;.wtwu_menu > li:not(.showhide);slide-left;removeClass;mouseleave;zoom-out23;speed;fadeOut;stop;bind;mouseover;addClass;fadeIn;.wtwu_menu li;click;display;css;siblings;none;slideDown;slideUp;a;.wtwu_menu li:not(.showhide);show41;.wtwu_menu > li.showhide;:hidden;is;.wtwu_menu > li".split(";");
$.fn.wtwu = function(d) {
	function c() {
		$('.wtwu_menu').find('li, a').unbind();
		$('.wtwu_menu').find('ul').hide(0);
		if (768 >= window.innerWidth) {
			if ($('.wtwu_menu > li.showhide').show(0), $('.wtwu_menu > li.showhide').bind("click", function() {
				$('.wtwu_menu > li').is(':hidden') ? ($('.wtwu_menu > li').slideDown(300), a = 1) : ($('.wtwu_menu > li:not(.showhide)').slideUp(300), $('.wtwu_menu > li.showhide').show(0), a = 0)
			}), $('.wtwu_menu').find("ul").removeClass("zoom-out"), $('.wtwu_menu li:not(.showhide)').each(function() {
				if (0 < $(this).children("ul").length) $(this).children(a).bind("click", function() {
					if ($(this).siblings("ul").css(display) == none) $(this).siblings("ul").slideDown(300).addClass("slide-left"), a = 1;
					else $(this).siblings("ul").slideUp(300).removeClass("slide-left")
				})
			}), 0 == a) $('.wtwu_menu > li:not(.showhide)').hide(0)
		} else $('.wtwu_menu > li').show(0), $('.wtwu_menu > li.showhide').hide(0), $('.wtwu_menu').find("ul").removeClass("slide-left"), $('.wtwu_menu li').bind("mouseenter", function() {
			$(this).children("ul").stop(!0, !0).fadeIn(b.speed).addClass("zoom-out")
		}).bind("mouseleave", function() {
			$(this).children("ul").stop(!0, !0).fadeOut(b.speed).removeClass("zoom-out")
		})
	}
	var b = {
		speed: 300
	};
	$.extend(b, d);
	var a = 0;
	$('.wtwu_menu').find('li').each(function() {
		if (0 < $(this).children("ul").length) $(this).append('<span class="indicator">+</span>')
	});
	$('.wtwu_menu').prepend("<li class='showhide'><span class='title'>Menu</span><span class='icon'><em></em><em></em><em></em><em></em></span></li>");
	c();
	$(window).resize(function() {
		c()
	})
};