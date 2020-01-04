package com.app.components.student.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.student.param.ReadInParam;
import com.app.components.student.param.ReadLatestInParam;
import com.app.components.student.param.ReadOutParam;
import com.app.components.student.param.StatusUpdateInParam;
import com.app.components.student.param.StudentNameInParam;

public interface StudentDao {
	
	public List<StudentDto> readAll(ReadInParam inParam) throws DataAccessException;
	
	public List<StudentDto> readAllExcel() throws DataAccessException;
	
	public StudentEntity readOne(int idx) throws DataAccessException;
	
	public StudentEntity studentCheck(String name) throws DataAccessException;
	
	public ReadOutParam countAll()  throws DataAccessException;
	
	public void createOne(StudentEntity entity) throws DataAccessException;
	
	public void updateOne(StudentEntity entity) throws DataAccessException;
	
	public List<StudentNameDto> readAllNames(StudentNameInParam inParam) throws DataAccessException;
	
	public StudentOneDto studentOne(int idx) throws DataAccessException;
	
	public void updateStatus(StatusUpdateInParam inParam) throws DataAccessException;
	
	public void deleteOne(int idx) throws DataAccessException;
	
	public void updateHrtDeleted(String email) throws DataAccessException;
	
	public List<StudentDto> readLatest(ReadLatestInParam inParam) throws DataAccessException;
	
}
