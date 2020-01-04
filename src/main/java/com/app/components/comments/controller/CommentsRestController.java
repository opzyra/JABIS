package com.app.components.comments.controller;

import java.util.List;

import javax.validation.Valid;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
import com.app.components.comments.data.CommentsResultMap;
import com.app.components.comments.param.CommentsInParam;
import com.app.components.comments.param.CommentsOutParam;
import com.app.components.comments.param.ModifyInParam;
import com.app.components.comments.param.WriteInParam;
import com.app.components.comments.service.CommentsService;
import com.app.components.member.data.MemberEntity;
import com.app.security.Principal;
import com.app.security.XssClean;
import com.app.status.ErrorStatus;
import com.app.status.SuccessStatus;

@RestController
@RequestMapping("/api")
public class CommentsRestController {
	
	@Autowired
	private CommentsService commentsService;
	
	@ResponseBody
	@GetMapping("/comments")
	@ResponseStatus(value=HttpStatus.OK)
	public CommentsOutParam getComments(@Valid @ModelAttribute CommentsInParam inParam) {	
		
		List<CommentsResultMap> comments = commentsService.getCommentsList(inParam);
		
		int countPage = comments.size() == 0 ? 1 : comments.size()/10+1;

		return CommentsOutParam.builder().countPage(countPage).comments(comments).build();
		
	}
	
	
	@ResponseBody
	@PostMapping("/comments")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam writeComments(@Valid @RequestBody WriteInParam inParam) {	
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Principal principal = (Principal) authentication.getPrincipal();
		
		MemberEntity member = principal.getMember();

		inParam.setEmail(member.getEmail());

		inParam.setContents(XssClean.cleanXSS(inParam.getContents()));
		
		commentsService.createComments(inParam);
		
		return new SuccessParam(SuccessStatus.COMMENTS_WRITE);
	}
	
	@ResponseBody
	@PatchMapping("/comments/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateComments(@Valid @RequestBody ModifyInParam inParam) {	
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Principal principal = (Principal) authentication.getPrincipal();
		
		MemberEntity member = principal.getMember();

		inParam.setEmail(member.getEmail());
		
		inParam.setContents(XssClean.cleanXSS(inParam.getContents()));
		
		int result = commentsService.modifyComment(inParam);
		
		if(result == 0) {
			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
		}
		
		return new SuccessParam(SuccessStatus.COMMENTS_WRITE);
	}
	
	@ResponseBody
	@DeleteMapping("/comments/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam deleteComments(@PathVariable int idx) {	
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Principal principal = (Principal) authentication.getPrincipal();
		
		MemberEntity member = principal.getMember();
		
		ModifyInParam inParam = new ModifyInParam();
		inParam.setIdx(idx);
		
		if(member.getRoleCode() < 3) {
			inParam.setEmail(member.getEmail());
		}
		
		int result = commentsService.deleteComments(inParam);
		
		if(result == 0) {
			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
		}
		
		return new SuccessParam(SuccessStatus.COMMENTS_DELETE);
	}
	
}
