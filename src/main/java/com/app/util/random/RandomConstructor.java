package com.app.util.random;

import java.util.UUID;

public class RandomConstructor {
	
	public static String getAuthCode(int length) {
		return UUID.randomUUID().toString().substring(0, length).toUpperCase();
	}
}
