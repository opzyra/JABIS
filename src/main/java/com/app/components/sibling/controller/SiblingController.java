package com.app.components.sibling.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/app")
public class SiblingController {

	public static final String MAIN_VIEW = "pages/sibling/main";

	
	@GetMapping("/sibling")
	public String mainView() {
		return MAIN_VIEW;
	}
	
}
