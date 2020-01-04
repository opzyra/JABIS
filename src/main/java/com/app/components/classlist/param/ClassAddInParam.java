package com.app.components.classlist.param;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class ClassAddInParam {

	@NotNull
	private int type;
	
	@NotEmpty
	@Length(max=20)
	private String className;
	
}
