package com.app.components.comments.param;

import java.util.List;

import com.app.components.comments.data.CommentsResultMap;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentsOutParam {

	private int countPage;
	
	private List<CommentsResultMap> comments;
	
}
