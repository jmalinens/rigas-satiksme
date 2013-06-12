package com.jmalinens.rigassatiksme.Helpers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;

import org.json.JSONException;
import org.json.JSONObject;

import com.nutiteq.log.Log;

public class Io {
	public static JSONObject getJson(InputStream instream) throws JSONException {
		Writer writer = new StringWriter();
		char[] buffer = new char[1024];
		try {
		    Reader reader = new BufferedReader(new InputStreamReader(instream, "UTF-8"));
		    int n;
		    while ((n = reader.read(buffer)) != -1) {
		        writer.write(buffer, 0, n);
		    }
		} catch (UnsupportedEncodingException e) {
			Log.warning("Encoding exceptions!!!!!!");
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			Log.warning("IO exceptions!!!!!!");
			e.printStackTrace();
		} finally {
		    try {
		    	instream.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		Log.warning("parse json start");
		JSONObject jsonObject = new JSONObject(writer.toString());
	    Log.warning("parse json end");
		
		return jsonObject;
	}
}
