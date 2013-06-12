package com.jmalinens.rigassatiksme.Adapter;

import java.util.ArrayList;
import java.util.List;

import com.jmalinens.rigassatiksme.R;
import com.jmalinens.rigassatiksme.Classes.Marsruts;

import android.content.Context;
import android.graphics.Typeface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.TextView;

public class MarsrutiExpandableListAdapter extends BaseExpandableListAdapter {
	  private Context mContext;
	  private String[][] mContents;
	  private String[] mTitles;
	  //private List<Marsruts> marsruti = new ArrayList<Marsruts>();
	  
	  public MarsrutiExpandableListAdapter(Context context, String[] titles, String[][] contents) { //, List<Marsruts> routes
	    super();
	    if(titles.length != contents.length) {
	      throw new IllegalArgumentException("Titles and Contents must be the same size.");
	    }
	    
	    mContext = context;
	    mContents = contents;
	    mTitles = titles;
	    //marsruti = routes;
	    
	  }
	  public String getRoutetype(int groupPosition, int childPosition) {
		    return mContents[groupPosition][childPosition];
	  }
	  @Override
	  public String getChild(int groupPosition, int childPosition) {
	    return mContents[groupPosition][childPosition];
	  }
	  @Override
	  public long getChildId(int groupPosition, int childPosition) {
	    return 0;
	  }
	  @Override
	  public View getChildView(int groupPosition, int childPosition,
	      boolean isLastChild, View convertView, ViewGroup parent) {
	    TextView row = (TextView)convertView;
	    if(row == null) {
	      row = new TextView(mContext);
	    }
	    row.setText(mContents[groupPosition][childPosition]);
	    row.setHeight(40);
	    return row;
	  }
	  @Override
	  public int getChildrenCount(int groupPosition) {
	    return mContents[groupPosition].length;
	  }
	  @Override
	  public String[] getGroup(int groupPosition) {
	    return mContents[groupPosition];
	  }
	  @Override
	  public int getGroupCount() {
	    return mContents.length;
	  }
	  @Override
	  public long getGroupId(int groupPosition) {
	    return 0;
	  }
	  @Override
	  public View getGroupView(int groupPosition, boolean isExpanded,
	      View convertView, ViewGroup parent) {
	    TextView row = (TextView)convertView;
	    
	    if(row == null) {
	      row = new TextView(mContext);
	    }
	    
	    List<Integer> group_icons = new ArrayList<Integer>();
	    group_icons.add(0, R.drawable.bus);
	    group_icons.add(1, R.drawable.tram);
	    group_icons.add(2, R.drawable.trol);
	    group_icons.add(3, R.drawable.minibus);
	    group_icons.add(4, R.drawable.nightbus);
	    
	    row.setCompoundDrawablesWithIntrinsicBounds(group_icons.get(groupPosition), 0, 0, 0);
	    
	    row.setTypeface(Typeface.DEFAULT_BOLD);
	    row.setText(mTitles[groupPosition]);
	    row.setHeight(60);
	    return row;
	  }

	  @Override
	  public boolean hasStableIds() {
	    return false;
	  }

	  @Override
	  public boolean isChildSelectable(int groupPosition, int childPosition) {
	    return true;
	  }

	}
