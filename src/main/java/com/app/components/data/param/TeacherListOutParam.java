package com.app.components.data.param;

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
public class TeacherListOutParam {

	private String email;
	
	private String name;
	
	private String status;
	
	private String subject;
	
	private String phone;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Timestamp accessLastDate;
	
	private int hrtCount;
	
	private int counseCount;
	
	private int monthCount;
	
}
