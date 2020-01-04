package com.app.components.member.param;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class PasswordCheckInParam {
	
	@NotEmpty
	private String password;
	
}
