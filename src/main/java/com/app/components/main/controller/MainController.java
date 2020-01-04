package com.app.components.main.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

	private static final String MAIN_VIEW = "index";
	private static final String APP_VIEW = "/app/";
	
	@GetMapping("/")
	public String mainView(Model model, Authentication auth) {
		
		if(auth != null) {
			
			return "redirect:" + APP_VIEW;
			
		}
		
		return MAIN_VIEW;
	}
	
}
