import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class HtmlParser{
	HashMap<String, HashMap<String, String>> results;
	
	HtmlParser(String fileName) throws IOException {
		File f = new File(fileName);
		Document doc = Jsoup.parse(f, "UTF-8", "");
		Elements data = doc.getElementsByTag("td");
		results = new HashMap<String, HashMap<String, String>>();
		String code = null;
		String country = null;
		
		int counter = 0;
		
		for (Element e : data) {
			String t = e.text();
			if(t.equals("Code") || t.equals("Country") || t.equals("Current")) continue;
			if (counter == 0) {
				code = t;
				results.put(t, new HashMap<String, String>());
				counter++;
			} else if (counter == 1) {
				country = t;
				counter++;
			} else {
				results.get(code).put(country, t);
				counter = 0;
			}
		}
	}
	
	HashMap<String, HashMap<String, String>> getData() {
		return results;
	}
	
	public static void main(String[] args) throws Exception {
		HtmlParser h = new HtmlParser("Sheet1.html");
	}
}
