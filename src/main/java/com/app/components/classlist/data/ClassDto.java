package com.app.components.classlist.data;

import java.util.List;

import lombok.Data;

@Data
public class ClassDto {

	private String email;
	
	private String className;
	
	private List<ClassStudent> students;
	
}
