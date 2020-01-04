package com.app.components.classlist.param;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class ClassUpdateInParam {

	@NotEmpty
	private String name;
	
	@NotEmpty
	private Integer[] idxList;
	
}
