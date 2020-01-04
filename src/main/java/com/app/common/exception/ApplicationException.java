package com.app.common.exception;

import com.app.status.ErrorStatus;

public class ApplicationException extends RuntimeException {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private ErrorStatus status;
	
	public ApplicationException(ErrorStatus status) {
		super(status.getMessage());
		this.status = status;
	}
	
	public ApplicationException(ErrorStatus status, Exception e) {
		super(status.getMessage(), e);
		this.status = status;
	}
	
	public String getReason() {
		return status.getReason();
	}
	
	public String getMessage() {
		return status.getMessage();
	}
	
	public int getStatus() {
		return status.getStatus();
	}
	
	public ErrorStatus getErrorstatus() {
		return status;
	}
	
	

}
