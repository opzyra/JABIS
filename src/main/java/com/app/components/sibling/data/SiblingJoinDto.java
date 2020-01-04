package com.app.components.sibling.data;

import lombok.Data;

@Data
public class SiblingJoinDto {

	private Integer siblingIdx;
	
	private String siblingRelation;
	
	private String siblingName;
	
	private String siblingSchool;
	
	private Integer siblingGrade;
	
	private Integer siblingGradeCode;
	
	private boolean siblingUpdated;
	
}
