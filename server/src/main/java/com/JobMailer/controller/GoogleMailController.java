package com.JobMailer.controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
@RequestMapping("/auth/google")
@CrossOrigin(origins = "*")
public class GoogleMailController {

    @Value("${google.clientId}")
    private String clientId;

    @Value("${google.clientSecret}")
    private String clientSecret;

    @Value("${google.redirectUri}")
    private String redirectUri;

    private static String accessToken = null;
    private static String refreshToken = null;

    // 1️⃣ Step 1 - Redirect user to Google OAuth consent
    @GetMapping("/login")
    public void login(HttpServletResponse response) throws IOException {
        String scope = URLEncoder.encode("https://www.googleapis.com/auth/gmail.send", StandardCharsets.UTF_8);
        String url = "https://accounts.google.com/o/oauth2/v2/auth" +
                "?client_id=" + clientId +
                "&redirect_uri=" + URLEncoder.encode(redirectUri, StandardCharsets.UTF_8) +
                "&response_type=code" +
                "&scope=" + scope +
                "&access_type=offline" +
                "&prompt=consent";
        response.sendRedirect(url);
    }

    // 2️⃣ Step 2 - Callback to exchange code for tokens
    @GetMapping("/callback")
    public void callback(@RequestParam("code") String code, HttpServletResponse response) throws IOException {
        RestTemplate restTemplate = new RestTemplate();

        String tokenUrl = "https://oauth2.googleapis.com/token";
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        Map<String, Object> tokenResponse = restTemplate.postForObject(tokenUrl, request, Map.class);

        accessToken = (String) tokenResponse.get("access_token");
        refreshToken = (String) tokenResponse.get("refresh_token");

        // 👉 Redirect to frontend success page
        response.sendRedirect("http://localhost:3000/auth/success");
    }


    // 3️⃣ Step 3 - Send Email
    @PostMapping("/send-mail")
    public ResponseEntity<?> sendMail(@RequestParam String to,
                                      @RequestParam String subject,
                                      @RequestParam String body) {
        if (accessToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first!");
        }

        try {
            String rawMessage = "From: me\r\n" +
                    "To: " + to + "\r\n" +
                    "Subject: " + subject + "\r\n\r\n" +
                    body;

            String encodedMessage = Base64.getUrlEncoder().withoutPadding()
                    .encodeToString(rawMessage.getBytes(StandardCharsets.UTF_8));

            Map<String, String> payload = new HashMap<>();
            payload.put("raw", encodedMessage);

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> entity = new HttpEntity<>(payload, headers);

            RestTemplate restTemplate = new RestTemplate();
            restTemplate.postForEntity("https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
                    entity, String.class);

            return ResponseEntity.ok("Email sent successfully!");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed: " + e.getMessage());
        }
    }
}
