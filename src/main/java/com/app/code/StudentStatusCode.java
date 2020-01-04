package com.app.code;

import java.util.HashMap;
import java.util.Map;

public class StudentStatusCode {

	private static final Map<Integer, String> studentStatusCode = new HashMap<Integer, String>(); 
	
	static {
		studentStatusCode.put(0, "입학예정");
		studentStatusCode.put(1, "재원"); 				
		studentStatusCode.put(2, "결원");
		studentStatusCode.put(3, "휴원");
	}
	
	public static String getStudentStatus(int code) {
		return studentStatusCode.get(code);
	}
	
}
