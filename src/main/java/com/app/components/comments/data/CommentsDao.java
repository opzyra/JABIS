package com.app.components.comments.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.comments.param.CommentsInParam;
import com.app.components.comments.param.ModifyInParam;
import com.app.components.comments.param.WriteInParam;

public interface CommentsDao {
	
	public List<CommentsResultMap> read(CommentsInParam inParam) throws DataAccessException;
	
	public void createOne(WriteInParam in) throws DataAccessException;

	public int modifyOne(ModifyInParam inParam) throws DataAccessException;

	public int deleteOne(ModifyInParam inParam) throws DataAccessException;
	
}
