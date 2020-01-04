package com.app.code;

import java.util.HashMap;
import java.util.Map;

public class RoleNameCode {

private static final Map<Integer, String> roleNameCode = new HashMap<Integer, String>(); 
	
	static {
		roleNameCode.put(0, "담당 과목");
		roleNameCode.put(1, "담임");
		roleNameCode.put(2, "팀장");
		roleNameCode.put(3, "실장");
		roleNameCode.put(4, "원장");
		roleNameCode.put(5, "관리자");
	}
	
	public static String getRoleName(int code) {
		return roleNameCode.get(code);
	}
	
}
