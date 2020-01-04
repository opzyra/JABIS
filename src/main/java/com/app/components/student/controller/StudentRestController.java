package com.app.components.student.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.poi.ss.usermodel.Workbook;
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
import com.app.components.member.data.MemberEntity;
import com.app.components.student.data.StudentDto;
import com.app.components.student.data.StudentEntity;
import com.app.components.student.data.StudentNameDto;
import com.app.components.student.data.StudentOneDto;
import com.app.components.student.param.CreateInParam;
import com.app.components.student.param.ReadInParam;
import com.app.components.student.param.ReadLatestInParam;
import com.app.components.student.param.ReadOutParam;
import com.app.components.student.param.StatusUpdateInParam;
import com.app.components.student.param.StudentNameInParam;
import com.app.components.student.param.StudentOneOutParam;
import com.app.components.student.param.UpdateInParam;
import com.app.components.student.service.StudentService;
import com.app.security.Principal;
import com.app.status.ErrorStatus;
import com.app.status.SuccessStatus;

@RestController
@RequestMapping("/api")
public class StudentRestController {

	@Autowired
	private StudentService studentService;
	
	@ResponseBody
	@GetMapping("/student")
	@ResponseStatus(value=HttpStatus.OK)
	public ReadOutParam readStudent(@Valid @ModelAttribute ReadInParam inParam) {

		return studentService.readAll(inParam);

	}
	
	@ResponseBody
	@GetMapping("/student/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public StudentEntity readStudent(@PathVariable int idx) {
		StudentEntity entity = studentService.readOne(idx);
		
		if(entity == null) {
			throw new ApplicationException(ErrorStatus.INVALID_ACCESS);
		}
		
		return entity;
		
		
	}
	
	@ResponseBody
	@GetMapping("/student/update/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public StudentOneDto readUpdateStudent(@PathVariable int idx) {
		
		return studentService.readUpdateStudentOne(idx);
		
		
	}
	
	@ResponseBody
	@GetMapping("/student/one/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public StudentOneOutParam readOneStudent(@PathVariable int idx) {
		
		return studentService.readStudentOne(idx);
		
		
	}
	
	@ResponseBody
	@PostMapping("/student")
	@ResponseStatus(value=HttpStatus.OK)
	public int createStudent(@Valid @RequestBody CreateInParam inParam) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		return studentService.createStudent(inParam, member.getEmail());
		
	}
	
	@ResponseBody
	@PatchMapping("/student")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateStudent(@Valid @RequestBody UpdateInParam inParam) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		studentService.updateStudent(inParam, member.getEmail());
		
		return new SuccessParam(SuccessStatus.STUDENT_UPDATED);
		
	}
	
	@ResponseBody
	@DeleteMapping("/student/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateStudent(@PathVariable int idx) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		if(member.getRoleCode() < 3) {
			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
		}
		
		studentService.deleteStudent(idx);
		
		return new SuccessParam(SuccessStatus.STUDENT_DELETE);
		
	}
	
	@ResponseBody
	@PatchMapping("/student/status")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateStatusStudent(@Valid @RequestBody StatusUpdateInParam inParam) {
		
		studentService.updateStatus(inParam);
		
		return new SuccessParam(SuccessStatus.STUDENT_STATUS_UPDATED);
		
	}
	
	@ResponseBody
	@GetMapping("/student/names")
	@ResponseStatus(value=HttpStatus.OK)
	public List<StudentNameDto> readStudentNames(@ModelAttribute StudentNameInParam inParam) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		if(!inParam.getEmail().equals("") && !member.getEmail().equals(inParam.getEmail())) {
			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
		}
		
		return studentService.readAllNames(inParam);
	}
	
	@ResponseBody
	@GetMapping("/student/excel")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam printExcelAllStudent(@Valid @ModelAttribute ReadInParam inParam, HttpServletResponse response) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		if(member.getRoleCode() < 3) {
			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
		}
		
		Workbook wb = studentService.studentListExcel(inParam);
	    
	    try {
			wb.write(response.getOutputStream());
			wb.close();
			
		} catch (IOException e) {

			throw new ApplicationException(ErrorStatus.FAILD_EXCEL, e);
			
		}

		return new SuccessParam(SuccessStatus.SUCCESS_EXCEL);
	}
	
	@ResponseBody
	@GetMapping("/student/latest")
	@ResponseStatus(value=HttpStatus.OK)
	public List<StudentDto> readLatestStudent(@Valid @ModelAttribute ReadLatestInParam inParam) {

		return studentService.readLatest(inParam);

	}
	
	
	
}
