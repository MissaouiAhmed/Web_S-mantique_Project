package fr.polytech.websemantic;

import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Property;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.sparql.vocabulary.FOAF;
import com.hp.hpl.jena.vocabulary.RDF;
import com.hp.hpl.jena.vocabulary.RDFS;

public class VilleLoader {

	public static Model villeLoading(String place) {
		
		Model model = ModelFactory.createDefaultModel();
		model.setNsPrefix("tourisme", "http://www.polytech.semantique/tourisme");

		String query = "PREFIX dbo:<http://dbpedia.org/ontology/>"
				+ "PREFIX : <http://dbpedia.org/resource/>"
				+ "PREFIX foaf:<http://xmlns.com/foaf/0.1/>"
				+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
				+ "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
				+ "PREFIX dbpprop: <http://dbpedia.org/property/>"
				+ "PREFIX grs:<http://www.georss.org/georss/>"
				+ "SELECT * WHERE { " + "?x rdfs:label '" + place + "'@en ;"
				+ "rdf:type dbo:Place;" + "dbpprop:website ?wbesite;"
				+ "dbo:thumbnail ?image;" + "dbo:abstract ?description;"
				+ "grs:point ?localisation;" + "dbo:country ?pays;"
				+ "dbo:postalCode ?postalecode;"
				+ "." + "FILTER(langMatches(lang(?description), 'FR'))" + "}";
		String dbpadiaURI = "";
		QueryExecution qe = QueryExecutionFactory.sparqlService(
				"http://dbpedia.org/sparql", query);
		ResultSet rs = qe.execSelect();
		while (rs.hasNext()) {
			QuerySolution s = rs.nextSolution();
			Resource r = s.getResource("?x");
			if (r.toString().contains("dbpedia"))
				dbpadiaURI = r.toString();
//			System.out.println(s.getResource("?wbesite").toString());
//			System.out.println(s.getResource("?image").toString());
//			System.out.println(s.getLiteral("?description").toString());
//			System.out.println(s.getLiteral("?localisation").toString());
//			System.out.println(s.getResource("?pays").toString());
//			System.out.println(s.getLiteral("?postalecode").toString());

			Resource placeResource = model
					.createResource(dbpadiaURI);
			
			placeResource.addProperty(RDF.type,  model.createResource("http://www.polytech.semantique/tourisme#Ville"));


			Property propDescition = model.createProperty("http://www.polytech.semantique/tourisme#description");
			placeResource.addProperty(propDescition, s.getLiteral("?description").toString());
			Property propImage = model.createProperty("http://www.polytech.semantique/tourisme#imageUrl");
			
			
			Resource imre=model.createResource("http://www.polytech.semantique/tourisme#IMAGE_Ville_"+
					dbpadiaURI.substring(
							dbpadiaURI.lastIndexOf("/") + 1,
							dbpadiaURI.length()));
			imre.addProperty(FOAF.page, s.getResource("?image").toString());
			placeResource.addProperty(propImage, imre);
			
			
			Property propwebsite = model.createProperty("http://www.polytech.semantique/tourisme#siteWeb");
			
			Resource webr=model.createResource("http://www.polytech.semantique/tourisme#URL_Ville_"+
					dbpadiaURI.substring(
							dbpadiaURI.lastIndexOf("/") + 1,
							dbpadiaURI.length()));
			webr.addProperty(FOAF.page,  s.getResource("?wbesite").toString());
			
			placeResource.addProperty(propwebsite,webr);
			
			
			
			Property proplocalisation = model.createProperty("http://www.polytech.semantique/tourisme#localisation");
			placeResource.addProperty(proplocalisation,s.getLiteral("?localisation").toString());
			
			
			Resource pays=model.createResource("http://www.polytech.semantique/tourisme#"+
					s.getResource("?pays").toString().substring(s.getResource("?pays").toString().lastIndexOf("/") + 1,
							s.getResource("?pays").toString().length()));
			
			pays.addProperty(RDF.type, model.createResource("http://www.polytech.semantique/tourisme#Pays"));

			pays.addProperty(RDFS.label,s.getResource("?pays").toString().substring(s.getResource("?pays").toString().lastIndexOf("/") + 1,
					s.getResource("?pays").toString().length()));
							
			Property propDansPays = model.createProperty("http://www.polytech.semantique/tourisme#dansPays");
			placeResource.addProperty(propDansPays,pays);
			
			
			Property propcodePostale = model.createProperty("http://www.polytech.semantique/tourisme#codePostale");
			placeResource.addProperty(propcodePostale, s.getLiteral("?postalecode").toString());
		}
		return model;
	}
}