package com.app.components.upload.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import com.app.components.upload.param.UploadOutParam;
import com.app.util.file.FileType;
import com.app.util.file.PathConstructor;

@RestController
@RequestMapping("/api/upload")
public class UploadRestController {

	private static final String UPLOAD_PATH = "upload";
	
	@ResponseBody
	@PostMapping("/image")
	@ResponseStatus(value=HttpStatus.OK)
	public UploadOutParam uploadImage(@RequestParam("file") MultipartFile uploadfile) {
		
		if(uploadfile.isEmpty()) {
			throw new MultipartException("파일 없음");
		}
		
		String originalName = uploadfile.getOriginalFilename();
		
		String formatName = originalName.substring(originalName.lastIndexOf(".")+1).toLowerCase();

		if(FileType.getMediaType(formatName) == null) {
			throw new MultipartException("확장자 불일치");
		}

		UUID uid = UUID.randomUUID();
		
		String saveName = uid.toString() + "_" + originalName;
		String savePath = PathConstructor.getSavePath();
		
		try {
			
			byte[] bytes = uploadfile.getBytes();
			Path path = Paths.get(UPLOAD_PATH + savePath + saveName);
	        Files.write(path, bytes);
	        
		} catch (IOException e) {
			
			throw new MultipartException("파일 업로드 에러", e);
			
		}
        
		return new UploadOutParam(savePath + saveName);
	}
	
}
