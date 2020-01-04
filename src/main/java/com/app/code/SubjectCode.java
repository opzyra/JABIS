package com.app.code;

import java.util.HashMap;
import java.util.Map;

public class SubjectCode {

	private static final Map<Integer, String> subjectCode = new HashMap<Integer, String>(); 
	
	static {
		subjectCode.put(0, "미정");
		subjectCode.put(1, "국어");
		subjectCode.put(2, "영어");
		subjectCode.put(3, "수학");
		subjectCode.put(4, "과학");
		subjectCode.put(5, "사회");
		subjectCode.put(6, "역사");
	}
	
	public static String getSubject(int code) {
		return subjectCode.get(code);
	}
	
}
