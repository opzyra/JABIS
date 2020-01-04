package com.app.components.counse.data;

import java.util.List;

import com.app.components.sibling.data.SiblingEntity;

import lombok.Data;

@Data
public class CounseDto {

	private Integer idx;
	
	private String name;
	
	private String school;
	
	private Integer grade;
	
	private Integer gradeCode;
	
	private List<SiblingEntity> sibling;
	
	
}
