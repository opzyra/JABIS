package com.app.components.hrt.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.hrt.param.HrtInParam;
import com.app.components.hrt.param.HrtUpdateInParam;

public interface HrtDao {
	
	public List<HrtDto> readAll(HrtInParam inParam) throws DataAccessException;
	
	public HrtCount hrtCount() throws DataAccessException;
	
	public List<HrtStudent> readHrtNoneStudent() throws DataAccessException;

	public int updateHrtNoneStudent(int idx) throws DataAccessException;
	
	public int updateHrtStudent(HrtUpdateInParam inParam) throws DataAccessException;
	
}
