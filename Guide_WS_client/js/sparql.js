 function getALLData (){
		 var tableContent ='<thead><tr> <br/> <td>x</td><td>y</td><td>z</td></tr></thead> <tbody>';
		 var url = "http://localhost:3030/data/query";		 
		 var query = "\PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> "+
		 " SELECT * "+
		 " WHERE {  ?x ?p ?y }";
		 
		var queryUrl = url+"?query="+query+"&format=json" ;

		 $.ajax({
				dataType: "jsonp",
				url: queryUrl,
				success: function( _data ) {
				var results = _data.results.bindings;
				sparqlItemsData = _data;
				   for ( var i in results ) {
                        tableContent += '<tr>';
                        tableContent += '<td>' + results[i].x.value + '</td>';
						tableContent += '<td>' + results[i].p.value + '</td>';
						tableContent += '<td>' + results[i].y.value + '</td>';
                        tableContent += '</tr>'
                    }
				$("#res").html(tableContent);
			}	
		});
}


 function getDataVille (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
		 var url = "http://localhost:3030/data/query";		 
		 var query = "\PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> "+
		 " SELECT * "+
		 " WHERE {  ?x tourisme:dans tourisme:"+ville+" }";
		 
		var queryUrl = url+"?query="+query+"&format=json" ;

		 $.ajax({
				dataType: "jsonp",
				url: queryUrl,
				success: function( _data ) {
				var results = _data.results.bindings;
				sparqlItemsData = _data;
				   for ( var i in results ) {
                        tableContent += '<tr>';
                        tableContent += '<td>' + results[i].x.value + '</td>';						
                        tableContent += '</tr>'
                    }
				$("#res").html(tableContent);
			}	
		});
}