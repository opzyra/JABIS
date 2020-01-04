package com.app.scheduling;

import org.springframework.dao.DataAccessException;

public interface ScheduleDao {
	
	public void updateGrade() throws DataAccessException;
	
	public void updateStudentSchool() throws DataAccessException;
	
	public void updateSiblingSchool() throws DataAccessException;
	
}
