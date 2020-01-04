package com.app.components.score.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MiddleNesinOutParam {
	
	private Integer scoreIdx;
	
	private Integer subjectCode;
	
	private double score;
	
	private double average;
	
	private double deviation;
	
	private Integer applicants;
	
	private Integer ranking;
	
	private Integer idx;
	
	private String name;
	
}
