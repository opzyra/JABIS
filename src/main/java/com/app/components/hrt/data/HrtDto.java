package com.app.components.hrt.data;

import java.util.List;

import com.app.components.student.data.StudentEntity;

import lombok.Data;

@Data
public class HrtDto {

	private String email;
	
	private String memberName;
	
	private List<HrtStudent> students;
	
}
