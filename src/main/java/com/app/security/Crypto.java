package com.app.security;

import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;

public class Crypto {

	public static final String password = "i6fEz_VZr#$W06ESIB*jsgvN!bKIG0R5";
	
	public static final String salt ="5ccdc10f55fac878";
	
	private static TextEncryptor encryptor = Encryptors.text(password, salt);
	
	public static String encode(String in) {
		
		return encryptor.encrypt(in);
		
	}
	
	public static String decode(String in) {
		
		return encryptor.decrypt(in);
		
	}
	
}
