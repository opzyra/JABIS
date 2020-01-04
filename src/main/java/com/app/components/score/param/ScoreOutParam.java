package com.app.components.score.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScoreOutParam {

	private int idx;
	
	private int studentIdx;
	
	private String text;
	
	private Double highAverage;
	
}
