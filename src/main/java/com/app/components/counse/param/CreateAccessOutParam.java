package com.app.components.counse.param;

import com.app.components.counse.data.CounseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateAccessOutParam {
	
	private CounseDto counse;
	
	private int count;
	
}
