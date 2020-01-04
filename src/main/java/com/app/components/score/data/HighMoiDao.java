package com.app.components.score.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.score.param.HighMoiOutParam;
import com.app.components.score.param.HighNesinOutParam;
import com.app.components.score.param.MiddleNesinOutParam;

public interface HighMoiDao {
	
	public void createOne(HighMoiEntity entity) throws DataAccessException;
	
	public List<HighMoiOutParam> read(int idx) throws DataAccessException;
	
	public void deleteOne(int scoreIdx, int subjectCode) throws DataAccessException;

	public void updateOne(HighMoiEntity el) throws DataAccessException;
}
