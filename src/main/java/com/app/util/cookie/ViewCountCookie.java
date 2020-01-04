package com.app.util.cookie;

import java.util.Calendar;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ViewCountCookie {

	public static boolean validateViewCount(HttpServletRequest request, 
			HttpServletResponse response, String email, String idx) {
		
		boolean validator = true;
		Cookie[] cookies = request.getCookies();
		
		for(Cookie cookie:cookies) {
			if(cookie.getName().equalsIgnoreCase(idx) && cookie.getValue().equalsIgnoreCase(email)) {
				validator = false;
				break;
			}
		}

		if(validator) {
			long today = System.currentTimeMillis();
			Calendar tomorrow = Calendar.getInstance();
			
			tomorrow.add(Calendar.DAY_OF_MONTH, 1);
			tomorrow.set(Calendar.HOUR_OF_DAY, 0);
			tomorrow.set(Calendar.MINUTE, 0);
			tomorrow.set(Calendar.SECOND, 0);
			tomorrow.set(Calendar.MILLISECOND, 0);
			
			long to = tomorrow.getTime().getTime();
						
			int time = (int)(to - today) / 1000;
			Cookie boardCookie = new Cookie(idx, email);
			
			boardCookie.setMaxAge(time);

			response.addCookie(boardCookie);
		}
		
		return validator;
		
	}
	
}
