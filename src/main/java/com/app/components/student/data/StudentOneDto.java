package com.app.components.student.data;

import java.sql.Timestamp;
import java.util.List;

import com.app.components.sibling.data.SiblingJoinDto;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class StudentOneDto {

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
	
	private String classNomal;
	
	private String classTest;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone="Asia/Seoul")
	private Timestamp regDate;
	
	private String hrtEmail;
	
	private String hrtName;
	
	private List<SiblingJoinDto> sibling;
	
	private String leaveDate;
	
}
