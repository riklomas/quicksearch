# jQuery quicksearch plug-in

A [jQuery][jquery_site] based plug-in for filtering large data sets with user input

## Examples

-- coming soon --

## Usage

	$(input_select).quicksearch(elements_to_search, options);

### Example Usage

Basic example on table rows

	$('input#id_search').quicksearch('table tbody tr');

Example on the <th> elements on a table row

	$('input#id_search').quicksearch('table tbody tr', {
		selector: 'th'
	});

Example of how to use with JS

	var qs = $('input#id_search_list').quicksearch('ul#list_example li');
	$('ul#list_example').append('<li>Loaded with Ajax</li>');
	qs.cache();

Example of how to use with Ajax

	var qs = $('input#id_search_list').quicksearch('ul#list_example li');
	$.ajax({
		'type': 'GET',
		'url': 'index.html',
		'success': function (data) {
			$('ul#list_example').append(data);
			qs.cache();
		}
	});



[jquery_site]: http://www.jquery.com
