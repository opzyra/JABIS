package com.app.components.notification.param;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UpdateInParam {

	@NotNull
	private Integer idx;
	
}
