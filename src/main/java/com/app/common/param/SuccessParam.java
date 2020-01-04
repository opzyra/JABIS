package com.app.common.param;

import org.springframework.http.HttpStatus;

import com.app.status.SuccessStatus;
import com.app.util.swal.SwalConst;
import com.app.util.swal.SwalConstructor;

import lombok.Data;

@Data
public class SuccessParam {

	private int status;
	
	private SwalConstructor swal;
	
	public SuccessParam(HttpStatus status) {
		this.status = status.value();
	}
	
	public SuccessParam(SuccessStatus status) {
		this.status = status.getStatus();
		this.swal = SwalConstructor.builder()
				.title(status.getReason())
				.text(status.getMessage())
				.icon(SwalConst.SUCCESS)
				.button(SwalConst.OK)
				.build();
	}
	
}
