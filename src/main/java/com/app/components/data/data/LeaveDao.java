package com.app.components.data.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.data.param.TeacherReadInParam;

public interface LeaveDao {
	
	public void createOne(LeaveEntity inParam) throws DataAccessException;
	
	public void updateOne(LeaveEntity inParam) throws DataAccessException;
	
	public List<LeaveResultMap> readAll(TeacherReadInParam inParam) throws DataAccessException;
}
