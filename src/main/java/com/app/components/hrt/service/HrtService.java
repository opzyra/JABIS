package com.app.components.hrt.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.common.exception.ApplicationException;
import com.app.components.hrt.data.HrtCount;
import com.app.components.hrt.data.HrtDao;
import com.app.components.hrt.data.HrtDto;
import com.app.components.hrt.data.HrtStudent;
import com.app.components.hrt.param.HrtInParam;
import com.app.components.hrt.param.HrtOutParam;
import com.app.components.hrt.param.HrtUpdateInParam;
import com.app.components.student.data.StudentDao;
import com.app.components.student.data.StudentEntity;
import com.app.status.ErrorStatus;

@Service
public class HrtService {

	@Autowired
	private SqlSession sqlSession;
	
	public HrtOutParam readAll(HrtInParam inParam) {
		
		List<HrtDto> list = new ArrayList<>();
		
		List<HrtDto> hrtdtos = sqlSession.getMapper(HrtDao.class).readAll(inParam);

		HrtCount hrtCount = sqlSession.getMapper(HrtDao.class).hrtCount();
		
		
		int start = inParam.getCurrentPage() == 1 ? 0 : (inParam.getCurrentPage()-1)*10;
		
		int end = start+10 > hrtdtos.size() ? hrtdtos.size() : start+10;

		for(int i = start; i<end; i++) {
			list.add(hrtdtos.get(i));
		}
		
		int countPage = hrtdtos.size() == 0 ? 1 : (hrtdtos.size()%inParam.getLimit() == 0 ? hrtdtos.size()/inParam.getLimit() : hrtdtos.size()/inParam.getLimit()+1);
		
		HrtOutParam out = HrtOutParam.builder()
				.memberCount(hrtCount.getMemberCount())
				.studentAllCount(hrtCount.getStudentAllCount())
				.studentNoneCount(hrtCount.getStudentNoneCount())
				.hrt(list)
				.hrtAll(hrtdtos)
				.countPage(countPage)
				.build();
		
		return out;
		
		
	}
	
	public List<HrtStudent> readHrtNoneStudent(){
		return sqlSession.getMapper(HrtDao.class).readHrtNoneStudent();
	}
	
	public void updateHrtNoneStudent(int idx) {

		int result = sqlSession.getMapper(HrtDao.class).updateHrtNoneStudent(idx);
		
		if(result < 1) {

			throw new ApplicationException(ErrorStatus.ALREADY_NONE);
		}
		
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void updateHrtStudent(HrtUpdateInParam inParam) {
		
		int result = sqlSession.getMapper(HrtDao.class).updateHrtStudent(inParam);
		
		if(result != inParam.getIdxList().length) {
			throw new ApplicationException(ErrorStatus.ALREADY_UPDATE);
		}
		
	}
	
	
}
