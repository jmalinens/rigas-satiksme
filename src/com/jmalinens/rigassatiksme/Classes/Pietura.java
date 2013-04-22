package com.jmalinens.rigassatiksme.Classes;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;

public class Pietura {
	public String ID;
	public Double Lat;
	public Double Lng;
	public List<Integer> Stops = new ArrayList<Integer>();
	public String Name;
	public String Info;
	public String Street;
	public String Area;
	public String City;
   
    public Pietura(String line) {
	   String[] tokens = line.split(";");
	   this.ID = tokens[0];
	   this.Lat = this.convertMapPoint(tokens[1]);
	   this.Lng = this.convertMapPoint(tokens[2]);
	   String StopsStr = tokens[3];
	   if (StopsStr.contains(",")) {
		   String[] StopsStrArr = StopsStr.split(",");
		   for (String s : StopsStrArr) {
			   if (!s.contentEquals("") && s != null && Pietura.isInteger(s)) {
				   this.Stops.add(Integer.parseInt(s));
			   }
		   }
	   } else {
			if (isInteger(StopsStr)) {
				this.Stops.add(Integer.parseInt(StopsStr));
			}
	   }
	   if (tokens.length >= 5) {
		   this.Name = tokens[4];
	   }
    }
   
	private double convertMapPoint(String point) {
		return Double.parseDouble(point)/100000;
	}
	
	public static boolean isInteger(String str) {
	    try {
	        Integer.parseInt(str);
	        return true;
	    } catch (NumberFormatException nfe) {
	        return false;
	    }
	}
}
