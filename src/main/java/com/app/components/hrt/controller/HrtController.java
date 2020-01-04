package com.app.components.hrt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/app")
public class HrtController {

	public static final String HRT_LIST_VIEW = "pages/hrt/main";
	
	@GetMapping("/hrt/list")
	public String appView() {
		return HRT_LIST_VIEW;
	}
	
}
