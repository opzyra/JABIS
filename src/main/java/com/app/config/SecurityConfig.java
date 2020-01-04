package com.app.config;

import javax.servlet.http.HttpSessionListener;

import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import com.app.security.SessionListener;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	private final String MAIN_PATH = "/";
	private final String ROBOTS_PATH = "/robots.txt";
	private final String APP_PATH = "/app/";
	private final String LOGIN_PATH = "/login/**";
	private final String REGISTER_PATH = "/register/**";
	private final String FORGOT_PASSWORD_PATH = "/forgotPassword/**";
	private final String HRT_PATH = "/app/hrt/**";
	private final String CLASS_PATH = "/app/class/**";
	
	private final String NOTICE_CREATE = "/app/notice/create";
	private final String STUDENT_CREATE = "/app/student/create";
	
	private final String MEMBER_LIST = "/app/member/list";
	private final String SUBJECT_LIST = "/app/subject";
	
	private final String LOGIN_API = "/api/member/login";
	private final String REGISTER_API = "/api/member/register";
	private final String AUTH_API = "/api/member/auth";
	private final String LOGOUT_API = "/api/member/logout";
	
	private final String MEMBER_ROLE_API = "/api/member/role";
	private final String MEMBER_SUBJECT_API = "/api/member/subject";
	
	private final String SUBJECT_API = "/api/subject/**";
	
	private final String BOARD_RECORD_API = "/api/board/**";
	
	private final String COMMENTS_RECORD_API = "/api/comments/**";
	
	private final String HRT_API = "/api/hrt/**";
	private final String CLASS_API = "/api/class/**";
	
	private final String UPLOAD_API = "/api/upload/**";
	
	private final String ROLE_WEB = "ROLE_WEB";
	private final String ROLE_ADMIN = "ROLE_ADMIN";
	private final String ROLE_MASTER = "ROLE_MASTER";
	private final String ROLE_TEAM = "ROLE_TEAM";
	private final String ROLE_HRT = "ROLE_HRT";
	private final String ROLE_SUBJECT = "ROLE_SUBJECT";
	
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.csrf()
		.and()
			.authorizeRequests() 
				.antMatchers(MAIN_PATH, LOGIN_PATH, REGISTER_PATH, FORGOT_PASSWORD_PATH, ROBOTS_PATH).permitAll()
				.antMatchers(LOGIN_API, REGISTER_API, AUTH_API).anonymous()
				.antMatchers(APP_PATH, LOGOUT_API, BOARD_RECORD_API, UPLOAD_API, COMMENTS_RECORD_API, STUDENT_CREATE).hasAnyAuthority(ROLE_WEB, ROLE_ADMIN, ROLE_MASTER, ROLE_TEAM, ROLE_HRT, ROLE_SUBJECT)
				.antMatchers(CLASS_PATH, CLASS_API, HRT_PATH, HRT_API, SUBJECT_LIST, SUBJECT_API).hasAnyAuthority(ROLE_WEB, ROLE_ADMIN, ROLE_MASTER, ROLE_TEAM)
				.antMatchers(NOTICE_CREATE, MEMBER_LIST, MEMBER_ROLE_API, MEMBER_SUBJECT_API).hasAnyAuthority(ROLE_WEB, ROLE_ADMIN, ROLE_MASTER)
				.anyRequest().authenticated()			
		.and()
			.formLogin().disable()
			.logout().deleteCookies("JSESSIONID")
			.logoutUrl(LOGOUT_API)
			.logoutUrl(MAIN_PATH)
		.and()
			.sessionManagement().maximumSessions(1).expiredUrl("/").sessionRegistry(sessionRegistry());
		
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
	 
		web
		.ignoring()
			.antMatchers("/css/**","/fonts/**","/images/**","/js/**","/vendor/**");
	}
	
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder() throws Exception{
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}
	
	@Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public ServletListenerRegistrationBean<HttpSessionEventPublisher> httpSessionEventPublisher() {
        return new ServletListenerRegistrationBean<HttpSessionEventPublisher>(new HttpSessionEventPublisher());
    }
    
    @Bean
    public HttpSessionListener httpSessionListener() {
    	return new SessionListener();
    }

}
