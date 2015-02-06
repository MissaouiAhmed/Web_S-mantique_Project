<?php
$time_start = microtime(true); 
ini_set('max_execution_time', 4000);

		// $outputCsv : Variable qui va contenir les données CSV
	$outputCsv = '';
	
		// $fileName : c'est le nom du fichier .csv (ville.csv)
	$fileName = "Munich";
	$fileName .= ".csv";
	
		// Ajouter dans la variable $outputCsv les noms des colonnes
	$outputCsv .= "Restaurant; URL; Adresse; Tel; Note;";

$VILLES = array(); 
	$doc = new DOMDocument();
	@$doc->loadHTML(file_get_contents("http://www.tripadvisor.fr/Restaurants-g187309-Munich_Upper_Bavaria_Bavaria.html/"));			
  $xpath = new DOMXPath($doc);
	
  $query = $xpath->query("//*[@class='property_title ']");
	
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
			
			$query2 = $xpath1->query("//*[@class='fl phoneNumber']");
			foreach($query2 as $node2){
				$outputCsv .= $node2->nodeValue.';';
			}
		
			$query3 = $xpath1->query("//*[@class='sprite-rating_rr_fill rating_rr_fill rr50']");
			foreach($query3 as $node3){
				if (!empty($node3)){
					$outputCsv .= $node3->getAttribute('alt').';';
				}
			}
			
			$query4 = $xpath1->query("//*[@class='sprite-rating_rr_fill rating_rr_fill rr45']");
			foreach($query4 as $node4){
				if (!empty($node4)){
					$outputCsv .= $node4->getAttribute('alt').';';
				}
			}
		}
	}
		
			header ( "Content-disposition: attachment; filename=" . $fileName );
			header ( "Content-Type: application/force-download" );
			header ( "Content-Transfer-Encoding: application/vnd.ms-excel\n" );
			header ( "Pragma: no-cache" );
			header ( "Cache-Control: must-revalidate, post-check=0, pre-check=0, public" );
			header ( "Expires: 0" );
			
			echo $outputCsv;
			exit ();
?>