package com.app.components.member.param;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UpdateSubjectCodeInParam {

	@NotEmpty
	private String email;
	
	@NotNull
	private int subjectCode;
	
	private String avatar;
	
}
