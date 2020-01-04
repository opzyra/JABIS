package com.app.components.student.param;

import java.util.List;

import com.app.components.counse.data.CounseEntity;
import com.app.components.student.data.StudentOneDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentOneOutParam {
	
	private StudentOneDto student;
	
	private List<CounseEntity> counse;
	
}
