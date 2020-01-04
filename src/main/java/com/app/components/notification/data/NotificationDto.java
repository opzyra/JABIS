package com.app.components.notification.data;

import java.io.Serializable;
import java.sql.Timestamp;

import lombok.Data;

@Data
public class NotificationDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer idx;
	
	private String email;
	
	private String icon;
	
	private String title;
	
	private Timestamp regDate;
	
	private boolean read;
	
	private Timestamp readDate;
	
}
