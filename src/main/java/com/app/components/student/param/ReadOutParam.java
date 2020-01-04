package com.app.components.student.param;

import java.util.List;

import com.app.components.student.data.StudentDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReadOutParam {

	private int allCount;
	
	private int standbyCount;
	
	private int nowCount;
	
	private int deletedCount;
	
	private int breakCount;
	
	private List<StudentDto> students;
	
}
