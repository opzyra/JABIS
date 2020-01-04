package com.app.components.sibling.param;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class UpdateMemoInParam {

	@NotNull
	private Integer idx;
	
	@Size(max=300)
	private String memo;
	
}
