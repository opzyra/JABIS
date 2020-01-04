package com.app.components.data.data;

import java.util.List;

import lombok.Data;

@Data
public class LeaveResultMap {
	
	private String hrtName;
	
	private Integer roleCode;
	
	private String roleName;
	
	private Integer hrtCount;
	
	private List<LeaveEntity> list;
	
}
