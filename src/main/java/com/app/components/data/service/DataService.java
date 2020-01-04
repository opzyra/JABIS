package com.app.components.data.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.code.RoleCode;
import com.app.code.RoleNameCode;
import com.app.code.SubjectCode;
import com.app.components.data.data.DataDao;
import com.app.components.data.data.LeaveDao;
import com.app.components.data.data.LeaveResultMap;
import com.app.components.data.data.TeacherDto;
import com.app.components.data.param.TeacherListOutParam;
import com.app.components.data.param.TeacherReadInParam;
import com.app.security.Crypto;

@Service
public class DataService {
	
	@Autowired
	private SqlSession sqlSession;
	
	public List<TeacherListOutParam> readTeacher(TeacherReadInParam inParam){
		
		List<TeacherDto> list = sqlSession.getMapper(DataDao.class).readTeacher(inParam);
		List<TeacherListOutParam> out = new ArrayList<TeacherListOutParam>();
		
		list.forEach(e->{
			TeacherListOutParam param = TeacherListOutParam.builder()
					.email(e.getEmail())
					.name(e.getName())
					.status(RoleNameCode.getRoleName(e.getRoleCode()))
					.subject(SubjectCode.getSubject(e.getSubjectCode()))
					.phone(Crypto.decode(e.getPhone()))
					.accessLastDate(e.getAccessLastDate())
					.hrtCount(e.getHrtCount())
					.counseCount(e.getCounseCount())
					.monthCount(e.getMonthCount() == null ? 0 : e.getMonthCount())
					.build();
			out.add(param);
		});
		
		return out;
	}

	public List<LeaveResultMap> readLeave(TeacherReadInParam inParam){
		
		List<LeaveResultMap> list = sqlSession.getMapper(LeaveDao.class).readAll(inParam);
		
		list.forEach(e->{
			e.setRoleName(RoleNameCode.getRoleName(e.getRoleCode()));
		});
		
		return list;
	}
	
}
