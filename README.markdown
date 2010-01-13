# jQuery quicksearch plug-in

A [jQuery][jquery_site] based plug-in for filtering large data sets with user input

## Examples

-- coming soon --

## Usage

	$(input_select).quicksearch(elements_to_search, options);

#### Example on table rows

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
	
	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="jquery.quicksearch.js"></script>
	<script type="text/javascript">
		$('input#search').quicksearch('table tbody tr');
	</script>

#### Example on the `<th>` elements on a table row

	$('input#search').quicksearch('table tbody tr', {
		selector: 'th'
	});

#### Example of how to use with JS

	var qs = $('input#id_search_list').quicksearch('ul#list_example li');
	$('ul#list_example').append('<li>Loaded with Ajax</li>');
	qs.cache();

#### Example of how to use with Ajax

	var qs = $('input#search').quicksearch('table tbody tr');
	$.ajax({
		'type': 'GET',
		'url': 'index.html',
		'success': function (data) {
			$('table tbody tr').append(data);
			qs.cache();
		}
	});

## Options

* 	#### delay
	Delay of trigger in milliseconds
*	#### selector
	A query selector on sibling elements to test
*	#### stripeRows
	An array of class names to go on each row
*	#### loader
	A query selector to find a loading element
*	#### noResults
	A query selector to show if there's no results for the search
*	#### bind
	Event that the trigger is tied to
*	#### onBefore
	Function to call before trigger is called
*	#### onAfter
	Function to call after trigger is called

## License

Under the same licenses as the jQuery library itself: <http://docs.jquery.com/License>

[jquery_site]: http://www.jquery.com
