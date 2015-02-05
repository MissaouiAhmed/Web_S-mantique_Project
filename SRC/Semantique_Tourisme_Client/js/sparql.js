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
var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"+
		 
		 " SELECT * "+
		" WHERE {?x tourisme:dans dbpedia-resource:"+ville+"}";
		var queryUrl = url+query ;

		 $.ajax({
				url: queryUrl,
				success: function( _data ) {
			$("#res").html(_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8));
			}	
		});
}

function getMonuments (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
	
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?Description ?Image "+
		 " WHERE {?x tourisme:dans dbpedia-resource:"+ville+"; a tourisme:Monument; tourisme:description ?Description "+
		 ";tourisme:imageUrl ?urlR. ?urlR rdfs:label ?Image.}";
		var queryUrl = url+query ;

		 $.ajax({
			url: queryUrl,
				success: function( _data ) {
				var table=_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8);
			
				var el=document.createElement('div');
				el.innerHTML=table;
				var elements=el.getElementsByTagName('td');
				
				for(var i=2;i<elements.length;i++){	
					var url= elements[i].innerHTML;
					var toto="<img src="+url+"/>";
					elements[i].innerHTML=toto;
					i++;
				}
				/* Script enlevé les guillemets */
				var reg=new RegExp('["]+', 'g');
				for(var i=1;i<elements.length;i++){	
					var desc= elements[i].innerHTML;
					desc=desc.replace(reg, ''); 
					elements[i].innerHTML=desc;
					i++;
				}
				/*  */
				$("#res").html(el);
			}	
		});
}


function getRestaurants (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
	
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?Restaurant ?Adresse ?Note ?Telephone ?SiteWeb"+
		 " WHERE {?x tourisme:dans dbpedia-resource:"+ville+"; a tourisme:Restaurant; rdfs:label ?Restaurant ; tourisme:adresse ?Adresse ; tourisme:note ?Note;"+
		 " tourisme:telephone ?Telephone; tourisme:siteWeb ?sitew . ?sitew rdfs:label ?SiteWeb.}";
	 
	var queryUrl = url+query ;

		 $.ajax({
				url: queryUrl,
				success: function( _data ) {
				var table=_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8);
				
				var el=document.createElement('div');
				el.innerHTML=table;
				var elements=el.getElementsByTagName('td');
				
				
				var reg=new RegExp('["]+', 'g');
				for(var i=1;i<elements.length;i++){	
					var desc= elements[i].innerHTML;
					desc=desc.replace(reg, ''); 
					elements[i].innerHTML=desc;
				}
				
				$("#res").html(el);
			}	
		});
}

function getASCRestaurants (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
				 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?Restaurant ?Adresse ?Note ?Telephone ?SiteWeb"+
		 " WHERE {?x tourisme:dans dbpedia-resource:"+ville+"; a tourisme:Restaurant; rdfs:label ?Restaurant ; tourisme:adresse ?Adresse ; tourisme:note ?Note;"+
		 " tourisme:telephone ?Telephone; tourisme:siteWeb ?sitew . ?sitew rdfs:label ?SiteWeb.} ORDER BY ASC(?Note)";

		var queryUrl = url+query ;

		 $.ajax({
				url: queryUrl,
				success: function( _data ) {
			var table=_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8);
		var el=document.createElement('div');
				el.innerHTML=table;
				var elements=el.getElementsByTagName('td');
			
				var reg=new RegExp('["]+', 'g');
				for(var i=1;i<elements.length;i++){	
					var desc= elements[i].innerHTML;
					desc=desc.replace(reg, ''); 
					elements[i].innerHTML=desc;
				}
				$("#res").html(el);
			}	
		});
}

function getDESCRestaurants (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
		
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?Restaurant ?Adresse ?Note ?Telephone ?SiteWeb"+
		 " WHERE {?x tourisme:dans dbpedia-resource:"+ville+"; a tourisme:Restaurant; rdfs:label ?Restaurant ; tourisme:adresse ?Adresse ; tourisme:note ?Note;"+
		 " tourisme:telephone ?Telephone; tourisme:siteWeb ?sitew . ?sitew rdfs:label ?SiteWeb.} ORDER BY DESC(?Note)";
var queryUrl = url+query ;

		 $.ajax({
				url: queryUrl,
				success: function( _data ) {
				
				var table=_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8);
				
				var el=document.createElement('div');
				el.innerHTML=table;
				var elements=el.getElementsByTagName('td');
				
				var reg=new RegExp('["]+', 'g');
				for(var i=1;i<elements.length;i++){	
					var desc= elements[i].innerHTML;
					desc=desc.replace(reg, ''); 
					elements[i].innerHTML=desc;
				}
				$("#res").html(el);
			}	
		});
}


