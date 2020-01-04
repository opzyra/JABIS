package com.app.components.score.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.code.ScoreTypeCode;
import com.app.common.exception.ApplicationException;
import com.app.components.score.data.HighMoiAllDto;
import com.app.components.score.data.HighMoiDao;
import com.app.components.score.data.HighMoiEntity;
import com.app.components.score.data.HighNesinDao;
import com.app.components.score.data.HighNesinEntity;
import com.app.components.score.data.MiddleNesinAllDto;
import com.app.components.score.data.MiddleNesinDao;
import com.app.components.score.data.MiddleNesinEntity;
import com.app.components.score.data.ScoreDao;
import com.app.components.score.data.ScoreEntity;
import com.app.components.score.param.HighMoiInParam;
import com.app.components.score.param.HighMoiOutParam;
import com.app.components.score.param.HighMoiParam;
import com.app.components.score.param.HighMoiUpdateInParam;
import com.app.components.score.param.HighNesinInParam;
import com.app.components.score.param.HighNesinOutParam;
import com.app.components.score.param.HighNesinParam;
import com.app.components.score.param.HighNesinUpdateInParam;
import com.app.components.score.param.MiddleNesinInParam;
import com.app.components.score.param.MiddleNesinOutParam;
import com.app.components.score.param.ScoreOutParam;
import com.app.components.score.param.ScoreReadInParam;
import com.app.status.ErrorStatus;

@Service
public class ScoreService {

	@Autowired
	private SqlSession sqlSession;
	
	public ScoreEntity readOne(int idx) {
		return sqlSession.getMapper(ScoreDao.class).readOne(idx);
	}
	
	public List<ScoreOutParam> read(ScoreReadInParam inParam){
		List<ScoreEntity> entity = sqlSession.getMapper(ScoreDao.class).read(inParam);
		
		List<ScoreOutParam> out = new ArrayList<ScoreOutParam>();
		
		entity.forEach(e->{

			String text = e.getYear() + "년도 " + ScoreTypeCode.getScoreType(e.getType());
			
			ScoreOutParam param = ScoreOutParam.builder()
					.idx(e.getIdx())
					.studentIdx(e.getStudentIdx())
					.text(text)
					.highAverage(e.getHighAverage())
					.build();
			out.add(param);
		});
		
		return out;
		
	}
	
	public List<MiddleNesinOutParam> readNesin(int idx){
		return sqlSession.getMapper(MiddleNesinDao.class).read(idx);
		
		
	}
	
	public List<HighNesinOutParam> readHighNesin(int idx){
		return sqlSession.getMapper(HighNesinDao.class).read(idx);
		
		
	}
	
	public List<HighMoiOutParam> readHighMoi(int idx){
		return sqlSession.getMapper(HighMoiDao.class).read(idx);
		
		
	}
	
	public List<MiddleNesinAllDto> readAllNesin(int studentIdx){
		
		List<MiddleNesinAllDto> result = sqlSession.getMapper(ScoreDao.class).readAll(studentIdx);
		
		result.forEach(e->{
			String text = e.getYear() + "년도 " + ScoreTypeCode.getScoreType(e.getType());
			e.setText(text);
		});
		
		return result;
	}
	
