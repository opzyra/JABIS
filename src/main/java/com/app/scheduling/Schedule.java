package com.app.scheduling;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.app.components.data.data.DataDao;
import com.app.components.data.data.StudentCountDto;

@Component
public class Schedule {

	@Autowired
	private SqlSession sqlSession;
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Scheduled(cron="5 0 0 1 1 *")
	@Transactional(rollbackFor=Exception.class)
    public void setGradeNewYear() {
		
		sqlSession.getMapper(ScheduleDao.class).updateGrade();
		
		sqlSession.getMapper(ScheduleDao.class).updateStudentSchool();
		
		sqlSession.getMapper(ScheduleDao.class).updateSiblingSchool();
		
		logger.info("Springboot Scheduling Executed : setGradeNewYear");
		
    }
	
	@Scheduled(cron="5 0 0 25 * *")
	@Transactional(rollbackFor=Exception.class)
    public void setMonthStudentCount() {
		
		List<StudentCountDto> list = sqlSession.getMapper(DataDao.class).readStudentCount();
		
		for(int i=0; i<list.size(); i++) {
			sqlSession.getMapper(DataDao.class).createMonthCount(list.get(i));
		}
		
		logger.info("Springboot Scheduling Executed : setMonthStudentCount");
		
    }
	
}
