package com.app.components.classlist.param;

import java.util.List;

import com.app.components.classlist.data.ClassDto;
import com.app.components.hrt.data.HrtDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClassOutParam {

	private int classCount;
	
	private int studentAllCount;
	
	private int studentNoneCount;
	
	private int countPage;
	
	private List<ClassDto> list;
	
}
