package com.app.code;

import java.util.HashMap;
import java.util.Map;

public class BoardCode {

	private static final Map<Integer, String> boardCode = new HashMap<Integer, String>(); 
	
	static {
		boardCode.put(0, "공지사항");
	}
	
	public static String getBoard(int code) {
		return boardCode.get(code);
	}
	
}
