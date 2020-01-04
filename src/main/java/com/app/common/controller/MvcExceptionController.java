package com.app.common.controller;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
public class MvcExceptionController {

	private static final String NOT_FOUNT = "error/404";
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	
	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public String handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e, HttpServletResponse response) {
		response.setStatus(500);
		logger.error(e.getMessage(), e);
		return NOT_FOUNT;
	}
	
	@ExceptionHandler(MissingServletRequestParameterException.class)
	public String handleMissingServletRequestParameterException(MissingServletRequestParameterException e, HttpServletResponse response) {
		response.setStatus(500);
		logger.error(e.getMessage(), e);
		return NOT_FOUNT;
	}
	
	@ExceptionHandler(MissingPathVariableException.class)
	public String handleMissingPathVariableException(MissingPathVariableException e, HttpServletResponse response) {
		response.setStatus(500);
		logger.error(e.getMessage(), e);
		return NOT_FOUNT;
	}
	
}
