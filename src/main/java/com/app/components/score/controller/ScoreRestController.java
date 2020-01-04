package com.app.components.score.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.app.common.param.SuccessParam;
import com.app.components.score.data.HighMoiAllDto;
import com.app.components.score.data.MiddleNesinAllDto;
import com.app.components.score.data.ScoreEntity;
import com.app.components.score.param.HighMoiInParam;
import com.app.components.score.param.HighMoiOutParam;
import com.app.components.score.param.HighMoiUpdateInParam;
import com.app.components.score.param.HighNesinInParam;
import com.app.components.score.param.HighNesinOutParam;
import com.app.components.score.param.HighNesinScoreOutParam;
import com.app.components.score.param.HighNesinUpdateInParam;
import com.app.components.score.param.MiddleNesinInParam;
import com.app.components.score.param.MiddleNesinOutParam;
import com.app.components.score.param.ScoreOutParam;
import com.app.components.score.param.ScoreReadInParam;
import com.app.components.score.service.ScoreService;
import com.app.status.SuccessStatus;

@RestController
@RequestMapping("/api")
public class ScoreRestController {

	@Autowired
	private ScoreService scoreService;
	
	@ResponseBody
	@GetMapping("/score")
	@ResponseStatus(value=HttpStatus.OK)
	public List<ScoreOutParam> read(@Valid @ModelAttribute ScoreReadInParam inParam) {	
		
		
		
		return scoreService.read(inParam);
		
		
	}
	
	@ResponseBody
	@GetMapping("/score/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public ScoreEntity readOne(@PathVariable int idx) {	

		return scoreService.readOne(idx);
		
		
	}
	
	@ResponseBody
	@DeleteMapping("/score/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam deleteOne(@PathVariable int idx) {	

		scoreService.deleteOne(idx);
		
		return new SuccessParam(SuccessStatus.SCORE_DELETED);
	}
	
	@ResponseBody
	@DeleteMapping("/score/high/nesin/{scoreIdx}/{subjectCode}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam deleteOneHighNesin(@PathVariable int scoreIdx, @PathVariable int subjectCode) {	

		scoreService.deleteOneHighNesin(scoreIdx, subjectCode);
		
		return new SuccessParam(SuccessStatus.SCORE_DELETED);
	}
	
	@ResponseBody
	@DeleteMapping("/score/high/moi/{scoreIdx}/{subjectCode}")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam deleteOneHighMoi(@PathVariable int scoreIdx, @PathVariable int subjectCode) {	

		scoreService.deleteOneHighMoi(scoreIdx, subjectCode);
		
		return new SuccessParam(SuccessStatus.SCORE_DELETED);
	}
	
	@ResponseBody
	@GetMapping("/score/middle/nesin/all/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public List<MiddleNesinAllDto> readAllNesin(@PathVariable int idx) {	
		
		
		return scoreService.readAllNesin(idx);
		
		
	}
	
	@ResponseBody
	@GetMapping("/score/high/moi/all/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public List<HighMoiAllDto> readAllHigh(@PathVariable int idx) {	

		return scoreService.readAllMoi(idx);
		
		
	}
	
	@ResponseBody
	@GetMapping("/score/middle/nesin/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public List<MiddleNesinOutParam> readNesin(@PathVariable int idx) {	
		return scoreService.readNesin(idx);
	}
	
	@ResponseBody
	@PostMapping("/score/middle/nesin")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam createMiddleNesin(@Valid @RequestBody MiddleNesinInParam inParam) {	
		
		scoreService.createScore(inParam);
		
		return new SuccessParam(SuccessStatus.SCORE_ADDED);
		
	}
	
	@ResponseBody
	@PostMapping("/score/high/moi")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam createMoi(@Valid @RequestBody HighMoiInParam inParam) {	
		
		scoreService.createMoiScore(inParam);
		
		return new SuccessParam(SuccessStatus.SCORE_ADDED);
		
	}
	
	@ResponseBody
	@PatchMapping("/score/middle/nesin")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateMiddleNesin(@Valid @RequestBody MiddleNesinInParam inParam) {	
		
		scoreService.updateScore(inParam);
		
		return new SuccessParam(SuccessStatus.SCORE_UPDATED);
		
	}
	
	@ResponseBody
	@PatchMapping("/score/high/nesin")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateHighNesin(@Valid @RequestBody HighNesinUpdateInParam inParam) {	
		
		scoreService.updateHighNesin(inParam);
		
		return new SuccessParam(SuccessStatus.SCORE_UPDATED);
		
	}
	
	@ResponseBody
	@PatchMapping("/score/high/moi")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam updateHighMoi(@Valid @RequestBody HighMoiUpdateInParam inParam) {	
		
		scoreService.updateHighNesin(inParam);
		
		return new SuccessParam(SuccessStatus.SCORE_UPDATED);
		
	}
	
	
	@ResponseBody
	@PostMapping("/score/high/nesin")
	@ResponseStatus(value=HttpStatus.OK)
	public SuccessParam createHighNesin(@Valid @RequestBody HighNesinInParam inParam) {	
		
		scoreService.createScore(inParam);
		
		return new SuccessParam(SuccessStatus.SCORE_ADDED);
		
	}
	
	@ResponseBody
	@GetMapping("/score/high/nesin/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public HighNesinScoreOutParam readHighNesin(@PathVariable int idx) {	
		List<HighNesinOutParam> result = scoreService.readHighNesin(idx);
		double highAverage = 0;
		if(result != null && !result.isEmpty()) {
			highAverage = result.get(0).getHighAverage();
		}
		return HighNesinScoreOutParam.builder().highAverage(highAverage).highNesin(result).build();
	}
	
	@ResponseBody
	@GetMapping("/score/high/moi/{idx}")
	@ResponseStatus(value=HttpStatus.OK)
	public List<HighMoiOutParam> readHighMoi(@PathVariable int idx) {	
		return scoreService.readHighMoi(idx);
	}
	
}
