package com.app.components.classlist.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.app.common.param.SuccessParam;
import com.app.components.classlist.data.ClassStudent;
import com.app.components.classlist.param.ClassAddInParam;
import com.app.components.classlist.param.ClassInParam;
import com.app.components.classlist.param.ClassNameUpdateInParam;
import com.app.components.classlist.param.ClassOutParam;
import com.app.components.classlist.param.ClassUpdateInParam;
import com.app.components.classlist.service.ClassService;
import com.app.components.hrt.data.HrtStudent;
import com.app.components.hrt.param.HrtInParam;
import com.app.components.hrt.param.HrtOutParam;
import com.app.components.hrt.param.HrtUpdateInParam;
import com.app.components.hrt.service.HrtService;
import com.app.status.SuccessStatus;

@RestController
@RequestMapping("/api")
public class ClassRestController {
	
	@Autowired
	private ClassService classService;
	
	@ResponseBody
	@PostMapping("/class")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam addClass(@Valid @RequestBody ClassAddInParam inParam) {	
		
		classService.addClass(inParam);
		
		return new SuccessParam(SuccessStatus.CLASS_ADDED);
		
	}
	
	@ResponseBody
	@PatchMapping("/class")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateClass(@Valid @RequestBody ClassNameUpdateInParam inParam) {	
		
		classService.updateClassName(inParam);
		
		return new SuccessParam(SuccessStatus.CLASS_UPDATED);
		
	}
	
	@ResponseBody
	@DeleteMapping("/class/{className}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam deleteClass(@PathVariable String className) {
		
		classService.deleteClass(className);
		
		return new SuccessParam(SuccessStatus.CLASS_DELETED);
	}
	
	
	@ResponseBody
	@GetMapping("/class/nomal")
	@ResponseStatus(value=HttpStatus.OK)
	public ClassOutParam initClassNomalList(@Valid @ModelAttribute ClassInParam inParam) {	
		
		return classService.readAllNomal(inParam);
		
	}
	
	@ResponseBody
	@PostMapping("/class/nomal")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateClassNomalStudent(@Valid @RequestBody ClassUpdateInParam inParam) {	
		
		classService.updateClassNomalStudent(inParam);
		
		return new SuccessParam(SuccessStatus.CLASS_SUCCESS);
		
	}
	
	@ResponseBody
	@GetMapping("/class/nomal/none")
	@ResponseStatus(value=HttpStatus.OK)
	public List<ClassStudent> readClassNomalNoneStudent() {

		return classService.readClassNomalNoneStudent();
		
	}
	
	@ResponseBody
	@PatchMapping("/class/nomal/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateClassNomalNoneStudent(@PathVariable int idx) {

		classService.updateClassNomalNoneStudent(idx);
		
		return new SuccessParam(HttpStatus.OK);
		
	}

	@ResponseBody
	@GetMapping("/class/test")
	@ResponseStatus(value=HttpStatus.OK)
	public ClassOutParam initCLassTestList(@Valid @ModelAttribute ClassInParam inParam) {	
		
		return classService.readAllTest(inParam);
		
	}
	
	@ResponseBody
	@PostMapping("/class/test")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateClassTestStudent(@Valid @RequestBody ClassUpdateInParam inParam) {	
		
		classService.updateClassTestStudent(inParam);
		
		return new SuccessParam(SuccessStatus.CLASS_SUCCESS);
		
	}
	
	@ResponseBody
	@GetMapping("/class/test/none")
	@ResponseStatus(value=HttpStatus.OK)
	public List<ClassStudent> readClassTestNoneStudent() {

		return classService.readClassTestNoneStudent();
		
	}
	
	@ResponseBody
	@PatchMapping("/class/test/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateClassTestNoneStudent(@PathVariable int idx) {

		classService.updateClassTestNoneStudent(idx);
		
		return new SuccessParam(HttpStatus.OK);
		
	}
	
	

}
