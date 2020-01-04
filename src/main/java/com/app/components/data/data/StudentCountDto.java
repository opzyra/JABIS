package com.app.components.data.data;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class StudentCountDto {
	
	private String email;
	
	private int year;
	
	private int month;
	
	private int studentCount;
	
}
