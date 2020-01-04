package com.app.components.student.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentNameDto {

	private Integer idx;
	
	private String name;
	
	private String school;
	
	private Integer grade;
	
	private Integer gradeCode;
	
	private String hrtName;
	
}
