package com.JobMailer.service;

import com.JobMailer.Request.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientAutoConfiguration;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailGeneratorService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Autowired
    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String genrateEmailReply(EmailRequest emailRequest,int choose){
        //build a promt
        String promt = "";
        if(choose==1){
             promt = buildPromt(emailRequest);
        }else{
             promt = buildPromtForATS(emailRequest);
        }
        // craft a request
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of(
                                "parts" , new Object[]{
                                Map.of("text", promt)
                                })
        }
        );
        //Do request and get response
        String response = webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        //Extract response and returt the reponse
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try{
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response); // jackson tool/library
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        }catch (Exception e){
            return "Error processing request:" + e.getMessage();
        }
    }

    private String buildPromt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("generate a simple mail using this resume information only generate mail without any subject just a mail from starting Dear Hiring Manager to My personal details " +
                "generated mail: ");

        if(emailRequest.getKeyword() != null && !emailRequest.getKeyword().isEmpty()){
            prompt.append(" Use a ").append(emailRequest.getKeyword()).append("tone");
        }
        prompt.append("\nOriginal email: \n").append(emailRequest.getResumeText());
        return prompt.toString();
    }

    private String buildPromtForATS(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a simple ATS using this information the format is very good you have to just pickup the keywords by your own and create a ATS According to that (just give me an ATS acore in number nothing that just a number)");

        if(emailRequest.getKeyword() != null && !emailRequest.getKeyword().isEmpty()){
            prompt.append(" Use a ").append(emailRequest.getKeyword()).append("tone");
        }
        prompt.append("\nATS in number(only number): \n").append(emailRequest.getResumeText());
        return prompt.toString();
    }

}
