package com.jmalinens.rigassatiksme;

import java.io.InputStream;
import java.text.Collator;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.support.v4.app.NavUtils;
import android.annotation.TargetApi;
import android.content.Intent;
import android.os.Build;
import com.jmalinens.rigassatiksme.Helpers.Io;
import com.nutiteq.log.Log;


public class PieturaActivity extends Activity {
	
	List<String> izbrauksanas_laiki = new ArrayList<String>();
	Integer itemPosition;
	public static String marsruta_nr;
	public static String transporta_tips;
	public static String virziens;
	public static String pieturas_nosaukums;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_pietura);
		// Show the Up button in the action bar.
		setupActionBar();
		Log.enableAll();
		Log.setTag("Pietura Test");
		
		Calendar c = Calendar.getInstance(); 
		int seconds = c.get(Calendar.SECOND);
		
		Log.warning("Diena: "+c.get(Calendar.DAY_OF_WEEK));
		
		String dienas_tips = "12345";
		if (c.get(Calendar.DAY_OF_WEEK) == 1 || c.get(Calendar.DAY_OF_WEEK) == 7) {
			dienas_tips = "67";
		}
		
		int curr_minute = c.get(Calendar.MINUTE);
		int curr_hour = c.get(Calendar.HOUR_OF_DAY);
		boolean closest_time_found = false;
		String closest_time = "ðodien vairs nebrauc";
		
		JSONObject marsruts = null;
		Bundle extras = getIntent().getExtras();
		if (extras != null) {
	        this.itemPosition = extras.getInt("itemPosition", 0);
	        PieturaActivity.marsruta_nr = extras.getString("marsruta_nr");
	        PieturaActivity.transporta_tips = extras.getString("transporta_tips");
	        PieturaActivity.virziens = extras.getString("virziens");
	        PieturaActivity.pieturas_nosaukums = extras.getString("pieturas_nosaukums");
	        
			setTitle(PieturaActivity.pieturas_nosaukums);
	        
			try {
				Log.warning(PieturaActivity.transporta_tips+"_"+PieturaActivity.marsruta_nr+"_"+PieturaActivity.virziens);
				int rawResId = getResources().getIdentifier(
						PieturaActivity.transporta_tips+"_"+PieturaActivity.marsruta_nr+"_"+PieturaActivity.virziens,
						"raw",
						getPackageName()
				);
				InputStream instream = getResources().openRawResource(rawResId);
				marsruts = Io.getJson(instream);
				JSONArray pieturas = (JSONArray) marsruts.get("pieturas");
				JSONObject pietura = pieturas.getJSONObject(this.itemPosition);
				JSONArray laiki = pietura.getJSONArray("laiki");
				
		        for(int i = 0 ; i < laiki.length(); i++){
		        	JSONObject konkr_tipa_laika_obj = laiki.getJSONObject(i);
		        	String laika_nosaukums = (String) konkr_tipa_laika_obj.get("nosaukums");
					if (
							((c.get(Calendar.DAY_OF_WEEK) == 1 || c.get(Calendar.DAY_OF_WEEK) == 7) && laika_nosaukums.contentEquals("67"))
							||
							(laika_nosaukums.length() == 1 && Integer.valueOf(laika_nosaukums)+1%7 == c.get(Calendar.DAY_OF_WEEK))
							||
							(laika_nosaukums.contentEquals("12345") && c.get(Calendar.DAY_OF_WEEK) > 1 && c.get(Calendar.DAY_OF_WEEK) < 7)
					) {
						JSONObject konkr_laiki = konkr_tipa_laika_obj.getJSONObject("laiki");
						
						List<String> stundas = new ArrayList<String>();
						
            		    Iterator<String> iter = konkr_laiki.keys();
            		    while (iter.hasNext()) {
            		        String stunda = (String)iter.next();
            		        stundas.add(stunda);
            		        Log.warning("stunda: "+stunda);
            		        JSONArray minutes = konkr_laiki.getJSONArray(stunda);
            		        Log.warning("minutes: "+minutes);
            		        this.izbrauksanas_laiki.add(stunda+": "+this.implode(", ", minutes));
            		    }
            		    
            		    
            		    
            		    Collections.sort(this.izbrauksanas_laiki, Collator.getInstance());
            		    Collections.sort(stundas, Collator.getInstance());
            		    
            		    for (int k = 0; k < stundas.size(); k++) {
            		    	String stunda = stundas.get(k);
            		    	
            		    	JSONArray minutes = konkr_laiki.getJSONArray(stunda);
            		        minuteloop:
            		        for(int j = 0 ; j < minutes.length(); j++){
            		        	
        	    		        if (closest_time_found == false && 
        	    		        		((curr_hour == Integer.valueOf(stunda) && curr_minute <= minutes.getInt(j) % 60) || (curr_hour < Integer.valueOf(stunda)))
        	    		        ) {
        	    		        	closest_time_found = true;
        	    		        	
            		        		Calendar curr_date = Calendar.getInstance(); 
            		        		curr_date.set(2013, 1, 1, curr_hour, curr_minute);
            		        		Calendar schedule_date = Calendar.getInstance(); 
            		        		schedule_date.set(2013, 1, 1, Integer.valueOf(stunda), minutes.getInt(j) % 60);
            		        		Integer diffInSeconds = (int) Math.floor((schedule_date.getTimeInMillis()-curr_date.getTimeInMillis())/1000);
        	    		        	
            		        		Log.warning("starpîba sekundçs: "+diffInSeconds.toString());
            		        		
        	    		        	if (curr_hour == Integer.valueOf(stunda) && curr_minute == minutes.getInt(j) % 60) {
        	    		        		closest_time = "tûlît";
        	    		        	} else if (diffInSeconds == 60) {
        	    		        		closest_time = "pçc minûtes";
        	    		        	} else {
        	    		        		closest_time = stunda+":"+minutes.getInt(j)+" (pçc "+diffInSeconds/60+" minûtçm)";
        	    		        	}
        	    		        	break minuteloop;
        	    		        }
            		        	
            		        }
            		    }

						break;
					}
		        }

			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
		
        Button marsrutiButton = (Button) findViewById(R.id.button1);
        marsrutiButton.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
                
                Intent returnIntent = new Intent(view.getContext(), KarteActivity.class);
                returnIntent.putExtra("itemPosition", itemPosition);
                returnIntent.putExtra("marsruta_nr", PieturaActivity.marsruta_nr);
                returnIntent.putExtra("transporta_tips", PieturaActivity.transporta_tips);
                returnIntent.putExtra("virziens", PieturaActivity.virziens);
                returnIntent.putExtra("pieturas_nosaukums", MarsrutsActivity.pieturu_nosaukumi.get(itemPosition));
                startActivityForResult(returnIntent, 0);
            }
        });
		
        
		TextView t = (TextView)findViewById(R.id.textView1);
		t.setText("Tuvâkais laiks: "+closest_time);
		
		//Log.warning(izbrauksanas_laiki.toString());
		//java.util.Collections.sort(izbrauksanas_laiki, Collator.getInstance());
		//Log.warning(izbrauksanas_laiki.toString());
		ArrayAdapter<String> adapter1 = new ArrayAdapter<String>(this, 
		        android.R.layout.simple_list_item_1, this.izbrauksanas_laiki);

		ListView listView = (ListView)findViewById(R.id.listView1);
		listView.setAdapter(adapter1);
	}
	
	
	public String implode(String glue, JSONArray strArray)
	{
	    String ret = "";
	    for(int i=0;i<strArray.length();i++)
	    {
	        try {
				ret += (i == strArray.length() - 1) ? strArray.getString(i) : strArray.getString(i) + glue;
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    }
	    return ret;
	}
	
	/**
	 * Set up the {@link android.app.ActionBar}, if the API is available.
	 */
	@TargetApi(Build.VERSION_CODES.HONEYCOMB)
	private void setupActionBar() {
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
			getActionBar().setDisplayHomeAsUpEnabled(true);
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.marsruti, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case android.R.id.home:
			// This ID represents the Home or Up button. In the case of this
			// activity, the Up button is shown. Use NavUtils to allow users
			// to navigate up one level in the application structure. For
			// more details, see the Navigation pattern on Android Design:
			//
			// http://developer.android.com/design/patterns/navigation.html#up-vs-back
			//
			NavUtils.navigateUpFromSameTask(this);
			return true;
		}
		return super.onOptionsItemSelected(item);
	}

}
