package com.app.util.swal;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SwalConstructor {

	private String title;
	
	private String text;
	
	private String icon;
	
	private String button;
	
}
