package com.app.components.score.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScoreEntity {

	private Integer idx;
	
	private Integer studentIdx;
	
	private Integer year;
	
	private Integer mode;
	
	private Integer type;
	
	private Double highAverage;
	
}
