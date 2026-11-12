package com.conectauce.common.health;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class HealthResponseTest {

    @Test
    void shouldExposeApplicationStatusAndVersion() {
        HealthResponse response = new HealthResponse("ConectaUCE API", "UP", "0.1.0");

        assertEquals("ConectaUCE API", response.application());
        assertEquals("UP", response.status());
        assertEquals("0.1.0", response.version());
    }
}
