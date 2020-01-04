package com.app.components.member.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.member.param.BanInParam;
import com.app.components.member.param.CountOutParam;
import com.app.components.member.param.PasswordChangeInParam;
import com.app.components.member.param.ReadInParam;
import com.app.components.member.param.ResetPasswordInParam;
import com.app.components.member.param.UpdateRoleCodeInParam;
import com.app.components.member.param.UpdateSubjectCodeInParam;

public interface MemberDao {
	
	public MemberEntity readOne(String email) throws DataAccessException;
	
	public void createOne(MemberEntity entity) throws DataAccessException;
	
	public int authMember(String email, String authStr) throws DataAccessException;
	
	public int accessSuccessMember(String email) throws DataAccessException;
	
	public int accessFailMember(String email) throws DataAccessException;
	
	public List<MemberEntity> readTeacher() throws DataAccessException;
	
	public CountOutParam countAll() throws DataAccessException;
	
	public List<MemberEntity> readAll(ReadInParam inParam) throws DataAccessException;
	
	public void updateRoleCode(UpdateRoleCodeInParam inParam) throws DataAccessException;
	
	public void updateSubjectCode(UpdateSubjectCodeInParam inParam) throws DataAccessException;
	
	public void resetPassword(ResetPasswordInParam inParam) throws DataAccessException;
	
	public void ban(BanInParam inParam) throws DataAccessException;
	
	public int updateDeleteStatus(String email) throws DataAccessException;

	public void updatePassword(String newPass, String email) throws DataAccessException;
	
}
