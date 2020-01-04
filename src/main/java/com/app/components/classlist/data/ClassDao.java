package com.app.components.classlist.data;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.app.components.classlist.param.ClassAddInParam;
import com.app.components.classlist.param.ClassInParam;
import com.app.components.classlist.param.ClassNameUpdateInParam;
import com.app.components.classlist.param.ClassUpdateInParam;

public interface ClassDao {

	public void addClass(ClassAddInParam inParam) throws DataAccessException;
	
	public void updateClass(ClassNameUpdateInParam inParam) throws DataAccessException;
	
	public void deleteClass(String name) throws DataAccessException;

	
	public List<ClassDto> readAllNomal(ClassInParam inParam) throws DataAccessException;
	
	public ClassCount ClassCountNomal() throws DataAccessException;
	
	public List<ClassStudent> readClassNomalNoneStudent() throws DataAccessException;

	public int updateClassNomalNoneStudent(int idx) throws DataAccessException;
	
	public int updateClassNomalStudent(ClassUpdateInParam inParam) throws DataAccessException;

	
	public List<ClassDto> readAllTest(ClassInParam inParam) throws DataAccessException;
	
	public ClassCount ClassCountTest() throws DataAccessException;
	
	public List<ClassStudent> readClassTestNoneStudent() throws DataAccessException;

	public int updateClassTestNoneStudent(int idx) throws DataAccessException;
	
	public int updateClassTestStudent(ClassUpdateInParam inParam) throws DataAccessException;
	
}