	public List<HighMoiAllDto> readAllMoi(int studentIdx){
		
		List<HighMoiAllDto> result = sqlSession.getMapper(ScoreDao.class).readMoiAll(studentIdx);
		
		result.forEach(e->{
			String text = ScoreTypeCode.getScoreType(e.getType());
			e.setText(text);
		});
		
		return result;
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void createScore(MiddleNesinInParam inParam) {
		
		ScoreEntity entity = ScoreEntity.builder()
				.studentIdx(inParam.getStudentIdx())
				.year(inParam.getYear())
				.mode(inParam.getMode())
				.type(inParam.getType())
				.build();
		
		try {
			
			sqlSession.getMapper(ScoreDao.class).createOne(entity);
			
		}catch(DataIntegrityViolationException e) {
			
			throw new ApplicationException(ErrorStatus.DUPLICATE_SCORE, e);
			
		}
		
		List<MiddleNesinEntity> middleNesin = inParam.getMiddleNesin();
		
		middleNesin.forEach(e->{
			e.setScoreIdx(entity.getIdx());
			sqlSession.getMapper(MiddleNesinDao.class).createOne(e);
		});
		
		
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void updateScore(MiddleNesinInParam inParam) {
			
		List<MiddleNesinEntity> middleNesin = inParam.getMiddleNesin();
		
		middleNesin.forEach(e->{
			
			if(e.isUpdated()) {
				sqlSession.getMapper(MiddleNesinDao.class).updateOne(e);
			}
			
		});
		
		
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void createScore(HighNesinInParam inParam) {
		
		ScoreEntity entity = ScoreEntity.builder()
				.studentIdx(inParam.getStudentIdx())
				.year(inParam.getYear())
				.mode(inParam.getMode())
				.type(inParam.getType())
				.build();
		
		try {
			
			sqlSession.getMapper(ScoreDao.class).createOne(entity);
			
		}catch(DataIntegrityViolationException e) {
			
			throw new ApplicationException(ErrorStatus.DUPLICATE_SCORE, e);
			
		}
		
		List<HighNesinParam> highNesin = inParam.getHighNesin();
		
		int allRating = 0;
		int allUnit = 0;
		for(int i=0; i<highNesin.size(); i++) {
			HighNesinParam e = highNesin.get(i);
			
			HighNesinEntity hEntity = HighNesinEntity.builder()
					.scoreIdx(entity.getIdx())
					.subjectCode(e.getHighNesinSubject())
					.score(e.getHighNesinScore())
					.rating(e.getHighNesinRating())
					.unit(e.getHighNesinUnit())
					.build();
			
			allRating += e.getHighNesinRating()*e.getHighNesinUnit();
			allUnit += e.getHighNesinUnit(); 
			
			sqlSession.getMapper(HighNesinDao.class).createOne(hEntity);
			
		}
		
		if(allRating != 0 && allUnit != 0) {
			double result = Double.parseDouble(String.format("%.2f",(double)allRating/allUnit));
			sqlSession.getMapper(ScoreDao.class).updateHighAverage(result, entity.getIdx());
		}
		
		
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void createMoiScore(HighMoiInParam inParam) {
		
		ScoreEntity entity = ScoreEntity.builder()
				.studentIdx(inParam.getStudentIdx())
				.year(inParam.getYear())
				.mode(inParam.getMode())
				.type(inParam.getType())
				.build();
		
		try {
			
			sqlSession.getMapper(ScoreDao.class).createOne(entity);
			
		}catch(DataIntegrityViolationException e) {
			
			throw new ApplicationException(ErrorStatus.DUPLICATE_SCORE, e);
			
		}
		
		List<HighMoiParam> moi = inParam.getMoi();

		for(int i=0; i<moi.size(); i++) {
			HighMoiParam e = moi.get(i);
			
			HighMoiEntity hEntity = HighMoiEntity.builder()
					.scoreIdx(entity.getIdx())
					.subjectCode(e.getMoiSubject())
					.score(e.getMoiScore())
					.rating(e.getMoiRating())
					.build();

			sqlSession.getMapper(HighMoiDao.class).createOne(hEntity);
			
		}
		
	}
	
	public void deleteOne(int idx) {
		sqlSession.getMapper(ScoreDao.class).deleteOne(idx);
	}
	
	public void deleteOneHighNesin(int scoreIdx, int subjectCode) {
		sqlSession.getMapper(HighNesinDao.class).deleteOne(scoreIdx, subjectCode);
	}
	
	public void deleteOneHighMoi(int scoreIdx, int subjectCode) {
		sqlSession.getMapper(HighMoiDao.class).deleteOne(scoreIdx, subjectCode);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void updateHighNesin(HighNesinUpdateInParam inParam) {
		List<HighNesinEntity> list = inParam.getHighNesin();
		int allRating = 0;
		int allUnit = 0;
		
		for(int i = 0; i<list.size(); i++) {
			HighNesinEntity el = list.get(i);
			allRating += el.getRating()*el.getUnit();
			allUnit += el.getUnit();
			
			if(el.isUpdate() && !el.isNewScore()) {
				sqlSession.getMapper(HighNesinDao.class).updateOne(el);
			}else if(el.isNewScore()) {
				sqlSession.getMapper(HighNesinDao.class).createOne(el);
			}
		}
		
		if(allRating != 0 && allUnit != 0) {
			double result = Double.parseDouble(String.format("%.2f",(double)allRating/allUnit));
			sqlSession.getMapper(ScoreDao.class).updateHighAverage(result, inParam.getIdx());
		}
		
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void updateHighNesin(HighMoiUpdateInParam inParam) {
		List<HighMoiEntity> list = inParam.getHighMoi();
		
		for(int i = 0; i<list.size(); i++) {
			HighMoiEntity el = list.get(i);
			
			if(el.isUpdate() && !el.isNewScore()) {
				sqlSession.getMapper(HighMoiDao.class).updateOne(el);
			}else if(el.isNewScore()) {
				sqlSession.getMapper(HighMoiDao.class).createOne(el);
			}
		}
		
	}
}
