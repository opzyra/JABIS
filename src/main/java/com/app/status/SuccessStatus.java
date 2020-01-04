package com.app.status;

import lombok.Getter;

@Getter
public enum SuccessStatus {

	/**
	 * 기본
	 */
	DEFAULT("시스템 오류", "시스템 관리자에게 문의해 주세요.", 500),					// 기본 메시지
	
	/**
	 * 회원 관련 코드
	 * */
	REGISTER("회원가입 완료", "회원 가입이 성공적으로 완료되었습니다.", 200),				// 회원가입 성공
	AUTH("계정인증 완료", "환영합니다. 이제 JABIS를 이용하실 수 있습니다.", 200),			// 인증 성공
	LOGOUT("로그아웃", "세션이 종료되었습니다.", 200), 							// 인증이 완료되지 않음
	
	/**
	 * 게시글 관련
	 */
	BOARD_WRITE("게시글 작성 완료", "게시글이 작성되었습니다.", 200),
	BOARD_MODIFY("게시글 수정 완료", "게시글이 수정되었습니다.", 200),
	BOARD_DELETE("게시글 삭제 완료", "게시글이 삭제되었습니다.", 200),
	COMMENTS_WRITE("댓글 작성 완료", "댓글이 작성되었습니다.", 200),
	COMMENTS_DELETE("댓글 삭제 완료", "댓글이 삭제되었습니다.", 200),
	
	/**
	 * 학생 관련
	 */
	STUDENT_CREATE("학생 등록 완료", "학생이 등록되었습니다.", 200),
	STUDENT_UPDATED("학생 수정 완료", "학생 정보가 수정되었습니다.", 200),
	STUDENT_STATUS_UPDATED("갱신 완료", "학생의 상태가 갱신되었습니다.", 200),
	STUDENT_DELETE("학생 삭제 완료", "학생 정보가 삭제되었습니다.", 200),
	HRT_SUCCESS("배정 완료", "해당 학생이 배정되었습니다.", 200),
	CLASS_SUCCESS("편성 완료", "해당 학생의 반이 편성 되었습니다.", 200),
	SUCCESS_EXCEL("변환 완료", "전체 학생명부가 엑셀로 출력되었습니다.", 200),
	
	/**
	 * 형제 관룐
	 */
	
	MEMO_UPDATED("메모 수정 완료", "메모가 수정되었습니다.", 200),
	
	/**
	 * 반 편성 관련
	 * */
	CLASS_ADDED("반 개설 완료", "해당 반이 개설되었습니다.", 200),
	CLASS_UPDATED("반 수정 완료", "해당 반이 수정되었습니다.", 200),
	CLASS_DELETED("반 삭제 완료", "해당 반이 삭제되었습니다.", 200),
	
	/**
	 * 상담 일지 관련
	 * */
	COUNSE_CREATED("상담 등록 완료", "상담이 등록되었습니다.", 200),	
	COUNSE_UPDATED("상담 내용 수정 완료", "상담 내용이 수정되었습니다.", 200),	
	COUNSE_DELETED("상담 일지 삭제 완료", "상담 일지가 삭제되었습니다.", 200),	
	
	/**
	 * 과목 관련
	 */
	SUBJECT_ADDED("과목 추가 완료", "해당 과목이 추가되었습니다.", 200),
	SUBJECT_UPDATED("과목 변경 완료", "해당 과목이 변경되었습니다.", 200),
	SUBJECT_UPDATED_ORDER("과목 순서 완료", "과목의 순서가 변경되었습니다.", 200),
	
	/**
	 * 성적 관련
	 */
	SCORE_ADDED("성적 등록 완료", "해당 성적이 등록되었습니다.", 200),
	SCORE_UPDATED("성적 수정 완료", "해당 성적이 수정되었습니다.", 200),
	SCORE_DELETED("성적 삭제 완료", "해당 성적이 삭제되었습니다.", 200),
	
	/**
	 * 계정 관련
	 */
	ROLE_UPDATED("직책 변경 완료", "해당 계정의 직책이 변경되었습니다.", 200),
	MEMBER_SUBJECT_UPDATED("담당 과목 변경 완료", "해당 계정의 담당 과목이 변경되었습니다.", 200),
	BAN_UPDATED("사용 제한 변경 완료", "해당 계정 사용제한이 변경되었습니다.", 200),
	MEMBER_DELETE("계정 삭제 완료", "해당 계정이 삭제되었습니다.", 200),
	PASSWORD_UPDATED("비밀번호 변경 완료", "비밀번호가 변경되었습니다.", 200),
	
	/**
	 * 게시글
	 */
	LASTDUMMY("이메일 중복 오류", "이미 존재하는 회원의 이메일입니다.", 401);
	
	private String reason;
	
	private String message;
	
	private int status;
	
	private SuccessStatus(String reason, String message, int status) {
		this.reason = reason;
		this.message = message;
		this.status = status;
	}
	
	
}
