package com.app.components.member.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.app.security.Crypto;

@Controller
public class MemberController {

	private final String REMEMBER_ME = "rememberMe";
	
	private final String APP_VIEW = "/app/";
	
	private final String LOGIN_VIEW = "pages/login";
	private final String REGISTER_VIEW = "pages/register";
	private final String FORGOT_PASSWORD_VIEW = "pages/forgot-password";
	
	private final String LIST_VIEW = "pages/member/main";
	
	@GetMapping("/login/")
	public String loginView(Model model, Authentication auth, HttpServletRequest request) {
		
		if(auth != null) {
			
			return "redirect:" + APP_VIEW;
			
		}
		
		String cookieId = null;
		
		Cookie[] cookies = request.getCookies();
		
		if (cookies != null) {
			
		    for (Cookie cookie : cookies) {
		    	if(REMEMBER_ME.equalsIgnoreCase(cookie.getName())) {
		    		cookieId = cookie.getValue();
					break;
		    	}
		    }
		    
		}
		
		if(cookieId != null) {
			model.addAttribute("email", Crypto.decode(cookieId));
			model.addAttribute("rememberMe", true);
		}
		
		return LOGIN_VIEW;
	}
	
	@GetMapping("/register/")
	public String registerView(Model model, Authentication auth) {
		
		if(auth != null) {
			
			return "redirect:" + APP_VIEW;
			
		}
		
		return REGISTER_VIEW;
	}
	
	@GetMapping("/forgotPassword/")
	public String forgotPasswordView(Model model, Authentication auth) {
		
		if(auth != null) {
			
			return "redirect:" + APP_VIEW;
			
		}	
		
		return FORGOT_PASSWORD_VIEW;
	}
	
	@GetMapping("/app/member/list")
	public String listView() {
		
		return LIST_VIEW;
	}
	
}
