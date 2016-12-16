import java.sql.*;

public class LoadCountryCodeData {
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
	static final String DB_URL = "jdbc:mysql://cis550project.cgregrpimppx.us-west-2.rds.amazonaws.com:3306/cis550project";
	static final String USER = "welovedope";
	static final String PASS = "dope420420";
	
	public static void main(String[] args) throws Exception {
		Connection conn = null;
		Statement stmt = null;
		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection(DB_URL, USER, PASS);
		stmt = conn.createStatement();

		String sql = "CREATE TABLE country_codes " +
				"(code VARCHAR(20), " +
				" country VARCHAR(255), " + 
				" current VARCHAR(20), " + 
				" PRIMARY KEY ( code ));"; 

		stmt.executeUpdate(sql);
		
		HtmlParser h = new HtmlParser("Sheet1.html");
		
		for(String s : h.getData().keySet()) {
			for(String x : h.getData().get(s).keySet()) {
				sql = "INSERT INTO country_codes" +
						" VALUES ( '" + s + "', '" + x + "', '" + h.getData().get(s).get(x) + "')";
			}
			stmt.executeUpdate(sql);
		}
	}
	
}
