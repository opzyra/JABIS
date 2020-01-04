package com.app.security;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.app.common.exception.ApplicationException;
import com.app.components.member.data.MemberDao;
import com.app.components.member.data.MemberEntity;
import com.app.components.notification.data.NotificationDao;
import com.app.status.ErrorStatus;
import com.app.util.notification.Notification;

@Component
public class MemberAuthentication implements AuthenticationProvider {
	
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private PasswordEncoder PasswordEncoder;
	
	@Override
	public Authentication authenticate(Authentication authentication) {
		String id = authentication.getName();
		String password = (String)authentication.getCredentials();
		
		MemberEntity member = sqlSession.getMapper(MemberDao.class).readOne(id);

		if(member == null) {
			throw new ApplicationException(ErrorStatus.NOT_FOUND_USER);
		}
		
		Principal principal = new Principal(member);
		
		 if(!principal.isCredentialsNonExpired()) {

			throw new ApplicationException(ErrorStatus.ACCESS_COUNT);
			
		} else if(!principal.isAccountNonLocked()) {

			throw new ApplicationException(ErrorStatus.IS_DELETED);
			
		} else if(!principal.isAccountNonExpired()) {

			throw new ApplicationException(ErrorStatus.IS_EXPIRED);
			
		} else if(!PasswordEncoder.matches(password, principal.getPassword())) {
			
			sqlSession.getMapper(MemberDao.class).accessFailMember(id);
			
			if(dateCheck(member) && member.getAccessTryCount() == 0) {
				sqlSession.getMapper(NotificationDao.class).createOne(member.getEmail(), Notification.PASSWORD_ACCESS_NOTIFICATION.getIcon(), Notification.PASSWORD_ACCESS_NOTIFICATION.getTitle());
			}
	
			throw new ApplicationException(ErrorStatus.BAD_CREDENTIALS);
			
		}  else if (!principal.isEnabled()) {

			int enabledCode = principal.getMember().getEnabledCode();
			
			if(enabledCode == 2) {
				
				throw new ApplicationException(ErrorStatus.IS_BANED);
				
			}else if(enabledCode == 1) {
				
				throw new ApplicationException(ErrorStatus.MONE_AUTH);
				
			} else {
				
				throw new ApplicationException(ErrorStatus.DEFAULT);
				
			}
	        
	    } 
		
		if(dateCheck(member) && member.getRoleCode() < 4 && member.getRoleCode() > 0) {
			if(counseDateCheck() == 20) {
				sqlSession.getMapper(NotificationDao.class).createOne(member.getEmail(), Notification.COUNSE_NOTIFICATION.getIcon(), Notification.COUNSE_NOTIFICATION.getTitle());
			}else if(counseDateCheck() == 24) {
				sqlSession.getMapper(NotificationDao.class).createOne(member.getEmail(), Notification.COUNSE_TODAY_NOTIFICATION.getIcon(), Notification.COUNSE_TODAY_NOTIFICATION.getTitle());
			}
		}
		 
		sqlSession.getMapper(MemberDao.class).accessSuccessMember(id);
		
		
		
		return new UsernamePasswordAuthenticationToken(principal, principal.getPassword(), principal.getAuthorities());
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}

	public boolean dateCheck(MemberEntity member) {
		
		boolean check = false;
		
		SimpleDateFormat formatter = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
		Calendar cal = Calendar.getInstance();
		String today = null;
		Date imsi = cal.getTime();
		imsi.setHours(0);
		imsi.setMinutes(0);
		imsi.setSeconds(0);
		today = formatter.format(imsi);
		Timestamp ts = Timestamp.valueOf(today);
		
		if(ts.after(member.getAccessLastDate())) {
			// UPDATE
			check = true;
		}else {
			// NONE
		}
		
		return check;
	}
	
	public int counseDateCheck() {
		SimpleDateFormat formatter = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
		Calendar cal = Calendar.getInstance();
		String today = null;
		Date imsi = cal.getTime();
		return imsi.getDate();
	}

}
