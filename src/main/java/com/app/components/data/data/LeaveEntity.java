package com.app.components.data.data;

import java.sql.Date;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaveEntity {
	
	private Integer studentIdx;
	
	private String hrtEmail;
	
	private Date leaveDate;
	
	private Date changedDate;
	
	private Integer status;
	
}
