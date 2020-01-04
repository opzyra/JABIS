package com.app.components.comments.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.components.board.data.BoardDao;
import com.app.components.board.data.BoardResultMap;
import com.app.components.comments.data.CommentsDao;
import com.app.components.comments.data.CommentsResultMap;
import com.app.components.comments.param.CommentsInParam;
import com.app.components.comments.param.ModifyInParam;
import com.app.components.comments.param.WriteInParam;

@Service
public class CommentsService {

	@Autowired
	private SqlSession sqlSession;
	
	public List<CommentsResultMap> getCommentsList(CommentsInParam inParam) throws DataAccessException {
		
		return sqlSession.getMapper(CommentsDao.class).read(inParam);
		
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void createComments(WriteInParam inParam) {
		

		sqlSession.getMapper(CommentsDao.class).createOne(inParam);
		

		sqlSession.getMapper(BoardDao.class).updateCommentsCount(inParam.getBoardIdx(), 1);
		
	}
	
	public int modifyComment(ModifyInParam inParam) {
		return sqlSession.getMapper(CommentsDao.class).modifyOne(inParam);
	}

	@Transactional(rollbackFor=Exception.class)
	public int deleteComments(ModifyInParam inParam) {
		
		int result = sqlSession.getMapper(CommentsDao.class).deleteOne(inParam);
		
		return result;
		
		
	}
	
	
}
