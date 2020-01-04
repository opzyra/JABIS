package com.app.components.student.param;

import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.app.components.sibling.data.SiblingEntity;
import com.app.components.sibling.data.SiblingJoinDto;

import lombok.Data;

@Data
public class UpdateInParam {
	
	@NotNull
	private Integer studentIdx;
	
	@NotEmpty
	private String name;
	
	@NotNull
	private Integer gender;
	
	@NotNull
	private Integer status;
	
	private String elSchool;
	
	private String mdSchool;
	
	private String hiSchool;
	
	private String hrtEmail;
	
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
	
	private List<SiblingJoinDto> sibling;
	
	private List<Integer> deleteIdx;
	
	
}
