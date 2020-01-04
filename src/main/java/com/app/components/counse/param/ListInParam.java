package com.app.components.counse.param;

import java.sql.Date;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class ListInParam {

	@NotNull
	private int studentIdx;

	private Date start;
	
	private Date end;
	
}
