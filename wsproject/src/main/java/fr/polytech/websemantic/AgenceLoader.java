package fr.polytech.websemantic;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Arrays;

import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Property;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.vocabulary.DC;
import com.hp.hpl.jena.vocabulary.RDF;
import com.hp.hpl.jena.vocabulary.RDFS;

public class AgenceLoader {


	public static Model loadAgence(String filename) {
		Model model = ModelFactory.createDefaultModel();

		ClassLoader classLoader = AgenceLoader.class.getClassLoader();
		File file = new File(classLoader.getResource(filename).getFile());
		String line = "";
		String cvsSplitBy = ",";
		int i = 0;
		try (BufferedReader br = new BufferedReader(new FileReader(file))) {
			while ((line = br.readLine()) != null) {
				if (i == 0) {
					i++;
					continue;
				}
				i++;
				String[] parts = line.split(cvsSplitBy, -1);
				String name = parts[0];
				String type = parts[1];
				String ville = parts[2];
			
				Resource agence = model
						.createResource("http://www.polytech.semantique/tourisme#Vol"+name.replaceAll(" ",
								""));

				
				switch (type) {
				case "voiture":
					agence.addProperty(RDF.type, 
							model.createResource("http://www.polytech.semantique/tourisme#AgenceLocationVoiture"));
					break;
				}
				
				Property propIslocated = model
						.createProperty("http://www.polytech.semantique/tourisme#dans");
				Resource placeR=model.createResource("http://dbpedia.org/resource/" +ville.trim());
				placeR.addProperty(RDF.type, model.createResource("http://www.polytech.semantique/tourisme#Ville"));

				agence.addProperty(propIslocated,placeR );


				
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return model;
	}
}
