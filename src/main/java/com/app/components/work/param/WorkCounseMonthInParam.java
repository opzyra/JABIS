package com.app.components.work.param;

import java.sql.Date;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class WorkCounseMonthInParam {

	@NotEmpty
	private String email;
	
	@NotNull
	private Date start;
	
	@NotNull
	private Date end;
	
}
