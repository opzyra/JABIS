package com.app.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.components.student.param.ListInParam;

@Controller
@RequestMapping("/app")
public class ErrorController {

	private static final String NOT_FOUNT = "error/404";
	
	@GetMapping("/error")
	public String listView() {
		return NOT_FOUNT;
	}
}
