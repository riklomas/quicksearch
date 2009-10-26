jQuery(function ($) {
	$.fn.quicksearch = function (opt) {
		
		this.options = $.extend({
			position: 'prepend',
			attached: 'body',
			matched: null,
			formId: 'quicksearch',
			labelText: 'Quick Search',
			labelClass: 'qs_label',
			inputText: null,
			inputClass: 'qs_input',
			loaderId: 'loader',
			loaderClass: 'loader',
			loaderImg: null,
			loaderText: 'Loading...',
			stripeRowClass: null,
			hideElement: null,
			delay: 500,
			focusOnLoad: false,
			onBefore: function () { },
			onAfter: function () { },
			filter: function (i) { 
				return i;
			},
			match: function (needle, haystack) {
				return (haystack.indexOf(needle) > -1) ? true : false;
			},
			on: function (el) {
				el.css('display', '');
			},
			off: function (el) {
				el.css('display', 'none');
			},
			randomElement: 'qs' + Math.floor(Math.random() * 1000000000000),
			isFieldset: false,
			noSearchKeys: [9, 13, 16, 17, 18, 38, 40, 224]
		}, opt);
		
		var el = this, score = {}, cache = {}, cache_elements = [], timeout, sel = $($(this).selector);
		
		this.is_empty = function (i) {
			return (i === null || i === undefined || i === false) ? true: false;
		};
		
		this.strip_html = function (input) {
			var regexp = new RegExp(/<[^<]+>/g);
			var output = input.replace(regexp, "");
			output = $.trim(output.toLowerCase().replace(/\s\s+/g, ' '));
			return output;
		};
		
		this.get_key = function () {
			return this.strip_html($('input#' + this.options.randomElement).val()).split(" ");
		};
		
		this.test_key = function (k, value) {
			for (var i = 0; i < k.length; i += 1) {
				if (!this.options.match(k[i], value)) {
					return false;
				}
			}
			return true;
		}; 
		
		this.stripe = function (el) {
			var stripeRowLength = (!el.is_empty(el.options.stripeRowClass)) ? el.options.stripeRowClass.length : 0;
			
			if (stripeRowLength > 0)
			{
				var i = 0;
				sel.filter(':visible').each(function () {
					
					for (var j = 0; j < stripeRowLength; j += 1)
					{
						if (i === j)
						{
							$(this).addClass(el.options.stripeRowClass[i]);
							
						}
						else
						{
							$(this).removeClass(el.options.stripeRowClass[j]);
						}
					}
					i = (i + 1) % stripeRowLength;
				});
			}
			
			return this;
		};
		
		this.loader = function (o) {
			if (this.options.loaderId) 
			{
				var l = $('input#' + this.options.randomElement).parent().find('.loader');
				
				if (typeof o !== "boolean" || o === false) {
					l.hide();
				} else {
					l.show();
				}
			}
			
			return this;
		};
		
		this.place_form = function () {
			var formPosition = this.options.position;
			var formAttached = this.options.attached;
			
			if (formPosition === 'before') {
				$(formAttached).before(this.make_form());
			} else if (formPosition === 'prepend') {
				$(formAttached).prepend(this.make_form());
			} else if (formPosition === 'append') {
				$(formAttached).append(this.make_form());
			} else {
				$(formAttached).after(this.make_form());
			}
		};
		
		this.make_form_label = function () {
			if (!this.is_empty(this.options.labelText))
			{
				return '<label for="' + this.options.randomElement + '" class="' + this.options.labelClass + '">' + this.options.labelText + '</label> ';
			}
			return '';
		};
		
		this.make_form_input = function () {
			var val = (!this.is_empty(this.options.inputText)) ? this.options.inputText : "";
			return '<input type="text" value="' + val + '" class="' + this.options.inputClass + '" id="' + this.options.randomElement + '" /> ';
		};
		
		this.make_form_loader = function () {
			if (!this.is_empty(this.options.loaderImg)) {
				return '<img src="' + this.options.loaderImg + '" alt="Loading" id="' + this.options.loaderId + '" class="' + this.options.loaderClass + '" />';
			} else {
				return '<span id="' + this.options.loaderId + '" class="' + this.options.loaderClass + '">' + this.options.loaderText + '</span>';
			}
		};
		
		this.make_form = function () {
			var f = (!this.options.isFieldset) ? 'form' : 'fieldset';
			return '<' + f + ' action="#" ' + 'id="' + this.options.formId + '" ' + 'class="quicksearch">' +
						this.make_form_label() + this.make_form_input() + this.make_form_loader() +
					'</' + f + '>';
		};
			
		this.focus_on_load = function () {
			$('input#' + this.options.randomElement).get(0).focus();
			return this;
		};
		
		this.toggle_text = function () {
			$('input#' + this.options.randomElement).focus(function () {
				if ($(this).val() === el.options.inputText) {
					$(this).val('');
				}
			}).blur(function () {
				if ($(this).val() === "") {
					$(this).val(el.options.inputText);
				}
			});
			
			return this;
		};
		
		this.cache = function () {
			cache = sel.map(function () {
				if (el.options.matched !== null) {
					return el.strip_html($(this).find(el.options.matched)[0].innerHTML);
				} else {
					return el.strip_html(this.innerHTML);
				}
			});
			return this;
		};
		
		this.reset_cache = function () {
			sel = $($(this).selector);
			return this.cache();
		};
		
		this.init = function () {
			
			this.place_form();
			
			if (this.options.focusOnLoad) {
				this.focus_on_load();
			}
			
			if (!this.is_empty(this.options.inputText)) {
				this.toggle_text();
			}
			
			this.cache().stripe(el).loader(false);
			
			$('input#' + this.options.randomElement).keydown(function (e) {
				
				var i;
				for (i in el.options.noSearchKeys) {
					if (e.keyCode === el.options.noSearchKeys[i]) {
						return;
					}
				}
				
				el.qs();
			});
			
			$('form.quicksearch, fieldset.quicksearch').submit(function () { 
				return false;
			});
			
			return this;
		};
		
		this.go = function () {
			var i = 0;
			var k = this.options.filter(this.get_key());
			
			if (k !== "") {
				
				if (typeof score[k] === "undefined") {
					score[k] = {};
					
					cache.each(function (i) {
						if (el.test_key(k, cache[i])) {
							score[k][i] = true;
						}
					});
				}
				
				el.options.off(sel);
				$.each(score[k], function (i, val) {
					el.options.on(sel.eq(i));
					
				});
				
			} else {
				el.options.off(sel);
			}
			
			return this;
		};
		
		this.qs = function () {
			
			clearTimeout(timeout);
			timeout = setTimeout(function () {
				
				el.loader(true);
				
				setTimeout(function () {
					
					el.options.onBefore();
					el.go();
					el.stripe(el);
					el.loader(false);
					
				}, el.options.delay / 2);
				
				el.options.onAfter();
				
			}, this.options.delay / 2);
			
			return this;
		};
		
		return this.init();
	};
});