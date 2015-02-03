package fr.polytech.websemantic;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;

import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.Literal;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Property;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.sparql.vocabulary.FOAF;
import com.hp.hpl.jena.vocabulary.RDF;
import com.hp.hpl.jena.vocabulary.RDFS;

public class MonumentLoader {

	public static Model monumentLoading(String place, String placeUri) throws UnsupportedEncodingException {

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
			String specialQuery) throws UnsupportedEncodingException {
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
	//	System.out.println(query);
		QueryExecution qe = QueryExecutionFactory.sparqlService(
				"http://dbpedia.org/sparql", query);
		ResultSet rs = qe.execSelect();
		while (rs.hasNext()) {
			QuerySolution s = rs.nextSolution();
			Resource r = s.getResource("?x");
			dbpadiaURI = r.getURI();
			
			dbpadiaURI=dbpadiaURI.replaceAll("%C3%A9", "e");
			
			dbpadiaURI=dbpadiaURI.replaceAll("%C3%A9", "_");
			
			dbpadiaURI=dbpadiaURI.replaceAll("%C3%AD", "i");
			dbpadiaURI=dbpadiaURI.replaceAll("\\(", "");	
			dbpadiaURI=dbpadiaURI.replaceAll("\\)", "");
			dbpadiaURI=dbpadiaURI.replaceAll("'", "_");
			
			dbpadiaURI=dbpadiaURI.replaceAll("%E2%80%99", "_");
			if(!dbpadiaURI.equalsIgnoreCase("http://dbpedia.org/resource/Cit%C3%A9_de_l'%C3%A9conomie_et_de_la_monnaie")){
			Literal description = s.getLiteral("?description");
			Resource imageLink = s.getResource("?imageLink");
			Literal localisation = s.getLiteral("?localisation");

			// Resource
			// placeResource=model.createResource("http://www.polytech.semantique/tourisme#"+place);
			Resource monumentResource = model
					.createResource(dbpadiaURI);
			
			monumentResource.addProperty(RDFS.label, 
					dbpadiaURI.substring(dbpadiaURI.lastIndexOf("/") + 1,
					dbpadiaURI.length()));

			monumentResource.addProperty(RDF.type, model.createResource("http://www.polytech.semantique/tourisme#Monument"));

			Property propDescition = model
					.createProperty("http://www.polytech.semantique/tourisme#description");
			monumentResource.addProperty(propDescition,
					"" + description.getString());
			
			Property propImage = model
					.createProperty("http://www.polytech.semantique/tourisme#imageUrl");
			
			Resource imre=model.createResource("http://www.polytech.semantique/tourisme#IMAGE_Monument_"+
					dbpadiaURI.substring(
							dbpadiaURI.lastIndexOf("/") + 1,
							dbpadiaURI.length()));
			imre.addProperty(RDFS.label, imageLink.getURI());
			
			monumentResource.addProperty(propImage, imre);
			
			Property propwebsite = model
					.createProperty("http://www.polytech.semantique/tourisme#siteWeb");
			if(s.get("?website")instanceof Resource) {
				
				Resource website = s.getResource("?website");
				Resource webr=model.createResource("http://www.polytech.semantique/tourisme#URL_Monument_"+
						dbpadiaURI.substring(dbpadiaURI.lastIndexOf("/") + 1,dbpadiaURI.length())
						);
				webr.addProperty(RDFS.label, website.getURI());
				
				
				
				monumentResource.addProperty(propwebsite, webr);
				
			}
			else{
				Literal website = s.getLiteral("?website");
				
				Resource webr=model.createResource("http://www.polytech.semantique/tourisme#URL_Monument_"+
						dbpadiaURI.substring(
								dbpadiaURI.lastIndexOf("/") + 1,
								dbpadiaURI.length()));
				webr.addProperty(RDFS.label, website.getString());
				monumentResource.addProperty(propwebsite, webr);
				
				
				
			}
			
			
			Property proplocalisation = model
					.createProperty("http://www.polytech.semantique/tourisme#localisation");
			monumentResource.addProperty(proplocalisation,
					"" + localisation.getString());

			Property propIslocated = model
					.createProperty("http://www.polytech.semantique/tourisme#dans");
			Resource placeR=model.createResource("http://dbpedia.org/resource/"+place.trim());
			placeR.addProperty(RDF.type, model.createResource("http://www.polytech.semantique/tourisme#Ville"));

			monumentResource.addProperty(propIslocated,placeR );
			
			Property contientprop = model
					.createProperty("http://www.polytech.semantique/tourisme#contientMonument");
			
			placeR.addProperty(contientprop, monumentResource);
			}
		}
		return model;
	}
}