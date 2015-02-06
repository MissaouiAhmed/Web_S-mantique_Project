<?php
$time_start = microtime(true); 
ini_set('max_execution_time', 4000);

		// $outputCsv : Variable qui va contenir les données CSV
	$outputCsv = '';
	
		// $fileName : c'est le nom du fichier .csv (ville.csv)
	$fileName = "Munich";
	$fileName .= ".csv";
	
		// Ajouter dans la variable $outputCsv les noms des colonnes
	$outputCsv .= "Hotel; URL; Adresse; Note; Image";

$VILLES = array(); 
	$doc = new DOMDocument();
	@$doc->loadHTML(file_get_contents("http://www.tripadvisor.fr/Hotels-g187309-Munich_Upper_Bavaria_Bavaria-Hotels.html/"));			
  $xpath = new DOMXPath($doc);
	
  $query = $xpath->query("//*[@class='property_title']");
	
  foreach($query as $node){
    $out = new DOMDocument();
    foreach($node->childNodes as $child){
			$outputCsv .= $node->nodeValue.';';
			$url = "http://www.tripadvisor.fr" .$node->getAttribute('href'). "/";
			$outputCsv .= $url.';';
		
			$doc1 = new DOMDocument();
			@$doc1->loadHTML(file_get_contents($url));
			$xpath1 = new DOMXPath($doc1);
		
			$query1 = $xpath1->query("//*[@class='format_address']");
			foreach($query1 as $node1){
				$outputCsv .= $node1->nodeValue.';';
				break;
			}
		
			$query3 = $xpath1->query("//*[@class='sprite-rating_cl_gry_fill rating_cl_gry_fill cl_gry50']");
			foreach($query3 as $node3){
				if (!empty($node3)){
					$outputCsv .= $node3->getAttribute('alt').';';
				}else{
					$outputCsv .= ';';
				}
			}
			
			$query4 = $xpath1->query("//*[@class='sprite-rating_cl_gry_fill rating_cl_gry_fill cl_gry45']");
			foreach($query4 as $node4){
				if (!empty($node4)){
					$outputCsv .= $node4->getAttribute('alt').';';
				}else{
					$outputCsv .= ';';
				}
			}
			
			$query5 = $xpath1->query("//*[@class='sprite-rating_cl_gry_fill rating_cl_gry_fill cl_gry40']");
			foreach($query5 as $node5){
				if (!empty($node5)){
					$outputCsv .= $node5->getAttribute('alt').';';
				}else{
					$outputCsv .= ';';
				}
			}
			
			$query6 = $xpath1->query("//*[@class='sprite-rating_cl_gry_fill rating_cl_gry_fill cl_gry35']");
			foreach($query6 as $node6){
				if (!empty($node6)){
					$outputCsv .= $node6->getAttribute('alt').';';
				}else{
					$outputCsv .= ';';
				}
			}
			
			$query7 = $xpath1->query("//*[@class='sprite-rating_cl_gry_fill rating_cl_gry_fill cl_gry30']");
			foreach($query7 as $node7){
				if (!empty($node7)){
					$outputCsv .= $node7->getAttribute('alt').';';
				}else{
					$outputCsv .= ';';
				}
			}
			
			$query8 = $xpath1->query("//*[@class='sprite-rating_cl_gry_fill rating_cl_gry_fill cl_gry25']");
			foreach($query8 as $node8){
				if (!empty($node8)){
					$outputCsv .= $node8->getAttribute('alt').';';
				}else{
					$outputCsv .= ';';
				}
			}
			
			$query9 = $xpath1->query("//*[@class='sprite-rating_cl_gry_fill rating_cl_gry_fill cl_gry20']");
			foreach($query9 as $node9){
				if (!empty($node9)){
					$outputCsv .= $node9->getAttribute('alt').';';
				}else{
					$outputCsv .= ';';
				}
			}
			
			$query11 = $xpath1->query("//*[@class='sprite-rating_cl_gry_fill rating_cl_gry_fill cl_gry15']");
			foreach($query11 as $node11){
				if (!empty($node11)){
					$outputCsv .= $node11->getAttribute('alt').';';
				}else{
					$outputCsv .= ';';
				}
			}
			
			$query12 = $xpath1->query("//*[@class='sprite-rating_cl_gry_fill rating_cl_gry_fill cl_gry10']");
			foreach($query12 as $node12){
				if (!empty($node12)){
					$outputCsv .= $node12->getAttribute('alt').';';
				}else{
					$outputCsv .= ';';
				}
			}
			
			$query10 = $xpath1->query("//*[@class='sizedThumb_thumbnail']");
			foreach($query10 as $node10){
				$outputCsv .= $node10->getAttribute('src').';';
				break;
			}
			
		}
	}
			
			// Entêtes (headers) PHP qui vont bien pour la création d'un fichier Excel CSV
			header ( "Content-disposition: attachment; filename=" . $fileName );
			header ( "Content-Type: application/force-download" );
			header ( "Content-Transfer-Encoding: application/vnd.ms-excel\n" );
			header ( "Pragma: no-cache" );
			header ( "Cache-Control: must-revalidate, post-check=0, pre-check=0, public" );
			header ( "Expires: 0" );
			
			// ecriture du contenu de la variable $outputCsv dans le fchier $fileName
			echo $outputCsv;
			exit ();
?>