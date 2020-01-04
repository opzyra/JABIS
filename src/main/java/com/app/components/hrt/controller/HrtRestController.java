package com.app.components.hrt.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.app.common.param.SuccessParam;
import com.app.components.hrt.data.HrtStudent;
import com.app.components.hrt.param.HrtInParam;
import com.app.components.hrt.param.HrtOutParam;
import com.app.components.hrt.param.HrtUpdateInParam;
import com.app.components.hrt.service.HrtService;
import com.app.status.SuccessStatus;

@RestController
@RequestMapping("/api")
public class HrtRestController {
	
	@Autowired
	private HrtService hrtService;
	
	@ResponseBody
	@GetMapping("/hrt")
	@ResponseStatus(value=HttpStatus.OK)
	public HrtOutParam initHrtList(@Valid @ModelAttribute HrtInParam inParam) {	
		
		return hrtService.readAll(inParam);
		
	}
	
	@ResponseBody
	@PostMapping("/hrt")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateHrtStudent(@Valid @RequestBody HrtUpdateInParam inParam) {	
		
		hrtService.updateHrtStudent(inParam);
		
		return new SuccessParam(SuccessStatus.HRT_SUCCESS);
		
	}
	
	@ResponseBody
	@GetMapping("/hrt/none")
	@ResponseStatus(value=HttpStatus.OK)
	public List<HrtStudent> readHrtNoneStudent() {

		return hrtService.readHrtNoneStudent();
		
	}
	
	@ResponseBody
	@PatchMapping("/hrt/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateHrtNoneStudent(@PathVariable int idx) {

		hrtService.updateHrtNoneStudent(idx);
		
		return new SuccessParam(HttpStatus.OK);
		
	}
	
	

}
