package fr.polytech.websemantic;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.sparql.vocabulary.FOAF;
import com.hp.hpl.jena.vocabulary.DC;
import com.hp.hpl.jena.vocabulary.RDFS;

public class Runner {

	public static void main(String... args) throws FileNotFoundException, UnsupportedEncodingException {

		Model model = ModelFactory.createDefaultModel();
		model.setNsPrefix("tourisme",
				"http://www.polytech.semantique/tourisme#");
		model.setNsPrefix("dc",DC.getURI());
		model.setNsPrefix("rdfs", RDFS.getURI());
		model.setNsPrefix("dbpedia", "http://dbpedia.org/ontology/");
		model.setNsPrefix("dbpedia-resource", "http://dbpedia.org/resource/");
		model.setNsPrefix("foaf", FOAF.NS);
		
		
		String[] places = { 
				"Barcelone", "Bruxelle", "Madrid", "Munich",
				 "Paris", "Rome",
				 "Nice"};

		for (String place : places) {
			Model tmp = VilleLoader.villeLoading(place);
			String uri = getDBpediaResourceFromPlace(place);
			if (uri != null)
				uri = "<" + uri + ">";
			Model tmp1 = MonumentLoader.monumentLoading(place, uri);
			Model tmp2 = RestaurantLoader.loadRestaurant(place + ".csv", place);
			Model tmp3 = HotelsLoader.loadhotel(place + ".csv", place);

			model.add(tmp);
			model.add(tmp1);
			model.add(tmp2);
			model.add(tmp3);
			

		}
		
		Model tmp4 = VolLoader.loadVol("vols.csv");
		model.add(tmp4);
		
		Model tmp5 = AgenceLoader.loadAgence("agences.csv");
		model.add(tmp5);
		
		PrintWriter writer = new PrintWriter("tourisme.rdf", "UTF-8");
		model.write(writer, "RDF/XML");
		
	}

	public static String getDBpediaResourceFromPlace(String place) {
		String query = "PREFIX dbo:<http://dbpedia.org/ontology/>"
				+ "PREFIX : <http://dbpedia.org/resource/>"
				+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
				+ "SELECT * WHERE { " + "?x rdfs:label '" + place + "'@en }";
		String dbpadiaURI = null;
		QueryExecution qe = QueryExecutionFactory.sparqlService(
				"http://dbpedia.org/sparql", query);
		ResultSet rs = qe.execSelect();
		while (rs.hasNext()) {
			QuerySolution s = rs.nextSolution();
			Resource r = s.getResource("?x");
			if (r.toString().contains("dbpedia"))
				dbpadiaURI = r.toString();

		}

		return dbpadiaURI;
	}

}
