package com.app.components.work.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.components.work.data.WorkCounseDto;
import com.app.components.work.data.WorkDao;
import com.app.components.work.data.WorkMainDto;
import com.app.components.work.param.WorkCounseInParam;
import com.app.components.work.param.WorkCounseMonthInParam;
import com.app.components.work.param.WorkInParam;

@Service
public class WorkService {

	@Autowired
	private SqlSession sqlSession;
	
	public WorkMainDto readWorkMain(WorkInParam inParam) {
		return sqlSession.getMapper(WorkDao.class).readWorkMain(inParam);
	}
	
	public List<WorkCounseDto> readWorkCounse(WorkCounseInParam inParam){
		return sqlSession.getMapper(WorkDao.class).readWorkCounse(inParam);
	} 
	
	public List<WorkCounseDto> readWorkMonthCounse(WorkCounseMonthInParam inParam){
		return sqlSession.getMapper(WorkDao.class).readWorkCounseMonth(inParam);
	} 
	
}
