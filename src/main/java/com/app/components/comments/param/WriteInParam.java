package com.app.components.comments.param;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WriteInParam {

	@NotNull
	private int boardIdx;
	
	private String email;
	
	@NotEmpty
	private String contents;
	
}
