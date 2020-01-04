package com.app.components.subject.param;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UpdateInParam {
	
	@NotNull
	private int idx;

	private String name;

	private String description;
	
}
