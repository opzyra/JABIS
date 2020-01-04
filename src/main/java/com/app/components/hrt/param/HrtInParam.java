package com.app.components.hrt.param;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class HrtInParam {

	private String query;

	@NotNull
	private int currentPage;
	
	@NotNull
	private int limit;
	
}
