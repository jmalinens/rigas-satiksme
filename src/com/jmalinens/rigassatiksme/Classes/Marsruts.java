package com.jmalinens.rigassatiksme.Classes;

import java.util.ArrayList;
import java.util.List;

import com.nutiteq.log.Log;

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

	public Integer group_id; //2- trolejbuss utt.
	public Integer item_id; //marsruta id
	public String tips; //bus,trol,tram,minibus
	
	public Marsruts(String line, Boolean isJson) {
		
		int i = 0;
		if (isJson == true) {
			i = 2;
		}
		
		String[] tokens = line.split(";");
		if (!tokens[0].contains(",") && tokens.length == 14) { // && tokens[0] != null && !tokens[0].equals("")
			
			//Log.warning("marsruts rawdataa count: "+tokens.length+" i: "+i);
			
			this.RouteNum = tokens[i+0];
			this.Authority = tokens[i+1];
			this.City = tokens[i+2];
			this.Transport = tokens[i+3];
			this.Operator = tokens[i+4];
			this.ValidityPeriods = tokens[i+5];
			this.SpecialDates = tokens[i+6];
			this.RouteTag = tokens[i+7];
			this.RouteType = tokens[i+8].replaceAll("-", "_");
			this.Commercial = tokens[i+9];
			this.RouteName = tokens[i+10];
			this.Weekdays = tokens[i+11];
			
		   String StreetsStr = tokens[i+12];
		   if (StreetsStr.contains(",")) {
			   String[] StreetsStrArr = StreetsStr.split(",");
			   for (String s : StreetsStrArr) {
				   if (!s.contentEquals("") && s != null) {
					   this.Streets.add(s);
				   }
			   }
		   }
			
		   String RouteStopsStr = tokens[i+13];
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
