package com.app.components.member.controller;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.exception.ApplicationException;
import com.app.common.param.SuccessParam;
import com.app.components.data.param.TeacherListOutParam;
import com.app.components.member.data.MemberEntity;
import com.app.components.member.param.AuthInParam;
import com.app.components.member.param.BanInParam;
import com.app.components.member.param.CountOutParam;
import com.app.components.member.param.LoginInParam;
import com.app.components.member.param.PasswordChangeInParam;
import com.app.components.member.param.PasswordCheckInParam;
import com.app.components.member.param.ReadInParam;
import com.app.components.member.param.RegisterInParam;
import com.app.components.member.param.ResetPasswordInParam;
import com.app.components.member.param.UpdateRoleCodeInParam;
import com.app.components.member.param.UpdateSubjectCodeInParam;
import com.app.components.member.service.MemberService;
import com.app.security.Crypto;
import com.app.security.Principal;
import com.app.security.SessionListener;
import com.app.status.ErrorStatus;
import com.app.status.SuccessStatus;

@RestController
@RequestMapping("/api")
public class MemberRestController {

	private final String REMEMBER_ME = "rememberMe";
	
	@Autowired 
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private MemberService memberService;
	
	@ResponseBody
	@PostMapping("/member/login")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam login(@Valid @RequestBody LoginInParam inParam, 
			HttpSession session, HttpServletRequest request, HttpServletResponse response) throws ServletException {
		
		String email = inParam.getEmail();
		String password = inParam.getPassword();
		SecurityContext a = SecurityContextHolder.getContext();
		request.login(email, password);
		
		SessionListener sl = SessionListener.getInstance();
		
		sl.hasSession(email, request.getSession().getId());
		
		boolean rememberMe = inParam.isRememberMe();
		
		if(rememberMe) {
			
			Cookie cookie = new Cookie(REMEMBER_ME, Crypto.encode(email));
			cookie.setPath("/");
			cookie.setMaxAge(60*60*24*30);
			
			response.addCookie(cookie);
		
		} else {
			
			Cookie[] cookies = request.getCookies();
			if(cookies != null){
		        for(Cookie cookie : cookies){
		            if(REMEMBER_ME.equalsIgnoreCase(cookie.getName())) {
		            	cookie.setPath("/");
		            	cookie.setMaxAge(0);
		            	response.addCookie(cookie);
		            	break;
		            }
		        }
		    }
			
		}
		
		return new SuccessParam(HttpStatus.OK);
		
	}
	
	@ResponseBody
	@PostMapping("/member/register")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam register(@Valid @RequestBody RegisterInParam inParam) {	
		
		memberService.registerMember(inParam);
		
		return new SuccessParam(SuccessStatus.REGISTER);
		
	}
	
	@ResponseBody
	@PostMapping("/member/check")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam passwordCheck(@Valid @RequestBody PasswordCheckInParam inParam) {	
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();

		memberService.passwordCheck(inParam, member);
		
		return new SuccessParam(HttpStatus.OK);
		
	}
	
	@ResponseBody
	@PatchMapping("/member/auth")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam auth(@Valid @RequestBody AuthInParam inParam) {	
		
		memberService.authMember(inParam);
		
		return new SuccessParam(SuccessStatus.AUTH);
		
	}
	
	@ResponseBody
	@PostMapping("/member/logout")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam logout(HttpSession session) {	
		
		session.invalidate();
		
		return new SuccessParam(SuccessStatus.LOGOUT);
		
	}
	
	@ResponseBody
	@GetMapping("/member/count")
	@ResponseStatus(value=HttpStatus.OK)
	public CountOutParam readCount(){
		return memberService.readCount();
	}
	
	@ResponseBody
	@GetMapping("/member")
	@ResponseStatus(value=HttpStatus.OK)
	public List<MemberEntity> readCount(@ModelAttribute ReadInParam inParam){
		return memberService.readAll(inParam);
	}
	
	@ResponseBody
	@PostMapping("/member/password")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updatePassword(@Valid @RequestBody PasswordChangeInParam inParam){
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();

		memberService.passwordUpdate(inParam, member);
		
		return new SuccessParam(SuccessStatus.PASSWORD_UPDATED);
		
	}
	
	@ResponseBody
	@GetMapping("/member/password/latest")
	@ResponseStatus(value=HttpStatus.OK)
	public int readLatestPassword(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		SimpleDateFormat formatter = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
		
		Calendar cal = Calendar.getInstance();
		String today = formatter.format(cal.getTime());
		Timestamp ts = Timestamp.valueOf(today);
		return (int) ((ts.getTime()-member.getPasswordUpdate().getTime())/(1000 * 60 * 60 * 24));
		
	}
	
	@ResponseBody
	@PatchMapping("/member/role")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateRoleCode(@Valid @RequestBody UpdateRoleCodeInParam inParam){
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		if(member.getRoleCode() < 3) {
			
			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
			
		}else if(member.getRoleCode() <= inParam.getRoleCode()) {
			
			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
			
		}
		
		memberService.updateRoleCode(inParam);
		
		return new SuccessParam(SuccessStatus.ROLE_UPDATED);
	}
	
	@ResponseBody
	@PatchMapping("/member/subject")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateSubjectCode(@Valid @RequestBody UpdateSubjectCodeInParam inParam){
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		if(member.getRoleCode() < 3) {
			
			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
			
		}
		
		memberService.updateSubjectCode(inParam);
		
		return new SuccessParam(SuccessStatus.MEMBER_SUBJECT_UPDATED);
	}
	
	@ResponseBody
	@PatchMapping("/member/password")
	@ResponseStatus(value=HttpStatus.OK)
	public String resetPassword(@Valid @RequestBody ResetPasswordInParam inParam){
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		if(member.getRoleCode() < 3) {
			
			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
			
		}
		
		String pw = memberService.resetPassword(inParam);
		
		return pw;
	}
	
	@ResponseBody
	@PatchMapping("/member/ban")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam ban(@Valid @RequestBody BanInParam inParam){
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		if(member.getRoleCode() < 3) {
			
			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
			
		}
		
		memberService.ban(inParam);
		
		return new SuccessParam(SuccessStatus.BAN_UPDATED);
	}
	
	@ResponseBody
	@DeleteMapping("/member/{email}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateDelete(@PathVariable String email){
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Principal principal = (Principal) authentication.getPrincipal();
		MemberEntity member = principal.getMember();
		
		if(member.getRoleCode() < 3) {
			
			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
			
		}
		
		memberService.updateDeleteStatus(email);
		
		
		
		return new SuccessParam(SuccessStatus.MEMBER_DELETE);
	}
}
