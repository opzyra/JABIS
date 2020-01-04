package com.app.components.sibling.service;

import java.util.List;

import javax.validation.Valid;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.components.sibling.data.SiblingDao;
import com.app.components.sibling.data.SiblingDto;
import com.app.components.sibling.param.SearchInParam;
import com.app.components.sibling.param.UpdateMemoInParam;
import com.app.security.Crypto;
import com.app.security.XssClean;

@Service
public class SiblingService {

	@Autowired
	private SqlSession sqlSession;
	
	public List<SiblingDto> readAll(SearchInParam inParam) {
		
		List<SiblingDto> sibling = sqlSession.getMapper(SiblingDao.class).readSiblingList(inParam);
		
		sibling.forEach(e->{
			e.setParentPhone(Crypto.decode(e.getParentPhone()));
		});
		
		return sibling;
	}
	
	public int count() {
		
		return sqlSession.getMapper(SiblingDao.class).count();
		
	}

	public void updateMemo(UpdateMemoInParam inParam) {
		
		inParam.setMemo(XssClean.cleanXSS(inParam.getMemo()));
		
		sqlSession.getMapper(SiblingDao.class).updateMemo(inParam);
		
	}
	
}
