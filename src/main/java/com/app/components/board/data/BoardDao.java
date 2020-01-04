package com.app.components.board.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.board.param.NoticeLatestInParam;
import com.app.components.board.param.RecordInParam;

public interface BoardDao {
	
	public List<BoardResultMap> read(RecordInParam inParam) throws DataAccessException;
	
	public int count(RecordInParam inParam) throws DataAccessException;
	
	public BoardResultMap readOne(int idx) throws DataAccessException;
	
	public void createOne(BoardEntity entity) throws DataAccessException;
	
	public void updateViewCount(int idx) throws DataAccessException;
	
	public void updateCommentsCount(int idx, int count) throws DataAccessException;

	public int updateOne(BoardEntity entity) throws DataAccessException;

	public int deleteOne(int idx, String email) throws DataAccessException;
	
	public List<BoardResultMap> readLatest(NoticeLatestInParam inParam) throws DataAccessException;
}
