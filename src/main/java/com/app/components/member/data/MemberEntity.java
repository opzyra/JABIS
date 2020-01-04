package com.app.components.member.data;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberEntity {
	
	private Integer idx;
	
	private String email;

	@JsonIgnore
	private String password;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone="Asia/Seoul")
	private Timestamp passwordUpdate;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone="Asia/Seoul")
	private Timestamp regDate;
	
	private Timestamp deleteDate;
	
	private Timestamp expireDate;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd HH:mm:ss", timezone="Asia/Seoul")
	private Timestamp accessLastDate;

	private Integer accessTryCount;
	
	private Integer enabledCode;
	
	private boolean deleteStatus;
	
	private String name;
	
	private String phone;
	
	private Integer roleCode;
	
	private String authStr;
	
	private int subjectCode;
	
	private String avatar; 
	
}
