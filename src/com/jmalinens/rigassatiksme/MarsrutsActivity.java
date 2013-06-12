package com.jmalinens.rigassatiksme;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.os.Bundle;
import android.app.ActionBar;
import android.app.Activity;
import android.app.AlertDialog;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ExpandableListView;
import android.widget.ListView;
import android.widget.Toast;
import android.widget.AdapterView.OnItemClickListener;
import android.support.v4.app.NavUtils;
import android.annotation.TargetApi;
import android.content.Intent;
import android.content.res.AssetManager;
import android.os.Build;

import com.jmalinens.rigassatiksme.Adapter.MarsrutiExpandableListAdapter;
import com.jmalinens.rigassatiksme.Classes.Marsruts;
import com.jmalinens.rigassatiksme.Classes.Pietura;
import com.jmalinens.rigassatiksme.Helpers.Io;
import com.nutiteq.log.Log;


public class MarsrutsActivity extends Activity {
	
	List<String> marsruti_simple = new ArrayList<String>();
	List<String> autobusi = new ArrayList<String>();
	List<String> tramvaji = new ArrayList<String>();
	List<String> trolejbusi = new ArrayList<String>();
	List<String> minibusi = new ArrayList<String>();
	List<String> naktsbusi = new ArrayList<String>();
	List<Marsruts> marsruti = new ArrayList<Marsruts>();
	public static List<String> pieturu_nosaukumi = new ArrayList<String>();
	Integer groupPosition;
	Integer childPosition;
	public static String marsruta_nr;
	public static String transporta_tips;
	public static String virziens;
	public static String pieturas_nosaukums;
	public static String marsruta_nosaukums;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_marsruts);
		// Show the Up button in the action bar.
		setupActionBar();
		//ActionBar actionBar = getActionBar();
		//actionBar.setLogo();
		Log.enableAll();
		Log.setTag("Marsruts");
		
		JSONObject stops = null;
		try {
			AssetManager am = getAssets();
			InputStream is = null;
			try {
				is = am.open("stops.json");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			stops = Io.getJson(is);
			Log.warning("stops count: "+stops.length());
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		Bundle extras = getIntent().getExtras();
		if (extras != null) {
	        this.groupPosition = extras.getInt("groupPosition", 0);
	        this.childPosition = extras.getInt("childPosition", 0);
	        MarsrutsActivity.marsruta_nr = extras.getString("marsruta_nr");
	        MarsrutsActivity.transporta_tips = extras.getString("transporta_tips");
	        MarsrutsActivity.virziens = extras.getString("virziens");
	        MarsrutsActivity.marsruta_nosaukums = extras.getString("marsruta_nosaukums");
	        
	        Log.warning("groupPosition: "+this.groupPosition+" childPosition: "+this.childPosition+
	        " marsruta_nr: "+MarsrutsActivity.marsruta_nr+" transporta_tips: "+MarsrutsActivity.transporta_tips+
	        " virziens: "+MarsrutsActivity.virziens+" marsruta_nosaukums: "+MarsrutsActivity.marsruta_nosaukums
	        );
	        
			MarsrutsActivity.pieturu_nosaukumi = this.getRouteInfo2(MarsrutsActivity.transporta_tips, MarsrutsActivity.marsruta_nr, MarsrutsActivity.virziens);
	        
	        Log.warning("virziens ir: "+MarsrutsActivity.virziens);
	        //this.marsruti = this.getRoutes(MarsrutsActivity.virziens);
	        setTitle(MarsrutsActivity.marsruta_nr+". "+this.transporta_tips_latviski(MarsrutsActivity.transporta_tips)+" "+MarsrutsActivity.marsruta_nosaukums);
		}
		Log.warning("pieturu nosaukumi: "+MarsrutsActivity.pieturu_nosaukumi);
		ArrayAdapter<String> adapter1 = new ArrayAdapter<String>(this, 
		        android.R.layout.simple_list_item_1, MarsrutsActivity.pieturu_nosaukumi);

		ListView listView = (ListView)findViewById(R.id.listView1);
		listView.setAdapter(adapter1);
		
		listView.setOnItemClickListener(new OnItemClickListener() {

			@Override
			public void onItemClick(AdapterView<?> arg0, View v, int itemPosition,
					long id) {
                Intent returnIntent = new Intent(v.getContext(), PieturaActivity.class);
                returnIntent.putExtra("itemPosition", itemPosition);
                returnIntent.putExtra("marsruta_nr", MarsrutsActivity.marsruta_nr);
                returnIntent.putExtra("transporta_tips", MarsrutsActivity.transporta_tips);
                returnIntent.putExtra("virziens", MarsrutsActivity.virziens);
                returnIntent.putExtra("pieturas_nosaukums", MarsrutsActivity.pieturu_nosaukumi.get(itemPosition));
                startActivityForResult(returnIntent, 0);
			}
        });
		
        Button pretejsVirziensButton = (Button) findViewById(R.id.button1);
        pretejsVirziensButton.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
            	
                Intent returnIntent = new Intent(view.getContext(), MarsrutsActivity.class);
                returnIntent.putExtra("marsruta_nr", MarsrutsActivity.marsruta_nr);
                returnIntent.putExtra("transporta_tips", MarsrutsActivity.transporta_tips);
                
                //returnIntent.putExtra("marsruta_nosaukums", MarsrutsActivity.marsruta_nosaukums);
                Log.warning("virziens: "+MarsrutsActivity.virziens);
                String sJaunaisVirziens = MarsrutsActivity.virziens.contentEquals("a_b") ? "b_a" : "a_b";
                MarsrutsActivity.virziens = sJaunaisVirziens;
                Log.warning("pretçjs virziens: "+sJaunaisVirziens);
                returnIntent.putExtra("virziens", sJaunaisVirziens);
                
    			int rawResId = getResources().getIdentifier(transporta_tips+"_"+marsruta_nr+"_"+sJaunaisVirziens,"raw",getPackageName());
    			InputStream instream = getResources().openRawResource(rawResId);
    			try {
					JSONObject marsruta_info = Io.getJson(instream);
					
					returnIntent.putExtra("marsruta_nosaukums", marsruta_info.getString("name"));
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
                
                finish();
                startActivityForResult(returnIntent, 0);
            }
        });
        
        Button karteButton = (Button) findViewById(R.id.button2);
        karteButton.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
            	
                Intent returnIntent = new Intent(view.getContext(), KarteActivity.class);
                returnIntent.putExtra("marsruta_nr", MarsrutsActivity.marsruta_nr);
                returnIntent.putExtra("transporta_tips", MarsrutsActivity.transporta_tips);
                returnIntent.putExtra("marsruta_nosaukums", MarsrutsActivity.marsruta_nosaukums);
                returnIntent.putExtra("virziens", MarsrutsActivity.virziens);
                finish();
                startActivityForResult(returnIntent, 0);
            }
        });
		
	}

	private List<String> getRouteInfo2(String transporta_tips, String marsruta_nr, String virziens) {
		JSONObject pieturas_info = null;
		List<String> pieturu_nosaukumi = new ArrayList<String>();
		try {    	
			Log.warning(transporta_tips+"_"+marsruta_nr+"_"+virziens);
			int rawResId = getResources().getIdentifier(transporta_tips+"_"+marsruta_nr+"_"+virziens,"raw",getPackageName());
			InputStream instream = getResources().openRawResource(rawResId);
			pieturas_info = Io.getJson(instream);
			JSONArray pieturas = (JSONArray) pieturas_info.get("pieturas");
			//Log.warning("test: "+pieturas);
	        for(int i = 0 ; i < pieturas.length(); i++){
	        	JSONObject pieturas_id = pieturas.getJSONObject(i);
	        	String pieturas_nosaukums = (String) pieturas_id.get("nosaukums");
	        	pieturu_nosaukumi.add(pieturas_nosaukums);
	        }
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return pieturu_nosaukumi;
	}
	
	private String transporta_tips_latviski(String tips) {
		if (tips.contentEquals("trol")) {
			return "trolejbuss";
		} else if (tips.contentEquals("tram")) {
			return "tramvajs";
		} else if (tips.contentEquals("bus")) {
			return "autobuss";
		} else if (tips.contentEquals("minibus")) {
			return "minibuss";
		} else {
			return "naktsbuss";
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
