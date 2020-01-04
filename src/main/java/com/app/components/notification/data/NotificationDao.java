package com.app.components.notification.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

public interface NotificationDao {
	
	public List<NotificationDto> readAll(String email) throws DataAccessException;
	
	public List<NotificationDto> readLatest(String email) throws DataAccessException;
	
	public void createOne(String email, String icon, String title) throws DataAccessException;
	
	public void updateRead(String email, int idx) throws DataAccessException;
	
	public void updateAllRead(String email) throws DataAccessException;
	
}
