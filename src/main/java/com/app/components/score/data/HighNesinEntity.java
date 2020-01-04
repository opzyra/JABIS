package com.app.components.score.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HighNesinEntity {
	
	private Integer scoreIdx;
	
	private Integer subjectCode;
	
	private double score;
	
	private Integer rating;
	
	private Integer unit;
	
	private boolean newScore;
	
	private boolean update;
	
}
