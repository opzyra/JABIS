package com.app.components.student.param;

import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.app.components.sibling.data.SiblingEntity;

import lombok.Data;

@Data
public class CreateInParam {
	
	@NotEmpty
	private String name;
	
	@NotNull
	private Integer gender;
	
	@NotNull
	private Integer status;
	
	private String elSchool;
	
	private String mdSchool;
	
	private String hiSchool;
	
	@NotNull
	private Integer grade;
	
	@NotEmpty
	private String phone;
	
	@NotEmpty
	private String parentPhone;
	
	@NotEmpty
	private String zoneCode;
	
	@NotEmpty
	private String addressApi;
	
	@NotEmpty
	private String addressInput;
	
	@NotNull
	private Integer car;
	
	private String recommend;
	
	private List<SiblingEntity> sibling;
	
	private List<Integer> deletedIdx;
	
	
}
