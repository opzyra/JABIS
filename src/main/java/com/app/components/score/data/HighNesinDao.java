package com.app.components.score.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.score.param.HighNesinOutParam;
import com.app.components.score.param.MiddleNesinOutParam;

public interface HighNesinDao {
	
	public void createOne(HighNesinEntity entity) throws DataAccessException;
	
	public List<HighNesinOutParam> read(int idx) throws DataAccessException;
	
	public void deleteOne(int scoreIdx, int subjectCode) throws DataAccessException;

	public void updateOne(HighNesinEntity el) throws DataAccessException;
}
