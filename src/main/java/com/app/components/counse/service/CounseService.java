package com.app.components.counse.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.common.exception.ApplicationException;
import com.app.components.counse.data.CounseDao;
import com.app.components.counse.data.CounseDto;
import com.app.components.counse.data.CounseEntity;
import com.app.components.counse.data.CounseListDto;
import com.app.components.counse.param.CreateAccessOutParam;
import com.app.components.counse.param.CreateInParam;
import com.app.components.counse.param.ListInParam;
import com.app.components.member.data.MemberEntity;
import com.app.components.notification.data.NotificationDao;
import com.app.components.sibling.data.SiblingDao;
import com.app.components.sibling.data.SiblingEntity;
import com.app.components.student.data.StudentDao;
import com.app.components.student.data.StudentDto;
import com.app.components.student.data.StudentEntity;
import com.app.security.Principal;
import com.app.security.XssClean;
import com.app.status.ErrorStatus;
import com.app.util.notification.Notification;

@Service
public class CounseService {

	@Autowired
	private SqlSession sqlSession;
	
	public CreateAccessOutParam readInit(int studentIdx) {
		
		CounseDto dto = sqlSession.getMapper(CounseDao.class).readInit(studentIdx);
		
		int count = sqlSession.getMapper(CounseDao.class).count(studentIdx);
		
		return CreateAccessOutParam.builder().counse(dto).count(count).build();
		
	}
	
	public List<CounseListDto> readAllCounse(ListInParam inParam){
		
		int studentIdx = inParam.getStudentIdx();
		
		Principal user = (Principal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		MemberEntity member = user.getMember();
		String email = member.getEmail();
		int roleCode = member.getRoleCode();
		
		// 담임인 경우에만 처리
		if(roleCode==1) {
			StudentEntity student = sqlSession.getMapper(StudentDao.class).readOne(studentIdx);
			
			if(!email.equalsIgnoreCase(student.getHrtEmail())) {
				throw new ApplicationException(ErrorStatus.HRT_NOT);
			}
		}
		
		
		return sqlSession.getMapper(CounseDao.class).readAll(inParam);
		
	}
	
	public CounseEntity readOne(int studentIdx) {
		
		Principal user = (Principal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		MemberEntity member = user.getMember();
		String email = member.getEmail();
		int roleCode = member.getRoleCode();
		
		CounseEntity counseEntity = sqlSession.getMapper(CounseDao.class).readOne(studentIdx);
		
		// 담임인 경우에만 처리
		if(roleCode==1) {
			StudentEntity student = sqlSession.getMapper(StudentDao.class).readOne(counseEntity.getStudentIdx());
			
			if(!email.equalsIgnoreCase(student.getHrtEmail())) {
				throw new ApplicationException(ErrorStatus.HRT_NOT);
			}
		}
		
		return counseEntity;
	}
	
	public CounseEntity readLastOne(int studentIdx) {
		
		Principal user = (Principal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		MemberEntity member = user.getMember();
		String email = member.getEmail();
		int roleCode = member.getRoleCode();
		
		CounseEntity counseEntity = sqlSession.getMapper(CounseDao.class).readLastOne(studentIdx);
		
		// 담임인 경우에만 처리
		if(roleCode==1) {
			StudentEntity student = sqlSession.getMapper(StudentDao.class).readOne(counseEntity.getStudentIdx());
			
			if(!email.equalsIgnoreCase(student.getHrtEmail())) {
				throw new ApplicationException(ErrorStatus.HRT_NOT);
			}
		}
		
		return counseEntity;
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void createOne(CreateInParam inParam, MemberEntity member) {
		
		CounseEntity entity = CounseEntity.builder()
				.studentIdx(inParam.getStudentIdx())
				.mode(inParam.getMode())
				.counseDate(inParam.getCounseDate())
				.writeEmail(member.getEmail())
				.future(XssClean.cleanXSS(inParam.getFuture()))
				.studyStyle(XssClean.cleanXSS(inParam.getStudyStyle()))
				.studentStyle(XssClean.cleanXSS(inParam.getStudentStyle()))
				.parentStyle(XssClean.cleanXSS(inParam.getParentStyle()))
				.parentRequest(XssClean.cleanXSS(inParam.getParentRequest()))
				.studentCounse(XssClean.cleanXSS(inParam.getStudentCounse()))
				.parentCounse(XssClean.cleanXSS(inParam.getParentCounse()))
				.build();
		try {
			
			sqlSession.getMapper(CounseDao.class).createOne(entity);
			
		}catch(DataIntegrityViolationException e) {
			
			throw new ApplicationException(ErrorStatus.DUPLICATE_COUNSE, e);
			
		}
		

		if(inParam.getSiblingEdit() > 0) {
			List<SiblingEntity> sibling = inParam.getSibling();
			for(int i = 0; i<sibling.size(); i++) {
				SiblingEntity e = sibling.get(i);
				e.setMemo(XssClean.cleanXSS(e.getMemo()));
				sqlSession.getMapper(SiblingDao.class).updateOne(e);
				
			}
		}
		
		// 다른 사람이 작성해준 경우
		StudentEntity student = sqlSession.getMapper(StudentDao.class).readOne(inParam.getStudentIdx());
		
		if(student.getHrtEmail() != null && !student.getHrtEmail().equals(member.getEmail())) {
			sqlSession.getMapper(NotificationDao.class).createOne(student.getHrtEmail(), Notification.COUNSE_DELEGATION.getIcon(), Notification.COUNSE_DELEGATION.delegation(member.getName(), member.getRoleCode(), student.getName()));
		}
		
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void updateOne(CreateInParam inParam, MemberEntity member) {
		
		CounseEntity entity = CounseEntity.builder()
				.idx(inParam.getIdx())
				.counseDate(inParam.getCounseDate())
				.writeEmail(member.getEmail())
				.future(XssClean.cleanXSS(inParam.getFuture()))
				.studyStyle(XssClean.cleanXSS(inParam.getStudyStyle()))
				.studentStyle(XssClean.cleanXSS(inParam.getStudentStyle()))
				.parentStyle(XssClean.cleanXSS(inParam.getParentStyle()))
				.parentRequest(XssClean.cleanXSS(inParam.getParentRequest()))
				.studentCounse(XssClean.cleanXSS(inParam.getStudentCounse()))
				.parentCounse(XssClean.cleanXSS(inParam.getParentCounse()))
				.build();
		
		sqlSession.getMapper(CounseDao.class).updateOne(entity);
		

		if(inParam.getSiblingEdit() > 0) {
			List<SiblingEntity> sibling = inParam.getSibling();
			for(int i = 0; i<sibling.size(); i++) {
				
				sqlSession.getMapper(SiblingDao.class).updateOne(sibling.get(i));
				
			}
		}
		
	}

	public void deleteOne(int idx) {
		sqlSession.getMapper(CounseDao.class).deleteOne(idx);
	}
	
}
