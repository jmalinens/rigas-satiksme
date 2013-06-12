package com.jmalinens.rigassatiksme.Classes;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import android.os.Environment;

public class Downloader {

	
	public boolean start() {
		
		boolean downloaded = this.download_file("http://satiksme.wap4.org/?controller=version");
		return true;
	}
	
	
	public boolean download_file(String url2) {
		
			try {
		        //set the download URL, a url that points to a file on the internet
		        //this is the file to be downloaded
				
		        URL url = new URL(url2);
	
		        //create the new connection
		        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
	
		        //set up some things on the connection
		        urlConnection.setRequestMethod("GET");
		        urlConnection.setDoOutput(true);
	
		        //and connect!
		        urlConnection.connect();
	
		        //set the path where we want to save the file
		        //in this case, going to save it on the root directory of the
		        //sd card.
		        File SDCardRoot = Environment.getExternalStorageDirectory();
		        //create a new file, specifying the path, and the filename
		        //which we want to save the file as.
		        File file = new File(SDCardRoot,"somefile.ext");
	
		        //this will be used to write the downloaded data into the file we created
		        FileOutputStream fileOutput = new FileOutputStream(file);
	
		        //this will be used in reading the data from the internet
		        InputStream inputStream = urlConnection.getInputStream();
	
		        //this is the total size of the file
		        int totalSize = urlConnection.getContentLength();
		        //variable to store total downloaded bytes
		        int downloadedSize = 0;
	
		        //create a buffer...
		        byte[] buffer = new byte[1024];
		        int bufferLength = 0; //used to store a temporary size of the buffer
	
		        //now, read through the input buffer and write the contents to the file
		        while ( (bufferLength = inputStream.read(buffer)) > 0 ) {
		                //add the data in the buffer to the file in the file output stream (the file on the sd card
		                fileOutput.write(buffer, 0, bufferLength);
		                //add up the size so we know how much is downloaded
		                downloadedSize += bufferLength;
		                //this is where you would do something to report the prgress, like this maybe
		                updateProgress(downloadedSize, totalSize);
	
		        }
		        //close the output stream when done
		        fileOutput.close();
	
			//catch some possible errors...
			} catch (MalformedURLException e) {
			        e.printStackTrace();
			} catch (IOException e) {
			        e.printStackTrace();
			}
		
		return true;
	}

	private void updateProgress(int downloadedSize, int totalSize) {
		// TODO Auto-generated method stub
		
	}
	
}
