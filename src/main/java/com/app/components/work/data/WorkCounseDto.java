package com.app.components.work.data;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class WorkCounseDto {
	
	private Integer idx;
	
	private String name;
	
	private String school;
	
	private Integer grade;
	
	private boolean writeOk;
	
	private Integer counseIdx;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone="Asia/Seoul")
	private Date counseDate;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone="Asia/Seoul")
	private Date writeDate;
	
}
