package com.jmalinens.rigassatiksme;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class MainActivity extends Activity {

	@SuppressLint("NewApi")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        Button marsrutiButton = (Button) findViewById(R.id.button_marsruti);
        marsrutiButton.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
                // here is your button click logic, for example running another activity (page)
            	startActivityForResult(new Intent(view.getContext(), MarsrutiActivity.class), 0);
            }   
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
    
    
    
}
