package com.app.components.student.data;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentEntity {
	
	private Integer idx;
	
	private String name;
	
	private Integer gender;
	
	private Integer status;
	
	private String eSchool;
	
	private String mSchool;
	
	private String hSchool;
	
	private String school;
	
	private Integer grade;
	
	private Integer gradeCode;
	
	private String phone;
	
	private String parentPhone;
	
	private String zoneCode;
	
	private String addressApi;
	
	private String addressInput;
	
	private Integer car;
	
	private String recommend;
	
	private Timestamp regDate;
	
	private String hrtEmail;
	
	private String writerEmail;
	
	
}
