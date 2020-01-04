package com.app.components.subject.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.subject.param.CreateInParam;
import com.app.components.subject.param.ReadInParam;
import com.app.components.subject.param.UpdateInParam;

public interface SubjectDao {

	public List<SubjectEntity> readAll(ReadInParam inParam) throws DataAccessException;

	public List<SubjectEntity> readAllNoCondition() throws DataAccessException;
	
	public int count() throws DataAccessException;
	
	public void createOne(CreateInParam inParam) throws DataAccessException;
	
	public void updateOne(UpdateInParam inParam) throws DataAccessException;
	
	public void updateOrder(SubjectEntity entity) throws DataAccessException;

	public Integer maxCount() throws DataAccessException;
}
