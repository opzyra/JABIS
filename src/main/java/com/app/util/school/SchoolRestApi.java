package com.app.util.school;

import java.net.SocketTimeoutException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.exception.ApplicationException;
import com.app.status.ErrorStatus;

@RestController
@RequestMapping("/api")
public class SchoolRestApi {

	@Autowired
	private SchoolSearch schoolSearch;
	
	@ResponseBody
	@GetMapping("/school/{query}")
	@ResponseStatus(value=HttpStatus.OK)
	public List<SchoolDto> searchSchool(@PathVariable String query) {	
		
		List<SchoolDto> result = null;
		
		try {
			
			result = schoolSearch.searchSchoolData(query);

		} catch(SocketTimeoutException e) {
			
			throw new ApplicationException(ErrorStatus.TIMEOUT, e);

		} catch(Exception e) {
			
			throw new ApplicationException(ErrorStatus.DEFAULT, e);
			
		}
		
		
		return result;
		
	}
	
}
