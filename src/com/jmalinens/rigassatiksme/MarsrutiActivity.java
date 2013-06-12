package com.jmalinens.rigassatiksme;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.Collator;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Pattern;

import org.json.JSONException;
import org.json.JSONObject;

import android.os.Bundle;
import android.app.Activity;
import android.app.AlertDialog;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemLongClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ExpandableListView;
import android.widget.ExpandableListView.OnChildClickListener;
import android.widget.ListView;
import android.widget.Toast;
import android.support.v4.app.NavUtils;
import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.AssetManager;
import android.os.Build;

import com.jmalinens.rigassatiksme.Adapter.MarsrutiExpandableListAdapter;
import com.jmalinens.rigassatiksme.Classes.Marsruts;
import com.jmalinens.rigassatiksme.Helpers.Io;
import com.nutiteq.log.Log;


public class MarsrutiActivity extends Activity {
	
	public static final String PREFS_NAME = "RSPrefsFile";

	
	List<String> marsruti_simple = new ArrayList<String>();
	List<String> autobusi = new ArrayList<String>();
	List<String> tramvaji = new ArrayList<String>();
	List<String> trolejbusi = new ArrayList<String>();
	List<String> minibusi = new ArrayList<String>();
	List<String> naktsbusi = new ArrayList<String>();
	//public static List<Marsruts> marsruti = new ArrayList<Marsruts>();
	public static List<List<String>> marsruti = new ArrayList<List<String>>();
	String[] titles = {"Autobusi","Tramvaji","Trolejbusi","Minibusi", "Naktsbusi"};
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_marsruti);
		// Show the Up button in the action bar.
		//setupActionBar();
		Log.enableAll();
		Log.setTag("Marsruti");
		/*
	    SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
	    
	    boolean isFirstRun = settings.getBoolean("is_first_run", true);
	    
	    if (isFirstRun == true) {
	    	//kopçt json failus uz internal storage
	    	
	    	
	    	
	        SharedPreferences.Editor editor = settings.edit();
	        editor.putBoolean("is_first_run", false);
	        editor.commit();

	    }
	    Integer db_version = settings.getInt("version", 1);
*/
		
        
        InputStream instream = null;
		try {
			AssetManager am = getAssets();
			//instream = am.open("routes.txt");
			//this.marsruti = this.getRoutes(instream, "b_a");
			instream = am.open("route_names.json");
			this.getRoutes2(instream);
		} catch (IOException e) {
			e.printStackTrace();
		}

		
        ExpandableListView list =  (ExpandableListView) new ExpandableListView(this);
        list.setGroupIndicator(null);
        list.setChildIndicator(null);
        
        String[] autobusiArr = this.autobusi.toArray(new String[this.autobusi.size()]);
        String[] tramvajiArr = this.tramvaji.toArray(new String[this.tramvaji.size()]);
        String[] trolejbusiArr = this.trolejbusi.toArray(new String[this.trolejbusi.size()]);
        String[] minibusiArr = this.minibusi.toArray(new String[this.minibusi.size()]);
        String[] naktsbusiArr = this.naktsbusi.toArray(new String[this.naktsbusi.size()]);
        String[][] contents = {
        		autobusiArr,
        		tramvajiArr,
        		trolejbusiArr,
        		minibusiArr,
        		naktsbusiArr,
        };

        MarsrutiExpandableListAdapter adapter = new MarsrutiExpandableListAdapter(this, this.titles, contents/*, this.marsruti*/);

        list.setAdapter(adapter);
