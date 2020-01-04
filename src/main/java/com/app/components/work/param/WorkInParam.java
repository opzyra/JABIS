package com.app.components.work.param;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class WorkInParam {
	
	@NotEmpty
	private String email;
	
	private Integer month;
	
	private Integer year;
	
}
