package com.app.security;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.app.code.EnabledCode;
import com.app.code.RoleCode;
import com.app.components.member.data.MemberEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
public class Principal implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private MemberEntity member;
	
	private String username;
	
	private String password;
	
	private int roleCode;
	
    private Collection<? extends GrantedAuthority> authorities;
	
    public Principal() {}
    
    public Principal(MemberEntity member) {
    	
    	this.member = member;
    	
    	this.username = member.getEmail();
    	
    	this.password = member.getPassword();
    	
    	this.roleCode = member.getRoleCode();
    	
    	List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
    	
    	String role = RoleCode.getRole(member.getRoleCode());
    
    	authorities.add(new SimpleGrantedAuthority(role));
    	
    	this.authorities = authorities;
    	
    }
    
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	
	@Override
	public boolean isAccountNonExpired() {
		
		boolean result = true;
		
		if(member.getExpireDate() != null) {
		
			SimpleDateFormat formatter = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
			String formatToday = formatter.format(Calendar.getInstance().getTime());
			
			Long today = Timestamp.valueOf(formatToday).getTime();
			Long expireDate = member.getExpireDate().getTime();
			
			result = expireDate > today;
			
		}
		
			
		
		return result;
	}


	@Override
	public boolean isAccountNonLocked() {
		
		return !member.isDeleteStatus();
	}

	@Override
	public boolean isCredentialsNonExpired() {
		int memberTryCount = member.getAccessTryCount();
		
		return 3 > memberTryCount;
	}


	@Override
	public boolean isEnabled() {
		return EnabledCode.getEnabled(member.getEnabledCode());
	}

	
	
	

}
