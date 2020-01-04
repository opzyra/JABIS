package com.app.components.data.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.components.member.data.MemberEntity;
import com.app.components.work.param.WorkInParam;
import com.app.security.Principal;

@Controller
@RequestMapping("/app")
public class DataController {

	private final String COUNSE_LIST = "pages/data/main";
	private final String COUNSE_DETAIL = "pages/data/work";
	
	private final String LEAVE_LIST = "pages/data/leave";
	
	private final String AUTH_EXCEPTION = "error/403";
	
	@GetMapping("/data/counse")
	public String listView(@ModelAttribute WorkInParam inParam, Model model) {
		model.addAttribute("month", inParam.getMonth());
		model.addAttribute("year", inParam.getYear());
		return COUNSE_LIST;
	}
	
	@GetMapping("/data/counse/detail")
	public String workView(@ModelAttribute WorkInParam inParam, Model model) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		if(inParam.getEmail() == null || inParam.getEmail().equals("")) {
			
			inParam.setEmail(member.getEmail());
			
		}else if(member.getRoleCode() < 2){
			
			return AUTH_EXCEPTION;
			
		}
		
		model.addAttribute("work", inParam.getEmail());
		model.addAttribute("month", inParam.getMonth());
		model.addAttribute("year", inParam.getYear());
		
		return COUNSE_DETAIL;
	}
	
	@GetMapping("/data/leave")
	public String leaveView(@ModelAttribute WorkInParam inParam, Model model) {
		model.addAttribute("month", inParam.getMonth());
		model.addAttribute("year", inParam.getYear());
		return LEAVE_LIST;
	}
}
