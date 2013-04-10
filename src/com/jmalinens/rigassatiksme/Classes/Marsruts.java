package com.jmalinens.rigassatiksme.Classes;

import java.util.ArrayList;
import java.util.List;

public class Marsruts {

	public String RouteNum; //1, N2
	public String Authority; //Rîga
	public String City; //riga
	public String Transport; //bus
	public String Operator; //7 AP
	public String ValidityPeriods; //15492,,,,,1, laikam 7 dienas
	public String SpecialDates; //0
	public String RouteTag; //tukðums
	public String RouteType; //a-b
	public String Commercial; //A
	public String RouteName; //Abrenes iela - Pansionâts
	public String Weekdays; //1234567
	public List<String> Streets = new ArrayList<String>(); //,Dzirnavu iela,Satekles iela,Marijas iela,,Brîvîbas bulvâris
	public List<String> RouteStops = new ArrayList<String>(); //7749,1033a,0059,7987,0268,0466,0081,0219,0400,0418,0455,0038,0208,0112,0222,0007,0436,0045,0301,0180,0057,0227,0389,0021,0332,0464,0175,0241,0129,0342

	public Marsruts(String line) {
		String[] tokens = line.split(";");
		if (!tokens[0].contains(",") && tokens[0] != null && !tokens[0].equals("")) {
			this.RouteNum = tokens[0];
			this.Authority = tokens[1];
			this.City = tokens[2];
			this.Transport = tokens[3];
			this.Operator = tokens[4];
			this.ValidityPeriods = tokens[5];
			this.SpecialDates = tokens[6];
			this.RouteTag = tokens[7];
			this.RouteType = tokens[8];
			this.Commercial = tokens[9];
			this.RouteName = tokens[10];
			this.Weekdays = tokens[11];
			
		   String StreetsStr = tokens[12];
		   if (StreetsStr.contains(",")) {
			   String[] StreetsStrArr = StreetsStr.split(",");
			   for (String s : StreetsStrArr) {
				   if (!s.contentEquals("") && s != null) {
					   this.Streets.add(s);
				   }
			   }
		   }
			
		   String RouteStopsStr = tokens[13];
		   if (RouteStopsStr.contains(",")) {
			   String[] RouteStopsStrArr = RouteStopsStr.split(",");
			   for (String s : RouteStopsStrArr) {
				   if (!s.contentEquals("") && s != null) {
					   this.RouteStops.add(s);
				   }
			   }
		   }
		}
	}
}
