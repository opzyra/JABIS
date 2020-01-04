package com.app.components.member.param;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class AuthInParam {

	@NotEmpty
	private String email;
	
	@NotEmpty
	private String authStr;
	
}
