package com.app.util.notification;

import com.app.code.RoleNameCode;

import lombok.Getter;

@Getter
public enum Notification {

	
	PASSWORD_NOTIFICATION("icon wb-unlock bg-danger white icon-circle", "비밀번호를 장기간 변경하지 않았습니다.<br>보안을 위해 비밀번호를 변경해주세요."),
	PASSWORD_ACCESS_NOTIFICATION("icon wb-warning bg-warning white icon-circle", "최근 비정상 접속 시도가 있었습니다.<br>보안에 주의해주세요."),
	COUNSE_NOTIFICATION("icon wb-time bg-warning white icon-circle", "상담 일지 마감일이 얼마 안남았습니다.<br>상담 일지를 작성해주세요."),
	COUNSE_TODAY_NOTIFICATION("icon wb-clipboard bg-danger white icon-circle", "오늘은 상담 일지 마감일 입니다.<br>상담 일지 작성률을 꼭 확인해주세요."),
	COUNSE_DELEGATION("icon fa-slideshare bg-success white icon-circle", "");
	
	private String icon;
	
	private String title;
	
	private Notification(String icon, String title) {
		this.icon = icon;
		this.title = title;
	}
	
	public String delegation(String hrtName, int roleCode, String studentName) {
		return "<span class='text-primary'>" + hrtName + "</span> 선생님이 나의 담당학생 <span class='text-success'>" + studentName + "</span>의<br>상담일지를 작성하였습니다."; 
	}
	
	
}
