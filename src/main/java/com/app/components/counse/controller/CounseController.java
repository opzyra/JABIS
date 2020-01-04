package com.app.components.counse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.components.counse.param.CreateAccessInParam;
import com.app.components.counse.param.UpdateAccessInParam;

@Controller
@RequestMapping("/app")
public class CounseController {

	public static final String MAIN_VIEW = "pages/counse/main";
	
	public static final String INIT_CREATE_VIEW = "pages/counse/create";
	
	public static final String MODIFY_VIEW = "pages/counse/modify";
	
	@GetMapping("/counse")
	public String mainView() {
		return MAIN_VIEW;
	}
	
	@GetMapping("/counse/{idx}")
	public String mainIdxView(@PathVariable int idx, Model model) {
		model.addAttribute("studentIdx", idx);
		return MAIN_VIEW;
	}
	
	@GetMapping("/counse/create")
	public String createView(@ModelAttribute CreateAccessInParam inParam, Model model) {
		
		model.addAttribute("studentIdx", inParam.getStudentIdx());
		model.addAttribute("workDate", inParam.getWorkDate());
		
		return INIT_CREATE_VIEW;
	}
	
	@GetMapping("/counse/modify")
	public String createView(@ModelAttribute UpdateAccessInParam inParam, Model model) {

		model.addAttribute("idx", inParam.getIdx());
		model.addAttribute("work", inParam.isWork());
		
		return MODIFY_VIEW;
	}
	
}
