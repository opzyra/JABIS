package com.app.code;

import java.util.HashMap;
import java.util.Map;

public class EnabledCode {

	private static final Map<Integer, String> enabledCode = new HashMap<Integer, String>(); 
	
	static {
		enabledCode.put(0, "IS_OK");
		enabledCode.put(1, "MONE_AUTH");
		enabledCode.put(2, "IS_BAN");
	}
	
	public static boolean getEnabled(int code) {
		
		return code == 0 ? true : false; 
	}
	
}
