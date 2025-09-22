package com.JobMailer.Request;

import org.springframework.web.multipart.MultipartFile;

public class EmailSendRequest {
    private MultipartFile file;
    private String body;

    public EmailSendRequest() {
    }

    public EmailSendRequest(MultipartFile file, String body) {
        this.file = file;
        this.body = body;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
