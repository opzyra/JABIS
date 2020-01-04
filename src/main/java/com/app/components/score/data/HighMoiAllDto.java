package com.app.components.score.data;

import java.util.List;

import com.app.components.score.param.MiddleNesinOutParam;

import lombok.Data;

@Data
public class HighMoiAllDto {

	private Integer idx;
	
	private Integer studentIdx;
	
	private Integer year;
	
	private Integer type;
	
	private String text;
	
	private List<HighMoiEntity> highMoi;
	
}
