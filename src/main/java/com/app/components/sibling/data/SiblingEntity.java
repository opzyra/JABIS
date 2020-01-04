package com.app.components.sibling.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SiblingEntity {

	private Integer idx;
	
	private Integer studentIdx;
	
	private String relation;
	
	private String name;
	
	private String school;
	
	private Integer grade;
	
	private Integer gradeCode;
	
	private String memo;
	
}
