package fr.polytech.websemantic.loaders;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Property;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.vocabulary.RDF;
import com.hp.hpl.jena.vocabulary.RDFS;

public class HotelsLoader {

	public static Model loadhotel(String filename, String place) {
		Model model = ModelFactory.createDefaultModel();

		ClassLoader classLoader = HotelsLoader.class.getClassLoader();
		File file = new File(classLoader.getResource("hotels/" + filename)
				.getFile());
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
				String note = parts[3];

				Resource hotel = model
						.createResource("http://www.polytech.semantique/tourisme#"
								+ name.replaceAll(" ", "_").toString());

				hotel.addProperty(
						RDF.type,
						model.createResource("http://www.polytech.semantique/tourisme#Hotel"));

				hotel.addProperty(RDFS.label, name);

				Property propadresse = model
						.createProperty("http://www.polytech.semantique/tourisme#adresse");

				Property propwebsite = model
						.createProperty("http://www.polytech.semantique/tourisme#siteWeb");
				Resource urlre = model
						.createResource("http://www.polytech.semantique/tourisme#URL_Hotel_"
								+ name.replaceAll(" ", "_"));
				urlre.addProperty(RDFS.label, url);
				hotel.addProperty(propwebsite, urlre);

				hotel.addProperty(propadresse, adresse);

				if (parts.length == 5) {
					String image = parts[4];

					Property proptelphone = model
							.createProperty("http://www.polytech.semantique/tourisme#imageUrl");

					Resource imre = model
							.createResource("http://www.polytech.semantique/tourisme#IMAGE_Hotel_"
									+ name.replaceAll(" ", "_"));
					imre.addProperty(RDFS.label, image);

					hotel.addProperty(proptelphone, imre);

				}
				Property propnote = model
						.createProperty("http://www.polytech.semantique/tourisme#note");
				hotel.addProperty(propnote, note);

				Property propIslocated = model
						.createProperty("http://www.polytech.semantique/tourisme#dans");
				Resource placeR = model
						.createResource("http://dbpedia.org/resource/"
								+ place.trim());
				placeR.addProperty(RDFS.label, place);

				placeR.addProperty(
						RDF.type,
						model.createResource("http://www.polytech.semantique/tourisme#Ville"));

				hotel.addProperty(propIslocated, placeR);
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return model;
	}
}
