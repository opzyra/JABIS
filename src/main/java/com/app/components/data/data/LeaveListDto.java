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
public class LeaveListDto {

	private Integer studentIdx;
	
	private String studentName;
	
	private Date leaveDate;
	
	private Date changedDate;
	
}
