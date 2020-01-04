package com.app.components.counse.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.counse.param.ListInParam;

public interface CounseDao {

	public CounseEntity readOne(int studentIdx) throws DataAccessException;
	
	public CounseEntity readLastOne(int studentIdx) throws DataAccessException;
	
	public CounseDto readInit(int studentIdx) throws DataAccessException;
	
	public void updateOne(CounseEntity entity) throws DataAccessException;
	
	public void createOne(CounseEntity entity) throws DataAccessException;
	
	public int count(int studentIdx) throws DataAccessException;
	
	public List<CounseListDto> readAll(ListInParam inParam) throws DataAccessException;

	public void deleteOne(int idx) throws DataAccessException;
	
	public List<CounseEntity> readLatest(int studentIdx) throws DataAccessException;
	
}
