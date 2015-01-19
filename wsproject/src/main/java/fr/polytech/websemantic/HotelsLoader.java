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
import com.hp.hpl.jena.vocabulary.RDF;
import com.hp.hpl.jena.vocabulary.RDFS;

public class HotelsLoader {


	public static Model loadhotel(String filename,String place) {
		Model model = ModelFactory.createDefaultModel();

		ClassLoader classLoader = HotelsLoader.class.getClassLoader();
		File file = new File(classLoader.getResource("hotels/"+filename).getFile());
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
								+ name.replaceAll(" ","_").toString());

				hotel.addProperty(RDF.type, model.createResource("http://www.polytech.semantique/tourisme#Hotel"));

				Property propwebsite = model
						.createProperty("http://www.polytech.semantique/tourisme#siteWeb");
				hotel.addProperty(propwebsite, "" + url);

				Property propadresse = model
						.createProperty("http://www.polytech.semantique/tourisme#adresse");
				hotel.addProperty(propadresse,adresse );

				if(parts.length==4){
					String image = parts[4];
					
				Property proptelphone = model
						.createProperty("http://www.polytech.semantique/tourisme#image");
				hotel.addProperty(proptelphone,image );

				}
				Property propnote = model
						.createProperty("http://www.polytech.semantique/tourisme#note");
				hotel.addProperty(propnote,note );
								
				Property propIslocated = model
						.createProperty("http://www.polytech.semantique/tourisme#estSituéA");
				Resource placeR=model.createResource("http://www.polytech.semantique/tourisme#" +
						place );
				placeR.addProperty(RDF.type, model.createResource("http://www.polytech.semantique/tourisme#Ville"));

				hotel.addProperty(propIslocated,placeR );
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return model;
	}
}
