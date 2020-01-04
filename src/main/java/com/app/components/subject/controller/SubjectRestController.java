package com.app.components.subject.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.param.SuccessParam;
import com.app.components.subject.data.SubjectEntity;
import com.app.components.subject.param.CreateInParam;
import com.app.components.subject.param.ReadInParam;
import com.app.components.subject.param.ReadOutParam;
import com.app.components.subject.param.UpdateInParam;
import com.app.components.subject.param.UpdateOrderInParam;
import com.app.components.subject.service.SubjectService;
import com.app.status.SuccessStatus;

@RestController
@RequestMapping("/api")
public class SubjectRestController {
	
	@Autowired
	private SubjectService subjectService;
	
	@ResponseBody
	@GetMapping("/subject")
	@ResponseStatus(value=HttpStatus.OK)
	public ReadOutParam readAllPage(@Valid @ModelAttribute ReadInParam inParam){
		
		return subjectService.readAll(inParam);
		
	}
	
	@ResponseBody
	@GetMapping("/subject/all")
	@ResponseStatus(value=HttpStatus.OK)
	public List<SubjectEntity> readAll(){
		
		return subjectService.readAllNoCondition();
		
	}
	
	@ResponseBody
	@PostMapping("/subject")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam createOne(@Valid @RequestBody CreateInParam inParam){
		
		subjectService.createOne(inParam);
		
		return new SuccessParam(SuccessStatus.SUBJECT_ADDED);
		
	}
	
	@ResponseBody
	@PatchMapping("/subject/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam createOne(@Valid @RequestBody UpdateInParam inParam){
		
		subjectService.updateOne(inParam);
		
		return new SuccessParam(SuccessStatus.SUBJECT_UPDATED);
		
	}
	
	@ResponseBody
	@PatchMapping("/subject/order")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateOrder(@Valid @RequestBody UpdateOrderInParam inParam){
		
		subjectService.updateOrder(inParam);
		
		return new SuccessParam(SuccessStatus.SUBJECT_UPDATED_ORDER);
		
	}
	
}
