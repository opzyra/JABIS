package com.app.components.student.data;

import java.io.Serializable;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentDto implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

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
	
	private boolean car;
	
	private String recommend;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone="Asia/Seoul")
	private Timestamp regDate;
	
	private String hrtEmail;
	
	private String classNomal;
	
	private String classTest;
	
	private String writerEmail;
	
	private String hrtName;
}
