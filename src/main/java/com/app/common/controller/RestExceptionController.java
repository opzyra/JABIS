package com.app.common.controller;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.app.common.exception.ApplicationException;
import com.app.common.param.ErrorParam;
import com.app.status.ErrorStatus;

@RestControllerAdvice
public class RestExceptionController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@ExceptionHandler(NullPointerException.class)
	@ResponseBody
	protected ErrorParam nullPointerExcoeption(ApplicationException e, HttpServletResponse response) {
		
		logger.error(e.getMessage(), e);
		
		response.setStatus(e.getStatus());
		
		return new ErrorParam(e.getErrorstatus());
	}
	
	@ExceptionHandler(ApplicationException.class)
	@ResponseBody
	protected ErrorParam handleDefaultExcoeption(ApplicationException e, HttpServletResponse response) {
		
		logger.debug(e.getMessage(), e);
		
		response.setStatus(e.getStatus());
		
		return new ErrorParam(e.getErrorstatus());
	}
	
	@ExceptionHandler(DataAccessException.class)
	@ResponseBody
	protected ErrorParam handleDataAccessException(DataAccessException e, HttpServletResponse response) {
		
		logger.error(e.getMessage(), e);
		
		response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
		
		return new ErrorParam(ErrorStatus.DB_ACCESS_ERROR);
	}
	
	@ExceptionHandler(BindException.class)
	@ResponseBody
	protected ErrorParam handleMultipartException(BindException e, HttpServletResponse response) {
		
		logger.error(e.getMessage(), e);
		
		response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
		
		return new ErrorParam(ErrorStatus.VALIDATION);
	}

	
	@ExceptionHandler(Exception.class)
	@ResponseBody
	protected ErrorParam handleGolbalExcoeption(Exception e, HttpServletResponse response) {
		
		logger.error(e.getMessage(), e);
		
		response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
		
		return new ErrorParam(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
	
}
