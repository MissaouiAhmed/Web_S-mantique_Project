package fr.polytech.websemantic.core;

import java.io.IOException;
import java.nio.file.Paths;

import fr.polytech.websemantic.exception.NoConformException;

public class Command {

	public static void main(String[] args) throws Exception, IOException {

		String operation = args[0];
		switch (operation) {
		case "construct-Model":
			String outputFilePath = Paths.get(args[1]).toAbsolutePath()
					.toString();
			if (outputFilePath.endsWith("/"))
				throw new NoConformException("outpath ne doit pas finir avec /");

			GeneratorCore.run(outputFilePath);

			break;

		default:
			System.out.println("mvn exec:java -Dexec.args=\"construct-Model"
					+ " outputPath \"");
			System.out.println();
			System.out.println("le fichier de sortie sera appelé model.nt");

			break;
		}

	}

	
}
