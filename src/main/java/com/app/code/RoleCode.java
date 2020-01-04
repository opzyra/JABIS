package com.app.code;

import java.util.HashMap;
import java.util.Map;

public class RoleCode {

	private static final Map<Integer, String> roleCode = new HashMap<Integer, String>(); 
	
	static {
		roleCode.put(0, "ROLE_SUBJECT");
		roleCode.put(1, "ROLE_HRT");
		roleCode.put(2, "ROLE_TEAM");
		roleCode.put(3, "ROLE_MASTER");
		roleCode.put(4, "ROLE_ADMIN");
		roleCode.put(5, "ROLE_WEB");
	}
	
	public static String getRole(int code) {
		return roleCode.get(code);
	}
	
	
}
