package com.app.components.sibling.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.param.SuccessParam;
import com.app.components.sibling.data.SiblingDto;
import com.app.components.sibling.param.SearchInParam;
import com.app.components.sibling.param.SearchOutParam;
import com.app.components.sibling.param.UpdateMemoInParam;
import com.app.components.sibling.service.SiblingService;
import com.app.status.SuccessStatus;

@RestController
@RequestMapping("/api")
public class SiblingRestController {

	@Autowired
	private SiblingService siblingService;
	
	@ResponseBody
	@GetMapping("/sibling")
	@ResponseStatus(value=HttpStatus.OK)
	public List<SiblingDto> readSibling(@Valid @ModelAttribute SearchInParam inParam) {
		
		return siblingService.readAll(inParam);
		
	}
	
	@ResponseBody
	@GetMapping("/sibling/count")
	@ResponseStatus(value=HttpStatus.OK)
	public int readAllCount() {
		
		return siblingService.count();
		
	}
	
	@ResponseBody
	@PatchMapping("/sibling/memo")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateMemo(@Valid @RequestBody UpdateMemoInParam inParam) {
		
		siblingService.updateMemo(inParam);
		
		return new SuccessParam(SuccessStatus.MEMO_UPDATED);
		
	}
	
	
	
	
	
	
}
