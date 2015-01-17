package fr.polytech.websemantic;

import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.Literal;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Property;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.vocabulary.RDF;

public class MonumentLoader {

	public static Model monumentLoading(String place, String placeUri) {

		Model model = ModelFactory.createDefaultModel();

		String sp1 = "dbo:location " + placeUri + ";";
		String sp2 = "dbpprop:pushpinMap '" + place + "'@en;";
		Model tmp1 = monumentLoadingBothWaysAndgenrateResource(place, placeUri, sp1);
		Model tmp2 = monumentLoadingBothWaysAndgenrateResource(place, placeUri, sp2);
		model.add(tmp1);
		model.add(tmp2);

		return model;
	}

	public static Model monumentLoadingBothWaysAndgenrateResource(String place, String placeUri,
			String specialQuery) {
		Model model = ModelFactory.createDefaultModel();

		model.setNsPrefix("tourisme", "http://www.polytech.semantique/tourisme");

		String query = "PREFIX dbo:<http://dbpedia.org/ontology/>"
				+ "PREFIX : <http://dbpedia.org/resource/>"
				+ "PREFIX foaf:<http://xmlns.com/foaf/0.1/>"
				+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
				+ "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
				+ "PREFIX dbpprop: <http://dbpedia.org/property/>"
				+ "PREFIX grs:<http://www.georss.org/georss/>"
				+ "SELECT * WHERE { "
				+ "?x rdf:type dbo:Museum;" + "dbo:abstract ?description;"
				+ specialQuery
				+ "dbo:thumbnail ?imageLink;" + "dbpprop:website ?website;"
				+ "grs:point ?localisation"
				+ ".FILTER(langMatches(lang(?description), 'FR'))" + "}";
		String dbpadiaURI = "";
		//System.out.println(query);
		QueryExecution qe = QueryExecutionFactory.sparqlService(
				"http://dbpedia.org/sparql", query);
		ResultSet rs = qe.execSelect();
		while (rs.hasNext()) {
			QuerySolution s = rs.nextSolution();
			Resource r = s.getResource("?x");
			dbpadiaURI = r.getURI();
			//System.out.println(dbpadiaURI);
			Literal description = s.getLiteral("?description");
			Resource imageLink = s.getResource("?imageLink");
			Literal localisation = s.getLiteral("?localisation");

			// Resource
			// placeResource=model.createResource("http://www.polytech.semantique/tourisme#"+place);
			Resource monumentResource = model
					.createResource("http://www.polytech.semantique/tourisme#"
							+ dbpadiaURI.substring(
									dbpadiaURI.lastIndexOf("/") + 1,
									dbpadiaURI.length()));
			
			monumentResource.addProperty(RDF.type, "http://www.polytech.semantique/tourisme#Monument");

			Property propDescition = model
					.createProperty("http://www.polytech.semantique/tourisme#description");
			monumentResource.addProperty(propDescition,
					"" + description.getString());
			Property propImage = model
					.createProperty("http://www.polytech.semantique/tourisme#imageUrl");
			monumentResource.addProperty(propImage, "" + imageLink.getURI());
			Property propwebsite = model
					.createProperty("http://www.polytech.semantique/tourisme#siteWeb");
			if(s.get("?website")instanceof Resource) {
				Resource website = s.getResource("?website");
				monumentResource.addProperty(propwebsite, "" + website.getURI());
				
			}
			else{
				Literal website = s.getLiteral("?website");
				monumentResource.addProperty(propwebsite, "" + website.getString());
				
			}
			
			
			Property proplocalisation = model
					.createProperty("http://www.polytech.semantique/tourisme#localisation");
			monumentResource.addProperty(proplocalisation,
					"" + localisation.getString());

			Property propIslocated = model
					.createProperty("http://www.polytech.semantique/tourisme#estSituéA");
			Resource placeR=model.createResource("http://www.polytech.semantique/tourisme#" +place);
			placeR.addProperty(RDF.type, "http://www.polytech.semantique/tourisme#Ville");

			monumentResource.addProperty(propIslocated,placeR );
		}
		return model;
	}
}