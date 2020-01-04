package com.app.components.sibling.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.sibling.param.SearchInParam;
import com.app.components.sibling.param.UpdateMemoInParam;

public interface SiblingDao {
	
	public SiblingEntity readOne(int idx) throws DataAccessException;
	
	public List<SiblingEntity> readAll(int studentIdx) throws DataAccessException;
	
	public void createOne(SiblingEntity entity) throws DataAccessException;
	
	public int updateOne(SiblingEntity entity) throws DataAccessException;
	
	public int deleteOne(int idx) throws DataAccessException;
	
	public List<SiblingDto> readSiblingList(SearchInParam inParam) throws DataAccessException;
	
	public int count() throws DataAccessException;
	
	public void updateMemo(UpdateMemoInParam inParam)  throws DataAccessException;
	
}
