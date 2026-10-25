package com.zeeshan.jobtrack.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI jobTrackOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("JobTrack API")
                        .version("1.0.0")
                        .description("REST API for managing job applications"))
                .components(new Components()
                        .addSecuritySchemes(
                                "bearerAuth",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        ))
                .addSecurityItem(
                        new SecurityRequirement()
                                .addList("bearerAuth")
                );
    }
}