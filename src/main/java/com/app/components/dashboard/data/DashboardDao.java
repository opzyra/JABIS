package com.app.components.dashboard.data;

import org.springframework.dao.DataAccessException;

public interface DashboardDao {

	public InforCountDto readCount() throws DataAccessException;
	
}
