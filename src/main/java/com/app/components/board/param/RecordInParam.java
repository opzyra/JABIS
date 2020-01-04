package com.app.components.board.param;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class RecordInParam {
	
	@NotNull
	private int categoryCode;
	
	private String query;
	
	@NotEmpty
	private String order;
	
	@NotNull
	private int offset;
	
	@NotNull
	private int limit;
	
	private int roleCode;
	
}
