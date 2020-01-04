package com.app.components.score.param;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HighNesinScoreOutParam {

	private double highAverage;
	
	private List<HighNesinOutParam> highNesin;
	
}
