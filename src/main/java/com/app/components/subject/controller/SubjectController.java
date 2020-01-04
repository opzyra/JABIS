package com.app.components.subject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/app")
public class SubjectController {
	
	public static final String MAIN_VIEW = "pages/subject/main";
	
	@GetMapping("/subject")
	public String mainView() {
		return MAIN_VIEW;
	}
	
}
