package com.app.components.board.param;

import java.util.List;

import com.app.components.board.data.BoardResultMap;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecordOutParam {

	private int countPage;
	
	private List<BoardResultMap> boards;
	
}
