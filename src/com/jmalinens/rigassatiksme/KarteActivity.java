package com.jmalinens.rigassatiksme;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;

import com.nutiteq.MapView;
import com.nutiteq.components.Bounds;
import com.nutiteq.components.Color;
import com.nutiteq.components.Components;
import com.nutiteq.components.MapPos;
import com.nutiteq.components.Options;
import com.nutiteq.components.Range;
import com.nutiteq.geometry.Marker;
import com.jmalinens.rigassatiksme.MyLocationCircle;
import com.nutiteq.log.Log;
import com.nutiteq.projections.EPSG3857;
import com.nutiteq.projections.Projection;
import com.nutiteq.rasterlayers.TMSMapLayer;
import com.nutiteq.style.MarkerStyle;
import com.nutiteq.ui.DefaultLabel;
import com.nutiteq.ui.Label;
import com.nutiteq.utils.UnscaledBitmapLoader;
import com.nutiteq.vectorlayers.MarkerLayer;
import android.view.Menu;
import android.view.Window;
import android.view.WindowManager;
import android.content.res.AssetManager;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.AlertDialog;

//import com.jmalinens.rigassatiksme.Classes.Marsruts;
import com.jmalinens.rigassatiksme.Classes.Pietura;
import com.jmalinens.rigassatiksme.Helpers.Io;

public class KarteActivity extends Activity {

	private MapView mapView;
	public static String marsruta_nr;
	public static String transporta_tips;
	public static String virziens;
	public static String pieturas_nosaukums;
	
