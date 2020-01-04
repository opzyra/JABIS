package com.app.components.notification.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.app.components.notification.data.NotificationDao;
import com.app.components.notification.data.NotificationDto;

@Service
public class NotificationService {

	@Autowired
	private SqlSession sqlSession;
	
	@Cacheable(value="notification", key="#email")
	public List<NotificationDto> readLatest(String email){
		
		return sqlSession.getMapper(NotificationDao.class).readLatest(email);
		
	}

	@CacheEvict(value="notification", key="#email")
	public void crateOne(String email, String icon, String title) {
		sqlSession.getMapper(NotificationDao.class).createOne(email, icon, title);
	}
	
	@CacheEvict(value="notification", key="#email")
	public void updateRead(String email, int idx) {
		sqlSession.getMapper(NotificationDao.class).updateRead(email, idx);
	}
	
	@CacheEvict(value="notification", key="#email")
	public void updateAllRead(String email) {
		sqlSession.getMapper(NotificationDao.class).updateAllRead(email);
	}
}
