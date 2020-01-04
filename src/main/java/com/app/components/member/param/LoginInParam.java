package com.app.components.member.param;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class LoginInParam {

	@NotEmpty
	private String email;
	
	@NotEmpty
	private String password;
	
	private boolean rememberMe;
	
}
