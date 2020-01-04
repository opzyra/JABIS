package com.app.components.score.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.board.param.RecordInParam;
import com.app.components.score.param.ScoreReadInParam;

public interface ScoreDao {
	
	public List<ScoreEntity> read(ScoreReadInParam inParam) throws DataAccessException;
	
	public void createOne(ScoreEntity entity) throws DataAccessException;
	
	public List<MiddleNesinAllDto> readAll(int studentIdx) throws DataAccessException;
	
	public List<HighMoiAllDto> readMoiAll(int studentIdx) throws DataAccessException;
	
	public void updateHighAverage(double average, int idx)  throws DataAccessException;

	public ScoreEntity readOne(int idx) throws DataAccessException;
	
	public void deleteOne(int idx) throws DataAccessException;
	
}
