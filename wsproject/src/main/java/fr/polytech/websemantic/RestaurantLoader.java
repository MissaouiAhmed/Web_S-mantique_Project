package fr.polytech.websemantic;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;

import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Property;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.sparql.vocabulary.FOAF;
import com.hp.hpl.jena.vocabulary.RDF;
import com.hp.hpl.jena.vocabulary.RDFS;

public class RestaurantLoader {


	public static Model loadRestaurant(String filename,String place) {
		Model model = ModelFactory.createDefaultModel();

		ClassLoader classLoader = RestaurantLoader.class.getClassLoader();
		File file = new File(classLoader.getResource(filename).getFile());
		String line = "";
		String cvsSplitBy = ";";
		int i = 0;
		try (BufferedReader br = new BufferedReader(new FileReader(file))) {
			while ((line = br.readLine()) != null) {
				if (i == 0) {
					i++;
					continue;
				}
				String[] parts = line.split(cvsSplitBy, -1);

				String name = parts[0];
				String url = parts[1];
				String adresse = parts[2];
				String tel = parts[3];
				String note = parts[4];
				Resource restaurant = model
						.createResource("http://www.polytech.semantique/tourisme#"
								+ name.replaceAll(" ","_"));

				restaurant.addProperty(RDFS.label, name);

				restaurant.addProperty(RDF.type, model.
						createResource("http://www.polytech.semantique/tourisme#Restaurant"));

				Property propwebsite = model
						.createProperty("http://www.polytech.semantique/tourisme#siteWeb");
				
				Resource webr=model.createResource("http://www.polytech.semantique/tourisme#URL_Restaurant_"+
						name.replaceAll(" ","_"));
				webr.addProperty(RDFS.label, url);
		
				
				restaurant.addProperty(propwebsite, webr);

				Property propadresse = model
						.createProperty("http://www.polytech.semantique/tourisme#adresse");
				restaurant.addProperty(propadresse, adresse);

				Property proptelphone = model
						.createProperty("http://www.polytech.semantique/tourisme#telephone");
				restaurant.addProperty(proptelphone, tel);

				Property propnote = model
						.createProperty("http://www.polytech.semantique/tourisme#note");
				restaurant.addProperty(propnote, note);

				
				Property propIslocated = model
						.createProperty("http://www.polytech.semantique/tourisme#dans");
				Resource placeR=model.createResource("http://dbpedia.org/resource/" + place.trim());
				placeR.addProperty(RDF.type, model.createResource("http://www.polytech.semantique/tourisme#Ville"));

				restaurant.addProperty(propIslocated,placeR );
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return model;
	}
}
