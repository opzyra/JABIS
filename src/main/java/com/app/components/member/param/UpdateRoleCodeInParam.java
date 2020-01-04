package com.app.components.member.param;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UpdateRoleCodeInParam {

	@NotEmpty
	private String email;
	
	@NotNull
	private int roleCode;
	
	private String avatar;
	
}
