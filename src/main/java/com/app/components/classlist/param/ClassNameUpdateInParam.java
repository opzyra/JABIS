package com.app.components.classlist.param;

import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class ClassNameUpdateInParam {

	@NotEmpty
	@Length(max=20)
	private String className;
	
	@NotEmpty
	private String originName;
	
}
