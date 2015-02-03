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

/* Ayoub function return Monuments */
 function getMonuments (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
		 //var url = "http://localhost:3030/data/query";		 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 //var query = "\PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> "+
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?Description ?Image "+
		 " WHERE {?x tourisme:dans dbpedia-resource:"+ville+"; a tourisme:Monument; tourisme:description ?Description "+
		 ";tourisme:imageUrl ?urlR. ?urlR rdfs:label ?Image.}";
		 
		 
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
				
				for(var i=2;i<elements.length;i++){	
					var url= elements[i].innerHTML;
					var toto="<img src="+url+"/>";
					elements[i].innerHTML=toto;
					i++;
				}
				$("#res").html(el);
			}	
		});
}


/* Ayoub function return Restaurants */
function getRestaurants (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
		 //var url = "http://localhost:3030/data/query";		 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 //var query = "\PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> "+
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?Restaurant ?Adresse ?Note ?Telephone ?SiteWeb"+
		 " WHERE {?x tourisme:dans dbpedia-resource:"+ville+"; a tourisme:Restaurant; rdfs:label ?Restaurant ; tourisme:adresse ?Adresse ; tourisme:note ?Note;"+
		 " tourisme:telephone ?Telephone; tourisme:siteWeb ?sitew . ?sitew rdfs:label ?SiteWeb.}";

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
				
				/*for(var i=2;i<elements.length;i++){	
					var url= elements[i].innerHTML;
					var toto="<img src="+url+"/>";
					elements[i].innerHTML=toto;
					i++;
				}*/
				$("#res").html(el);
			}	
		});
}

/* Ayoub function return Hotels */

function getHotels (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
		 //var url = "http://localhost:3030/data/query";		 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 //var query = "\PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> "+
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?Hotel ?Adresse ?Note ?SiteWeb ?Image"+
		 " WHERE {?x tourisme:dans dbpedia-resource:"+ville+"; a tourisme:Hotel; tourisme:adresse ?Adresse ; tourisme:note ?Note; rdfs:label ?Hotel;"+
		 "tourisme:siteWeb ?sitew; tourisme:imageUrl ?urlR. ?sitew rdfs:label ?SiteWeb. ?urlR rdfs:label ?Image}";

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
				
				for(var i=3;i<elements.length;i++){	
					var url= elements[i].innerHTML;
					var toto="<img src="+url+" width height='100' width='100'/>";
					elements[i].innerHTML=toto;
					i=i+4;
				}
				$("#res").html(el);
			}	
		});
}


function AhmedgetVols (){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
		 //var url = "http://localhost:3030/data/query";		 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 //var query = "\PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> "+
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 //" SELECT ?x ?depart ?destination ?type"+
		 " SELECT DISTINCT ?x ?depart ?destination "+
		// " WHERE {?x  a tourisme:Vol; tourisme:depart ?depart; tourisme:destination ?destination .}";
		 
		 " WHERE {?x  a tourisme:VolAffaire; tourisme:depart ?depart; tourisme:destination ?destination ; a ?type.}";
		 
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
				
				var uris=el.getElementsByTagName('td');

				for(var i=3;i<uris.length;i+=3){
					var tmp=document.createElement('div');
					tmp.innerHTML=uris[i].innerHTML;
					//alert(uris[i].innerHTML);
					
				}


				var vols={};
				var j=0;
				for(var i=3;i<uris.length;i+=3){
					var tmp=document.createElement('div');
					tmp.innerHTML=uris[i].innerHTML;
					//alert(uris[i].innerHTML);
					vols[j]=uris[i].innerHTML.split(">")[1].split("<")[0];
					j++;
					
				}

				var elements=el.getElementsByTagName('tr');
				//alert(elements.length);
				for(var i=1;i<elements.length;i++){
					var tt=vols[i-1].split("#")[1];	
					tt=	tt.replace(">","");		
					elements[i].innerHTML=elements[i].innerHTML+"<td><a href='http://127.0.0.1:8081/page/Vols/A/C/D/"+tt
					+"'>Recommendations	</td>";
					}
				//ivar url= elements[1].innerHTML;
				// var toto="<img src="+url+"/>";
				//alert();
					//elements[1].innerHTML=elements[1].innerHTML+"<td><button>+</button></td>"
				//}
				
				$("#res").html(el);
			}	
		});
}

function AhmedgetVille (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
		 //var url = "http://localhost:3030/data/query";		 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 //var query = "\PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> "+
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 //" SELECT ?x ?depart ?destination ?type"+
		 " SELECT ?propriety ?value "+
		// " WHERE {?x  a tourisme:Vol; tourisme:depart ?depart; tourisme:destination ?destination .}";
		 
		 " WHERE {dbpedia-resource:"+ville+" ?propriety ?value.}";
		 
		 //http://localhost:8080/sparql/template?profile=st%3Aldp&query=PREFIX+tourisme%3A+%3Chttp%3A%2F%2Fwww.polytech.semantique%2Ftourisme%23%3E+%0D%0ASELECT+*+WHERE+%7B%0D%0A++%3Fx+tourisme%3Adans+tourisme%3ANice%0D%0A+%7D
		 
		// alert(query);
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
				/*
				var elements=el.getElementsByTagName('tr');
				//alert(elements.length);
				for(var i=1;i<elements.length;i++){
					elements[i].innerHTML=elements[i].innerHTML+"<td><button id='b_"+i+"'>Recommendations</button></td>";
					}
					*/
				//ivar url= elements[1].innerHTML;
				// var toto="<img src="+url+"/>";
				//alert();
					//elements[1].innerHTML=elements[1].innerHTML+"<td><button>+</button></td>"
				//}
				
				$("#res").html(el);
			}	
		});
}





function getRecommendation (uri){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
		 //var url = "http://localhost:3030/data/query";		 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 //var query = "\PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> "+
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 //" SELECT ?x ?depart ?destination ?type"+
		 " SELECT * "+
		// " WHERE {?x  a tourisme:Vol; tourisme:depart ?depart; tourisme:destination ?destination .}";
		 
		 //" WHERE {tourisme:"+uri+" tourisme:recommenderHotel ?recommenderHotel;tourisme:recommenderMonument ?recommenderMonument;"
		// +"tourisme:recommenderAgence ?recommenderAgence;}";
		 
 " WHERE {tourisme:"+uri+" tourisme:recommenderHotel ?recommenderHotel;}";


		 //http://localhost:8080/sparql/template?profile=st%3Aldp&query=PREFIX+tourisme%3A+%3Chttp%3A%2F%2Fwww.polytech.semantique%2Ftourisme%23%3E+%0D%0ASELECT+*+WHERE+%7B%0D%0A++%3Fx+tourisme%3Adans+tourisme%3ANice%0D%0A+%7D
		 
		// alert(query);
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
				/*
				var elements=el.getElementsByTagName('tr');
				//alert(elements.length);
				for(var i=1;i<elements.length;i++){
					elements[i].innerHTML=elements[i].innerHTML+"<td><button id='b_"+i+"'>Recommendations</button></td>";
					}
					*/
				//ivar url= elements[1].innerHTML;
				// var toto="<img src="+url+"/>";
				//alert();
					//elements[1].innerHTML=elements[1].innerHTML+"<td><button>+</button></td>"
				//}
				
				$("#res").html(el);
			}	
		});
}