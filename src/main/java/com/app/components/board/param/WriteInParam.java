package com.app.components.board.param;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class WriteInParam {
	
	private int idx;
	
	@NotNull
	private int categoryCode;
	
	@NotEmpty
	private String title;
	
	@NotNull
	private int authLevel;
	
	@NotEmpty
	private String contents;
	
}
