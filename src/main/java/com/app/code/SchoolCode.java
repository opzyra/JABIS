package com.app.code;

import java.util.HashMap;
import java.util.Map;

public class SchoolCode {

	private static final Map<Integer, String> schoolCode = new HashMap<Integer, String>(); 
	
	static {
		schoolCode.put(0, "초등학교");
		schoolCode.put(1, "중학교"); 				
		schoolCode.put(2, "고등학교"); 				
	}
	
	public static String getBoard(int code) {
		return schoolCode.get(code);
	}
	
}
