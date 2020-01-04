package com.app.components.board.controller;

import java.util.Calendar;
import java.util.stream.Stream;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.code.BoardCode;
import com.app.components.board.data.BoardResultMap;
import com.app.components.board.service.BoardService;
import com.app.security.Principal;
import com.app.util.cookie.ViewCountCookie;

@Controller
@RequestMapping("/app")
public class BoardController {

	public static final String AUTH_ERROR = "error/403";
	public static final String DELETE_BOARD = "error/404";
	
	public static final String NOTICE_VIEW = "pages/notice";
	public static final String ARTICLE_EDIT_VIEW = "pages/article/create";
	public static final String ARTICLE_MODIFY_VIEW = "pages/article/update";
	public static final String ARTICLE_DETAIL_VIEW = "pages/article/detail";
	
	@Autowired
	private BoardService boardService;
	
	@GetMapping("/notice")
	public String noticeView(Model model) {
		return NOTICE_VIEW;
	}
	
	@GetMapping("/notice/create")
	public String articleEditView(Model model) {
		
		return ARTICLE_EDIT_VIEW;
	}
	
	@GetMapping("/notice/modify/{idx}")
	public String articleModifyView(@PathVariable int idx, Model model, HttpServletRequest request, HttpServletResponse response) {
		
		BoardResultMap boardDto = boardService.getBoard(idx);

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Principal principal = (Principal) authentication.getPrincipal();
		
		if(!principal.getUsername().equals(boardDto.getEmail())) {
			return AUTH_ERROR;
		}
		
		model.addAttribute("board", boardDto);

		
		
		return ARTICLE_MODIFY_VIEW;
	}
	
	@GetMapping("/notice/{idx}")
	public String articleDetailView(@PathVariable int idx, Model model, HttpServletRequest request, HttpServletResponse response) {
		
		BoardResultMap boardDto = boardService.getBoard(idx);

		if(boardDto == null) {
			
			return DELETE_BOARD;
			
		}

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Principal principal = (Principal) authentication.getPrincipal();
		
		if(principal.getRoleCode() < boardDto.getAuthLevel()) {
			return AUTH_ERROR;
		}

		String idxStr = String.valueOf(boardDto.getIdx());
		
		boolean isViewCount = ViewCountCookie.validateViewCount(request, response, principal.getUsername(), idxStr);
		
		if(isViewCount) {
			boardService.updateViewCount(idx);
		}
		
		String category = BoardCode.getBoard(boardDto.getCategoryCode());
		
		model.addAttribute("board", boardDto);
		model.addAttribute("category", category);
		
		return ARTICLE_DETAIL_VIEW;
	}
	
	
	

}
