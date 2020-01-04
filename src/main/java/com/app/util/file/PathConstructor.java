package com.app.util.file;

import java.io.File;
import java.text.DecimalFormat;
import java.util.Calendar;

public class PathConstructor {

	private static final String UPLOAD_PATH = "upload";
	
	private static final String SEPARATOR = "/";
	
	public static String getSavePath() {
		
		Calendar cal = Calendar.getInstance();
		
		String yearPath = SEPARATOR + cal.get(Calendar.YEAR);
		
		String monthPath = yearPath + SEPARATOR + new DecimalFormat("00").format(cal.get(Calendar.MONTH)+1);
		
		String datePath = monthPath + SEPARATOR + new DecimalFormat("00").format(cal.get(Calendar.DATE));
		
		makeDir(UPLOAD_PATH, yearPath, monthPath, datePath);
		
		return datePath + SEPARATOR;
		
	}

	private static void makeDir(String uploadPath, String... paths) {
		
		if(new File(uploadPath + paths[paths.length-1]).exists()) {
			
			return;
			
		}
		
		for(String path : paths) {
			
			File dirPath = new File(uploadPath + path);
			
			if(!dirPath.exists()) {
				
				dirPath.mkdirs();
				
			}
			
		}
		
	}
	
}
