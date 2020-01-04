package com.app.components.data.param;

import java.sql.Date;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class TeacherReadInParam {
	
	@NotNull
	private Date start;
	
	@NotNull
	private Date end;
	
}