/*
        list.getChildAt(0).setBackgroundResource(R.drawable.bus);
        list.getChildAt(1).setBackgroundResource(R.drawable.tram);
        list.getChildAt(2).setBackgroundResource(R.drawable.trol);
        list.getChildAt(3).setBackgroundResource(R.drawable.minibus);
        list.getChildAt(4).setBackgroundResource(R.drawable.nightbus);
*/
        list.setOnChildClickListener(new OnChildClickListener() {

            public boolean onChildClick(ExpandableListView parent, View v,
                    int groupPosition, int childPosition, long id) {
            	
            	String title = parent.getExpandableListAdapter().getChild(groupPosition, childPosition).toString();
            	Log.warning("title: "+title);
                Intent returnIntent = new Intent(v.getContext(), MarsrutsActivity.class);
                returnIntent.putExtra("groupPosition", groupPosition);
                returnIntent.putExtra("childPosition", childPosition);
                
                Integer group_id = 0;
                outerloop:
          		for (List<String> marsruti_ar_konkr_tipu : MarsrutiActivity.marsruti) {
          			
          			Integer item_id = 0;
              		for (String marsruts : marsruti_ar_konkr_tipu) {
              			if (group_id == groupPosition && item_id == childPosition) {
              				//title vai marsruts der
              				String marsruta_nr = title.substring(0, title.indexOf('.'));
              				String marsruta_nosaukums = title.substring(title.indexOf('.')+1);
              				//Log.warning("Atrasts: " + marsruts);
                            returnIntent.putExtra("marsruta_nr", marsruta_nr);
                            if (group_id == 0) {
                            	returnIntent.putExtra("transporta_tips", "bus");
                            }
                            if (group_id == 1) {
                            	returnIntent.putExtra("transporta_tips", "tram");
                            }
                            if (group_id == 2) {
                            	returnIntent.putExtra("transporta_tips", "trol");
                            }
                            if (group_id == 3) {
                            	returnIntent.putExtra("transporta_tips", "minibus");
                            }
                            if (group_id == 4) {
                            	returnIntent.putExtra("transporta_tips", "nightbus");
                            }
                            returnIntent.putExtra("virziens", "a_b");
                            returnIntent.putExtra("marsruta_nosaukums", marsruta_nosaukums);
              				break outerloop;
              			} else {
              				//Log.warning("Nav atrasts");
              			}
              			item_id++;
              		}
          			group_id++;
          		}
                startActivityForResult(returnIntent, 0);
                
                return false;
            }
        });
        
        setContentView(list);
	}

	private void getRoutes2(InputStream instream) {
        try {
            if (instream != null) {
              InputStreamReader inputreader = new InputStreamReader(instream);
              BufferedReader buffreader = new BufferedReader(inputreader);   

      		JSONObject route_names = null;
    		try {
    			route_names = Io.getJson(instream);
    			Log.warning("route_names count: "+route_names.length());

    		    Iterator<String> iter = route_names.keys();
    		    while (iter.hasNext()) {
    		        String key = (String)iter.next();
    		        JSONObject value = (JSONObject) route_names.get(key);
    		        
    		        
        		    Iterator<String> iter2 = value.keys();
        		    while (iter2.hasNext()) {
        		    	
        		        String key2 = (String)iter2.next();
        		        String value2 = value.get(key2).toString();
        		        
        		        if (key2.length() == 1) {
        		        	key2 = "0"+key2;
        		        }
        		        
              			if (key.contentEquals("trol")) {
              				this.trolejbusi.add(key2 + ". " + value2);
              			} else if (key.contentEquals("bus")) {
              				this.autobusi.add(key2 + ". " + value2);
              			} else if (key.contentEquals("tram")) {
              				this.tramvaji.add(key2 + ". " + value2);
              			} else if (key.contentEquals("minibus")) {
              				this.minibusi.add(key2 + ". " + value2);
              			} else if (key.contentEquals("nightbus")) {
              				this.naktsbusi.add(key2 + ". " + value2);
              			}
        		        
        		    }
    		        
    		    }
    		    
    		    Collections.sort(this.autobusi, Collator.getInstance());
    		    Collections.sort(this.tramvaji, Collator.getInstance());
    		    Collections.sort(this.trolejbusi, Collator.getInstance());
    		    Collections.sort(this.minibusi, Collator.getInstance());
    		    Collections.sort(this.naktsbusi, Collator.getInstance());
    		    
    		    MarsrutiActivity.marsruti.add(this.autobusi);
    		    MarsrutiActivity.marsruti.add(this.tramvaji);
    		    MarsrutiActivity.marsruti.add(this.trolejbusi);
    		    MarsrutiActivity.marsruti.add(this.minibusi);
    		    MarsrutiActivity.marsruti.add(this.naktsbusi);
    		    
    		    //Collections.sort(MarsrutiActivity.marsruti, Collator.getInstance());
    		    
    			
    		} catch (JSONException e) {
    			e.printStackTrace();
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
