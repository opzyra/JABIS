package com.app.components.student.param;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class StatusUpdateInParam {

	private int idx;
	
	private int status;
	
	private Timestamp regDate;
	
}
