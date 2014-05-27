# jQuery quicksearch plug-in

A [jQuery][jquery_site] based plug-in for filtering large data sets with user input

This is an improved fork of the original work of riklomas <https://github.com/riklomas/quicksearch>.
This plugin is now maintained by [@DeuxHuitHuit][288]

## Project pages

* <http://deuxhuithuit.github.io/quicksearch/>
* <http://plugins.jquery.com/jquery.quicksearch/>

## Examples

* <http://deuxhuithuit.github.io/quicksearch/r/examples/>
* <http://deuxhuithuit.github.io/quicksearch/r/examples/super_table.html>

## Usage

Note that the usage has changed in the latest version of quicksearch, the code is *not* backwards compatible,
the form and input are not build by the script any more.
```js
$(input_selector).quicksearch(elements_to_search, options);
```

#### Example on table rows
```html
/* Example form */
<form>
	<input type="text" id="search">
</form>

/* Example table */
<table>
	<tbody>
		<tr>
			<td>Test cell</td>
			<td>Another test cell</td>
		</tr>
	</tbody>
</table>

<script src="jquery.js"></script>
<script src="jquery.quicksearch.js"></script>
<script>
	$('input#search').quicksearch('table tbody tr');
</script>
```

#### Example on the `<th>` elements on a table row
```js
$('input#search').quicksearch('table tbody tr', {
	selector: 'th'
});
```
#### Example of how to use with JS
```js
var qs = $('input#id_search_list').quicksearch('ul#list_example li');
$('ul#list_example').append('<li>Loaded with Ajax</li>');
qs.cache();
```
#### Example of how to use with Ajax
```js
var qs = $('input#search').quicksearch('table tbody tr');
$.ajax({
	'type': 'GET',
	'url': 'index.html',
	'success': function (data) {
		$('table tbody tr').append(data);
		qs.cache();
	}
});
```

## Options

* 	**delay**
	Delay of trigger in milliseconds
*	**selector**
	A query selector on sibling elements to test
*	**stripeRows**
	An array of class names to go on each row
*	**loader**
	A query selector to find a loading element
*	**noResults**
	A query selector to show if there's no results for the search
*	**bind**
	Event that the trigger is tied to. Defaults to 'keyup search'
*	**resetBind**
	Event that the reset event is tied to. Defaults to 'reset'
*	**removeDiacritics**
	Remove diacritics from the search input. Defaults to false.
*	**minValLength**
	Establish a minimum length that the search value must have in order to perform the search. Defaults to 0.
*	**onBefore**
	Function to call before trigger is called
*	**onAfter**
	Function to call after trigger is called
*	**onValTooSmall**
	Function to call when the value does not exceeds the `minValLength` option.
*	**show**
	Function that will add styles to matched elements
*	**hide**
	Function that will add styles to unmatched elements
*	**prepareQuery**
	Function that transforms text from input_selector into query used by 'testQuery' function
*	**testQuery**
	Function that tells if a given item should be hidden
	It takes 3 arguments:
	- query prepared by 'prepareQuery'
	- stripped text from 'selector'
	- element to be potentially hidden

### Callbacks
Functions are always `call`'d or `apply`'d, so except `this` to be the plugin object.

For example:
```js
$('input#search').quicksearch('table tbody tr', {
	'delay': 100,
	'selector': 'th',
	'stripeRows': ['odd', 'even'],
	'loader': 'span.loading',
	'noResults': 'tr#noresults',
	'bind': 'keyup keydown',
	'minValLength': 2,
	'removeDiacritics': true,
	'onBefore': function () {
		console.log('on before');
	},
	'onAfter': function () {
		console.log('on after');
	},
	'onValTooSmall': function (val) {
		console.log('value ' + val + ' is too small');
	},
	'show': function () {
		$(this).addClass('show');
	},
	'hide': function () {
		$(this).removeClass('show');
	}
	'prepareQuery': function (val) {
		return new RegExp(val, "i");
	},
	'testQuery': function (query, txt, _row) {
		return query.test(txt);
	}
});
```
## Help make quicksearch better!

If you have a bug fix, the best way to help would be to:

* Fork the project by clicking "Fork this project" at the top of this page
* Clone your version of quicksearch from your Github account to your computer
* Fix and commit the bugs, then push your version to your Github account
* Click "pull request" at the top of my Github page

I can't promise to answer every question about quicksearch, 
but please do [report bugs here][issues].

## License

Now licensed under the MIT License: <http://deuxhuithuit.mit-license.org>

## Credits

jQuery quicksearch was made by [Rik Lomas][rik_site] at [Lomalogue][lomalogue_site].
It is now maintain by [Deux Huit Huit][288]

Thanks to [Seth F.][thelizardreborn] for fixes and [Krzysiek Goj][goj] for the  testQuery and prepareQuery option updates

[jquery_site]: http://www.jquery.com
[rik_site]: http://www.riklomas.co.uk
[lomalogue_site]: http://www.lomalogue.com
[issues]: http://github.com/deuxhuithuit/quicksearch/issues
[thelizardreborn]: http://github.com/thelizardreborn
[goj]: http://github.com/goj
[288]: http://deuxhuithuit.com/
