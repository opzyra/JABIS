package com.app.components.member.param;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class PasswordChangeInParam {

	@NotEmpty
	private String originPass;
	
	@NotEmpty
	private String newPass;
	
}
