package fr.polytech.websemantic.loaders;

import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Property;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.vocabulary.RDF;
import com.hp.hpl.jena.vocabulary.RDFS;

public class VilleLoader {

	public static Model villeLoading(String place) {

		Model model = ModelFactory.createDefaultModel();
		model.setNsPrefix("tourisme", "http://www.polytech.semantique/tourisme");

		if (place.equalsIgnoreCase("barcelone"))
			place = "Barcelona";
		if (place.equalsIgnoreCase("Bruxelle"))
			place = "Brussels";

		String query = "PREFIX dbo:<http://dbpedia.org/ontology/>"
				+ "PREFIX : <http://dbpedia.org/resource/>"
				+ "PREFIX foaf:<http://xmlns.com/foaf/0.1/>"
				+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
				+ "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
				+ "PREFIX dbpprop: <http://dbpedia.org/property/>"
				+ "PREFIX grs:<http://www.georss.org/georss/>"
				+ "SELECT * WHERE { " + "?x rdfs:label '" + place + "'@en ;"
				+ "rdf:type dbo:Place;" + "dbpprop:website ?wbesite;"
				+ "foaf:depiction ?image;" + "dbo:abstract ?description;"
				+ "grs:point ?localisation;" + "dbo:country ?pays;"
				+ "dbo:postalCode ?postalecode" + "."
				+ "FILTER(langMatches(lang(?description), 'FR'))" + "}";

		if (place.equalsIgnoreCase("rome"))
			query = "PREFIX dbo:<http://dbpedia.org/ontology/>"
					+ "PREFIX : <http://dbpedia.org/resource/>"
					+ "PREFIX foaf:<http://xmlns.com/foaf/0.1/>"
					+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
					+ "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
					+ "PREFIX dbpprop: <http://dbpedia.org/property/>"
					+ "PREFIX grs:<http://www.georss.org/georss/>"
					+ "SELECT * WHERE { " + "?x rdfs:label '" + place
					+ "'@en ;" + "rdf:type dbo:Place;"
					+ "foaf:depiction ?image;" + "dbo:abstract ?description;"
					+ "grs:point ?localisation;" + "dbo:country ?pays;"
					+ "dbo:postalCode ?postalecode" + "."
					+ "FILTER(langMatches(lang(?description), 'FR'))" + "}";

		if (place.equalsIgnoreCase("Madrid"))
			query = "PREFIX dbo:<http://dbpedia.org/ontology/>"
					+ "PREFIX : <http://dbpedia.org/resource/>"
					+ "PREFIX foaf:<http://xmlns.com/foaf/0.1/>"
					+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
					+ "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
					+ "PREFIX dbpprop: <http://dbpedia.org/property/>"
					+ "PREFIX grs:<http://www.georss.org/georss/>"
					+ "SELECT * WHERE { " + "?x rdfs:label '" + place
					+ "'@en ;" + "dbo:abstract ?description;"
					+ "grs:point ?localisation" + "."
					+ "FILTER(langMatches(lang(?description), 'FR'))" + "}";

		if (place.equalsIgnoreCase("Nice"))
			query = "PREFIX dbo:<http://dbpedia.org/ontology/>"
					+ "PREFIX : <http://dbpedia.org/resource/>"
					+ "PREFIX foaf:<http://xmlns.com/foaf/0.1/>"
					+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
					+ "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
					+ "PREFIX dbpprop: <http://dbpedia.org/property/>"
					+ "PREFIX grs:<http://www.georss.org/georss/>"
					+ "SELECT * WHERE { " + "?x rdfs:label '" + place
					+ "'@en ;" + "rdf:type dbo:Place;"
					+ "foaf:depiction ?image;" + "dbo:abstract ?description;"
					+ "grs:point ?localisation;" + "dbo:country ?pays;" + "."
					+ "FILTER(langMatches(lang(?description), 'FR'))" + "}";

		String dbpadiaURI = "";
		QueryExecution qe = QueryExecutionFactory.sparqlService(
				"http://dbpedia.org/sparql", query);

		ResultSet rs = qe.execSelect();
		while (rs.hasNext()) {
			QuerySolution s = rs.nextSolution();
			Resource r = s.getResource("?x");
			if (r.toString().contains("dbpedia"))
				dbpadiaURI = r.toString();
			Resource placeResource = model.createResource(dbpadiaURI);

			placeResource
					.addProperty(
							RDF.type,
							model.createResource("http://www.polytech.semantique/tourisme#Ville"));

			placeResource.addProperty(RDFS.label, dbpadiaURI.substring(
					dbpadiaURI.lastIndexOf("/") + 1, dbpadiaURI.length()));

			Property propDescition = model
					.createProperty("http://www.polytech.semantique/tourisme#description");
			placeResource.addProperty(propDescition,
					s.getLiteral("?description").toString());

			if (!place.equalsIgnoreCase("Madrid")) {
				Property propImage = model
						.createProperty("http://www.polytech.semantique/tourisme#imageUrl");

				Resource imre = model
						.createResource("http://www.polytech.semantique/tourisme#IMAGE_Ville_"
								+ dbpadiaURI.substring(
										dbpadiaURI.lastIndexOf("/") + 1,
										dbpadiaURI.length()));
				imre.addProperty(RDFS.label, s.getResource("?image").toString());
				placeResource.addProperty(propImage, imre);

			}
			if (!place.equalsIgnoreCase("rome")
					&& !place.equalsIgnoreCase("Madrid")
					&& !place.equalsIgnoreCase("Nice")) {
				Property propwebsite = model
						.createProperty("http://www.polytech.semantique/tourisme#siteWeb");

				Resource webr = model
						.createResource("http://www.polytech.semantique/tourisme#URL_Ville_"
								+ dbpadiaURI.substring(
										dbpadiaURI.lastIndexOf("/") + 1,
										dbpadiaURI.length()));
				webr.addProperty(RDFS.label, "");

				placeResource.addProperty(propwebsite, webr);
			}

			Property proplocalisation = model
					.createProperty("http://www.polytech.semantique/tourisme#localisation");
			placeResource.addProperty(proplocalisation,
					s.getLiteral("?localisation").toString());

			if (!place.equalsIgnoreCase("Madrid")) {
				Resource pays = model
						.createResource("http://www.polytech.semantique/tourisme#"
								+ s.getResource("?pays")
										.toString()
										.substring(
												s.getResource("?pays")
														.toString()
														.lastIndexOf("/") + 1,
												s.getResource("?pays")
														.toString().length()));

				pays.addProperty(
						RDF.type,
						model.createResource("http://www.polytech.semantique/tourisme#Pays"));

				pays.addProperty(
						RDFS.label,
						s.getResource("?pays")
								.toString()
								.substring(
										s.getResource("?pays").toString()
												.lastIndexOf("/") + 1,
										s.getResource("?pays").toString()
												.length()));

				Property propDansPays = model
						.createProperty("http://www.polytech.semantique/tourisme#dansPays");
				placeResource.addProperty(propDansPays, pays);

				if (!place.equalsIgnoreCase("Nice")) {
					Property propcodePostale = model
							.createProperty("http://www.polytech.semantique/tourisme#codePostale");
					placeResource.addProperty(propcodePostale,
							s.getLiteral("?postalecode").toString());
				}
			}
		}
		return model;
	}
}