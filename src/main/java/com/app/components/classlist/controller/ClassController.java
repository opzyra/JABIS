package com.app.components.classlist.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/app")
public class ClassController {

	public static final String HRT_LIST_VIEW = "pages/classlist/main";
	
	@GetMapping("/class/list")
	public String appView() {
		return HRT_LIST_VIEW;
	}
	
}
