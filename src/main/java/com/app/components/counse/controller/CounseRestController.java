package com.app.components.counse.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.exception.ApplicationException;
import com.app.common.param.SuccessParam;
import com.app.components.board.param.RecordInParam;
import com.app.components.counse.data.CounseEntity;
import com.app.components.counse.data.CounseListDto;
import com.app.components.counse.param.CreateAccessOutParam;
import com.app.components.counse.param.CreateInParam;
import com.app.components.counse.param.ListInParam;
import com.app.components.counse.service.CounseService;
import com.app.components.member.data.MemberEntity;
import com.app.security.Principal;
import com.app.status.ErrorStatus;
import com.app.status.SuccessStatus;

@RestController
@RequestMapping("/api")
public class CounseRestController {

	@Autowired
	private CounseService counseService;
	
	@ResponseBody
	@GetMapping("/counse")
	@ResponseStatus(value=HttpStatus.OK)
	public List<CounseListDto> readAllCounse(@Valid @ModelAttribute ListInParam inParam) {
		
		return counseService.readAllCounse(inParam);
		
		
	}
	
	@ResponseBody
	@GetMapping("/counse/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public CreateAccessOutParam readOneCounse(@PathVariable int idx) {
		
		CreateAccessOutParam entity = counseService.readInit(idx);
		
		if(entity.getCounse() == null) {
			
			throw new ApplicationException(ErrorStatus.INVALID_ACCESS);
			
		}
		
		return entity;
		
		
	}
	
	@ResponseBody
	@DeleteMapping("/counse/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam deleteOneCounse(@PathVariable int idx) {
		
		counseService.deleteOne(idx);
		
		return new SuccessParam(SuccessStatus.COUNSE_DELETED);
		
		
	}
	
	@ResponseBody
	@PostMapping("/counse")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam createOneCounse(@Valid @RequestBody CreateInParam inParam) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Principal principal = (Principal) authentication.getPrincipal();
		
		MemberEntity member = principal.getMember();
		
		counseService.createOne(inParam, member);
		
		return new SuccessParam(SuccessStatus.COUNSE_CREATED);
		
		
	}
	
	@ResponseBody
	@PatchMapping("/counse")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateOneCounse(@Valid @RequestBody CreateInParam inParam) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Principal principal = (Principal) authentication.getPrincipal();
		
		MemberEntity member = principal.getMember();
		
		counseService.updateOne(inParam, member);
		
		return new SuccessParam(SuccessStatus.COUNSE_UPDATED);
		
		
	}
	
	@ResponseBody
	@GetMapping("/counse/detail/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public CounseEntity readDetailCounse(@PathVariable int idx) {
		
		CounseEntity entity = counseService.readOne(idx);
		
		if(entity == null) {
			throw new ApplicationException(ErrorStatus.INVALID_ACCESS);
		}
		
		return entity;
		
		
	}
	
	@ResponseBody
	@GetMapping("/counse/last/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public CounseEntity readLastOneCounse(@PathVariable int idx) {
		
		CounseEntity entity = counseService.readLastOne(idx);
		
		if(entity == null) {
			throw new ApplicationException(ErrorStatus.INVALID_ACCESS);
		}
		
		return entity;
		
		
	}
	
	
}
