package com.app.components.data.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.data.param.TeacherReadInParam;

public interface DataDao {
	
	public List<TeacherDto> readTeacher(TeacherReadInParam inParam) throws DataAccessException;
	
	public List<StudentCountDto> readStudentCount() throws DataAccessException;
	
	public void createMonthCount(StudentCountDto inParam) throws DataAccessException;
}
