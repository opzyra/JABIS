package com.app.components.hrt.param;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class HrtUpdateInParam {

	@NotEmpty
	private String email;
	
	@NotEmpty
	private Integer[] idxList;
	
}
