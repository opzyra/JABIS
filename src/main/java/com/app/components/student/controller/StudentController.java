package com.app.components.student.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.components.student.param.ListInParam;
import com.app.components.student.service.StudentService;

@Controller
@RequestMapping("/app")
public class StudentController {

	@Autowired
	private StudentService studentService;
	
	public static final String LIST = "pages/student/main";
	
	public static final String CREATE = "pages/student/create";
	
	public static final String UPDATE = "pages/student/update";
	
	public static final String ONE = "pages/student/one";
	
	public static final String NOT = "error/403";
	
	@GetMapping("/student/list")
	public String listView(@ModelAttribute ListInParam inParam, Model model) {
		model.addAttribute("school", inParam.getSchool());
		model.addAttribute("grade", inParam.getGrade());
		model.addAttribute("status", inParam.getStatus());
		model.addAttribute("hrt", inParam.getHrt());
		model.addAttribute("className", inParam.getClassName());
		model.addAttribute("test", inParam.getTest());
		return LIST;
	}
	
	@GetMapping("/student/create")
	public String createView() {
		return CREATE;
	}
	
	@GetMapping("/student/{studentIdx}")
	public String studentOneView(@PathVariable int studentIdx, Model model) {
		
		// 담임의 경우 자신의 학생이 아니라면 열람이 불가능
		boolean isHrt = studentService.isHrtStudent(studentIdx);
		
		if(!isHrt) {
			return NOT;
		}
		
		model.addAttribute("studentIdx", studentIdx);
		return ONE;
	}

	@GetMapping("/student/update/{studentIdx}")
	public String updateView(@PathVariable int studentIdx, Model model) {
		model.addAttribute("studentIdx", studentIdx);
		return UPDATE;
	}
	
	
}
