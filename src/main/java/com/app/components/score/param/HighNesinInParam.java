package com.app.components.score.param;

import java.util.List;

import com.app.components.score.data.MiddleNesinEntity;

import lombok.Data;

@Data
public class HighNesinInParam {

	private int studentIdx;
	
	private int mode;
	
	private int year;
	
	private int type;
	
	private List<HighNesinParam> highNesin;
	
}
