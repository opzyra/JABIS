package com.app.components.work.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
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
import com.app.components.student.data.StudentEntity;
import com.app.components.student.data.StudentNameDto;
import com.app.components.student.data.StudentOneDto;
import com.app.components.student.param.CreateInParam;
import com.app.components.student.param.ReadInParam;
import com.app.components.student.param.ReadOutParam;
import com.app.components.student.param.StatusUpdateInParam;
import com.app.components.student.param.StudentNameInParam;
import com.app.components.student.param.StudentOneOutParam;
import com.app.components.student.param.UpdateInParam;
import com.app.components.student.service.StudentService;
import com.app.components.work.data.WorkCounseDto;
import com.app.components.work.data.WorkMainDto;
import com.app.components.work.param.WorkCounseInParam;
import com.app.components.work.param.WorkCounseMonthInParam;
import com.app.components.work.param.WorkInParam;
import com.app.components.work.service.WorkService;
import com.app.security.Principal;
import com.app.status.ErrorStatus;
import com.app.status.SuccessStatus;

@RestController
@RequestMapping("/api")
public class WorkRestController {

	@Autowired
	private WorkService workService;
	
	@ResponseBody
	@GetMapping("/work/counse/day")
	@ResponseStatus(value=HttpStatus.OK)
	public List<WorkCounseDto> readDayCounse(@Valid @ModelAttribute WorkCounseInParam inParam) {

		return workService.readWorkCounse(inParam);

	}
	
	@ResponseBody
	@GetMapping("/work/counse/month")
	@ResponseStatus(value=HttpStatus.OK)
	public List<WorkCounseDto> readMonthCounse(@Valid @ModelAttribute WorkCounseMonthInParam inParam) {

		return workService.readWorkMonthCounse(inParam);

	}
	
	@ResponseBody
	@GetMapping("/work")
	@ResponseStatus(value=HttpStatus.OK)
	public WorkMainDto readMain(@Valid @ModelAttribute WorkInParam inParam) {

		return workService.readWorkMain(inParam);

	}
	
	
}
