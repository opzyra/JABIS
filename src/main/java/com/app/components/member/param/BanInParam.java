package com.app.components.member.param;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class BanInParam {

	@NotEmpty
	private String email;
	
	@NotNull
	private Integer enabledCode;
	
	private String authStr;
	
}
