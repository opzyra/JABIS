package com.app.components.counse.param;

import java.sql.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import com.app.components.sibling.data.SiblingEntity;

import lombok.Data;

@Data
public class CreateInParam {

	private int idx;
	
	@NotNull
	private int studentIdx;
	
	private int mode;
	
	@NotNull
	private Date counseDate;
	
	private String future;
	
	private String studyStyle;
	
	private String studentStyle;
	
	private String parentStyle;
	
	private String parentRequest;
	
	private String studentCounse;
	
	private String parentCounse;
	
	private int siblingEdit;
	
	private List<SiblingEntity> sibling;
	
}
