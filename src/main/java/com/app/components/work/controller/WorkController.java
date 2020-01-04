package com.app.components.work.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.components.member.data.MemberEntity;
import com.app.components.work.param.WorkInParam;
import com.app.security.Principal;

@Controller
@RequestMapping("/app")
public class WorkController {

	private final String WORK = "pages/teacher/work";
	
	private final String AUTH_EXCEPTION = "error/403";
	
	@GetMapping("/work")
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
		
		return WORK;
	}
	
	
}
