package com.app.components.student.param;

import java.io.Serializable;
import java.sql.Date;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class ReadLatestInParam implements Serializable{
    
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@NotNull
	private Date start;
	
	@NotNull
	private Date end;
	
}
