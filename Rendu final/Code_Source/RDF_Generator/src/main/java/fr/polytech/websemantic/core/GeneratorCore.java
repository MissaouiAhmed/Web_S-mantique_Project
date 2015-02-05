package fr.polytech.websemantic.core;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.sparql.vocabulary.FOAF;
import com.hp.hpl.jena.vocabulary.DC;
import com.hp.hpl.jena.vocabulary.RDFS;

import fr.polytech.websemantic.loaders.AgenceLoader;
import fr.polytech.websemantic.loaders.HotelsLoader;
import fr.polytech.websemantic.loaders.MonumentLoader;
import fr.polytech.websemantic.loaders.RestaurantLoader;
import fr.polytech.websemantic.loaders.VilleLoader;
import fr.polytech.websemantic.loaders.VolLoader;

public class GeneratorCore {

	public static void run(String outputPath) throws FileNotFoundException, UnsupportedEncodingException {

		Model model = ModelFactory.createDefaultModel();
		model.setNsPrefix("tourisme",
				"http://www.polytech.semantique/tourisme#");
		model.setNsPrefix("dc",DC.getURI());
		model.setNsPrefix("rdfs", RDFS.getURI());
		model.setNsPrefix("dbpedia", "http://dbpedia.org/ontology/");
		model.setNsPrefix("dbpedia-resource", "http://dbpedia.org/resource/");
		model.setNsPrefix("foaf", FOAF.NS);
		String[] places = { 
				"Barcelona", "Brussels", "Madrid", "Munich",
				 "Paris", "Rome",
				 "Nice"};
		
		
		for (String place : places) {
			Model tmp = VilleLoader.villeLoading(place);
			String uri = "http://dbpedia.org/resource/"+place+"";
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
		
		PrintWriter writer = new PrintWriter(outputPath+"/tourisme.nt", "UTF-8");
		model.write(writer, "N3");
		
	}


}
