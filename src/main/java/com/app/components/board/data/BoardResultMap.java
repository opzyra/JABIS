package com.app.components.board.data;

import java.io.Serializable;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class BoardResultMap implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String email;
	
	private String name;
	
	private String avatar;
	
	private Integer idx;
	
	private Integer categoryCode;
	
	private boolean importent;
	
	private String title;
	
	private String contents;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yy.MM.dd HH:mm", timezone="Asia/Seoul")
	private Timestamp writeDate;
	
	private Integer viewCount;
	
	private Integer commentsCount;
	
	private Integer authLevel;
	
}
