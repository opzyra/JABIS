package com.app.components.data.data;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class TeacherDto {

	private String email;
	
	private String name;
	
	private String phone;
	
	private Integer roleCode;
	
	private Integer subjectCode;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Timestamp accessLastDate;
	
	private Integer hrtCount;
	
	private Integer counseCount;
	
	private Integer monthCount;
	
}
