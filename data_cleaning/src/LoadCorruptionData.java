import java.util.Map;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.PutItemOutcome;
import com.amazonaws.services.dynamodbv2.document.Table;

public class LoadCorruptionData {
	public static void main(String[] args) throws Exception {
		
		AmazonDynamoDBClient client = new AmazonDynamoDBClient();
		
		DynamoDB dynamoDB = new DynamoDB(client);
		
		Table table = dynamoDB.getTable("Corruption");
		
		CsvParser c = new CsvParser("corruption.csv");
		final Map<String, Map<String, Integer>> infoMap = c.getData();
		try {
			for(String s : infoMap.keySet()) {
				PutItemOutcome outcome = table.putItem(new Item()
						.withPrimaryKey("country", s)
						.withMap("ranking", infoMap.get(s)));
				System.out.println("PutItem succeeded:\n" + outcome.getPutItemResult());
			}
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
    }
}
