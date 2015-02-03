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

public class VolLoader {


	public static Model loadVol(String filename) {
		Model model = ModelFactory.createDefaultModel();

		ClassLoader classLoader = VolLoader.class.getClassLoader();
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
				String num = parts[0];
				String type = parts[1];
				String depart = parts[2];
				String destination = parts[3];
				
				Resource vol = model
						.createResource("http://www.polytech.semantique/tourisme#Vol"+num);

				vol.addProperty(DC.identifier, num);
				vol.addProperty(RDFS.label, "Vol "+num);
				switch (type) {
				case "loisir":
					vol.addProperty(RDF.type, 
							model.createResource("http://www.polytech.semantique/tourisme#VolLoisir"));
					break;
				case "affaire":
					vol.addProperty(RDF.type, 
							model.createResource("http://www.polytech.semantique/tourisme#VolAffaire"));
					break;
				}
				

				Property departprop = model
						.createProperty("http://www.polytech.semantique/tourisme#depart");
				
				Resource r=model.createResource("http://dbpedia.org/resource/"+
						depart.trim());
				r.addProperty(RDFS.label, depart.trim());
				vol.addProperty(departprop, r);

				Property destinationprop = model
						.createProperty("http://www.polytech.semantique/tourisme#destination");
				
				Resource destinationr=model.createResource("http://dbpedia.org/resource/"+
						destination.trim());
				r.addProperty(RDFS.label, depart.trim());
				vol.addProperty(destinationprop, destinationr);

			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return model;
	}
}
