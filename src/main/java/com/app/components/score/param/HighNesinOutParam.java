package com.app.components.score.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HighNesinOutParam {
	
	private Integer scoreIdx;
	
	private Integer subjectCode;
	
	private double score;
	
	private Integer rating;
	
	private Integer unit;
	
	private Integer idx;
	
	private String name;
	
	private Integer order;
	
	private Double highAverage;
	
}
