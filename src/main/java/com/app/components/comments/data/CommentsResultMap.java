package com.app.components.comments.data;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class CommentsResultMap {
	
	private Integer idx;
	
	private Integer boardIdx;
	
	private String email;
	
	private String name;
	
	private String avatar;
	
	private String contents;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yy.MM.dd HH:mm", timezone="Asia/Seoul")
	private Timestamp writeDate;
	
}
