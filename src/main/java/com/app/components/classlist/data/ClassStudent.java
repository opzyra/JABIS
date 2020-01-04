package com.app.components.classlist.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClassStudent {

	private Integer idx;
	
	private String name;
	
	private String eSchool;
	
	private String mSchool;
	
	private String hSchool;
	
	private Integer grade;
	
}
