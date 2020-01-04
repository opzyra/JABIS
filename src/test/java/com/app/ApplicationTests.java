package com.app;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.app.components.board.data.BoardDao;
import com.app.components.board.data.BoardResultMap;
import com.app.components.board.param.RecordInParam;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {
	
	@Test
	public void contextLoads() {
		
	}

}
