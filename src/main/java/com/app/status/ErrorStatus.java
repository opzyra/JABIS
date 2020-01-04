package com.app.status;

import lombok.Getter;

@Getter
public enum ErrorStatus {

	/**
	 * 기본
	 */
	DEFAULT("시스템 오류", "시스템 관리자에게 문의해 주세요.", "error", 500),						// 기본 메시지
	DB_ACCESS_ERROR("데이터 접근 오류", "데이터베이스에 접근할 수 없습니다.", "error", 500),			// 데이터베이스 오류
	SESSION_MISS_MATCH("권한 오류", "클라이언트의 데이터 변조가 확인되었습니다.", "error", 500),		// 클라 데이터 변조
	FILE_ERROR("업로드 오류", "업로드 최대 용량은 5MB입니다.", "error", 500),					// 업로드 오류
	VALIDATION("입력값 오류", "잘못된 입력값이 있습니다.", "error", 500),						// 서버쪽 항목체크 오류
	TIMEOUT("연결시간 초과", "서버와 연결이 원할하지 않습니다.", "error", 500),						// 타임아웃 에러
	INVALID_ACCESS("잘못된 접근", "접근방법이 올바르지 않습니다.", "error", 500),
	FAILD_EXCEL("파일 출력 오류", "파일 출력에 오류가 발생하였습니다.", "error", 500),
	
	/**
	 * 회원 관련 코드
	 * */
	NOT_FOUND_USER("이메일 오류", "아이디와 일치하는 회원정보가 없습니다.", "error", 404),			// 아이디 틀림
	BAD_CREDENTIALS("비밀번호 오류", "비밀번호가 올바르지 않습니다.", "error", 401), 				// 비밀번호 틀림
	MONE_AUTH("계정인증 오류", "계정 인증 절차가 필요합니다.", "warning", 405), 					// 인증이 완료되지 않음
	IS_BANED("제한된 계정", "관리자에 의해 제한된 계정입니다.", "error", 403), 					// 계정 사용이 제한됨
	IS_DELETED("탈퇴한 계정", "탈퇴한 계정입니다.", "error", 403),							// 탈퇴 계정
	IS_EXPIRED("만료된 계정", "사용기간이 만료된 계정입니다.", "error", 403),						// 만료된 계정
	ACCESS_COUNT("보안 오류", "비밀번호 3회 미일치로 계정이 잠금 상태 입니다.", "error", 403),			// 비밀번호 입력 횟수 초과
	
	/**
	 * 학생 관련 코드
	 */
	DUPLICATE_STUDENT("학생 이름 중복", "동명의 입학대기 및 재학중인 학생이 있습니다.", "error", 409),
	NOT_HRT_LEAVE("미배정 학생", "휴원 처리는 담임 배정이 되어있어야 합니다.", "error", 409),
	NOT_HRT_IN("미배정 학생", "재원 처리는 담임 배정이 되어있어야 합니다.", "error", 409),
	
	/**
	 * 담임 배정 관련 코드
	 */
	ALREADY_NONE("무결성 오류", "누군가에 의해 이미 미배정 처리되었습니다.", "error", 409),
	ALREADY_UPDATE("무결성 오류", "누군가에 의해 이미 배정 처리되었습니다.", "error", 409),
	HRT_NOT("권한 오류", "본인에게 배정된 학생이 아닙니다.", "error", 403),
	
	/**
	 * 반 편성 관련 코드
	 * */
	DUPLICATE_CLASS("이미 개설된 반", "이미 개설되어 있는 반 이름입니다.", "error", 409),
	
	/**
	 * 상담 일지 관련 코드
	 * */
	DUPLICATE_COUNSE("이미 등록된 상담", "해당 일시에 상담이 이미 등록되어 있습니다.", "error", 409),
	
	/**
	 * 성적 관련 코드
	 */
	DUPLICATE_SCORE("이미 등록 된 성적", "해당 조건으로 등록된 성적이 이미 있습니다.", "error", 409),
	
	/**
	 * 과목 관련 코드
	 */
	DUPLICATE_SUBJECT("이미 등록된 과목", "이미 등록되어 있는 과목명 입니다.", "error", 409),			// 이미 등록된 과목명
	
	DUPLICATE_EMAIL("사용중인 이메일", "이미 존재하는 회원의 이메일입니다.", "error", 409),			// 이메일 중복
	NOT_MATCH_AUTH("인증코드 오류", "인증코드가 일치하지 않습니다.", "error", 500);				// 인증코드 불일치
	
	private String reason;
	
	private String message;
	
	private String icon;
	
	private int status;
	
	private ErrorStatus(String reason, String message, String icon, int status) {
		this.reason = reason;
		this.message = message;
		this.icon = icon;
		this.status = status;
	}
	
	
}
