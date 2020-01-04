package com.app.components.classlist.param;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class ClassInParam {

	private String query;

	@NotNull
	private int currentPage;
	
	@NotNull
	private int limit;
	
}
