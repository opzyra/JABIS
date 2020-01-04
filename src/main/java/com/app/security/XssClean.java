package com.app.security;

import com.nhncorp.lucy.security.xss.XssFilter;

public class XssClean {
	
	public static String cleanXSS(String in) {
		
		if(in == null) return null;

		in = in.replaceAll("<(?i)script>", "<!-- Not Allowed Attribute Filtered (");
		
		in = in.replaceAll("</(?i)script>", ") --> Active Xss security");
		
		in = in.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
		  
		in = in.replaceAll("eval\\((.*)\\)", "");         
		  
		XssFilter filter = XssFilter.getInstance("lucy-xss-superset.xml");
		
		return filter.doFilter(in);
		  
	} 
	
}
