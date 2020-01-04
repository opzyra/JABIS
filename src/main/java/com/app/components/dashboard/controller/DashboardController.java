package com.app.components.dashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/app")
public class DashboardController {

	public static final String APP_VIEW = "pages/dashboard";
	
	@GetMapping("/")
	public String appView() {
		return APP_VIEW;
	}
	
}
