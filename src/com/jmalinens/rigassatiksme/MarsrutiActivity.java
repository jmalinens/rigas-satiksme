package com.jmalinens.rigassatiksme;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import android.os.Bundle;
import android.app.Activity;
import android.app.AlertDialog;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ExpandableListView;
import android.widget.ListView;
import android.support.v4.app.NavUtils;
import android.annotation.TargetApi;
import android.content.res.AssetManager;
import android.os.Build;

import com.jmalinens.rigassatiksme.Adapter.MarsrutiExpandableListAdapter;
import com.jmalinens.rigassatiksme.Classes.Marsruts;
import com.nutiteq.log.Log;


public class MarsrutiActivity extends Activity {
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_marsruti);
		// Show the Up button in the action bar.
		setupActionBar();
		Log.enableAll();
		Log.setTag("Marsruti Test");
		List<Marsruts> marsruti = this.getRoutes();
		List<String> marsruti_simple = new ArrayList<String>();
		List<String> autobusi = new ArrayList<String>();
		List<String> tramvaji = new ArrayList<String>();
		List<String> trolejbusi = new ArrayList<String>();
		List<String> minibusi = new ArrayList<String>();
		
		String curr_route_type = "bus";
		for (Marsruts marsruts : marsruti) {
			
			if (Arrays.asList("bus", "tram", "trol", "minibus").contains(marsruts.Transport)) {
				curr_route_type = marsruts.Transport;
				Log.warning("Atrasts: " + marsruts.Transport);
				
			} else {
				Log.warning("Nav atrasts: " + marsruts.Transport);
			}
			Log.warning("Tagadejais tips: " + curr_route_type);
			
			marsruti_simple.add(marsruts.RouteNum + ". " + marsruts.RouteName);

			if (curr_route_type.contentEquals("trol")) {
				trolejbusi.add(marsruts.RouteNum + ". " + marsruts.RouteName);
			} else if (curr_route_type.contentEquals("bus")) {
				autobusi.add(marsruts.RouteNum + ". " + marsruts.RouteName);
			} else if (curr_route_type.contentEquals("tram")) {
				tramvaji.add(marsruts.RouteNum + ". " + marsruts.RouteName);
			} else if (curr_route_type.contentEquals("minibus")) {
				minibusi.add(marsruts.RouteNum + ". " + marsruts.RouteName);
			}
		}
		
		//ArrayAdapter adapter1 = new ArrayAdapter<String>(this, 
		//        android.R.layout.simple_list_item_1, marsruti_simple);

		//ListView listView = (ListView)findViewById(R.id.listView1);
		//listView.setAdapter(adapter1);
		
        ExpandableListView list =  (ExpandableListView) new ExpandableListView(this);
        //ExpandableListView list =  (ExpandableListView) findViewById(R.id.expandableListView1);
        list.setGroupIndicator(null);
        list.setChildIndicator(null);
        String[] titles = {"Autobusi","Tramvaji","Trolejbusi","Minibusi"};
        
        String[] autobusiArr = autobusi.toArray(new String[autobusi.size()]);
        String[] tramvajiArr = tramvaji.toArray(new String[tramvaji.size()]);
        String[] trolejbusiArr = trolejbusi.toArray(new String[trolejbusi.size()]);
        String[] minibusiArr = minibusi.toArray(new String[minibusi.size()]);
        String[][] contents = {
        		autobusiArr,
        		tramvajiArr,
        		trolejbusiArr,
        		minibusiArr
        };
        
        
        MarsrutiExpandableListAdapter adapter = new MarsrutiExpandableListAdapter(this,
            titles, contents);
        
        list.setAdapter(adapter);
        setContentView(list);
	}
	
	private List<Marsruts> getRoutes() {
		List<Marsruts> marsruti = new ArrayList<Marsruts>();
        try {
            AssetManager am = getAssets();
            InputStream instream = am.open("routes.txt");
            if (instream != null) {
              InputStreamReader inputreader = new InputStreamReader(instream);
              BufferedReader buffreader = new BufferedReader(inputreader);   
              Integer line_count = 0;
              String line;
              line = buffreader.readLine(); //skip first line
              while (( line = buffreader.readLine()) != null) {
            	  Marsruts route = new Marsruts(line);
            	  if (route.RouteNum != null) {
            		  line_count++;
            		  marsruti.add(route);
            	  }
            	  
              }
              instream.close();
            }
            
	      } catch (java.io.FileNotFoundException e) {
	    	  AlertDialog alertDialog = new AlertDialog.Builder(this).create();
	    	  alertDialog.setMessage(e.getMessage());
	    	  alertDialog.show();
	      } catch (java.io.IOException e) {
	    	  AlertDialog alertDialog = new AlertDialog.Builder(this).create();
	    	  alertDialog.setMessage(e.getMessage());
	    	  alertDialog.show();
	      }
		return marsruti;
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
