package com.app.components.work.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.work.param.WorkCounseInParam;
import com.app.components.work.param.WorkCounseMonthInParam;
import com.app.components.work.param.WorkInParam;

public interface WorkDao {

	public List<WorkCounseDto> readWorkCounse(WorkCounseInParam inParam) throws DataAccessException;
	
	public List<WorkCounseDto> readWorkCounseMonth(WorkCounseMonthInParam inParam) throws DataAccessException;

	public WorkMainDto readWorkMain(WorkInParam inParam) throws DataAccessException;

	
}
