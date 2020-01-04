package com.app.components.board.controller;

import java.util.List;

import javax.validation.Valid;

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
import com.app.components.board.data.BoardEntity;
import com.app.components.board.data.BoardResultMap;
import com.app.components.board.param.NoticeLatestInParam;
import com.app.components.board.param.RecordInParam;
import com.app.components.board.param.RecordOutParam;
import com.app.components.board.param.WriteInParam;
import com.app.components.board.service.BoardService;
import com.app.components.member.data.MemberEntity;
import com.app.security.Principal;
import com.app.status.ErrorStatus;
import com.app.status.SuccessStatus;

@RestController
@RequestMapping("/api")
public class BoardRestController {

	@Autowired
	private BoardService boardService;
	
	@ResponseBody
	@GetMapping("/board")
	@ResponseStatus(value=HttpStatus.OK)
	public RecordOutParam getBoards(@Valid @ModelAttribute RecordInParam inParam) {	
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Principal principal = (Principal) authentication.getPrincipal();

		inParam.setRoleCode(principal.getRoleCode());
		
		int count = boardService.getBoardListAllCount(inParam);
		
		int countPage = count == 0 ? 1 : (count%inParam.getLimit() == 0 ? count/inParam.getLimit() : count/inParam.getLimit()+1);
		
		List<BoardResultMap> boards = boardService.getBoardList(inParam);

		return RecordOutParam.builder().countPage(countPage).boards(boards).build();
		
	}
	
	@ResponseBody
	@GetMapping("/board/latest")
	@ResponseStatus(value=HttpStatus.OK)
	public List<BoardResultMap> getLatestBoards(@Valid @ModelAttribute NoticeLatestInParam inParam) {	
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Principal principal = (Principal) authentication.getPrincipal();

		inParam.setRoleCode(principal.getRoleCode());

		return boardService.getLatestBoards(inParam);
		
	}
	
	
	@ResponseBody
	@PostMapping("/board")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam writeBoard(@Valid @RequestBody WriteInParam inParam) {	
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Principal principal = (Principal) authentication.getPrincipal();
		
		MemberEntity member = principal.getMember();
		

		if(inParam.getCategoryCode() == 0) {
			if(member.getRoleCode() < 3) {

				throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
			}
		}
		
		boardService.createBoard(inParam, member);
		
		return new SuccessParam(SuccessStatus.BOARD_WRITE);
	}
	
	@ResponseBody
	@PatchMapping("/board/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam modifyBoard(@Valid @RequestBody WriteInParam inParam) {	
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Principal principal = (Principal) authentication.getPrincipal();
		
		MemberEntity member = principal.getMember();
		

		if(inParam.getCategoryCode() == 0) {
			if(member.getRoleCode() < 3) {

				throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
			}
		}
		
		int result = boardService.modifyBoard(inParam, member);
		
		if(result < 1) {

			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
		}
		
		return new SuccessParam(SuccessStatus.BOARD_MODIFY);
	}
	
	@ResponseBody
	@DeleteMapping("/board/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam deleteBoard(@PathVariable int idx) {	
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Principal principal = (Principal) authentication.getPrincipal();
		
		MemberEntity member = principal.getMember();
		
		int result = boardService.deleteBoard(idx, member.getEmail());
		
		if(result < 1) {

			throw new ApplicationException(ErrorStatus.SESSION_MISS_MATCH);
		}
		
		return new SuccessParam(SuccessStatus.BOARD_DELETE);
	}
	
}
