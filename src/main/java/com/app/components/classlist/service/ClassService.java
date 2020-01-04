package com.app.components.classlist.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.common.exception.ApplicationException;
import com.app.components.classlist.data.ClassCount;
import com.app.components.classlist.data.ClassDao;
import com.app.components.classlist.data.ClassDto;
import com.app.components.classlist.data.ClassStudent;
import com.app.components.classlist.param.ClassAddInParam;
import com.app.components.classlist.param.ClassInParam;
import com.app.components.classlist.param.ClassNameUpdateInParam;
import com.app.components.classlist.param.ClassOutParam;
import com.app.components.classlist.param.ClassUpdateInParam;
import com.app.status.ErrorStatus;

@Service
public class ClassService {

	@Autowired
	private SqlSession sqlSession;

	public void addClass(ClassAddInParam inParam) {
		try {
			
			sqlSession.getMapper(ClassDao.class).addClass(inParam);
			
		} catch(DataIntegrityViolationException e) {
			
			throw new ApplicationException(ErrorStatus.DUPLICATE_CLASS);
			
		}
		
	}
	
	public void updateClassName(ClassNameUpdateInParam inParam) {
		
		try {
			
			sqlSession.getMapper(ClassDao.class).updateClass(inParam);
			
		} catch(DataIntegrityViolationException e) {
			
			throw new ApplicationException(ErrorStatus.DUPLICATE_CLASS);
			
		}
		
	}
	
	public void deleteClass(String className) {
		
		sqlSession.getMapper(ClassDao.class).deleteClass(className);
		
	}
	
	public ClassOutParam readAllNomal(ClassInParam inParam) {
		
		List<ClassDto> list = new ArrayList<>();
		
		List<ClassDto> classdtos = sqlSession.getMapper(ClassDao.class).readAllNomal(inParam);

		ClassCount classCount = sqlSession.getMapper(ClassDao.class).ClassCountNomal();
		
		
		int start = inParam.getCurrentPage() == 1 ? 0 : (inParam.getCurrentPage()-1)*10;
		
		int end = start+10 > classdtos.size() ? classdtos.size() : start+10;

		for(int i = start; i<end; i++) {
			list.add(classdtos.get(i));
		}
		
		int countPage = classdtos.size() == 0 ? 1 : (classdtos.size()%inParam.getLimit() == 0 ? classdtos.size()/inParam.getLimit() : classdtos.size()/inParam.getLimit()+1);
		
		ClassOutParam out = ClassOutParam.builder()
				.classCount(classCount.getClassCount())
				.studentAllCount(classCount.getStudentAllCount())
				.studentNoneCount(classCount.getStudentNoneCount())
				.list(classdtos)
				.countPage(countPage)
				.build();
		
		return out;
		
		
	}
	
	public List<ClassStudent> readClassNomalNoneStudent(){
		return sqlSession.getMapper(ClassDao.class).readClassNomalNoneStudent();
	}
	
	public void updateClassNomalNoneStudent(int idx) {

		int result = sqlSession.getMapper(ClassDao.class).updateClassNomalNoneStudent(idx);
		
		if(result < 1) {
			throw new ApplicationException(ErrorStatus.ALREADY_NONE);
		}
		
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void updateClassNomalStudent(ClassUpdateInParam inParam) {
		
		int result = sqlSession.getMapper(ClassDao.class).updateClassNomalStudent(inParam);
		
		if(result != inParam.getIdxList().length) {
			throw new ApplicationException(ErrorStatus.ALREADY_UPDATE);
		}
		
	}
	

	public ClassOutParam readAllTest(ClassInParam inParam) {
		
		List<ClassDto> list = new ArrayList<>();
		
		List<ClassDto> classdtos = sqlSession.getMapper(ClassDao.class).readAllTest(inParam);

		ClassCount classCount = sqlSession.getMapper(ClassDao.class).ClassCountTest();
		
		
		int start = inParam.getCurrentPage() == 1 ? 0 : (inParam.getCurrentPage()-1)*10;
		
		int end = start+10 > classdtos.size() ? classdtos.size() : start+10;

		for(int i = start; i<end; i++) {
			list.add(classdtos.get(i));
		}
		
		int countPage = classdtos.size() == 0 ? 1 : classdtos.size()/inParam.getLimit()+1;
		
		ClassOutParam out = ClassOutParam.builder()
				.classCount(classCount.getClassCount())
				.studentAllCount(classCount.getStudentAllCount())
				.studentNoneCount(classCount.getStudentNoneCount())
				.list(classdtos)
				.countPage(countPage)
				.build();
		
		return out;
		
		
	}
	
	public List<ClassStudent> readClassTestNoneStudent(){
		return sqlSession.getMapper(ClassDao.class).readClassTestNoneStudent();
	}
	
	public void updateClassTestNoneStudent(int idx) {

		int result = sqlSession.getMapper(ClassDao.class).updateClassTestNoneStudent(idx);
		
		if(result < 1) {

			throw new ApplicationException(ErrorStatus.ALREADY_NONE);
		}
		
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void updateClassTestStudent(ClassUpdateInParam inParam) {
		
		int result = sqlSession.getMapper(ClassDao.class).updateClassTestStudent(inParam);
		
		if(result != inParam.getIdxList().length) {
			throw new ApplicationException(ErrorStatus.ALREADY_UPDATE);
		}
		
	}
	
	
}
