package com.app.components.sibling.param;

import java.util.List;

import com.app.components.sibling.data.SiblingDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchOutParam {

	private int count;
	
	private List<SiblingDto> sibling;
	
}
