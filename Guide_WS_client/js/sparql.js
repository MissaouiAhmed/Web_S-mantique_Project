	function listeEpicUS (){
		  // Empty content string
		  var tableContent = '';
		  tableContent +='<thead><tr> <br/>\
			<td>Name</td><td>Actions</td>\
			</tr></thead>';;
			tableContent += '<tbody>'
			
			<!-- rows will go here -->
		  var url = "http://localhost:3030/data/query";
		  //il ne faut pas mettre le caractere # , mais %23 a la place
		  
		  var query = "\PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> "+
		 " SELECT * "+
		 " WHERE { "+
		 " ?x tourisme:dans tourisme:Rome;"+
		 "}";
		 
		//var queryUrl = encodeURI( url+"?query="+query+"&format=json" );
		var queryUrl = url+"?query="+query+"&format=json" ;

		 $.ajax({
		dataType: "jsonp",
		url: queryUrl,
			success: function( _data ) {
				var results = _data.results.bindings;
				sparqlItemsData = _data;
				alert("hello");
			});	
		}
	}