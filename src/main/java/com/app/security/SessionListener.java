package com.app.security;

import java.util.Enumeration;
import java.util.Hashtable;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

public class SessionListener implements HttpSessionListener, HttpSessionAttributeListener {

	public static SessionListener sesssionListener = null;
	
	public static Hashtable<String, Object> sessionRepository;
	
	public SessionListener() {
        
        if(sessionRepository == null) {
        	
            sessionRepository = new Hashtable<String, Object>();
            
        }
        
    }
	
	public static synchronized SessionListener getInstance() {
		
        if(sesssionListener == null) {
        	
        	sesssionListener = new SessionListener();
        	 
        }
        
        return sesssionListener;
        
    }
	
	public boolean hasSession(String userId, String sessionId) {
        
        boolean result = false;
        
        Enumeration<Object> enumeration = sessionRepository.elements();
        
        while(enumeration.hasMoreElements()) {
            
            HttpSession registeredSession = (HttpSession) enumeration.nextElement();
            
            SecurityContext sc =  (SecurityContext)registeredSession.getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);
            
            Principal pp = (Principal)sc.getAuthentication().getPrincipal();

            if(pp != null) {

                if(pp.getUsername().equals(userId)) {
                    
                    if(!registeredSession.getId().equals(sessionId)) {
                        
                        registeredSession.invalidate();
                        
                        result = true;
                    }
                }
                
            }
        }
        
        return result;
    }
	
	@Override
	public void attributeAdded(HttpSessionBindingEvent se) {
		
		if(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY.equals(se.getName())) {
            
            HttpSession session = se.getSession();
            
            synchronized (sessionRepository) {
                
                sessionRepository.put(session.getId(), session);
                
            }
        }
		
	}

	@Override
	public void attributeRemoved(HttpSessionBindingEvent se) {
		
	}

	@Override
	public void attributeReplaced(HttpSessionBindingEvent se) {
		
	}

	@Override
	public void sessionCreated(HttpSessionEvent se) {
		
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		
		HttpSession session = se.getSession();
        
        synchronized (sessionRepository) {
            
            sessionRepository.remove(session.getId());
        }
		
	}

}
