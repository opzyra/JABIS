package com.app.components.subject.param;

import java.util.List;

import com.app.components.subject.data.SubjectEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReadOutParam {

	private int countPage;
	
	private List<SubjectEntity> subject;
	
}
