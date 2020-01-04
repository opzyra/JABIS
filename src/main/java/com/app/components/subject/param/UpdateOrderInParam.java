package com.app.components.subject.param;

import java.util.List;

import com.app.components.subject.data.SubjectEntity;

import lombok.Data;

@Data
public class UpdateOrderInParam {

	private List<SubjectEntity> subject;
	
}
