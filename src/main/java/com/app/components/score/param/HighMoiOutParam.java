package com.app.components.score.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HighMoiOutParam {
	
	private Integer scoreIdx;
	
	private Integer subjectCode;
	
	private double score;
	
	private Integer rating;
	
	private Integer ranking;
	
	private Integer idx;
	
	private String name;
	
	private Integer highAverage;
	
}
