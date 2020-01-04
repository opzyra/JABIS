package com.app.components.notification.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.param.SuccessParam;
import com.app.components.member.data.MemberEntity;
import com.app.components.notification.data.NotificationDto;
import com.app.components.notification.param.UpdateInParam;
import com.app.components.notification.service.NotificationService;
import com.app.security.Principal;

@RestController
@RequestMapping("/api")
public class NotificationRestController {
	
	@Autowired
	private NotificationService notificationService;
	
	@ResponseBody
	@GetMapping("/notification/latest")
	@ResponseStatus(value=HttpStatus.OK)
	public List<NotificationDto> readAllNotification() {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		return notificationService.readLatest(member.getEmail());
		
	}
	
	@ResponseBody
	@PatchMapping("/notification")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateReadNotification(@Valid @RequestBody UpdateInParam inParam) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		notificationService.updateRead(member.getEmail(), inParam.getIdx());
		
		return new SuccessParam(HttpStatus.OK);
		
	}
	
	@ResponseBody
	@PatchMapping("/notification/all")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateAllReadNotification() {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		notificationService.updateAllRead(member.getEmail());
		
		return new SuccessParam(HttpStatus.OK);
		
	}
	
}
