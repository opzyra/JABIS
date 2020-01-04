package com.app.components.board.data;

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
public class BoardEntity {

	private Integer idx;
	
	private String email;
	
	private Integer categoryCode;
	
	private boolean importent;
	
	private String title;
	
	private String contents;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd HH:mm:ss", timezone="Asia/Seoul")
	private Timestamp writeDate;
	
	private Timestamp deleteDate;
	
	private boolean deleteStatus;
	
	private Integer viewCount;
	
	private Integer commentsCount;
	
	private Integer authLevel;
	
}
