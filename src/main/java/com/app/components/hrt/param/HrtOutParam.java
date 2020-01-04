package com.app.components.hrt.param;

import java.util.List;

import com.app.components.hrt.data.HrtDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HrtOutParam {

	private int memberCount;
	
	private int studentAllCount;
	
	private int studentNoneCount;
	
	private int countPage;
	
	private List<HrtDto> hrt;
	
	private List<HrtDto> hrtAll;
	
}
