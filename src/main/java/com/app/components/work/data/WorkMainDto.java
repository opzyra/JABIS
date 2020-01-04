package com.app.components.work.data;

import java.sql.Date;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class WorkMainDto {
	
	private String name;
	
	private Integer roleCode;
	
	private String avatar;
	
	private Integer hrtCount;
	
	private Integer counseCount;
	
	private Integer studentCount;
	
}
