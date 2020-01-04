package com.app.components.member.service;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.code.RoleNameCode;
import com.app.code.SubjectCode;
import com.app.common.exception.ApplicationException;
import com.app.components.data.param.TeacherListOutParam;
import com.app.components.member.data.MemberDao;
import com.app.components.member.data.MemberEntity;
import com.app.components.member.param.AuthInParam;
import com.app.components.member.param.BanInParam;
import com.app.components.member.param.CountOutParam;
import com.app.components.member.param.PasswordChangeInParam;
import com.app.components.member.param.PasswordCheckInParam;
import com.app.components.member.param.ReadInParam;
import com.app.components.member.param.RegisterInParam;
import com.app.components.member.param.ResetPasswordInParam;
import com.app.components.member.param.UpdateRoleCodeInParam;
import com.app.components.member.param.UpdateSubjectCodeInParam;
import com.app.components.student.data.StudentDao;
import com.app.security.Crypto;
import com.app.status.ErrorStatus;
import com.app.util.random.RandomConstructor;

@Service
public class MemberService {
	
	@Autowired
	private SqlSession sqlSession;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public void registerMember(RegisterInParam inParam) {
	
		String encodedPhone = Crypto.encode(inParam.getPhone());
		
		String encodedPassword = passwordEncoder.encode(inParam.getPassword());
		
		MemberEntity member = MemberEntity.builder()
				.name(inParam.getName())
				.email(inParam.getEmail())
				.password(encodedPassword)
				.phone(encodedPhone)
				.authStr(RandomConstructor.getAuthCode(6))
				.build();
		
		try {
			
			sqlSession.getMapper(MemberDao.class).createOne(member);
			
		} catch(DataIntegrityViolationException e) {

			throw new ApplicationException(ErrorStatus.DUPLICATE_EMAIL, e);
			
		}
		
	}
	
	public void authMember(AuthInParam inParam) {
		
		int result = sqlSession.getMapper(MemberDao.class).authMember(inParam.getEmail(), inParam.getAuthStr());
		
		if(result != 1) {
			
			throw new ApplicationException(ErrorStatus.NOT_MATCH_AUTH);
		}
		
	}
	
	public CountOutParam readCount() {
		return sqlSession.getMapper(MemberDao.class).countAll();
	}
	
	public List<MemberEntity> readAll(ReadInParam inParam){
		List<MemberEntity> list = sqlSession.getMapper(MemberDao.class).readAll(inParam);
		list.forEach(e->e.setPhone(Crypto.decode(e.getPhone())));
		return list;
	}
	
	public void updateRoleCode(UpdateRoleCodeInParam inParam) {
		
		if(inParam.getRoleCode() == 1) {
			inParam.setAvatar("담");
		}else if(inParam.getRoleCode() == 2) {
			inParam.setAvatar("팀");
		}else if(inParam.getRoleCode() == 3) {
			inParam.setAvatar("실");
		}else if(inParam.getRoleCode() == 4) {
			inParam.setAvatar("원");
		}else if(inParam.getRoleCode() == 5) {
			inParam.setAvatar("관");
		}else {
			MemberEntity entity = sqlSession.getMapper(MemberDao.class).readOne(inParam.getEmail());
			int subjectCode = entity.getSubjectCode();
			switch(subjectCode) {
			case 0:
				inParam.setAvatar("미");
				break;
			case 1:
				inParam.setAvatar("국");
				break;
			case 2:
				inParam.setAvatar("영");
				break;
			case 3:
				inParam.setAvatar("수");
				break;
			case 4:
				inParam.setAvatar("과");
				break;
			case 5:
				inParam.setAvatar("사");
				break;
			case 6:
				inParam.setAvatar("역");
				break;
			default:
				inParam.setAvatar("미");
				break;
			}
		}
		
		sqlSession.getMapper(MemberDao.class).updateRoleCode(inParam);
	}
	
	public void updateSubjectCode(UpdateSubjectCodeInParam inParam) {
		
		MemberEntity entity = sqlSession.getMapper(MemberDao.class).readOne(inParam.getEmail());
		if(entity.getRoleCode() == 0) {
			int subjectCode = entity.getSubjectCode();
			switch(subjectCode) {
			case 0:
				inParam.setAvatar("미");
				break;
			case 1:
				inParam.setAvatar("국");
				break;
			case 2:
				inParam.setAvatar("영");
				break;
			case 3:
				inParam.setAvatar("수");
				break;
			case 4:
				inParam.setAvatar("과");
				break;
			case 5:
				inParam.setAvatar("사");
				break;
			case 6:
				inParam.setAvatar("역");
				break;
			default:
				inParam.setAvatar("미");
				break;
			}
		}
		sqlSession.getMapper(MemberDao.class).updateSubjectCode(inParam);
	}
	
	public String resetPassword(ResetPasswordInParam inParam) {
		String pw = RandomConstructor.getAuthCode(8);
		inParam.setPassword(passwordEncoder.encode(pw));
		
		sqlSession.getMapper(MemberDao.class).resetPassword(inParam);
		
		return pw;
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void ban(BanInParam inParam) {
		
		if(inParam.getEnabledCode() == 1) {
			inParam.setAuthStr(RandomConstructor.getAuthCode(6));
		}else {
			inParam.setAuthStr(null);
		}
		
		sqlSession.getMapper(MemberDao.class).ban(inParam);
		
		sqlSession.getMapper(StudentDao.class).updateHrtDeleted(inParam.getEmail());
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void updateDeleteStatus(String email) {
		int result = sqlSession.getMapper(MemberDao.class).updateDeleteStatus(email);
		
		if(result == 0) {
			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
		} else {
			sqlSession.getMapper(StudentDao.class).updateHrtDeleted(email);
		}
	}

	public void passwordCheck(PasswordCheckInParam inParam, MemberEntity member) {
		String dbPass = member.getPassword();
		String inPass = inParam.getPassword();
		
		if(!passwordEncoder.matches(inPass, dbPass)) {
			throw new ApplicationException(ErrorStatus.BAD_CREDENTIALS);
		}
		
	}

	public void passwordUpdate(PasswordChangeInParam inParam, MemberEntity member) {
		
		if(!passwordEncoder.matches(inParam.getOriginPass(), member.getPassword())) {
			throw new ApplicationException(ErrorStatus.BAD_CREDENTIALS);
		}
		
		String newPass = passwordEncoder.encode(inParam.getNewPass());
		
		sqlSession.getMapper(MemberDao.class).updatePassword(newPass, member.getEmail());
		
		
	}
}