function getHotels (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
		 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?Hotel ?Adresse ?Note ?SiteWeb ?Image"+
		 " WHERE {?x tourisme:dans dbpedia-resource:"+ville+"; a tourisme:Hotel; tourisme:adresse ?Adresse ; tourisme:note ?Note; rdfs:label ?Hotel;"+
		 "tourisme:siteWeb ?sitew; tourisme:imageUrl ?urlR. ?sitew rdfs:label ?SiteWeb. ?urlR rdfs:label ?Image}";
var queryUrl = url+query ;

		 $.ajax({
				url: queryUrl,
				success: function( _data ) {
			
				var table=_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8);
				
				var el=document.createElement('div');
				el.innerHTML=table;
				var elements=el.getElementsByTagName('td');
				var reg=new RegExp('["]+', 'g');
				for(var i=1;i<elements.length;i++){	
					var desc= elements[i].innerHTML;
					desc=desc.replace(reg, ''); 
					elements[i].innerHTML=desc;
				}
				
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

/* Gethotel orderby ASC Note */
function getOrderASCHotels (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
			 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?Hotel ?Adresse ?Note ?SiteWeb ?Image"+
		 " WHERE {?x tourisme:dans dbpedia-resource:"+ville+"; a tourisme:Hotel; tourisme:adresse ?Adresse ; tourisme:note ?Note; rdfs:label ?Hotel;"+
		 "tourisme:siteWeb ?sitew; tourisme:imageUrl ?urlR. ?sitew rdfs:label ?SiteWeb. ?urlR rdfs:label ?Image} ORDER BY DESC(?Note)";
var queryUrl = url+query ;

		 $.ajax({
				url: queryUrl,
				success: function( _data ) {
				var table=_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8);
				
				var el=document.createElement('div');
				el.innerHTML=table;
				var elements=el.getElementsByTagName('td');
				var reg=new RegExp('["]+', 'g');
				for(var i=1;i<elements.length;i++){	
					var desc= elements[i].innerHTML;
					desc=desc.replace(reg, ''); 
					elements[i].innerHTML=desc;
				}
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

/* Gethotel orderby ASC Note */
function getOrderDESCHotels (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
			 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?Hotel ?Adresse ?Note ?SiteWeb ?Image"+
		 " WHERE {?x tourisme:dans dbpedia-resource:"+ville+"; a tourisme:Hotel; tourisme:adresse ?Adresse ; tourisme:note ?Note; rdfs:label ?Hotel;"+
		 "tourisme:siteWeb ?sitew; tourisme:imageUrl ?urlR. ?sitew rdfs:label ?SiteWeb. ?urlR rdfs:label ?Image} ORDER BY ASC(?Note)";
var queryUrl = url+query ;

		 $.ajax({
				url: queryUrl,
				success: function( _data ) {
				
				var table=_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8);

				var el=document.createElement('div');
				el.innerHTML=table;
				var elements=el.getElementsByTagName('td');
				/* Script enlevé les guillemets */
				var reg=new RegExp('["]+', 'g');
				for(var i=1;i<elements.length;i++){	
					var desc= elements[i].innerHTML;
					desc=desc.replace(reg, ''); 
					elements[i].innerHTML=desc;
				}
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


function getVols (){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
				 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> PREFIX dc:<http://purl.org/dc/elements/1.1/>"+
		 " SELECT ?volID ?Depart ?Destination"+
		 " WHERE {?x  a tourisme:Vol."
		 + "?x rdfs:label ?volID."
		 + "?x tourisme:depart ?depart."
		 + "?depart rdfs:label ?Depart."
		 + "?destination rdfs:label ?Destination."
		 + "?x tourisme:destination ?destination."
		 	+"}";
		 
		var queryUrl = url+query ;

		 $.ajax({
				url: queryUrl,
				success: function( _data ) {
				var table=_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8);
				var el=document.createElement('div');
				el.innerHTML=table;
				
				
				var uris=el.getElementsByTagName('td');

				var vols={};var j=0;
				for(var i=3;i<uris.length;i+=3){
					var tmp=document.createElement('div');
					//tmp.innerHTML=uris[i].innerHTML;
					//alert(uris[i].innerHTML);
					vols[j]=uris[i].innerHTML;
					j++;
					
				}

				var elements=el.getElementsByTagName('tr');

				var reg=new RegExp('["]+', 'g');
				for(var i=1;i<elements.length;i++){	
					var desc= elements[i].innerHTML;
					desc=desc.replace(reg, ''); 
					elements[i].innerHTML=desc;
				}


				for(var i=1;i<elements.length;i++){
					elements[i].innerHTML=elements[i].innerHTML+"<td><a href='http://localhost:8081/page/Vols/A/C/D/"+vols[i-1]
					+"'>Recommendations	</td>";
					}


				$("#res").html(el);
			}	
		});
}
function getReelVille(ville){
	 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
		 
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 var query = "PREFIX :<http://dbpedia.org/resource/>"
		+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema%23> "
		+ "PREFIX r: <http://fr.dbpedia.org/resource/> "
		+ "PREFIX p: <http://fr.dbpedia.org/property/> "
		+ "prefix o: <http://dbpedia.org/ontology/> "
		+ "PREFIX dbo:<http://dbpedia.org/ontology/> "
		+ "PREFIX foaf:<http://xmlns.com/foaf/0.1/> "
		+ "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns%23> "
		+ "PREFIX dbpprop:<http://dbpedia.org/property/> "
		+ "PREFIX grs:<http://www.georss.org/georss/> "+
		 " SELECT ?wbesite ?image ?description ?localisation ?postalecode ?pays"+
		 " WHERE { service <http://dbpedia.org/sparql> {"
		+"?x rdfs:label '"+ville+"'@en;"
		+"rdf:type dbo:Place;"
		+"dbpprop:website ?wbesite;"
		+"dbo:thumbnail ?image;"
		+"dbo:abstract ?description;"
		+"grs:point ?localisation;"
		+"dbo:country ?pays;"
		+"dbo:postalCode ?postalecode."
		+"FILTER(langMatches(lang(?description), 'FR'))"
		+"}}";
		 
		var queryUrl = url+query ;

		 $.ajax({
				url: queryUrl,
				success: function( _data ) {	
			
				var table=_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8);
				var el=document.createElement('div');
				el.innerHTML=table;
				
				var elements=el.getElementsByTagName('tr');
				var el=document.createElement('div');
				el.innerHTML=table;
				var elements=el.getElementsByTagName('td');
				var reg=new RegExp('["]+', 'g');
				for(var i=1;i<elements.length;i++){	
					var desc= elements[i].innerHTML;
					desc=desc.replace(reg, ''); 
					elements[i].innerHTML=desc;
				}
				$("#res").html(el);
			}	
		});
}


function getVille (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
		var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?description ?localisation ?SiteWeb ?ImageUrl"+
		" WHERE {"
		+"dbpedia-resource:"+ville+" tourisme:description ?description."

		+"dbpedia-resource:"+ville+" tourisme:localisation ?localisation."
		+"dbpedia-resource:"+ville+" tourisme:siteWeb  ?siteWeb."
		+"?siteWeb rdfs:label  ?SiteWeb."

		+"dbpedia-resource:"+ville+" tourisme:imageUrl  ?imageUrl."
		+"?imageUrl rdfs:label  ?ImageUrl."

		+"}";

if(ville=="Rome" ||ville=="Nice" ){

query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?description ?localisation ?ImageUrl"+
		" WHERE {"
		+"dbpedia-resource:"+ville+" tourisme:description ?description."

		+"dbpedia-resource:"+ville+" tourisme:localisation ?localisation."
		+"dbpedia-resource:"+ville+" tourisme:imageUrl  ?imageUrl."
		+"?imageUrl rdfs:label  ?ImageUrl."
		+"}";

		}

		if(ville=="Madrid"){

query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
		+	"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "+
		 " SELECT ?description ?localisation "+
		" WHERE {"
		+"dbpedia-resource:"+ville+" tourisme:description ?description."

		+"dbpedia-resource:"+ville+" tourisme:localisation ?localisation."
		+"}";

		}
		 
		
	var queryUrl = url+query ;

		 $.ajax({
				url: queryUrl,
				success: function( _data ) {	
				
				var table=_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8);
				var el=document.createElement('div');
				el.innerHTML=table;
				
				var elements=el.getElementsByTagName('tr');
				if(ville!="Madrid" ){
					var el=document.createElement('div');
					el.innerHTML=table;
					var elements=el.getElementsByTagName('td');
					
						var url= elements[1].innerHTML;
						var toto="<img src="+url+" height='200' width='200'/>";
						elements[1].innerHTML=toto;
					}

				

				var reg=new RegExp('["]+', 'g');
				for(var i=1;i<elements.length;i++){	
					var desc= elements[i].innerHTML;
					desc=desc.replace(reg, ''); 
					elements[i].innerHTML=desc;
				}
				$("#res").html(el);
			}	
		});
}





function getRecommendation (uri){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		 //var query = "\PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> "+
	
var query = "PREFIX tourisme: <http://www.polytech.semantique/tourisme%23> PREFIX dbpedia-resource:<http://dbpedia.org/resource/>"
+"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23> "

 +"SELECT * WHERE {"
+"{SELECT ?Hotel WHERE {tourisme:"+uri+" tourisme:recommenderHotel ?recommenderHotel. ?recommenderHotel rdfs:label ?Hotel;}}"		
+ "UNION"
+"{ SELECT ?monument WHERE {tourisme:"+uri+" tourisme:recommenderMonument ?recommenderMonument. ?recommenderMonument rdfs:label ?monument;}}"
+"UNION"
+"{ SELECT ?agence WHERE {tourisme:"+uri+" tourisme:recommenderAgence ?recommenderAgence. ?recommenderAgence rdfs:label ?agence;}} "		 
+"} LIMIT 15";



		var queryUrl = url+query ;

		 $.ajax({
				url: queryUrl,
				success: function( _data ) {	
			
				var table=_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8);
				var el=document.createElement('div');
				el.innerHTML=table;
				var elements=el.getElementsByTagName('tr');
				var reg=new RegExp('["]+', 'g');
				for(var i=1;i<elements.length;i++){	
					var desc= elements[i].innerHTML;
					desc=desc.replace(reg, ''); 
					elements[i].innerHTML=desc;
				}
				$("#res").html(el);
			}	
		});
}




 function getReelMonuments (ville){
		 var tableContent ='<thead><tr> <br/> <td>x</td></tr></thead> <tbody>';
		 var url = "http://localhost:8080/sparql/template?profile=st%3Aldp&query=";
		  var query = "PREFIX dbo:<http://dbpedia.org/ontology/>PREFIX : <http://dbpedia.org/resource/>"
		 + "PREFIX foaf:<http://xmlns.com/foaf/0.1/>PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema%23>"
		 + "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns%23>PREFIX dbpprop: <http://dbpedia.org/property/>"
		 + "PREFIX grs:<http://www.georss.org/georss/>"
		 + "SELECT  * WHERE { "
		 + 	"{service <http://dbpedia.org/sparql> { select * where { ?x rdf:type dbo:Museum;dbo:abstract ?description;dbo:thumbnail ?imageLink;dbpprop:pushpinMap '"+ville+"'@en;dbpprop:website ?website;grs:point ?localisation. FILTER(langMatches(lang(?description), 'FR'))}}}"
		 + "UNION"
		 + "{service <http://dbpedia.org/sparql> { select * where {?x rdf:type dbo:Museum;dbo:abstract ?description; dbo:thumbnail ?imageLink;dbo:location '"+ville+"'@en; dbpprop:website ?website;grs:point ?localisation. FILTER(langMatches(lang(?description), 'FR'))}}}}";

		var queryUrl = url+query ;
		
		 $.ajax({
				url: queryUrl,
				success: function( _data ) {
			var table=_data.substring(_data.lastIndexOf("<table>"),_data.lastIndexOf("</table>")+8);
				
				var el=document.createElement('div');
				el.innerHTML=table;
				var elements=el.getElementsByTagName('td');
				var reg=new RegExp('["]+', 'g');
				for(var i=1;i<elements.length;i++){	
					var desc= elements[i].innerHTML;
					desc=desc.replace(reg, ''); 
					elements[i].innerHTML=desc;
				}
				$("#res").html(el);
			}	
		});
}