	@SuppressLint("NewApi")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, 
                                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_pieturas);

        
        // enable logging for troubleshooting - optional
        Log.enableAll();
        Log.setTag("rigassatiksme");
        
		Bundle extras = getIntent().getExtras();
		if (extras != null) {
	        KarteActivity.marsruta_nr = extras.getString("marsruta_nr");
	        KarteActivity.transporta_tips = extras.getString("transporta_tips");
	        KarteActivity.virziens = extras.getString("virziens");
	        KarteActivity.pieturas_nosaukums = extras.getString("pieturas_nosaukums");
	        
			setTitle("karte: "+PieturaActivity.pieturas_nosaukums);

		}
        

        // 1. Get the MapView from the Layout xml - mandatory
        mapView = (MapView) findViewById(R.id.mapView);

        // Optional, but very useful: restore map state during device rotation,
        // it is saved in onRetainNonConfigurationInstance() below
        Components retainObject = (Components) getLastNonConfigurationInstance();
        if (retainObject != null) {
            // just restore configuration and update listener, skip other initializations
          	mapView.setComponents(retainObject);
          	MapEventListener mapListener = (MapEventListener) mapView.getOptions().getMapListener();
          	mapListener.reset(this, mapView);
            mapView.startMapping();
            return;
        } else {
            // 2. create and set MapView components - mandatory
            mapView.setComponents(new Components());
        }

        // 3. Define map layer for basemap - mandatory.
        // Here we use MapQuest open tiles
        // Almost all online tiled maps use EPSG3857 projection.
        TMSMapLayer mapLayer = new TMSMapLayer(new EPSG3857(), 0, 18, 0,
                "http://otile1.mqcdn.com/tiles/1.0.0/osm/", "/", ".png");

        mapView.getLayers().setBaseLayer(mapLayer);

        // set initial map view camera - optional. "World view" is default
        // Location: Pïavnieki
        // NB! it must be in base layer projection (EPSG3857), so we convert it from lat and long
        mapView.setFocusPoint(mapView.getLayers().getBaseLayer().getProjection().
        		fromWgs84(24.1132, 56.9514));
        
        // rotation - 0 = north-up
        mapView.setRotation(0f);
        // zoom - 0 = world, like on most web maps
        mapView.setZoom(11.0f);
        // tilt means perspective view. Default is 90 degrees for "normal" 2D map view, minimum allowed is 30 degrees.
        mapView.setTilt(80.0f);


        // Activate some mapview options to make it smoother - optional
        mapView.getOptions().setPreloading(true);
        mapView.getOptions().setSeamlessHorizontalPan(true);
        mapView.getOptions().setTileFading(true);
        mapView.getOptions().setKineticPanning(true);
        mapView.getOptions().setDoubleClickZoomIn(true);
        mapView.getOptions().setDualClickZoomOut(true);

        // set sky bitmap - optional, default - white
        mapView.getOptions().setSkyDrawMode(Options.DRAW_BITMAP);
        mapView.getOptions().setSkyOffset(4.86f);
        mapView.getOptions().setSkyBitmap(
                UnscaledBitmapLoader.decodeResource(getResources(),
                        R.drawable.sky_small));

        // Map background, visible if no map tiles loaded - optional, default - white
        mapView.getOptions().setBackgroundPlaneDrawMode(Options.DRAW_BITMAP);
        mapView.getOptions().setBackgroundPlaneBitmap(
                UnscaledBitmapLoader.decodeResource(getResources(),
                        R.drawable.background_plane));
        mapView.getOptions().setClearColor(Color.WHITE);
        
        // configure texture caching - optional, suggested 
        mapView.getOptions().setTextureMemoryCacheSize(40 * 1024 * 1024);
        mapView.getOptions().setCompressedMemoryCacheSize(8 * 1024 * 1024);
        
        // define online map persistent caching - optional, suggested. Default - no caching
        mapView.getOptions().setPersistentCachePath(this.getDatabasePath("mapcache").getPath());
        // set persistent raster cache limit to 100MB
        mapView.getOptions().setPersistentCacheSize(100 * 1024 * 1024);

        //Bounds bounds = new Bounds(57.0750, 23.8799, 56.8219, 24.3743);
        //mapView.getConstraints().setMapBounds(bounds);
        
        Range zoomRange = new Range(8f, 16f);
        mapView.getConstraints().setZoomRange(zoomRange);
        // 4. Start the map - mandatory
        mapView.startMapping();


        Bitmap pointMarker = UnscaledBitmapLoader.decodeResource(getResources(), R.drawable.pietura);
        MarkerLayer markerLayer = new MarkerLayer(mapLayer.getProjection());
        
        
		int rawResId = getResources().getIdentifier(
				KarteActivity.transporta_tips+"_"+KarteActivity.marsruta_nr+"_"+KarteActivity.virziens,
				"raw",
				getPackageName()
		);
		InputStream instream = getResources().openRawResource(rawResId);
		JSONObject routes = null;
		String sRawData = "";
		try {
			routes = Io.getJson(instream);
		} catch (JSONException e) {
			e.printStackTrace();
		}
	    try {
			sRawData = routes.getString("raw_data");
		} catch (JSONException e) {
			e.printStackTrace();
		}
	    Log.warning("sRawData: "+sRawData);
	    String[] aRawData = sRawData.split(";");
	    Log.warning("aRawData: "+aRawData);
	    Log.warning("skaits:"+aRawData.length);
	    int i;
	    List<String> aPieturuId = new ArrayList<String>();
	    for (i=16; i <= aRawData.length-1;i++/*String sPieturasId: aRawData*/) {
	    	
	    	String sPieturasId = aRawData[i];
	    	Log.warning("id: "+sPieturasId);
	    	aPieturuId.add(sPieturasId);
	    }
	    Log.warning("pieturu id: "+aPieturuId.toString());
	    //List<Pietura> pieturas = this.getStops2(aPieturuId);
	    //Log.warning("pieturas: "+pieturas.toString());
    	
	    
	    /*for (Pietura pietura : pieturas) {
  			MarkerStyle markerStyle = MarkerStyle.builder().setBitmap(pointMarker).setSize(0.5f).setColor(Color.GREEN).build();
            Label markerLabel = new DefaultLabel(pietura.Name, pietura.Name);
            MapPos markerLocation = mapLayer.getProjection().fromWgs84(pietura.Lng, pietura.Lat);
            markerLayer.add(new Marker(markerLocation, markerLabel, markerStyle, null));
    	}*/
	    
	    JSONObject pieturas = this.getStops3(aPieturuId);
	    Iterator<String> iter = pieturas.keys();
	    while (iter.hasNext()) {
	    	
	        String pieturas_id = (String)iter.next();
	        JSONObject pietura;
			try {
				pietura = pieturas.getJSONObject(pieturas_id);
	  			MarkerStyle markerStyle = MarkerStyle.builder().setBitmap(pointMarker).setSize(0.5f).build();
	            Label markerLabel = new DefaultLabel(pietura.getString("name"));
	            MapPos markerLocation = mapLayer.getProjection().fromWgs84(pietura.getDouble("lng"), pietura.getDouble("lat"));
	            markerLayer.add(new Marker(markerLocation, markerLabel, markerStyle, null));
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        
	    }

        //add layer to the map
        mapView.getLayers().addLayer(markerLayer);

        // add event listener
        MapEventListener mapListener = new MapEventListener(this, mapView);
        mapView.getOptions().setMapListener(mapListener);
   
        // add GPS My Location functionality 
        MyLocationCircle locationCircle = new MyLocationCircle();
        mapListener.setLocationCircle(locationCircle);
        initGps(locationCircle);
    }
	
	private JSONObject getStops3(List<String> aPieturuId) {
		
		JSONObject json_return = new JSONObject();
		AssetManager am = getAssets();
		JSONObject stops = null;
		InputStream instream = null;
		try {
			instream = am.open("stops.json");
			stops = Io.getJson(instream);
			for (int i = 0; i < aPieturuId.size(); i++) {
				JSONObject stop = stops.getJSONObject(aPieturuId.get(i));
				json_return.put(aPieturuId.get(i), stop);
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return json_return;
	}
	
	/*private List<Pietura> getStops2(List<String> aPieturuId) {
		List<Pietura> pieturas = new ArrayList<Pietura>();
        try {
            AssetManager am = getAssets();
            InputStream instream = am.open("stops.txt");
            if (instream != null) {
              InputStreamReader inputreader = new InputStreamReader(instream);
              BufferedReader buffreader = new BufferedReader(inputreader);   
              //Integer line_count = 0;
              String line = "";
              Pietura prev_pietura = null;
              line = buffreader.readLine(); //skip first line
              while (( line = buffreader.readLine()) != null) {
            	  Pietura pietura = new Pietura(line);
            	  
            	  if (aPieturuId.contains(pietura.ID)) {
            		  if (pietura.Name != null) {
            			  pieturas.add(pietura);
            		  } else {
            			  pieturas.add(prev_pietura);
            		  }
            		  //line_count++;
            	  }
            	  
            	  prev_pietura = pietura;
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
        Log.warning("pieturas: "+pieturas);
		return pieturas;
	}*/
	
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.pieturas, menu);
        return true;
    }
    
    @Override
    public Object onRetainNonConfigurationInstance() {
        Log.debug("onRetainNonConfigurationInstance");
        return this.mapView.getComponents();
    }
    
    protected void initGps(final MyLocationCircle locationCircle) {
        final Projection proj = mapView.getLayers().getBaseLayer().getProjection();
        
        LocationListener locationListener = new LocationListener() 
        {
            public void onLocationChanged(Location location) {
                 if (locationCircle != null) {
                     locationCircle.setLocation(proj, location);
                     locationCircle.setVisible(true);
                 }
            }

            public void onStatusChanged(String provider, int status, Bundle extras) {}

            public void onProviderEnabled(String provider) {}

            public void onProviderDisabled(String provider) {}
        };
        
        LocationManager locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
        
        locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 10000, 100, locationListener);
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 0, locationListener);

    }
    
}
