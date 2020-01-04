package com.app.components.member.param;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class ResetPasswordInParam {

	@NotEmpty
	private String email;
	
	private String password;
	
}
