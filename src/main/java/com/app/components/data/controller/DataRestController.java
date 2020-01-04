package com.app.components.data.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.components.data.data.LeaveResultMap;
import com.app.components.data.param.TeacherListOutParam;
import com.app.components.data.param.TeacherReadInParam;
import com.app.components.data.service.DataService;

@RestController
@RequestMapping("/api")
public class DataRestController {
	
	@Autowired
	private DataService dataService;
	
	@ResponseBody
	@GetMapping("/teacher")
	@ResponseStatus(value=HttpStatus.OK)
	public List<TeacherListOutParam> readTeacher(@Valid @ModelAttribute TeacherReadInParam inParam){
		return dataService.readTeacher(inParam);
	}
	
	@ResponseBody
	@GetMapping("/leave")
	@ResponseStatus(value=HttpStatus.OK)
	public List<LeaveResultMap> readLeave(@Valid @ModelAttribute TeacherReadInParam inParam){
		return dataService.readLeave(inParam);
	}
}
