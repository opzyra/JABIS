package com.app.components.subject.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.common.exception.ApplicationException;
import com.app.components.subject.data.SubjectDao;
import com.app.components.subject.data.SubjectEntity;
import com.app.components.subject.param.CreateInParam;
import com.app.components.subject.param.ReadInParam;
import com.app.components.subject.param.ReadOutParam;
import com.app.components.subject.param.UpdateInParam;
import com.app.components.subject.param.UpdateOrderInParam;
import com.app.status.ErrorStatus;

@Service
public class SubjectService {

	@Autowired
	private SqlSession sqlSession;

	public ReadOutParam readAll(ReadInParam inParam){
		
		List<SubjectEntity> subject = sqlSession.getMapper(SubjectDao.class).readAll(inParam);
		
		int count = sqlSession.getMapper(SubjectDao.class).count();
		
		int countPage = count == 0 ? 1 : (count%inParam.getLimit()==0 ? count/inParam.getLimit() : count/inParam.getLimit()+1);
		
		return ReadOutParam.builder().countPage(countPage).subject(subject).build();
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void createOne(CreateInParam inParam) {
		Integer max = sqlSession.getMapper(SubjectDao.class).maxCount();
		
		try { 
			inParam.setOrder(max+1);
			sqlSession.getMapper(SubjectDao.class).createOne(inParam);
			
		}catch(DataIntegrityViolationException e) {
			
			throw new ApplicationException(ErrorStatus.DUPLICATE_SUBJECT, e);
			
		}catch(DataAccessException e) {
			
			throw new ApplicationException(ErrorStatus.DB_ACCESS_ERROR);
			
		}
		
		
		
	}
	
	public void updateOne(UpdateInParam inParam) {
		
		try {
			
			sqlSession.getMapper(SubjectDao.class).updateOne(inParam);
			
		}catch(DataIntegrityViolationException e) {
			
			throw new ApplicationException(ErrorStatus.DUPLICATE_SUBJECT, e);
			
		}catch(DataAccessException e) {
			
			throw new ApplicationException(ErrorStatus.DB_ACCESS_ERROR);
			
		}
		
	}
	
	public List<SubjectEntity> readAllNoCondition(){
		return sqlSession.getMapper(SubjectDao.class).readAllNoCondition();
	}
	
	public void updateOrder(UpdateOrderInParam inParam) {
		List<SubjectEntity> list = inParam.getSubject();
		
		for(int i=0; i<list.size(); i++) {
			SubjectEntity entity = list.get(i);
			sqlSession.getMapper(SubjectDao.class).updateOrder(entity);
		}
	}
	
}
