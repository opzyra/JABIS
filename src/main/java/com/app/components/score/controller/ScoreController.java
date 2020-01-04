package com.app.components.score.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.components.score.param.ScoreCreateInParam;

@Controller
@RequestMapping("/app")
public class ScoreController {
	
	public static final String MAIN_VIEW = "pages/score/main";
	
	public static final String CREATE_VIEW = "pages/score/create";
	
	public static final String UPDATE_MNESIN_VIEW = "pages/score/update_mnesin";
	
	public static final String UPDATE_HNESIN_VIEW = "pages/score/update_hnesin";
	
	public static final String UPDATE_MOI_VIEW = "pages/score/update_moi";
	
	@GetMapping("/score")
	public String mainView(@RequestParam("studentIdx") Integer studentIdx, @RequestParam("mode") Integer mode, Model model) {
		model.addAttribute("studentIdx", studentIdx);
		model.addAttribute("mode", mode);
		return MAIN_VIEW;
	}
	
	@GetMapping("/score/create")
	public String createView(@ModelAttribute ScoreCreateInParam inParam, Model model) {
		
		model.addAttribute("studentIdx", inParam.getStudentIdx());
		model.addAttribute("mode", inParam.getMode());
		model.addAttribute("first", inParam.isFirst());
		
		return CREATE_VIEW;
	}
	
	@GetMapping("/score/update/mnesin")
	public String updateMnesinView(@RequestParam("studentIdx") Integer studentIdx,@RequestParam("scoreIdx") Integer scoreIdx, Model model) {
		
		model.addAttribute("studentIdx", studentIdx);
		model.addAttribute("scoreIdx", scoreIdx);
		
		return UPDATE_MNESIN_VIEW;
	}
	
	@GetMapping("/score/update/hnesin")
	public String updateHnesinView(@RequestParam("studentIdx") Integer studentIdx,@RequestParam("scoreIdx") Integer scoreIdx, Model model) {
		
		model.addAttribute("studentIdx", studentIdx);
		model.addAttribute("scoreIdx", scoreIdx);
		
		return UPDATE_HNESIN_VIEW;
	}
	
	@GetMapping("/score/update/moi")
	public String updateMoiView(@RequestParam("studentIdx") Integer studentIdx,@RequestParam("scoreIdx") Integer scoreIdx, Model model) {
		
		model.addAttribute("studentIdx", studentIdx);
		model.addAttribute("scoreIdx", scoreIdx);
		
		return UPDATE_MOI_VIEW;
	}
	
}
