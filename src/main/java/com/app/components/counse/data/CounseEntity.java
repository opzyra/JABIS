package com.app.components.counse.data;

import java.sql.Date;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CounseEntity {
	
	private Integer idx;
	
	private Integer studentIdx;
	
	private Integer mode;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone="Asia/Seoul")
	private Date counseDate;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone="Asia/Seoul")
	private Date writeDate;
	
	private String writeEmail;
	
	private String studyStyle;
	
	private String studentStyle;
	
	private String future;
	
	private String parentStyle;
	
	private String parentRequest;
	
	private String studentCounse;
	
	private String parentCounse;
	
}
