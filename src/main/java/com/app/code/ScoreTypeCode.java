package com.app.code;

import java.util.HashMap;
import java.util.Map;

public class ScoreTypeCode {

private static final Map<Integer, String> scoreTypeCode = new HashMap<Integer, String>(); 
	
	static {
		scoreTypeCode.put(0, "입학 전 성적");
		scoreTypeCode.put(1, "1학기 중간고사");
		scoreTypeCode.put(2, "1학기 기말고사"); 				
		scoreTypeCode.put(3, "2학기 중간고사");
		scoreTypeCode.put(4, "2학기 기말고사");
		scoreTypeCode.put(5, "3월 모의고사");
		scoreTypeCode.put(6, "4월 모의고사");
		scoreTypeCode.put(7, "5월 모의고사");
		scoreTypeCode.put(8, "6월 평가원");
		scoreTypeCode.put(9, "7월 모의고사");
		scoreTypeCode.put(10, "8월 모의고사");
		scoreTypeCode.put(11, "9월 평가원");
		scoreTypeCode.put(12, "10월 모의고사");
		scoreTypeCode.put(13, "수능");
	}
	
	public static String getScoreType(int code) {
		return scoreTypeCode.get(code);
	}
	
}
