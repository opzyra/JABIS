package com.app.components.score.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HighMoiEntity {
	
	private Integer scoreIdx;
	
	private Integer subjectCode;
	
	private double score;
	
	private Integer rating;
	
	private String name;
	
	private Integer order;
	
	private boolean newScore;
	
	private boolean update;
	
	
	
}
