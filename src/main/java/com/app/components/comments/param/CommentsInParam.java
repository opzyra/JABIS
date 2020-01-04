package com.app.components.comments.param;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class CommentsInParam {

	@NotNull
	private int boardIdx;
	
	@NotNull
	private int offset;
	
	@NotNull
	private int limit;

	
}
