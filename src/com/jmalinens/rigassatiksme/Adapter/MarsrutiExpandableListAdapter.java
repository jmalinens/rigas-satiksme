package com.jmalinens.rigassatiksme.Adapter;

import com.jmalinens.rigassatiksme.R;

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
	  
	  public MarsrutiExpandableListAdapter(Context context, String[] titles, String[][] contents) {
	    super();
	    if(titles.length != contents.length) {
	      throw new IllegalArgumentException("Titles and Contents must be the same size.");
	    }
	    
	    mContext = context;
	    mContents = contents;
	    mTitles = titles;
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
