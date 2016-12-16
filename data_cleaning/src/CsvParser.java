import java.io.FileReader;

import java.io.IOException;
import java.io.Reader;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class CsvParser {
	Map<String, Map<String, Integer>> data;

	CsvParser(String file) throws IOException {
		Reader in = new FileReader(file);
		Iterable<CSVRecord> records = CSVFormat.EXCEL.withHeader().parse(in);
		data = new HashMap<String, Map<String, Integer>>();
		ArrayList<String> years = new ArrayList<String>();
		years.add("1995");
		years.add("1996");
		years.add("2000");
		years.add("2004");
		years.add("2008");
		years.add("2015");

		for (CSVRecord record : records) {
			String country = record.get("Country");
			data.put(country, new HashMap<String, Integer>());
			for (String y : years) {
				String year = record.get(y);
				if(!year.equals("")) {
					data.get(country).put(y, Integer.valueOf(year));
				} else {
					data.get(country).put(y, 0);
				}
			}
		}			

	}
	
	Map<String, Map<String, Integer>> getData() {
		return data;
	}
	
}
