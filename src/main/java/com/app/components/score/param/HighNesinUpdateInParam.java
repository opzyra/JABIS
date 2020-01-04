package com.app.components.score.param;

import java.util.List;

import com.app.components.score.data.HighNesinEntity;

import lombok.Data;

@Data
public class HighNesinUpdateInParam {
	
	private int idx;

	private List<HighNesinEntity> highNesin;
	
}
