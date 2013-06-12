package com.jmalinens.rigassatiksme;

import javax.microedition.khronos.opengles.GL10;

import android.app.Activity;
import android.util.Log;
import android.widget.Toast;

import com.nutiteq.MapView;
import com.nutiteq.components.MapPos;
import com.nutiteq.geometry.VectorElement;
import com.nutiteq.projections.EPSG3857;
import com.nutiteq.ui.DefaultLabel;
import com.nutiteq.ui.MapListener;

public class MapEventListener extends MapListener {

    private Activity activity;
    private MapView mapView;
    private MyLocationCircle locationCircle;

    public void setLocationCircle(MyLocationCircle locationCircle) {
        this.locationCircle = locationCircle;
    }

    // activity is often useful to handle click events 
    public MapEventListener(Activity activity, MapView mapView) {
        this.activity = activity;
        this.mapView = mapView;
    }
    
    // Reset activity and map view
    public void reset(Activity activity, MapView mapView) {
        this.activity = activity;
        this.mapView = mapView;
    }

    // Map drawing callbacks for OpenGL manipulations
    @Override
    public void onSurfaceChanged(GL10 gl, int width, int height) {
    }
    
    @Override
    public void onDrawFrameAfter3D(GL10 gl, float zoomPow2) {
    }

    @Override
    public void onDrawFrameBefore3D(GL10 gl, float zoomPow2) {
        if(this.locationCircle != null){
            this.locationCircle.draw(gl, zoomPow2);
            
            // As we want to animate location circle, request new frame to be rendered.
            // This is really bad for power efficiency, as constant redrawing drains battery.
            mapView.requestRender();
        }
    }

    // Vector element (touch) handlers
    @Override
    public void onLabelClicked(VectorElement vectorElement, boolean longClick) {
        //Toast.makeText(activity, "onLabelClicked "+((DefaultLabel) vectorElement.getLabel()).getTitle()+" longClick: "+longClick, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onVectorElementClicked(VectorElement vectorElement, double x, double y, boolean longClick) {
        //Toast.makeText(activity, "onVectorElementClicked "+((DefaultLabel) vectorElement.getLabel()).getTitle()+" longClick: "+longClick, Toast.LENGTH_SHORT).show();

    }

    // Map View manipulation handlers
    @Override
    public void onMapClicked(final double x, final double y, final boolean longClick) {
        // x and y are in base map projection, we convert them to the familiar WGS84 
         //Toast.makeText(activity, "onMapClicked "+(new EPSG3857()).toWgs84(x, y).x+" "+(new EPSG3857()).toWgs84(x, y).y+" longClick: "+longClick, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onMapMoved() {
        // this method is also called from non-UI thread
    	Double latitude = this.locationCircle.latitude;
    	Double longitude = this.locationCircle.longitude;
    	
    	
    	MapPos focusPoint = this.mapView.getFocusPoint();
    	Double x_coord = (new EPSG3857()).toWgs84(focusPoint.x, focusPoint.y).x;
    	Double y_coord = (new EPSG3857()).toWgs84(focusPoint.x, focusPoint.y).y;
    	if (x_coord > 24.40 || x_coord < 23.90 || y_coord > 57.00 || y_coord < 56.72) {
    		this.mapView.setFocusPoint((new EPSG3857()).fromWgs84(24.1132, 56.9514));
    	}
    	//Toast.makeText(activity, "onMapMoved Xlatitude: "+String.valueOf((new EPSG3857()).toWgs84(focusPoint.x, focusPoint.y).x)+" longitude: "+String.valueOf((new EPSG3857()).toWgs84(focusPoint.x, focusPoint.y).y), Toast.LENGTH_SHORT).show();
    	
    }
}
