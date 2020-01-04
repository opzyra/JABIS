package com.app.components.subject.param;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class CreateInParam {

	@NotEmpty
	private String name;
	
	@NotEmpty
	private String description;
	
	private Integer order;
	
}
