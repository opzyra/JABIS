package com.app.components.score.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.score.param.MiddleNesinOutParam;

public interface MiddleNesinDao {
	
	public void createOne(MiddleNesinEntity entity) throws DataAccessException;
	
	public void updateOne(MiddleNesinEntity entity) throws DataAccessException;
	
	public List<MiddleNesinOutParam> read(int idx) throws DataAccessException;
}
