package com.app.components.comments.param;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class ModifyInParam {

	@NotNull
	private int idx;
	
	private int boardIdx;
	
	private String email;
	
	@NotEmpty
	private String contents;
	
}
