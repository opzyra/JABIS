package com.app.components.board.service;

import java.util.List;

import javax.validation.Valid;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.components.board.data.BoardDao;
import com.app.components.board.data.BoardResultMap;
import com.app.components.board.data.BoardEntity;
import com.app.components.board.param.NoticeLatestInParam;
import com.app.components.board.param.RecordInParam;
import com.app.components.board.param.WriteInParam;
import com.app.components.member.data.MemberEntity;
import com.app.security.XssClean;

@Service
public class BoardService {

	@Autowired
	private SqlSession sqlSession;
	
	public BoardResultMap getBoard(int idx) {

		return sqlSession.getMapper(BoardDao.class).readOne(idx);
	}
	
	public List<BoardResultMap> getBoardList(RecordInParam inParam) throws DataAccessException {
		
		return sqlSession.getMapper(BoardDao.class).read(inParam);
		
	}
	
	public int getBoardListAllCount(RecordInParam inParam) {
	
		return sqlSession.getMapper(BoardDao.class).count(inParam);
		
	}
	
	@CacheEvict(value="noticeLatest", allEntries = true)
	public void createBoard(WriteInParam inParam, MemberEntity member) {
		
		BoardEntity board = BoardEntity.builder()
				.email(member.getEmail())
				.categoryCode(inParam.getCategoryCode())
				.title(inParam.getTitle())
				.contents(XssClean.cleanXSS(inParam.getContents()))
				.authLevel(inParam.getAuthLevel())
				.build();
		
		sqlSession.getMapper(BoardDao.class).createOne(board);
		
	}
	
	@CacheEvict(value="noticeLatest", allEntries = true)
	public int modifyBoard(WriteInParam inParam, MemberEntity member) {
		BoardEntity board = BoardEntity.builder()
				.idx(inParam.getIdx())
				.email(member.getEmail())
				.categoryCode(inParam.getCategoryCode())
				.title(inParam.getTitle())
				.contents(XssClean.cleanXSS(inParam.getContents()))
				.authLevel(inParam.getAuthLevel())
				.build();
		return sqlSession.getMapper(BoardDao.class).updateOne(board);
	}
	
	public void updateViewCount(int idx) {
		sqlSession.getMapper(BoardDao.class).updateViewCount(idx);
	}
	
	@CacheEvict(value="noticeLatest", allEntries = true)
	public int deleteBoard(int idx, String email) {
		
		return sqlSession.getMapper(BoardDao.class).deleteOne(idx, email);
	}

	@Cacheable(value="noticeLatest")
	public List<BoardResultMap> getLatestBoards(NoticeLatestInParam inParam) {
		return sqlSession.getMapper(BoardDao.class).readLatest(inParam);
	}
	
	
}
