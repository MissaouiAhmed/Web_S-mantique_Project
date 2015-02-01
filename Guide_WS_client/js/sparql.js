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
		 //var url = "http://localhost:3030/data/query";		 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 //var query = "\PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> "+
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"+
		 
		 " SELECT * "+
		 //" WHERE {?x tourisme:dans tourisme:"+ville+"}";
		" WHERE {?x tourisme:dans dbpedia-resource:"+ville+"}";
		 
		 
		 //http://localhost:8080/sparql/template?profile=st%3Aldp&query=PREFIX+tourisme%3A+%3Chttp%3A%2F%2Fwww.polytech.semantique%2Ftourisme%23%3E+%0D%0ASELECT+*+WHERE+%7B%0D%0A++%3Fx+tourisme%3Adans+tourisme%3ANice%0D%0A+%7D
		 
		 
		//var queryUrl = url+"?query="+query+"&format=json" ;
	var queryUrl = url+query ;

		 $.ajax({
				//dataType: "jsonp",
				url: queryUrl,
				success: function( _data ) {
					//alert(_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8));
					/*
				var results = _data.results.bindings;
				sparqlItemsData = _data;
				   for ( var i in results ) {
                        tableContent += '<tr>';
                        tableContent += '<td>' + results[i].x.value + '</td>';						
                        tableContent += '</tr>'
                    }
				$("#res").html(tableContent);
				
				*/
				
				$("#res").html(_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8));
			}	
		});
}

 function getMonuments (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
		 //var url = "http://localhost:3030/data/query";		 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 //var query = "\PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> "+
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?description ?url "+
		 " WHERE {?x tourisme:dans dbpedia-resource:"+ville+"; a tourisme:Monument; tourisme:description ?description "+
		 ";tourisme:imageUrl ?urlR. ?urlR rdfs:label ?url.}";
		 
		 
		 //http://localhost:8080/sparql/template?profile=st%3Aldp&query=PREFIX+tourisme%3A+%3Chttp%3A%2F%2Fwww.polytech.semantique%2Ftourisme%23%3E+%0D%0ASELECT+*+WHERE+%7B%0D%0A++%3Fx+tourisme%3Adans+tourisme%3ANice%0D%0A+%7D
		 
		 
		//var queryUrl = url+"?query="+query+"&format=json" ;
	var queryUrl = url+query ;

		 $.ajax({
				//dataType: "jsonp",
				url: queryUrl,
				success: function( _data ) {
					//alert(_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8));
					/*
				var results = _data.results.bindings;
				sparqlItemsData = _data;
				   for ( var i in results ) {
                        tableContent += '<tr>';
                        tableContent += '<td>' + results[i].x.value + '</td>';						
                        tableContent += '</tr>'
                    }
				$("#res").html(tableContent);
				
				*/
				var table=_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8);
				/*
				var re = new RegExp('<td>.*</td>');
				var results  = re.exec(table);
				for (int i=0;i<results.length;i++) ) {
						alert(results[i]);
							//result.next;
				}
				*/
				var el=document.createElement('div');
				el.innerHTML=table;
				var elements=el.getElementsByTagName('td');
				
				//for(int i=2;i<elements.length;i+2){
					
				var url= elements[2].innerHTML;
				 var toto="<img src="+url+"/>";
				 //alert(toto);
				 elements[2].innerHTML=toto;
				//}
				
				$("#res").html(el);
			}	
		});
}