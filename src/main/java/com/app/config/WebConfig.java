package com.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.web.context.request.RequestContextListener;

@Configuration
public class WebConfig {

	@Bean
	public RequestContextListener requestContextListener() {
		return new RequestContextListener();
	}
	
	@Bean
    public TaskScheduler taskScheduler() {
        return new ConcurrentTaskScheduler();
    }
	
}
