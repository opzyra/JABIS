package com.app.common.param;

import org.springframework.http.HttpStatus;

import com.app.status.ErrorStatus;
import com.app.util.swal.SwalConst;
import com.app.util.swal.SwalConstructor;

import lombok.Data;

@Data
public class ErrorParam {

	private int status;
	
	private SwalConstructor swal;
	
	public ErrorParam(HttpStatus status) {
		this.status = status.value();
		this.swal = SwalConstructor.builder()
				.title(ErrorStatus.DEFAULT.getReason())
				.text(ErrorStatus.DEFAULT.getMessage())
				.icon(SwalConst.ERROR)
				.button(SwalConst.OK)
				.build();
	}
	
	public ErrorParam(ErrorStatus status) {
		this.status = status.getStatus();
		this.swal = SwalConstructor.builder()
				.title(status.getReason())
				.text(status.getMessage())
				.icon(status.getIcon())
				.button(SwalConst.OK)
				.build();
	}
	
}
